/**
 * Card Studio Backend — Cloudflare Worker
 *
 * Flow (POST /order):
 *   1. Receive the design PDF (base64) + card config from Card Studio.
 *   2. Upload the PDF to Shopify Files.
 *   3. Create a Shopify Draft Order (paper + printing + optional envelope +
 *      optional addressing) with the design URL attached as an order attribute.
 *   4. Return the draft order's invoice (checkout) URL; the front-end sends the
 *      customer there to pay. On payment, the design URL rides on the order, so
 *      it shows up in the standard Shopify new-order email to info@.
 *
 * Auth: client-credentials grant (server-to-server, no redirect).
 *   Secrets (wrangler secret put):  SHOPIFY_CLIENT_ID, SHOPIFY_CLIENT_SECRET
 *   Vars (wrangler.toml):           SHOP, ALLOWED_ORIGIN, API_VERSION
 *
 * NOTE: pricing lives in PRICING below and is provisional — confirm with Marc.
 * NOTE: not yet run against the live API; verify field names on first deploy
 *       (DraftOrderLineItemInput price field + FileCreate enums can vary by
 *       API version — pin API_VERSION and adjust if userErrors come back).
 */

const TOKEN = { value: null, exp: 0 };

async function getToken(env) {
  const now = Date.now();
  if (TOKEN.value && now < TOKEN.exp - 60000) return TOKEN.value;
  const r = await fetch(`https://${env.SHOP}/admin/oauth/access_token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: env.SHOPIFY_CLIENT_ID,
      client_secret: env.SHOPIFY_CLIENT_SECRET,
      grant_type: 'client_credentials',
    }),
  });
  if (!r.ok) throw new Error(`token ${r.status}: ${await r.text()}`);
  const j = await r.json();
  TOKEN.value = j.access_token;
  TOKEN.exp = now + (j.expires_in || 86400) * 1000;
  return TOKEN.value;
}

async function gql(env, token, query, variables) {
  const r = await fetch(`https://${env.SHOP}/admin/api/${env.API_VERSION}/graphql.json`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Shopify-Access-Token': token },
    body: JSON.stringify({ query, variables }),
  });
  const j = await r.json();
  if (j.errors) throw new Error(`gql: ${JSON.stringify(j.errors)}`);
  return j.data;
}

/* Upload a PDF (Uint8Array) to Shopify Files; return its CDN url. */
async function uploadPdf(env, token, bytes, filename) {
  const staged = await gql(env, token, `
    mutation($input:[StagedUploadInput!]!){
      stagedUploadsCreate(input:$input){
        stagedTargets{ url resourceUrl parameters{ name value } }
        userErrors{ field message }
      }
    }`, { input: [{ filename, mimeType: 'application/pdf', resource: 'FILE', httpMethod: 'POST' }] });

  const errs = staged.stagedUploadsCreate.userErrors;
  if (errs && errs.length) throw new Error(`staged: ${JSON.stringify(errs)}`);
  const target = staged.stagedUploadsCreate.stagedTargets[0];

  const form = new FormData();
  for (const p of target.parameters) form.append(p.name, p.value);
  form.append('file', new Blob([bytes], { type: 'application/pdf' }), filename);
  const up = await fetch(target.url, { method: 'POST', body: form });
  if (!up.ok) throw new Error(`upload ${up.status}: ${await up.text()}`);

  const fc = await gql(env, token, `
    mutation($files:[FileCreateInput!]!){
      fileCreate(files:$files){
        files{ id fileStatus ... on GenericFile { url } }
        userErrors{ field message }
      }
    }`, { files: [{ originalSource: target.resourceUrl, contentType: 'FILE' }] });

  const fce = fc.fileCreate.userErrors;
  if (fce && fce.length) throw new Error(`fileCreate: ${JSON.stringify(fce)}`);
  let file = fc.fileCreate.files[0];

  for (let i = 0; i < 10 && !(file && file.url); i++) {
    await new Promise((res) => setTimeout(res, 1000));
    const q = await gql(env, token, `query($id:ID!){ node(id:$id){ ... on GenericFile { url fileStatus } } }`, { id: file.id });
    file = q.node;
  }
  return (file && file.url) || target.resourceUrl;
}

/* ---- PRICING (provisional — confirm the exact table with Marc) ---- */
const PRINT_RATE = { '5x7': 2.00, 'A6': 2.00, 'RSVP': 1.50 };  // per printed side, batch
const PAPER_FLAT = { '5x7': 1.50, 'A6': 1.20, 'RSVP': 0.90 };  // per sheet (SET-PPR set/10)  — CONFIRM
const PAPER_FOLD = { '5x7': 2.30, 'A6': 1.60, 'RSVP': 1.50 };  // folded prints on 7x10/A5/5x7 — CONFIRM
const ENV_FOR = { '5x7': 'A7', 'A6': 'A6', 'RSVP': 'RSVP' };
const ENV_PRICE = 2.20;    // per envelope (SET-ENV set/10) — CONFIRM
const ADDRESSING = 2.50;   // per piece (SVC-OuterEnv-Addressing)

const money = (n) => n.toFixed(2);

function lineItems(cfg) {
  const size = cfg.size;
  const qty = Math.max(1, parseInt(cfg.quantity, 10) || 1);
  const folded = cfg.fold === 'folded';
  const sides = cfg.sides || (folded ? 2 : 1);   // single- vs double-sided (blank inside = 1)
  const items = [];

  items.push({
    title: `Bliss ${cfg.paperColor} ${size} ${folded ? '(folded sheet)' : 'sheet'}`,
    quantity: qty, originalUnitPrice: money(folded ? PAPER_FOLD[size] : PAPER_FLAT[size]),
    sku: `CARD-PAPER-${size}-${folded ? 'FOLD' : 'FLAT'}`, requiresShipping: true, taxable: true,
  });
  items.push({
    title: `Printing ${size} ${sides === 2 ? 'double-sided' : 'single-sided'} (batch)`,
    quantity: qty * sides, originalUnitPrice: money(PRINT_RATE[size]),
    sku: `SVC-Print-${size}-Batch`, requiresShipping: false, taxable: true,
  });
  if (cfg.envelope && cfg.envelope.on) {
    items.push({
      title: `${cfg.envelope.color} ${ENV_FOR[size]} envelope`, quantity: qty,
      originalUnitPrice: money(ENV_PRICE), sku: `SET-ENV-${cfg.envelope.color}-${ENV_FOR[size]}`,
      requiresShipping: true, taxable: true,
    });
    if (cfg.addressing && cfg.addressing.on) {
      items.push({
        title: 'Envelope addressing', quantity: qty, originalUnitPrice: money(ADDRESSING),
        sku: 'SVC-OuterEnv-Addressing', requiresShipping: false, taxable: true,
      });
    }
  }
  return items;
}

async function createDraftOrder(env, token, cfg, designUrl) {
  const data = await gql(env, token, `
    mutation($input:DraftOrderInput!){
      draftOrderCreate(input:$input){
        draftOrder{ id invoiceUrl }
        userErrors{ field message }
      }
    }`, {
    input: {
      lineItems: lineItems(cfg),
      note: `Card Studio order — ${cfg.name || 'card'}`,
      tags: ['card-studio'],
      customAttributes: [
        { key: 'Design PDF', value: designUrl },
        { key: 'Card', value: `${cfg.size} ${cfg.fold} ${cfg.orientation} · ${cfg.paperColor}` },
        { key: 'Sides', value: String(cfg.sides || (cfg.fold === 'folded' ? 2 : 1)) },
      ],
    },
  });
  const e = data.draftOrderCreate.userErrors;
  if (e && e.length) throw new Error(`draftOrder: ${JSON.stringify(e)}`);
  return data.draftOrderCreate.draftOrder;
}

function corsHeaders(env) {
  return {
    'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export default {
  async fetch(req, env) {
    const h = corsHeaders(env);
    if (req.method === 'OPTIONS') return new Response(null, { headers: h });
    const url = new URL(req.url);

    if (req.method === 'POST' && url.pathname === '/order') {
      try {
        const body = await req.json(); // { name, pdfBase64, config }
        const bytes = Uint8Array.from(atob(body.pdfBase64), (c) => c.charCodeAt(0));
        const token = await getToken(env);
        const filename = (body.name || 'bliss-studio-card').replace(/[^a-z0-9-]+/gi, '-') + '.pdf';
        const designUrl = await uploadPdf(env, token, bytes, filename);
        const draft = await createDraftOrder(env, token, { ...body.config, name: body.name }, designUrl);
        return new Response(JSON.stringify({ ok: true, checkoutUrl: draft.invoiceUrl, designUrl }),
          { headers: { ...h, 'Content-Type': 'application/json' } });
      } catch (err) {
        return new Response(JSON.stringify({ ok: false, error: String(err) }),
          { status: 500, headers: { ...h, 'Content-Type': 'application/json' } });
      }
    }
    return new Response('Card Studio Backend — POST /order', { headers: h });
  },
};
