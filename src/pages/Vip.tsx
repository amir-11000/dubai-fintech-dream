import { ReactNode, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Crown, UserCheck, MessageCircle, Phone, Video, Globe2, Clock,
  Calendar, PartyPopper, Send, Wallet, Sparkles, Headphones, Zap,
  Percent, Plane, Gem, ArrowRight, CheckCircle2, ShieldCheck, TrendingUp,
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
const QUALIFIERS = [
  { icon: Wallet,        title: "Average Account Balance",   sub: "Maintained balance across products." },
  { icon: TrendingUp,    title: "Monthly Transaction Volume", sub: "Consistent activity month over month." },
  { icon: Sparkles,      title: "Annual Account Turnover",   sub: "Total movement across the year." },
  { icon: Gem,           title: "Product Usage",             sub: "Breadth across Pay, FX, Gold, Crypto." },
  { icon: Clock,         title: "Relationship Duration",     sub: "Loyalty and tenure with ShohoPay." },
  { icon: ShieldCheck,   title: "Overall Profile Activity",  sub: "Engagement, KYC, and account standing." },
];

const RM_FEATURES = [
  { icon: UserCheck,    label: "Dedicated Personal RM" },
  { icon: MessageCircle,label: "Direct In-App Messaging" },
  { icon: Phone,        label: "Voice Calls" },
  { icon: Video,        label: "Video Calls" },
  { icon: Globe2,       label: "Worldwide Availability" },
  { icon: Clock,        label: "24/7 Priority Support" },
  { icon: Calendar,     label: "Weekend Support" },
  { icon: PartyPopper,  label: "Public Holiday Support" },
  { icon: Send,         label: "International Transfer Assistance" },
  { icon: Wallet,       label: "Account Management Support" },
  { icon: Zap,          label: "Priority Transaction Assistance" },
  { icon: Gem,          label: "Wealth Product Guidance" },
];

const BENEFITS = [
  { icon: UserCheck, title: "Dedicated Relationship Manager", body: "Your personal financial point of contact, every day." },
  { icon: Headphones, title: "24/7 Hybrid Support",            body: "Choose AI or direct human support. No chatbot loops. No support tickets." },
  { icon: Zap, title: "Priority Service Queue",                body: "Fast-track support and issue resolution." },
  { icon: Percent, title: "Reduced Transaction Fees",          body: "Preferential pricing across selected services." },
  { icon: Plane, title: "International Banking Assistance",    body: "Support for transfers, payments, and account-related matters globally." },
  { icon: Gem, title: "Exclusive Product Access",              body: "Early access to future products, investment solutions, wealth services, and premium features." },
];

const JOURNEY = [
  "Standard Customer", "Growing Activity", "Qualification Review",
  "VIP Approval", "Dedicated RM Assigned", "Premium Banking Experience",
];

/* ------------------------------------------------------------------ */
export default function Vip() {
  useEffect(() => { document.title = "VIP Customers · Private Banking Reimagined · Shoho Pay"; }, []);

  return (
    <div className="relative isolate overflow-hidden">
      {/* HERO */}
      <section className="relative pt-32 md:pt-44">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-lines opacity-[0.25]" />
          <div className="absolute -top-32 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full"
               style={{ background: "radial-gradient(closest-side, rgba(201,168,76,0.18), transparent 70%)" }} />
          <div className="absolute right-[-10%] top-20 h-[420px] w-[420px] rounded-full"
               style={{ background: "radial-gradient(closest-side, rgba(45,127,255,0.18), transparent 70%)" }} />
        </div>
        <Container className="relative grid items-center gap-14 pb-20 md:grid-cols-2 md:pb-28">
          <Reveal>
            <Eyebrow>Shoho Pay · VIP</Eyebrow>
            <h1 className="font-display mt-5 text-balance text-5xl font-semibold leading-[1.02] text-gradient-silver md:text-7xl">
              Private Banking <br /><span className="text-gradient-gold">Experience.</span> Reimagined.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-silver/80 md:text-lg">
              Designed for high-value clients who expect more than a digital wallet. ShohoPay VIP combines modern
              fintech technology with dedicated human relationship management to deliver a truly premium banking experience.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/waitlist" className="group inline-flex items-center gap-1.5 rounded-full bg-gold-grad px-5 py-3 text-sm font-medium text-ink shadow-[0_8px_30px_-8px_rgba(201,168,76,0.6)] transition hover:opacity-95">
                Request VIP Invitation <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
              <Link to="/contact" className="rounded-full glass px-5 py-3 text-sm text-snow hover:bg-white/10">
                Speak with a Relationship Manager
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-6 text-[11px] uppercase tracking-[0.22em] text-silver/60">
              <span className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-gold" /> DIFC Registered</span>
              <span className="flex items-center gap-2"><Crown className="h-3.5 w-3.5 text-gold" /> Invitation Only</span>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <VipCardVisual />
          </Reveal>
        </Container>
      </section>

      {/* WHO QUALIFIES */}
      <section className="relative py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow tone="blue">Who Qualifies</Eyebrow>
            <h2 className="font-display mt-5 text-balance text-4xl font-semibold text-gradient-silver md:text-6xl">
              By invitation. Earned by activity.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base text-silver/75 md:text-lg">
              Customers may qualify for VIP status based on the following criteria. Qualification reviews are
              conducted periodically by ShohoPay.
            </p>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {QUALIFIERS.map((q, i) => (
              <Reveal key={q.title} delay={i * 0.05}>
                <div className="group relative h-full overflow-hidden rounded-3xl glass-strong p-6 transition hover:-translate-y-1 hover:border-gold/40">
                  <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition group-hover:opacity-100"
                       style={{ background: "radial-gradient(400px circle at 50% 0%, rgba(201,168,76,0.12), transparent 60%)" }} />
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-gold/30 to-gold/5 hairline">
                    <q.icon className="h-5 w-5 text-gold" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-snow">{q.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-silver/75">{q.sub}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* RELATIONSHIP MANAGER */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-[700px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full"
               style={{ background: "radial-gradient(closest-side, rgba(45,127,255,0.10), transparent 70%)" }} />
        </div>
        <Container className="grid items-center gap-14 md:grid-cols-2">
          <Reveal>
            <Eyebrow>Flagship Feature</Eyebrow>
            <h2 className="font-display mt-5 text-balance text-4xl font-semibold text-gradient-silver md:text-5xl">
              One dedicated banker. <span className="text-gradient-blue">For life.</span>
            </h2>
            <p className="mt-5 text-silver/80">
              Every VIP Customer receives a dedicated Personal Relationship Manager. Unlike traditional fintech apps
              where customers speak to different agents every time, ShohoPay assigns one dedicated professional
              specifically to each VIP account.
            </p>
            <p className="mt-4 text-silver/80">
              The Relationship Manager becomes the customer's direct point of contact for all account-related matters —
              no matter where in the world they are.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {RM_FEATURES.map((f) => (
                <div key={f.label} className="flex items-start gap-2 rounded-xl bg-white/[0.03] p-3 hairline">
                  <f.icon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <span className="text-xs leading-snug text-silver/85">{f.label}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <RmConsoleVisual />
          </Reveal>
        </Container>
      </section>

      {/* VIP BENEFITS */}
      <section className="relative py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow tone="gold">VIP Benefits</Eyebrow>
            <h2 className="font-display mt-5 text-balance text-4xl font-semibold text-gradient-silver md:text-6xl">
              A different class of service.
            </h2>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.05}>
                <div className="relative h-full overflow-hidden rounded-3xl p-6 hairline"
                     style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.06), rgba(255,255,255,0.01) 60%)" }}>
                  <div className="absolute right-[-40px] top-[-40px] h-32 w-32 rounded-full"
                       style={{ background: "radial-gradient(closest-side, rgba(201,168,76,0.18), transparent 70%)" }} />
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-gold/25 to-gold/0 hairline">
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

      {/* CUSTOMER JOURNEY */}
      <section className="relative py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow tone="blue">Your Journey</Eyebrow>
            <h2 className="font-display mt-5 text-balance text-4xl font-semibold text-gradient-silver md:text-5xl">
              From customer to private client.
            </h2>
          </div>

          <div className="relative mx-auto mt-14 max-w-5xl">
            <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-gold/40 to-transparent md:block" />
            <ol className="space-y-6 md:space-y-0">
              {JOURNEY.map((step, i) => {
                const left = i % 2 === 0;
                return (
                  <Reveal key={step} delay={i * 0.08}>
                    <li className={`relative md:grid md:grid-cols-2 md:items-center md:gap-12 ${left ? "" : "md:[&>*:first-child]:order-2"}`}>
                      <div className={`flex ${left ? "md:justify-end md:text-right" : "md:justify-start md:text-left"}`}>
                        <div className="inline-flex max-w-md items-center gap-4 rounded-2xl glass-strong p-5">
                          <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-gold to-gold/40 text-ink font-display font-semibold">
                            {String(i + 1).padStart(2, "0")}
                          </div>
                          <div className="text-left">
                            <div className="text-[10px] uppercase tracking-[0.22em] text-silver/60">Stage {i + 1}</div>
                            <div className="mt-1 font-display text-lg font-semibold text-snow">{step}</div>
                          </div>
                        </div>
                      </div>
                      <div className="hidden md:block" />
                      <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_20px_rgba(201,168,76,0.7)] md:block" />
                    </li>
                  </Reveal>
                );
              })}
            </ol>
          </div>
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
            <Crown className="mx-auto h-10 w-10 text-gold" />
            <h2 className="font-display mt-6 text-balance text-4xl font-semibold text-gradient-silver md:text-6xl">
              The relationship you've been waiting for.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-silver/80 md:text-lg">
              One App. One Wallet. One Relationship. Built for the GCC.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link to="/waitlist" className="group inline-flex items-center gap-1.5 rounded-full bg-gold-grad px-6 py-3 text-sm font-medium text-ink shadow-[0_10px_40px_-10px_rgba(201,168,76,0.7)] transition hover:opacity-95">
                Request VIP Invitation <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
              <Link to="/contact" className="rounded-full glass px-6 py-3 text-sm text-snow hover:bg-white/10">
                Talk to an RM
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
const VipCardVisual = () => (
  <div className="relative mx-auto aspect-[1.586/1] w-full max-w-md [perspective:1200px]">
    <motion.div
      initial={{ rotateX: -8, rotateY: 12, opacity: 0 }}
      animate={{ rotateX: -4, rotateY: 8, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformStyle: "preserve-3d" }}
      className="relative h-full w-full rounded-3xl p-7 will-change-transform"
    >
      <div className="absolute inset-0 overflow-hidden rounded-3xl"
           style={{
             background: "linear-gradient(135deg, #1b1408 0%, #2a1e08 30%, #0d0d0f 70%, #1b1408 100%)",
             border: "1px solid rgba(201,168,76,0.45)",
             boxShadow: "inset 0 1px 0 rgba(255,255,255,0.10), 0 30px 80px -20px rgba(0,0,0,0.8), 0 0 80px -10px rgba(201,168,76,0.4)",
           }} />
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <div className="absolute -inset-x-1 -top-1/3 h-1/2 rotate-12 bg-gradient-to-r from-transparent via-gold/20 to-transparent shimmer" />
      </div>
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <div className="font-display text-[10px] tracking-[0.4em] text-gold">PRIVATE BANKING</div>
            <div className="mt-1 font-display text-xl font-semibold tracking-[0.3em] text-snow">SHOHO VIP</div>
          </div>
          <Crown className="h-7 w-7 text-gold" />
        </div>
        <div className="space-y-2">
          <div className="font-mono text-base tracking-[0.25em] text-snow/85">5212  ••••  ••••  0001</div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[9px] uppercase tracking-widest text-silver/60">Member Since</div>
              <div className="text-xs text-snow/85">2026</div>
            </div>
            <div className="text-right">
              <div className="text-[9px] uppercase tracking-widest text-silver/60">Tier</div>
              <div className="text-xs text-gold">CENTURION CLASS</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
    <div className="pointer-events-none absolute -bottom-10 left-1/2 h-10 w-[80%] -translate-x-1/2 rounded-[100%] blur-2xl"
         style={{ background: "rgba(201,168,76,0.35)" }} />
  </div>
);

const RmConsoleVisual = () => (
  <div className="relative mx-auto w-full max-w-md">
    <div className="relative overflow-hidden rounded-3xl glass-strong p-6">
      <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
        <div className="relative">
          <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-gold to-gold/40 font-display text-ink">RM</div>
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-ink" />
        </div>
        <div>
          <div className="font-display text-sm font-semibold text-snow">Sara Al Marri</div>
          <div className="text-[11px] text-silver/60">Your dedicated Relationship Manager · Online</div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-full glass"><Phone className="h-3.5 w-3.5 text-gold" /></div>
          <div className="grid h-8 w-8 place-items-center rounded-full glass"><Video className="h-3.5 w-3.5 text-gold" /></div>
        </div>
      </div>
      <div className="mt-4 space-y-3">
        <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-white/[0.05] px-4 py-2.5 text-sm text-silver/90 hairline">
          Good morning. Your wire to Singapore has been pre-approved. Shall I execute now?
        </div>
        <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-gold-grad px-4 py-2.5 text-sm font-medium text-ink">
          Yes — please proceed.
        </div>
        <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-white/[0.05] px-4 py-2.5 text-sm text-silver/90 hairline">
          <CheckCircle2 className="-mt-0.5 mr-1 inline h-4 w-4 text-emerald-400" />
          Executed. You'll see funds settle within 2 hours.
        </div>
      </div>
      <div className="mt-5 flex items-center gap-2 rounded-full bg-white/[0.03] px-3 py-2 hairline">
        <input disabled placeholder="Message your RM…" className="flex-1 bg-transparent px-2 py-1.5 text-xs text-silver/60 outline-none" />
        <div className="grid h-7 w-7 place-items-center rounded-full bg-gold-grad"><Send className="h-3 w-3 text-ink" /></div>
      </div>
    </div>
    <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[40px]"
         style={{ background: "radial-gradient(closest-side, rgba(201,168,76,0.18), transparent 70%)" }} />
  </div>
);
