import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Wallet, Bitcoin, Coins, Bot, Zap, Globe2, ShieldCheck, Smartphone, CreditCard, PiggyBank, Send } from "lucide-react";
import { Seo, breadcrumb } from "../lib/seo";

const groups = [
  {
    eyebrow: "Payments",
    title: "Move money like air.",
    items: [
      { i: Send, t: "Instant P2P", d: "Send to anyone — wallet to wallet — in seconds." },
      { i: CreditCard, t: "Titanium Card", d: "A physical and virtual card that spends from any balance." },
      { i: Globe2, t: "30+ currencies", d: "Hold and spend AED, USD, EUR, GBP and more — natively." },
    ],
  },
  {
    eyebrow: "Wealth",
    title: "Build, in every asset.",
    items: [
      { i: Coins, t: "24K Digital Gold", d: "Dubai-vaulted, insured, redeemable as physical bars." },
      { i: Bitcoin, t: "Crypto Custody", d: "Institutional-grade custody for BTC, ETH and majors." },
      { i: PiggyBank, t: "Smart Savings", d: "Auto-save rules that compound quietly in the background." },
    ],
  },
  {
    eyebrow: "Intelligence",
    title: "Billy is always on.",
    items: [
      { i: Bot, t: "Adaptive Budgets", d: "Budgets that learn and reshape themselves around your life." },
      { i: Zap, t: "Forecasting", d: "90-day cashflow forecasts with confidence bands." },
      { i: ShieldCheck, t: "Fraud Watch", d: "Anomalies caught in milliseconds — paused before they ship." },
    ],
  },
];

export default function Features() {
  return (
    <>
      <Seo
        title="Features — Shoho Pay | Wallet, Crypto, Gold & AI Finance"
        description="Explore Shoho Pay's full capability set: multi-currency wallet, crypto custody, digital gold, AI assistant Billy, and bank-grade security."
        path="/features"
        jsonLd={breadcrumb([{ name: "Home", path: "/" }, { name: "Features", path: "/features" }])}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: "Shoho Pay",
          description: "UAE digital wallet with multi-currency payments, crypto, gold and AI assistant.",
          brand: { "@type": "Brand", name: "Shoho Pay" },
        })}</script>
      </Helmet>

      <section className="relative pt-36 pb-16 md:pt-44">
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-hero" />
        <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
          <span className="inline-flex items-center gap-2 rounded-full hairline px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-glow">
            <span className="h-1.5 w-1.5 rounded-full bg-glow shadow-[0_0_10px_currentColor]" /> Capabilities
          </span>
          <h1 className="font-display mt-5 text-balance text-5xl font-semibold leading-[1.02] text-gradient-silver md:text-7xl">
            One app. <span className="text-gradient-blue">Every capability.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-silver/80 md:text-lg">
            Three pillars — payments, wealth, intelligence — woven into the calmest financial experience in the UAE.
          </p>
        </div>
      </section>

      {groups.map((g, gi) => (
        <section key={g.title} className="relative py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <div className="text-[11px] uppercase tracking-[0.2em] text-glow">{g.eyebrow}</div>
              <h2 className="font-display mt-3 text-3xl font-semibold text-gradient-silver md:text-5xl">{g.title}</h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {g.items.map((it) => (
                <article key={it.t} className="h-full rounded-3xl glass-card p-7">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-glow/10 text-glow"><it.i className="h-5 w-5" /></div>
                  <h3 className="font-display mt-5 text-lg font-semibold text-snow">{it.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-silver/75">{it.d}</p>
                </article>
              ))}
            </div>
          </div>
          {gi < groups.length - 1 && <div className="mx-auto mt-12 h-px max-w-3xl bg-white/[0.05]" />}
        </section>
      ))}

      <section className="py-24 text-center">
        <Link to="/waitlist" className="inline-flex items-center gap-2 rounded-full bg-glow px-7 py-4 text-sm font-medium text-white shadow-[0_14px_40px_-10px_rgba(45,127,255,0.7)] hover:bg-glow/90">
          Join the Waitlist <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </>
  );
}
