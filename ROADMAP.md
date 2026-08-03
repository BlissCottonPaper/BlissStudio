# Bliss Studio — Roadmap

Bliss Studio (`studio.blisscottonpaper.com`) is the home for Bliss's free browser
tools. This captures the direction discussed; it is a plan, not a commitment to
dates. Only Card Studio v1 is built today.

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
- **Envelope Studio** — exists on the main Shopify site (`/pages/envelope-studio`);
  bring it under Studio. Its font system (42 fonts across 9 moods) already powers
  Card Studio's font picker.
- **QR Code generator** — pull in / build. Pairs naturally with printed
  stationery (link to a wedding site, registry, RSVP, or a Card Studio card).
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
| Envelope Studio | On main site; to migrate under Studio |
| QR Code generator | Planned |
| Invitation / Wedding Studio | Planned (flagship) |
| Day-Of Studio | Planned |
| Retire main-site Tools → Studio | Planned |
| Post-purchase upsell | Planned |

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

**Not yet live-tested end-to-end on the real store** — the build is verified
via headless mocks (correct variant IDs/quantities, real PDF attached, the
finishing page adds all items and reaches /cart). Marc should run one real
test order before pointing customers at it.

## Backlog / polish (added)
- **SEO** — set title/meta on remaining pages; add descriptive copy/FAQ to tool
  pages (they're JS-heavy); Product/structured data; image alt text; internal
  linking once Studio is in the nav. Run the Ahrefs audit (DR, organic keywords,
  top pages, technical issues) and prioritize from real data.
- **Theme footer cleanup** — remove the empty link column (block points at an
  empty menu), fix low-contrast navy footer text, and reduce excess padding/height.
  (Live-theme edit — do in Theme editor, or via an unpublished duplicate + publish.)
