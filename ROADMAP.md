# Bliss Studio — Roadmap

Bliss Studio (`studio.blisscottonpaper.com`) is the home for Bliss's free browser
tools. This captures the direction discussed; it is a plan, not a commitment to
dates. Only Card Studio v1 is built today.

**The one canonical Studio hub is the Shopify page** `blisscottonpaper.com/pages/studio`
(edited via the Admin API, not this repo). `studio.blisscottonpaper.com/` used to
also serve its own duplicate hub page (`index.html` in this repo) that drifted out
of sync and confused navigation (logo/nav links bounced back to the stale
Cloudflare copy instead of the real hub). Fixed: that file is deleted, `/` now
301-redirects to the Shopify hub (`_redirects`), and every tool's logo/nav links
point straight at `https://blisscottonpaper.com/pages/studio`. Don't recreate a
hub page in this repo — edit the Shopify page instead.

## Vision
Bliss Studio becomes the single hub for all Bliss tools. The "Tools" area on the
main `blisscottonpaper.com` site is retired and folded into Studio — Studio is
the top-of-list destination, and the main site links out to it.

## Two flagship products
1. **Card Studio** *(live — v1)* — thank-you notes, birthday, quick notes.
2. **Wedding / Invitation Studio** *(planned, flagship)* — invitations plus the
   full suite: save-the-dates, day-of stationery (programs, menus, place cards,
   table numbers, signage), with designed templates.

## Tools to live under Studio
- **Card Studio** — live.
- **File Prep** *(live)* — `studio.blisscottonpaper.com/file-prep/`. Background
  removal (chroma-key, same algorithm as Card Studio's upload step) and
  flatten-to-black for foil/white-ink/letterpress die prep (e.g. Boxcar Press).
  Client-side only, no ML/API cost.
- **Envelope Studio** — exists on the main Shopify site (`/pages/envelope-studio`);
  bring it under Studio. Its font system (42 fonts across 9 moods) already powers
  Card Studio's font picker.
- **QR Code generator** — pull in / build. Pairs naturally with printed
  stationery (link to a wedding site, registry, RSVP, or a Card Studio card).
- **Palette Selector** *(coming soon — card live on the hub)* — pick paper,
  envelope, and ink colors that pair well together.
- **Invitation Studio / Wedding Studio** — flagship (see above).
- **Day-Of Studio** — day-of wedding/event stationery (may live inside the
  Wedding Studio rather than standalone).

## Cross-cutting
- **Post-purchase upsell** — point wedding/invitation buyers to Card Studio for
  matching thank-you cards (order-status link + post-purchase email to start).
- **Shared shell** — one header/nav/footer + brand system across every tool so
  the suite reads as one product. Card Studio's shell is the current reference.
- **Templates** — a growing, well-designed template library, especially for the
  wedding suite.

## Status
| Tool | Status |
|---|---|
| Card Studio | Live (v1) |
| File Prep | Live |
| Envelope Studio | On main site; to migrate under Studio |
| QR Code generator | Planned |
| Palette Selector | Planned (card live on hub as "coming soon") |
| Invitation / Wedding Studio | Planned (flagship) |
| Day-Of Studio | Planned |
| Retire main-site Tools → Studio | Planned |
| Post-purchase upsell | Planned |

## Real-SKU linking (in progress)
Card Studio's checkout still points at 5 placeholder products (`card-studio`
tag), not the real per-color paper/envelope products. Plan: add a **Format**
option (`Set of 10` / `Single Sheet`) to each real paper/envelope product,
with the Single Sheet variant priced at exactly 1/10 the pack price and
inventory-untracked (so it can't block a Card Studio order). Piloted
successfully on **Ivory 300gsm Handmade Cotton Paper** (deckle) — 5 variants
added (5x7 $1.50, A6 $1.20, RSVP $0.90, 7x10 $2.30, A5 $1.60), zero errors.
Paused for confirmation before rolling out to the remaining ~29 products
(8 more paper colors, Ivory/White cut-edge, Ivory/White gold-trim, 20
envelope colors) and rewiring Card Studio's `VARIANTS` to the real IDs.

**Open question:** Ivory & White "Gold Trim" (gilded edge) paper already
exist as real products (5x7/4x9/A6/RSVP/Table, no fold sizes) but show
**0 inventory** on every variant — needs a restock, or isn't in production
yet. Confirm before wiring gold-edge into Card Studio.

## Checkout architecture (decided)
Card Studio checkout uses the **native Shopify cart** — no custom backend:
- Card Studio stays on `studio.blisscottonpaper.com` (Cloudflare Pages).
- "Order these cards" submits a real form (full navigation, so cross-origin is
  fine) to `blisscottonpaper.com/cart/add`, carrying the printing line item +
  the design PDF as a native `properties[Design File]` file upload.
- `return_to` lands on a small dedicated Shopify page, `/pages/card-studio-finish`,
  which adds the remaining items (paper, envelope, addressing) via `/cart/add.js`
  (same-origin there) and redirects to `/cart`.
- 5 new Shopify products back this (`card-studio` tag): Card Studio Paper —
  Flat/Folded, Card Studio Printing, Card Studio Envelope, Card Studio Envelope
  Addressing. Prices mirror the Zoho SVC-* rates Marc confirmed.
- This replaced an earlier Worker + Shopify Draft Order + OAuth design, dropped
  because the Dev Dashboard's client-credentials/app-install flow was
  unreliable (`app_not_installed` even from the same org) and added a
  dependency with nothing to gain — checkout was never going to use the
  storefront cart under that design anyway. `backend/` (the Worker) and
  `card-studio.css/js/page.html` (an earlier Shopify-embedded build) are left
  in the repo unused in case a backend is needed for something else later
  (e.g. Day-Of Studio's CSV variable printing).

**Known limitation:** the 5 new Card Studio products are *not* inventory-tracked
and are separate from the retail "Set of 10" paper/envelope products, so a
Card Studio order does not draw down the real paper/envelope stock counts.
Fine for v1; revisit if/when accurate inventory reconciliation matters.

**Live-tested end-to-end on the real store (2026-08-03)** — Marc ran a real
$0 (100%-off coupon) order for 1 Ivory card. Checkout, the design-file
upload, and the cart all worked correctly.

## Backlog / polish (added)
- **SEO** — set title/meta on remaining pages; add descriptive copy/FAQ to tool
  pages (they're JS-heavy); Product/structured data; image alt text; internal
  linking once Studio is in the nav. Run the Ahrefs audit (DR, organic keywords,
  top pages, technical issues) and prioritize from real data.
- **Theme footer cleanup** — remove the empty link column (block points at an
  empty menu), fix low-contrast navy footer text, and reduce excess padding/height.
  (Live-theme edit — do in Theme editor, or via an unpublished duplicate + publish.)
