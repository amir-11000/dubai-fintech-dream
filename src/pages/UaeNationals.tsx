import { ReactNode, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Percent, Sparkles, Headphones, Gauge, Gift, Globe2,
  ArrowRight, Crown, ShieldCheck, MapPin, CheckCircle2, Users,
} from "lucide-react";

/* ------------------------------------------------------------------ */
const Container = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`mx-auto w-full max-w-7xl px-6 md:px-10 ${className}`}>{children}</div>
);

const Eyebrow = ({ children, tone = "gold" }: { children: ReactNode; tone?: "blue" | "gold" }) => (
  <span className={`inline-flex items-center gap-2 rounded-full hairline px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] ${tone === "gold" ? "text-gold" : "text-glow"}`}>
    <span className={`h-1.5 w-1.5 rounded-full ${tone === "gold" ? "bg-gold" : "bg-glow"} shadow-[0_0_10px_currentColor]`} />
    {children}
  </span>
);

const Reveal = ({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
    className={className}
  >{children}</motion.div>
);

/* ------------------------------------------------------------------ */
const BENEFITS = [
  { icon: Percent,    title: "Reduced Transaction Fees", body: "Preferential pricing across selected ShohoPay services." },
  { icon: Sparkles,   title: "Priority Feature Access",  body: "Early access to new platform features and services." },
  { icon: Headphones, title: "Premium Support",          body: "Enhanced customer support experience." },
  { icon: Gauge,      title: "Higher Transaction Limits",body: "Increased flexibility for qualified customers." },
  { icon: Gift,       title: "Exclusive Partner Rewards",body: "Special offers available through ShohoPay partners." },
  { icon: Globe2,     title: "Future GCC Benefits",      body: "Additional benefits as ShohoPay expands across the GCC." },
];

const TRUST_FLOW = [
  "UAE Nationals", "Local Adoption", "Community Trust",
  "Resident Adoption", "Business Adoption", "Regional Growth",
];

const ROADMAP = [
  { phase: "Phase 1", items: [{ flag: "🇦🇪", name: "United Arab Emirates" }], status: "active" as const },
  { phase: "Phase 2", items: [{ flag: "🇸🇦", name: "Saudi Arabia" }],         status: "next"   as const },
  {
    phase: "Phase 3",
    items: [
      { flag: "🇶🇦", name: "Qatar" },
      { flag: "🇰🇼", name: "Kuwait" },
      { flag: "🇧🇭", name: "Bahrain" },
      { flag: "🇴🇲", name: "Oman" },
    ],
    status: "soon" as const,
  },
];

/* ------------------------------------------------------------------ */
export default function UaeNationals() {
  useEffect(() => { document.title = "UAE Nationals Program · Shoho Pay"; }, []);

  return (
    <div className="relative isolate overflow-hidden">
      {/* HERO */}
      <section className="relative pt-32 md:pt-44">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-lines opacity-[0.25]" />
          <div className="absolute -top-40 left-1/2 h-[700px] w-[1100px] -translate-x-1/2 rounded-full"
               style={{ background: "radial-gradient(closest-side, rgba(201,168,76,0.18), transparent 70%)" }} />
          <div className="absolute left-[-10%] top-32 h-[400px] w-[400px] rounded-full"
               style={{ background: "radial-gradient(closest-side, rgba(45,127,255,0.18), transparent 70%)" }} />
        </div>
        <Container className="relative grid items-center gap-14 pb-20 md:grid-cols-2 md:pb-28">
          <Reveal>
            <Eyebrow>UAE Nationals Program</Eyebrow>
            <h1 className="font-display mt-5 text-balance text-5xl font-semibold leading-[1.02] text-gradient-silver md:text-7xl">
              Built for the <span className="text-gradient-gold">UAE.</span> <br />
              Designed for the <span className="text-gradient-blue">GCC.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-silver/80 md:text-lg">
              Exclusive benefits created to reward and support the local community. A premium experience for UAE Nationals,
              delivered through a modern fintech platform with ShohoPay's signature private banking feel.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/waitlist" className="group inline-flex items-center gap-1.5 rounded-full bg-gold-grad px-5 py-3 text-sm font-medium text-ink shadow-[0_8px_30px_-8px_rgba(201,168,76,0.6)] transition hover:opacity-95">
                Claim Your Benefits <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
              <Link to="/contact" className="rounded-full glass px-5 py-3 text-sm text-snow hover:bg-white/10">
                Talk to our UAE Team
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-6 text-[11px] uppercase tracking-[0.22em] text-silver/60">
              <span className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-gold" /> Built in Dubai</span>
              <span className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-gold" /> Central Bank Aligned</span>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <PassportVisual />
          </Reveal>
        </Container>
      </section>

      {/* BENEFITS */}
      <section className="relative py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow tone="blue">UAE National Benefits</Eyebrow>
            <h2 className="font-display mt-5 text-balance text-4xl font-semibold text-gradient-silver md:text-6xl">
              Rewards for the home market.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base text-silver/75 md:text-lg">
              A growing suite of advantages — financial, experiential, and partner-led — built specifically for UAE Nationals.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.05}>
                <div className="group relative h-full overflow-hidden rounded-3xl glass-strong p-6 transition hover:-translate-y-1 hover:border-gold/40">
                  <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition group-hover:opacity-100"
                       style={{ background: "radial-gradient(400px circle at 50% 0%, rgba(201,168,76,0.12), transparent 60%)" }} />
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-gold/30 to-gold/5 hairline">
                    <b.icon className="h-5 w-5 text-gold" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-snow">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-silver/75">{b.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* WHY THIS MATTERS */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-[700px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full"
               style={{ background: "radial-gradient(closest-side, rgba(45,127,255,0.10), transparent 70%)" }} />
        </div>
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Why This Matters</Eyebrow>
            <h2 className="font-display mt-5 text-balance text-4xl font-semibold text-gradient-silver md:text-5xl">
              Local trust. Regional growth.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base text-silver/75 md:text-lg">
              Strong local adoption creates trust, credibility, and long-term ecosystem growth. As more UAE Nationals
              use ShohoPay, adoption naturally expands among residents, businesses, and international users.
            </p>
          </div>

          <div className="mt-14 grid items-stretch gap-4 md:grid-cols-6">
            {TRUST_FLOW.map((step, i) => (
              <Reveal key={step} delay={i * 0.06}>
                <div className="flex h-full flex-col items-center rounded-3xl glass p-5 text-center hairline">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-gold to-gold/40 font-display text-sm font-semibold text-ink">
                    {i + 1}
                  </div>
                  <div className="mt-4 font-display text-sm font-semibold text-snow">{step}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* GCC ROADMAP */}
      <section className="relative py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow tone="gold">GCC Expansion Roadmap</Eyebrow>
            <h2 className="font-display mt-5 text-balance text-4xl font-semibold text-gradient-silver md:text-6xl">
              One region. One financial home.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {ROADMAP.map((p, i) => (
              <Reveal key={p.phase} delay={i * 0.08}>
                <div className="relative h-full overflow-hidden rounded-3xl p-6 hairline"
                     style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.06), rgba(255,255,255,0.01) 60%)" }}>
                  <div className="absolute right-[-40px] top-[-40px] h-32 w-32 rounded-full"
                       style={{ background: p.status === "active"
                         ? "radial-gradient(closest-side, rgba(201,168,76,0.25), transparent 70%)"
                         : "radial-gradient(closest-side, rgba(45,127,255,0.18), transparent 70%)" }} />
                  <div className="flex items-center justify-between">
                    <div className="text-[11px] uppercase tracking-[0.22em] text-silver/60">{p.phase}</div>
                    <span className={`rounded-full px-2.5 py-1 text-[10px] uppercase tracking-widest ${
                      p.status === "active" ? "bg-gold/15 text-gold" :
                      p.status === "next"   ? "bg-glow/15 text-glow" :
                                              "bg-white/5 text-silver/70"
                    }`}>
                      {p.status === "active" ? "Live" : p.status === "next" ? "Next" : "Coming Soon"}
                    </span>
                  </div>
                  <div className="mt-6 space-y-3">
                    {p.items.map((c) => (
                      <div key={c.name} className="flex items-center gap-3 rounded-2xl bg-white/[0.03] p-3 hairline">
                        <span className="text-2xl leading-none">{c.flag}</span>
                        <span className="font-display text-sm font-medium text-snow">{c.name}</span>
                        {p.status === "active" && <CheckCircle2 className="ml-auto h-4 w-4 text-gold" />}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* STRATEGIC ADVANTAGE */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <Container className="grid items-center gap-14 md:grid-cols-2">
          <Reveal>
            <Eyebrow tone="blue">Strategic Advantage</Eyebrow>
            <h2 className="font-display mt-5 text-balance text-4xl font-semibold text-gradient-silver md:text-5xl">
              Most fintechs are built for everyone. <br />
              <span className="text-gradient-gold">We're built for here.</span>
            </h2>
            <p className="mt-5 text-silver/80">
              ShohoPay is built specifically for the UAE and GCC market. By combining local benefits, VIP banking
              experiences, dedicated relationship managers, AI-powered financial tools, and premium customer service,
              ShohoPay aims to become the preferred financial ecosystem for the GCC.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                { icon: Crown,  label: "Private banking standards" },
                { icon: Users,  label: "Local-first community" },
                { icon: Globe2, label: "GCC-wide ambition" },
                { icon: ShieldCheck, label: "Regulator-aligned" },
              ].map((f) => (
                <div key={f.label} className="flex items-center gap-3 rounded-xl bg-white/[0.03] p-3 hairline">
                  <f.icon className="h-4 w-4 text-gold" />
                  <span className="text-sm text-silver/85">{f.label}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <GccGlobeVisual />
          </Reveal>
        </Container>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full"
               style={{ background: "radial-gradient(closest-side, rgba(201,168,76,0.18), transparent 70%)" }} />
        </div>
        <Container className="text-center">
          <Reveal>
            <h2 className="font-display text-balance text-4xl font-semibold text-gradient-silver md:text-6xl">
              One App. One Wallet. <br /> One Relationship. <span className="text-gradient-gold">Built for the GCC.</span>
            </h2>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link to="/waitlist" className="group inline-flex items-center gap-1.5 rounded-full bg-gold-grad px-6 py-3 text-sm font-medium text-ink shadow-[0_10px_40px_-10px_rgba(201,168,76,0.7)] transition hover:opacity-95">
                Join the Program <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
              <Link to="/contact" className="rounded-full glass px-6 py-3 text-sm text-snow hover:bg-white/10">
                Speak with our UAE Team
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
const PassportVisual = () => (
  <div className="relative mx-auto aspect-[1.586/1] w-full max-w-md [perspective:1200px]">
    <motion.div
      initial={{ rotateX: -8, rotateY: -10, opacity: 0 }}
      animate={{ rotateX: -4, rotateY: -6, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformStyle: "preserve-3d" }}
      className="relative h-full w-full rounded-3xl p-7"
    >
      <div className="absolute inset-0 overflow-hidden rounded-3xl"
           style={{
             background: "linear-gradient(135deg, #050b18 0%, #0a1830 35%, #050b18 70%, #0a1830 100%)",
             border: "1px solid rgba(201,168,76,0.35)",
             boxShadow: "inset 0 1px 0 rgba(255,255,255,0.10), 0 30px 80px -20px rgba(0,0,0,0.8), 0 0 80px -10px rgba(45,127,255,0.4)",
           }} />
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <div className="absolute -inset-x-1 -top-1/3 h-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent shimmer" />
      </div>
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <div className="font-display text-[10px] tracking-[0.4em] text-gold">UAE NATIONALS</div>
            <div className="mt-1 font-display text-xl font-semibold tracking-[0.3em] text-snow">SHOHO PAY</div>
          </div>
          <div className="text-2xl leading-none">🇦🇪</div>
        </div>
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <div className="text-[9px] uppercase tracking-widest text-silver/60">Member</div>
            <div className="font-display text-sm tracking-[0.18em] text-snow/90">EMIRATI · NATIONAL</div>
          </div>
          <div className="text-right">
            <div className="text-[9px] uppercase tracking-widest text-silver/60">Status</div>
            <div className="text-xs text-gold">ACTIVE</div>
          </div>
        </div>
      </div>
    </motion.div>
    <div className="pointer-events-none absolute -bottom-10 left-1/2 h-10 w-[80%] -translate-x-1/2 rounded-[100%] blur-2xl"
         style={{ background: "rgba(45,127,255,0.35)" }} />
  </div>
);

const GccGlobeVisual = () => (
  <div className="relative mx-auto aspect-square w-full max-w-md">
    <div className="absolute inset-0 rounded-full hairline"
         style={{ background: "radial-gradient(circle at 30% 30%, rgba(45,127,255,0.25), transparent 60%), radial-gradient(circle at 70% 70%, rgba(201,168,76,0.18), transparent 60%), #0A0A0B" }} />
    {[0, 1, 2].map((r) => (
      <div key={r}
           className="absolute inset-0 rounded-full border border-white/[0.06]"
           style={{ transform: `scale(${0.5 + r * 0.25})` }} />
    ))}
    <div className="absolute inset-0 grid place-items-center">
      <div className="text-center">
        <div className="font-display text-4xl font-semibold text-gradient-gold">GCC</div>
        <div className="mt-1 text-[10px] uppercase tracking-[0.3em] text-silver/60">One Ecosystem</div>
      </div>
    </div>
    {[
      { flag: "🇦🇪", top: "8%",  left: "44%" },
      { flag: "🇸🇦", top: "30%", left: "12%" },
      { flag: "🇶🇦", top: "55%", left: "10%" },
      { flag: "🇰🇼", top: "78%", left: "30%" },
      { flag: "🇧🇭", top: "78%", left: "60%" },
      { flag: "🇴🇲", top: "55%", left: "82%" },
    ].map((c) => (
      <motion.div key={c.flag}
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="absolute grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/[0.06] text-lg hairline backdrop-blur"
        style={{ top: c.top, left: c.left }}>
        {c.flag}
      </motion.div>
    ))}
  </div>
);
