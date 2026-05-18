import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  Globe2,
  Bot,
  Coins,
  Bitcoin,
  Users,
  Smartphone,
  ArrowUpRight,
  Play,
  CircleDollarSign,
  TrendingUp,
  Send,
  CheckCircle2,
} from "lucide-react";
import skyline from "./assets/dubai-skyline.jpg";
import goldBars from "./assets/gold-bars.jpg";
import iphoneWallet from "./assets/iphone-wallet.png";
import iphonesDuo from "./assets/iphones-duo.png";

/* ------------------------------- Primitives ------------------------------- */

const Container: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  children,
  className = "",
}) => (
  <div className={`mx-auto w-full max-w-7xl px-6 md:px-10 ${className}`}>{children}</div>
);

const Eyebrow: React.FC<React.PropsWithChildren<{ tone?: "blue" | "gold" }>> = ({
  children,
  tone = "blue",
}) => (
  <span
    className={`inline-flex items-center gap-2 rounded-full hairline px-3 py-1 text-[11px] uppercase tracking-[0.18em] ${
      tone === "gold" ? "text-gold" : "text-glow"
    }`}
  >
    <span
      className={`h-1.5 w-1.5 rounded-full ${
        tone === "gold" ? "bg-gold" : "bg-glow"
      } shadow-[0_0_10px_currentColor]`}
    />
    {children}
  </span>
);

const SectionHeader: React.FC<{
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
  tone?: "blue" | "gold";
}> = ({ eyebrow, title, sub, tone = "blue" }) => (
  <div className="mx-auto max-w-3xl text-center">
    <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
    <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-gradient-silver md:text-6xl">
      {title}
    </h2>
    {sub && (
      <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-silver/70 md:text-lg">
        {sub}
      </p>
    )}
  </div>
);

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

/* --------------------------------- Nav ----------------------------------- */

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <Container>
        <div
          className={`flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 ${
            scrolled ? "glass-strong" : ""
          }`}
        >
          <Link to="/" className="flex items-center gap-2.5">
            <div className="relative h-7 w-7">
              <div className="absolute inset-0 rounded-md bg-gradient-to-br from-glow to-white/20 blur-md opacity-70" />
              <div className="relative grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-white/20 to-white/5 hairline">
                <span className="text-[11px] font-bold text-white">D</span>
              </div>
            </div>
            <span className="text-sm font-semibold tracking-[0.18em] text-white">
              DIRHAMPAY
            </span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm text-silver/70 md:flex">
            {[
              { l: "Wallet", to: "/wallet" },
              { l: "Exchange", to: "/exchange" },
              { l: "Gold", to: "/gold" },
              { l: "Crypto", to: "/crypto" },
              { l: "AI Finance", to: "/ai-assistant" },
              { l: "Social", to: "/social-payments" },
            ].map((l) => (
              <Link key={l.l} to={l.to} className="hover:text-white transition">
                {l.l}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              to="/signin"
              className="hidden rounded-full px-4 py-2 text-sm text-silver/80 hover:text-white md:inline-block"
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              className="group inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink transition hover:bg-white/90"
            >
              Get started
              <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
};

/* --------------------------------- Hero ---------------------------------- */

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden pt-36 md:pt-44">
      {/* skyline backdrop */}
      <motion.div style={{ y, opacity }} className="pointer-events-none absolute inset-0 -z-10">
        <img
          src={skyline}
          alt=""
          className="h-full w-full object-cover opacity-[0.35]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/70 to-ink" />
        <div className="absolute inset-0 grid-lines opacity-[0.35]" />
      </motion.div>

      <Container className="relative">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mx-auto max-w-4xl text-center"
        >
          <Eyebrow>Built in Dubai · For the world</Eyebrow>
          <h1 className="mt-6 text-balance text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl lg:text-[88px]">
            <span className="text-gradient-silver">The Future Financial</span>
            <br />
            <span className="text-gradient-silver">Lifestyle </span>
            <span className="text-gradient-blue">Ecosystem.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-silver/70">
            One intelligent platform for your digital wallet, instant exchange,
            crypto, digital gold, AI finance and social payments.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#cta"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-ink transition hover:bg-white/90"
            >
              Get Started
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
            <a
              href="#"
              className="group inline-flex items-center gap-2 rounded-full glass px-6 py-3.5 text-sm font-medium text-white transition hover:bg-white/10"
            >
              <Play className="h-4 w-4 fill-white" />
              Watch Demo
            </a>
          </div>
        </motion.div>

        {/* Floating device + cards */}
        <div className="relative mx-auto mt-16 h-[560px] w-full max-w-5xl md:mt-24 md:h-[640px]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-0 -translate-x-1/2"
          >
            <div className="relative floaty">
              <div className="absolute -inset-16 -z-10 rounded-full bg-glow/20 blur-3xl" />
              <PhoneFrame className="h-[560px] w-[280px] md:h-[640px] md:w-[320px]">
                <WalletScreen />
              </PhoneFrame>
            </div>
          </motion.div>

          {/* Floating cards */}
          <FloatingCard
            className="left-2 top-20 md:left-0 md:top-32"
            delay={0.6}
            direction="left"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-glow/20 text-glow">
                <Zap className="h-4 w-4" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-silver/60">
                  Instant transfer
                </div>
                <div className="text-sm font-medium text-white">
                  + AED 2,480.00
                </div>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard
            className="right-2 top-40 md:right-0 md:top-48"
            delay={0.8}
            direction="right"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-gold/20 text-gold">
                <Coins className="h-4 w-4" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-silver/60">
                  Gold · 24k
                </div>
                <div className="text-sm font-medium text-white">
                  12.4 g <span className="text-gold">+1.8%</span>
                </div>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard
            className="bottom-6 left-6 md:bottom-12 md:left-10"
            delay={1}
            direction="left"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 text-white">
                <Globe2 className="h-4 w-4" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-silver/60">
                  AED → USD
                </div>
                <div className="text-sm font-medium text-white">
                  1.00 = 0.272
                </div>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard
            className="bottom-10 right-4 md:bottom-20 md:right-10"
            delay={1.2}
            direction="right"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 text-white">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-silver/60">
                  AI suggestion
                </div>
                <div className="text-sm font-medium text-white">
                  Save AED 320 weekly
                </div>
              </div>
            </div>
          </FloatingCard>
        </div>
      </Container>

      {/* Marquee */}
      <div className="relative mt-12 border-y border-white/5 bg-white/[0.015] py-6">
        <div className="flex animate-[marquee_40s_linear_infinite] gap-16 whitespace-nowrap text-sm uppercase tracking-[0.25em] text-silver/40">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-16">
              {[
                "Licensed in UAE",
                "Bank-grade security",
                "ISO 27001",
                "PCI DSS",
                "24/7 support",
                "Regulated custody",
                "Open banking",
              ].map((t) => (
                <span key={t} className="flex items-center gap-3">
                  <span className="h-1 w-1 rounded-full bg-silver/40" />
                  {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </section>
  );
};

const PhoneFrame: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  children,
  className = "",
}) => (
  <div
    className={`relative rounded-[44px] border border-white/15 bg-gradient-to-b from-white/20 to-white/5 p-[6px] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.04)] ${className}`}
  >
    <div className="relative h-full w-full overflow-hidden rounded-[38px] bg-gradient-to-b from-[#0c0f14] to-[#06080b]">
      <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />
      {children}
    </div>
  </div>
);

const WalletScreen = () => (
  <div className="relative flex h-full w-full flex-col p-5 pt-9">
    <div className="flex items-center justify-between">
      <div className="text-[10px] uppercase tracking-widest text-silver/50">
        Main · AED
      </div>
      <div className="flex items-center gap-1 text-[10px] text-silver/50">
        <ShieldCheck className="h-3 w-3" /> Secured
      </div>
    </div>
    <div className="mt-6">
      <div className="text-[10px] uppercase tracking-wider text-silver/50">
        Total balance
      </div>
      <div className="mt-1 text-[34px] font-semibold tracking-tight text-white">
        AED 48,290<span className="text-silver/40">.40</span>
      </div>
      <div className="mt-1 text-xs text-glow">+ AED 1,240 this week</div>
    </div>
    {/* Mini chart */}
    <svg viewBox="0 0 300 100" className="mt-4 h-16 w-full">
      <defs>
        <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#5aa9ff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#5aa9ff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0,70 C30,60 50,80 80,55 C110,30 140,65 170,40 C200,15 230,55 260,30 C280,15 300,30 300,30 L300,100 L0,100 Z"
        fill="url(#g1)"
      />
      <path
        d="M0,70 C30,60 50,80 80,55 C110,30 140,65 170,40 C200,15 230,55 260,30 C280,15 300,30 300,30"
        fill="none"
        stroke="#5aa9ff"
        strokeWidth="1.5"
      />
    </svg>
    <div className="mt-5 grid grid-cols-4 gap-2">
      {["Send", "Top up", "Swap", "More"].map((t) => (
        <div
          key={t}
          className="rounded-xl bg-white/5 px-2 py-2 text-center text-[10px] text-silver/80 hairline"
        >
          {t}
        </div>
      ))}
    </div>
    <div className="mt-5 space-y-2">
      {[
        ["Apple Store", "−AED 379", "today"],
        ["Emirates NBD", "+AED 5,000", "yesterday"],
        ["Gold purchase", "−AED 1,200", "Mon"],
      ].map(([n, a, t]) => (
        <div
          key={n}
          className="flex items-center justify-between rounded-xl bg-white/[0.03] px-3 py-2.5"
        >
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-full bg-white/10" />
            <div>
              <div className="text-[11px] text-white">{n}</div>
              <div className="text-[9px] text-silver/40">{t}</div>
            </div>
          </div>
          <div
            className={`text-[11px] ${
              a.startsWith("+") ? "text-glow" : "text-silver/70"
            }`}
          >
            {a}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const FloatingCard: React.FC<
  React.PropsWithChildren<{
    className?: string;
    delay?: number;
    direction?: "left" | "right";
  }>
> = ({ children, className = "", delay = 0, direction = "left" }) => (
  <motion.div
    initial={{ opacity: 0, x: direction === "left" ? -30 : 30, y: 10 }}
    animate={{ opacity: 1, x: 0, y: 0 }}
    transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    className={`absolute z-20 hidden rounded-2xl glass px-4 py-3 shadow-2xl sm:block ${className}`}
  >
    <div className="floaty">{children}</div>
  </motion.div>
);

/* ------------------------------- Section 2 ------------------------------- */

const useCount = (target: number, inView: boolean, duration = 1800) => {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setV(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);
  return v;
};

const Stat: React.FC<{ value: number; suffix?: string; label: string; decimals?: number }> = ({
  value,
  suffix,
  label,
  decimals = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const v = useCount(value, inView);
  return (
    <div ref={ref} className="group relative overflow-hidden rounded-2xl glass p-6 md:p-8">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition group-hover:opacity-100" />
      <div className="text-4xl font-semibold tracking-tight text-gradient-silver md:text-5xl">
        {v.toLocaleString(undefined, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}
        {suffix && <span className="text-glow">{suffix}</span>}
      </div>
      <div className="mt-2 text-sm text-silver/60">{label}</div>
    </div>
  );
};

const Section2 = () => (
  <section className="relative py-32">
    <Container>
      <SectionHeader
        eyebrow="Modern finance · Built for trust"
        title={
          <>
            Numbers that move <span className="text-gradient-blue">at the speed of light.</span>
          </>
        }
        sub="A modern financial backbone engineered for instant transfers, multi-currency wallets and bank-grade security."
      />
      <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat value={0.3} decimals={1} suffix="s" label="Average transfer time" />
        <Stat value={42} suffix="+" label="Supported currencies" />
        <Stat value={99.99} decimals={2} suffix="%" label="Uptime SLA" />
        <Stat value={256} suffix="-bit" label="End-to-end encryption" />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          { icon: Zap, t: "Instant settlement", d: "Inter-wallet transfers settle in under a second." },
          { icon: ShieldCheck, t: "Regulated custody", d: "Funds protected under UAE financial regulation." },
          { icon: Sparkles, t: "AI-powered", d: "Adaptive intelligence across spend, save, and invest." },
        ].map((f, i) => (
          <motion.div
            key={f.t}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-15%" }}
            custom={i}
            className="rounded-2xl glass p-6"
          >
            <f.icon className="h-5 w-5 text-glow" />
            <div className="mt-4 text-base font-medium text-white">{f.t}</div>
            <div className="mt-1.5 text-sm text-silver/60">{f.d}</div>
          </motion.div>
        ))}
      </div>
    </Container>
  </section>
);

/* ------------------------------- Section 3 ------------------------------- */

const Exchange = () => {
  const pairs = [
    { from: "AED", to: "USD", rate: 0.2723, change: "+0.04%" },
    { from: "AED", to: "EUR", rate: 0.2521, change: "+0.11%" },
    { from: "AED", to: "GBP", rate: 0.2148, change: "−0.02%" },
    { from: "AED", to: "JPY", rate: 41.86, change: "+0.21%" },
  ];
  return (
    <section className="relative py-32">
      <Container>
        <SectionHeader
          eyebrow="Instant Exchange"
          title={
            <>
              Convert currencies <span className="text-gradient-blue">instantly</span> inside your wallet.
            </>
          }
          sub="Real interbank rates, zero hidden spreads. Move money across borders the way the internet was built — borderless."
        />

        <div className="mt-16 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          {/* Interactive swap card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-glow/10 blur-3xl" />
            <div className="rounded-3xl glass-strong p-6">
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase tracking-widest text-silver/50">
                  Swap
                </div>
                <div className="flex items-center gap-1 text-xs text-glow">
                  <span className="h-1.5 w-1.5 rounded-full bg-glow shadow-[0_0_10px_currentColor]" />
                  Live rate
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-white/[0.03] p-4 hairline">
                <div className="flex items-center justify-between text-xs text-silver/50">
                  <span>You send</span>
                  <span>Balance · AED 48,290</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-3xl font-semibold tracking-tight text-white">
                    10,000.00
                  </div>
                  <Chip>AED</Chip>
                </div>
              </div>

              <div className="my-2 grid place-items-center">
                <div className="grid h-9 w-9 place-items-center rounded-full glass">
                  <ArrowRight className="h-4 w-4 -rotate-90 text-white" />
                </div>
              </div>

              <div className="rounded-2xl bg-white/[0.03] p-4 hairline">
                <div className="flex items-center justify-between text-xs text-silver/50">
                  <span>You receive</span>
                  <span>Rate · 0.2723</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-3xl font-semibold tracking-tight text-gradient-blue">
                    2,723.00
                  </div>
                  <Chip>USD</Chip>
                </div>
              </div>

              <button className="mt-5 w-full rounded-2xl bg-white py-3 text-sm font-medium text-ink transition hover:bg-white/90">
                Exchange now
              </button>

              {/* Mini graph */}
              <div className="mt-5 rounded-xl bg-white/[0.02] p-3 hairline">
                <div className="flex items-center justify-between text-[10px] text-silver/50">
                  <span>AED / USD · 24h</span>
                  <span className="text-glow">+0.04%</span>
                </div>
                <svg viewBox="0 0 300 60" className="mt-1 h-12 w-full">
                  <path
                    d="M0,40 C30,30 60,45 90,32 C120,20 150,38 180,28 C210,18 240,30 270,22 C290,16 300,20 300,20"
                    fill="none"
                    stroke="#5aa9ff"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Live pair list */}
          <div className="space-y-3">
            {pairs.map((p, i) => (
              <motion.div
                key={p.to}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className="flex items-center justify-between rounded-2xl glass px-5 py-4"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-white/5 text-[10px] font-medium text-white hairline">
                    {p.to}
                  </div>
                  <div>
                    <div className="text-sm text-white">
                      {p.from} → {p.to}
                    </div>
                    <div className="text-[11px] text-silver/50">
                      Interbank · No spread
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-white tabular-nums">
                    {p.rate}
                  </div>
                  <div
                    className={`text-[11px] ${
                      p.change.startsWith("−") ? "text-silver/50" : "text-glow"
                    }`}
                  >
                    {p.change}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

const Chip: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white hairline">
    <span className="h-1.5 w-1.5 rounded-full bg-glow" />
    {children}
  </div>
);

/* ------------------------------- Section 4 ------------------------------- */

const Gold = () => (
  <section className="relative py-32">
    <Container>
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Eyebrow tone="gold">Digital Gold Ownership</Eyebrow>
          <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            <span className="text-gradient-silver">Own real gold.</span>
            <br />
            <span className="text-gradient-gold">Gram by gram.</span>
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-silver/70">
            Buy 24k investment-grade gold directly inside your wallet. Stored
            securely in regulated vaults. Convert your holdings into physical
            bars or arrange private delivery, anytime.
          </p>
          <ul className="mt-7 space-y-3">
            {[
              "Start from 1 gram. No minimums.",
              "Fully insured, vaulted custody.",
              "Redeem physical bars or request delivery.",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-sm text-silver/80">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-gold" />
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex gap-3">
            <a
              href="#"
              className="rounded-full bg-gradient-to-r from-[#f4e4b3] via-[#d6b56a] to-[#8a6a2e] px-5 py-3 text-sm font-medium text-ink"
            >
              Start collecting gold
            </a>
            <a href="#" className="rounded-full glass px-5 py-3 text-sm text-white">
              View vault terms
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute -inset-10 -z-10 rounded-full bg-gold/15 blur-3xl" />
          <div className="relative overflow-hidden rounded-3xl glass-strong">
            <img
              src={goldBars}
              alt="Digital gold"
              loading="lazy"
              className="h-[520px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <div className="rounded-2xl glass-strong p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[11px] uppercase tracking-widest text-silver/60">
                      Your gold holdings
                    </div>
                    <div className="mt-1 text-2xl font-semibold text-gradient-gold">
                      24.86 g · AED 9,420
                    </div>
                  </div>
                  <div className="rounded-full bg-gold/20 px-3 py-1 text-xs text-gold">
                    +1.8% today
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                  {["Buy", "Sell", "Redeem"].map((t) => (
                    <div
                      key={t}
                      className="rounded-lg bg-white/5 py-2 text-xs text-white hairline"
                    >
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Container>
  </section>
);

/* ------------------------------- Section 5 ------------------------------- */

const Crypto = () => {
  const assets = [
    { sym: "BTC", name: "Bitcoin", price: "AED 248,210", chg: "+2.4%", up: true },
    { sym: "ETH", name: "Ethereum", price: "AED 12,840", chg: "+1.1%", up: true },
    { sym: "SOL", name: "Solana", price: "AED 612", chg: "−0.6%", up: false },
    { sym: "USDT", name: "Tether", price: "AED 3.67", chg: "0.00%", up: true },
  ];
  return (
    <section className="relative py-32">
      <Container>
        <SectionHeader
          eyebrow="Crypto Ecosystem"
          title={
            <>
              Traditional finance meets <span className="text-gradient-blue">digital assets.</span>
            </>
          }
          sub="Trade, hold and earn across leading digital assets — elegantly integrated with your wallet."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main chart card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 rounded-3xl glass-strong p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-glow/15 text-glow">
                  <Bitcoin className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm text-white">Bitcoin · BTC</div>
                  <div className="text-[11px] text-silver/50">
                    Spot · AED markets
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-semibold text-white tabular-nums">
                  AED 248,210
                </div>
                <div className="text-xs text-glow">+ 2.4% · 24h</div>
              </div>
            </div>

            <svg viewBox="0 0 600 220" className="mt-6 h-56 w-full">
              <defs>
                <linearGradient id="cg" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#5aa9ff" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#5aa9ff" stopOpacity="0" />
                </linearGradient>
              </defs>
              {Array.from({ length: 5 }).map((_, i) => (
                <line
                  key={i}
                  x1="0"
                  x2="600"
                  y1={40 + i * 35}
                  y2={40 + i * 35}
                  stroke="rgba(255,255,255,0.05)"
                />
              ))}
              <path
                d="M0,160 C40,150 80,170 120,140 C160,110 200,150 240,120 C280,90 320,130 360,90 C400,55 440,100 480,70 C520,45 560,80 600,55 L600,220 L0,220 Z"
                fill="url(#cg)"
              />
              <path
                d="M0,160 C40,150 80,170 120,140 C160,110 200,150 240,120 C280,90 320,130 360,90 C400,55 440,100 480,70 C520,45 560,80 600,55"
                fill="none"
                stroke="#5aa9ff"
                strokeWidth="2"
              />
            </svg>

            <div className="mt-4 flex flex-wrap gap-2">
              {["1H", "1D", "1W", "1M", "1Y", "All"].map((t, i) => (
                <button
                  key={t}
                  className={`rounded-full px-3 py-1.5 text-xs ${
                    i === 2
                      ? "bg-white text-ink"
                      : "glass text-silver/70 hover:text-white"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Asset list */}
          <div className="space-y-3">
            {assets.map((a, i) => (
              <motion.div
                key={a.sym}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="flex items-center justify-between rounded-2xl glass px-5 py-4"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-white/5 text-[10px] font-semibold text-white hairline">
                    {a.sym}
                  </div>
                  <div>
                    <div className="text-sm text-white">{a.name}</div>
                    <div className="text-[11px] text-silver/50">Spot</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-white tabular-nums">{a.price}</div>
                  <div
                    className={`text-[11px] ${
                      a.up ? "text-glow" : "text-silver/50"
                    }`}
                  >
                    {a.chg}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

/* ------------------------------- Section 6 ------------------------------- */

const AISection = () => {
  const messages = [
    { role: "user", text: "I want to save for a Tokyo trip in 3 months." },
    {
      role: "ai",
      text: "Got it. Target AED 18,400 by 16 Aug. I'll set aside AED 1,420/week from your salary and pause two subscriptions.",
    },
    { role: "user", text: "Can I invest the rest safely?" },
    {
      role: "ai",
      text: "Sure — I'll allocate 70% to a low-risk yield vault and 30% to digital gold. Projected +2.6% over 90 days.",
    },
  ];
  return (
    <section className="relative py-32">
      <Container>
        <SectionHeader
          eyebrow="AI Financial Assistant"
          title={
            <>
              Your money, <span className="text-gradient-blue">thinking ahead.</span>
            </>
          }
          sub="A private financial intelligence that plans, budgets and invests with you — in plain language."
        />

        <div className="mt-16 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl glass-strong p-6"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-glow/15 text-glow">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm text-white">DIRHAMPAY Intelligence</div>
                <div className="flex items-center gap-1 text-[11px] text-glow">
                  <span className="h-1.5 w-1.5 rounded-full bg-glow" />
                  Online
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className={`flex ${m.role === "user" ? "justify-end" : ""}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-white text-ink"
                        : "bg-white/5 text-silver hairline"
                    }`}
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-2 rounded-2xl bg-white/[0.03] px-3 py-2.5 hairline">
              <div className="flex-1 text-sm text-silver/50">
                Ask anything about your money…
              </div>
              <div className="grid h-8 w-8 place-items-center rounded-full bg-glow text-ink">
                <Send className="h-3.5 w-3.5" />
              </div>
            </div>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                icon: TrendingUp,
                t: "Adaptive budgeting",
                d: "Auto-categorized spend with weekly insights.",
              },
              {
                icon: CircleDollarSign,
                t: "Smart saving goals",
                d: "Set a goal — we set the plan, automatically.",
              },
              {
                icon: Sparkles,
                t: "Personalized investing",
                d: "Recommendations tuned to your real cash flow.",
              },
            ].map((f, i) => (
              <motion.div
                key={f.t}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-4 rounded-2xl glass p-5"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/5 text-glow hairline">
                  <f.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-base font-medium text-white">{f.t}</div>
                  <div className="mt-1 text-sm text-silver/60">{f.d}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

/* ------------------------------- Section 7 ------------------------------- */

const Social = () => {
  const people = [
    { n: "Layla", a: "L", c: "from-pink-300 to-rose-500" },
    { n: "Omar", a: "O", c: "from-sky-300 to-blue-600" },
    { n: "Sara", a: "S", c: "from-amber-200 to-amber-500" },
    { n: "Yusuf", a: "Y", c: "from-emerald-300 to-emerald-600" },
    { n: "Nora", a: "N", c: "from-violet-300 to-violet-600" },
  ];
  return (
    <section className="relative py-32">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>Social Payments</Eyebrow>
            <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              <span className="text-gradient-silver">No IBAN. No account numbers.</span>
              <br />
              <span className="text-gradient-blue">Just instant finance.</span>
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-silver/70">
              Pay anyone in your contacts in a tap. Request, split, schedule —
              your money moves the way you actually talk.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:max-w-md">
              {[
                "Tap-to-pay anyone",
                "Split bills in seconds",
                "Request money",
                "Group payments",
              ].map((t) => (
                <div
                  key={t}
                  className="flex items-center gap-2 rounded-xl glass px-3 py-2.5 text-sm text-silver/80"
                >
                  <CheckCircle2 className="h-4 w-4 text-glow" /> {t}
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[480px]">
            <div className="absolute -inset-10 -z-10 rounded-full bg-glow/10 blur-3xl" />
            {/* Connection lines */}
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 400">
              <defs>
                <linearGradient id="ln" x1="0" x2="1">
                  <stop offset="0%" stopColor="rgba(90,169,255,0.6)" />
                  <stop offset="100%" stopColor="rgba(90,169,255,0)" />
                </linearGradient>
              </defs>
              {[
                [200, 200, 80, 80],
                [200, 200, 320, 70],
                [200, 200, 80, 320],
                [200, 200, 330, 320],
                [200, 200, 200, 30],
              ].map(([x1, y1, x2, y2], i) => (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="url(#ln)"
                  strokeWidth="1"
                  strokeDasharray="3 4"
                />
              ))}
            </svg>

            {/* Center user */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="absolute -inset-3 rounded-full bg-glow/30 blur-xl" />
                <div className="relative grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-white to-silver/60 text-2xl font-semibold text-ink">
                  You
                </div>
              </div>
            </div>

            {/* Surrounding people */}
            {[
              { p: "top-2 left-10", person: people[0] },
              { p: "top-4 right-10", person: people[1] },
              { p: "bottom-10 left-6", person: people[2] },
              { p: "bottom-6 right-6", person: people[3] },
              { p: "-top-2 left-1/2 -translate-x-1/2", person: people[4] },
            ].map((x, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 * i, duration: 0.6 }}
                className={`absolute ${x.p}`}
              >
                <div className="flex items-center gap-3 rounded-full glass px-3 py-2">
                  <div
                    className={`grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br ${x.person.c} text-sm font-semibold text-white`}
                  >
                    {x.person.a}
                  </div>
                  <div className="pr-2 text-xs">
                    <div className="text-white">{x.person.n}</div>
                    <div className="text-glow">+ AED 120</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

/* ------------------------------- Section 8 ------------------------------- */

const WhyDubai = () => (
  <section className="relative overflow-hidden py-32">
    <div className="absolute inset-0 -z-10">
      <img src={skyline} alt="" loading="lazy" className="h-full w-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink" />
    </div>
    <Container>
      <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-2">
        <div>
          <Eyebrow tone="gold">Why Dubai</Eyebrow>
          <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            <span className="text-gradient-silver">Built where the future</span>
            <br />
            <span className="text-gradient-gold">already lives.</span>
          </h2>
        </div>
        <p className="text-lg leading-relaxed text-silver/70">
          DIRHAMPAY is built for global residents, modern travelers and
          digital-native users — at the center of the world's most ambitious
          financial city. Engineered in Dubai, designed for everywhere.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { k: "200+", v: "Nationalities served" },
          { k: "24/7", v: "Always-on infrastructure" },
          { k: "0", v: "Hidden fees" },
          { k: "1", v: "Wallet for everything" },
        ].map((s) => (
          <div key={s.v} className="rounded-2xl glass p-5">
            <div className="text-3xl font-semibold text-gradient-silver">{s.k}</div>
            <div className="mt-1 text-xs text-silver/60">{s.v}</div>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

/* ------------------------------- Section 9 ------------------------------- */

const Mobile = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  return (
    <section ref={ref} className="relative overflow-hidden py-32">
      <Container>
        <SectionHeader
          eyebrow="Mobile experience"
          title={
            <>
              An ecosystem in your pocket. <span className="text-gradient-blue">Beautifully.</span>
            </>
          }
          sub="Every surface — wallet, exchange, gold, crypto, AI and social — flows in one unified mobile experience."
        />
        <motion.div style={{ y }} className="relative mt-16">
          <div className="absolute left-1/2 top-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-glow/15 blur-3xl" />
          <img
            src={iphonesDuo}
            alt="DIRHAMPAY mobile app"
            loading="lazy"
            className="mx-auto w-full max-w-4xl"
          />
        </motion.div>

        <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { icon: Smartphone, t: "Native on iOS & Android" },
            { icon: ShieldCheck, t: "Face ID & biometric vault" },
            { icon: Sparkles, t: "Adaptive interface" },
          ].map((f) => (
            <div key={f.t} className="flex items-center gap-3 rounded-2xl glass px-4 py-3">
              <f.icon className="h-4 w-4 text-glow" />
              <span className="text-sm text-white">{f.t}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

/* ------------------------------- Section 10 ------------------------------ */

const CTA = () => (
  <section id="cta" className="relative overflow-hidden py-36">
    <div className="absolute inset-0 -z-10">
      <img src={skyline} alt="" loading="lazy" className="h-full w-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/60 to-ink" />
      <div className="absolute inset-0 grid-lines opacity-30" />
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-glow/20 blur-3xl" />
    </div>
    <Container>
      <div className="mx-auto max-w-4xl text-center">
        <Eyebrow>Early access · Limited</Eyebrow>
        <h2 className="mt-6 text-balance text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
          <span className="text-gradient-silver">Finance should feel</span>
          <br />
          <span className="text-gradient-blue">intelligent, seamless and borderless.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-silver/70">
          DIRHAMPAY — building the next generation financial ecosystem.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-medium text-ink transition hover:bg-white/90"
          >
            Join Early Access
            <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full glass px-7 py-4 text-sm text-white transition hover:bg-white/10"
          >
            Contact Us
          </a>
        </div>
      </div>
    </Container>
  </section>
);

/* -------------------------------- Footer --------------------------------- */

const Footer = () => (
  <footer className="border-t border-white/5 py-14">
    <Container>
      <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
        <div className="col-span-2">
          <div className="flex items-center gap-2.5">
            <div className="grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-white/20 to-white/5 hairline text-[11px] font-bold text-white">
              D
            </div>
            <span className="text-sm font-semibold tracking-[0.18em] text-white">
              DIRHAMPAY
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-silver/60">
            The future financial lifestyle ecosystem — built in Dubai, designed
            for the world.
          </p>
        </div>
        {[
          { h: "Product", l: ["Wallet", "Exchange", "Gold", "Crypto", "AI"] },
          { h: "Company", l: ["About", "Careers", "Press", "Contact"] },
          { h: "Legal", l: ["Terms", "Privacy", "Security", "Licenses"] },
        ].map((c) => (
          <div key={c.h}>
            <div className="text-[11px] uppercase tracking-widest text-silver/40">
              {c.h}
            </div>
            <ul className="mt-4 space-y-2">
              {c.l.map((x) => (
                <li key={x}>
                  <a href="#" className="text-sm text-silver/70 hover:text-white">
                    {x}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/5 pt-6 text-xs text-silver/40 md:flex-row md:items-center">
        <div>© {new Date().getFullYear()} DIRHAMPAY. All rights reserved.</div>
        <div>Dubai · United Arab Emirates</div>
      </div>
    </Container>
  </footer>
);

/* ---------------------------------- App ---------------------------------- */

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Nav />
      <main>
        <Hero />
        <Section2 />
        <Exchange />
        <Gold />
        <Crypto />
        <AISection />
        <Social />
        <WhyDubai />
        <Mobile />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
