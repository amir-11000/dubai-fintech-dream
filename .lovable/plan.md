# Billy Pay — Rebrand + Billy AI Layer

Keep the current Vite + React Router + Tailwind v3 codebase. Rebrand DirhamPay → Billy Pay, then add the full Billy AI accountant system and an authenticated `/app/*` shell on top of existing pages.

## 1. Backend prep
- Enable Lovable Cloud (needed for an edge function that holds `LOVABLE_API_KEY`).
- Provision `LOVABLE_API_KEY` and create one edge function `ask-billy` that proxies to the Lovable AI Gateway (`google/gemini-3-flash-preview`) with CORS, 429/402 handling.

## 2. State + intelligence (no real backend, mock data)
- `src/lib/mock-data.ts` — `Transaction` type + seed transactions, balances, prices.
- `src/lib/store.tsx` — React context store: `authed`, `user`, `balances` (AED/USD/EUR/GBP/GOLD/BTC/ETH/SOL), live-ticking `prices`, `transactions`, `savingsAED`, `netWorthAED`, `budget`, `goals`, `insights`, `chat`. Reducer + helpers: `send`, `convert`, `buyGold/sellGold`, `buyCrypto/sellCrypto`, `topUp`, `moveToSavings`, `executeBillyAction`, insight dismiss/mark-read.
- `src/lib/billy.ts` — types (`Insight`, `InsightAction`, `Budget`, `BudgetCategory`, `Goal`, `ChatMsg`), `categorize`, `monthSpend`, `paceAnalysis`, `detectInsights`, `buildBillyContext`, `BILLY_SYSTEM_PROMPT`.
- `src/lib/format.ts` — AED/number/percent formatters.

## 3. Billy UI primitives
- `src/components/billy/BillyMark.tsx` — gold "B" tile, optional pulse.
- `src/components/billy/BillyFab.tsx` — fixed bottom-right floating button on all `/app/*` routes, gold pulse when unread insights exist, links to `/app/billy`.
- `src/components/billy/InsightCard.tsx` — severity badge, body, CTAs wired to `executeBillyAction`, dismiss.
- `src/components/Live.tsx` — `LiveNumber` (flashes green/red on tick), `MarketStrip`.
- `src/components/TxRow.tsx` — transaction row with "via Billy" tag.

## 4. App shell + routes
- `src/components/AppShell.tsx` — top nav + bottom mobile nav + `MarketStrip` + `<Outlet/>` + mounts `BillyFab`. Wraps all `/app/*` routes; redirects to `/signin` when not authed (mock).
- New routes under `/app`:
  - `/app` Dashboard — balances, market strip, top 3 insight cards, recent txs, quick actions.
  - `/app/billy` Billy Hub — chat (calls `ask-billy` edge function with full context), all insight cards, budget setup form, goals list/add.
  - `/app/wallets` — multi-currency cards.
  - `/app/send` — peer transfer form → creates `send` tx.
  - `/app/convert` — FX between currencies → creates `fx` tx (reuse existing Exchange logic).
  - `/app/transactions` — full list with category filter chips.
  - `/app/cards` — virtual/physical card UI mock.
  - `/app/savings` — vault with deposit/withdraw → `savings_in/out` txs.
  - `/app/gold` — reuse existing Gold buy/sell logic, wire to store.
  - `/app/crypto` — reuse existing Crypto, wire to store.
  - `/app/profile` — name, tier, language.
- `src/App.tsx` — keep public routes (`/`, `/signin`, `/signup`, `/contact`, `/early-access`, `/watch-demo`); nest `/app/*` under `AppShell`.

## 5. Rebrand
- `src/Home.tsx` — Billy-first hero ("The first AI accountant inside a wallet"), 3-step storyline (Set budget → Billy observes → Auto-execute), scene cards (Alert / Surplus / Ask / Overbudget) using `BillyMark` + `BillySays` highlight. Replace DIRHAMPAY wordmark with "Billy Pay" everywhere (Nav, Footer, hero, meta, `index.html` title).
- Keep gold accent for Billy only; reuse existing dark glass aesthetic.

## 6. Out of scope (mocked / not built now)
- Real auth (mock `authed` flag in store; sign-in still sets it and redirects to `/app`).
- Real persistence (no Supabase tables — only the AI edge function uses Cloud).
- Per-symbol crypto detail page (`/app/crypto/$symbol`) — single page only.
- Multilingual UI (Billy still replies in user's language because it's the model's job).

## Technical notes
- Tailwind v3 stays; no migration to v4/oklch. Keep current `glass`, `text-gradient-*`, `glow`, `gold` tokens; add a `--gold` accent utility if missing.
- Edge function path: `supabase/functions/ask-billy/index.ts`. Client calls via `supabase.functions.invoke('ask-billy', { body: { messages, context } })`.
- Store persisted to `localStorage` so refresh keeps mock balances/budget/insights.
- All existing public marketing pages (Contact, EarlyAccess, WatchDemo) keep working under new brand.

## File map (new + edited)
```
src/
  App.tsx                              (edit: nest /app/* under AppShell)
  Home.tsx                             (edit: Billy-first rebrand)
  index.css                            (edit: add gold + billy tokens)
  lib/
    mock-data.ts                       (new)
    store.tsx                          (new)
    billy.ts                           (new)
    format.ts                          (new)
    supabase.ts                        (new — client)
  components/
    AppShell.tsx                       (new)
    Live.tsx                           (new)
    TxRow.tsx                          (new)
    billy/BillyMark.tsx                (new)
    billy/BillyFab.tsx                 (new)
    billy/InsightCard.tsx              (new)
  pages/
    app/Dashboard.tsx                  (new)
    app/Billy.tsx                      (new)
    app/Wallets.tsx                    (new)
    app/Send.tsx                       (new)
    app/Convert.tsx                    (new — wraps Exchange logic)
    app/Transactions.tsx               (new)
    app/Cards.tsx                      (new)
    app/Savings.tsx                    (new)
    app/Profile.tsx                    (new)
    app/GoldPage.tsx                   (new — store-wired)
    app/CryptoPage.tsx                 (new — store-wired)
supabase/functions/ask-billy/index.ts  (new)
index.html                             (edit: title/meta)
```

Heads-up: this is a large single build (~15 new files, full state layer, edge function, full rebrand). I'll ship it in one pass then we can iterate on polish.
