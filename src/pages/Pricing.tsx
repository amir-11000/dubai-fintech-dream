import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Seo, breadcrumb } from "../lib/seo";

const plans = [
  { n: "Lite", p: "Free", d: "Everything you need to start.", f: ["Multi-currency wallet", "Send & receive", "Billy AI · essentials", "Free gold storage"], cta: "Start free" },
  { n: "Plus", p: "AED 29", s: "/mo", d: "For people who move money seriously.", f: ["Real interbank FX", "Zero-fee gold vault", "Crypto · priority spreads", "Billy AI · forecasting", "Higher transfer limits"], cta: "Go Plus", featured: true },
  { n: "Private", p: "AED 199", s: "/mo", d: "Concierge-grade finance.", f: ["Dedicated relationship manager", "Bespoke AI playbooks", "Lowest spreads", "Priority custody & support", "Invite-only events"], cta: "Apply" },
];

const compare = [
  ["Multi-currency wallet", "•", "•", "•"],
  ["Real interbank FX", "—", "•", "•"],
  ["Gold vault fees", "Standard", "Zero", "Zero"],
  ["Crypto custody", "•", "Priority", "Institutional"],
  ["Billy AI", "Essentials", "Forecasting", "Bespoke"],
  ["Transfer limits", "Standard", "Higher", "Custom"],
  ["Relationship manager", "—", "—", "•"],
];

export default function Pricing() {
  return (
    <>
      <Seo
        title="Pricing — Shoho Pay | Free, Plus & Private Plans"
        description="Simple, transparent pricing for Shoho Pay. Start free, upgrade to Plus for serious money movers, or apply for Private — concierge-grade finance."
        path="/pricing"
        jsonLd={breadcrumb([{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }])}
      />

      <section className="relative pt-36 pb-12 text-center md:pt-44">
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-hero" />
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="font-display text-balance text-5xl font-semibold leading-[1.02] text-gradient-silver md:text-7xl">
            Simple plans.<br /><span className="text-gradient-blue">No surprises.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-silver/80 md:text-lg">Pay only for what you use. Cancel anytime — no exit fees, ever.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 md:grid-cols-3 md:px-10">
          {plans.map((pl) => (
            <div key={pl.n} className={`relative h-full rounded-3xl p-8 ${pl.featured ? "glass-strong border-glow/40 glow-blue" : "glass-card"}`}>
              {pl.featured && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-glow px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">Most popular</span>}
              <div className="font-display text-sm uppercase tracking-[0.18em] text-silver/70">{pl.n}</div>
              <div className="mt-4 flex items-baseline gap-1">
                <div className="font-display text-5xl font-semibold text-snow">{pl.p}</div>
                {pl.s && <div className="text-sm text-silver/60">{pl.s}</div>}
              </div>
              <p className="mt-2 text-sm text-silver/75">{pl.d}</p>
              <ul className="mt-6 space-y-2.5 text-sm text-silver">
                {pl.f.map((f) => <li key={f} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-glow" /> {f}</li>)}
              </ul>
              <Link to="/waitlist" className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition ${pl.featured ? "bg-glow text-white hover:bg-glow/90" : "glass text-snow hover:bg-white/10"}`}>{pl.cta} <ArrowRight className="h-4 w-4" /></Link>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <h2 className="font-display text-center text-3xl font-semibold text-gradient-silver md:text-4xl">Compare plans</h2>
          <div className="mt-10 overflow-hidden rounded-3xl glass-card">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06] text-left">
                  <th className="p-4 text-silver/70"></th>
                  {plans.map(p => <th key={p.n} className="p-4 font-display text-snow">{p.n}</th>)}
                </tr>
              </thead>
              <tbody>
                {compare.map((r, i) => (
                  <tr key={i} className="border-b border-white/[0.04] last:border-0">
                    {r.map((c, j) => <td key={j} className={`p-4 ${j === 0 ? "text-silver/80" : "text-snow"}`}>{c}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
