# Card Studio Backend (Cloudflare Worker)

Headless backend for Card Studio checkout + fulfillment. Not part of the Pages
site — deploy it separately as a Worker.

## What it does
`POST /order` with `{ name, pdfBase64, config }`:
1. Uploads the design PDF to **Shopify Files**.
2. Creates a **Shopify Draft Order** (paper + printing + optional envelope +
   optional addressing) with the design URL attached as an order attribute.
3. Returns `{ checkoutUrl }` — the front-end redirects the customer there to pay.

On payment the design URL is on the order, so it appears in the standard Shopify
new-order email to info@ (no separate email system needed).

## Auth
Client-credentials grant (server-to-server, no redirect). The Shopify app
"Card Studio Backend" must be installed on the Bliss store and in the same org.

## Deploy
```
cd backend
wrangler secret put SHOPIFY_CLIENT_ID       # paste Client ID   (from app Settings → Credentials)
wrangler secret put SHOPIFY_CLIENT_SECRET   # paste Client Secret
wrangler deploy
```
`wrangler deploy` prints the Worker URL (e.g. https://card-studio-backend.<subdomain>.workers.dev).
Send that URL over and I'll wire the Card Studio "Order" button to it.

## Before it's live — two things to confirm
1. **Pricing** — the `PRICING` block in `worker.js` is provisional (paper per-sheet,
   envelope, addressing). Confirm the exact numbers.
2. **API field check** — first deploy may surface `userErrors` if the
   DraftOrderLineItemInput price field or FileCreate enums differ on the pinned
   `API_VERSION`; easy adjustments, but they need a live test call.

## Vars vs secrets
- `wrangler.toml [vars]`: SHOP, ALLOWED_ORIGIN, API_VERSION (public).
- Secrets: SHOPIFY_CLIENT_ID, SHOPIFY_CLIENT_SECRET (never in the repo).
