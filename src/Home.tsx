import { useEffect, useRef, useState, FormEvent, ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, ShieldCheck, Zap, Globe2, Bot, Coins, Bitcoin,
  Sparkles, Send, CircleDollarSign, TrendingUp, CheckCircle2, Plus, Minus,
  Star, Lock, Fingerprint, Cpu, Wallet, Smartphone, Instagram,
  Menu, X,
} from "lucide-react";
import { track } from "./lib/analytics";

/* =========================================================
   PRIMITIVES
========================================================= */
const Container = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`mx-auto w-full max-w-7xl px-6 md:px-10 ${className}`}>{children}</div>
);

const Eyebrow = ({ children, tone = "blue" }: { children: ReactNode; tone?: "blue" | "gold" }) => (
  <span className={`inline-flex items-center gap-2 rounded-full hairline px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] ${tone === "gold" ? "text-gold" : "text-glow"}`}>
    <span className={`h-1.5 w-1.5 rounded-full ${tone === "gold" ? "bg-gold" : "bg-glow"} shadow-[0_0_10px_currentColor]`} />
    {children}
  </span>
);

const SectionHead = ({ eyebrow, title, sub, tone }: { eyebrow: string; title: ReactNode; sub?: string; tone?: "blue" | "gold" }) => (
  <div className="mx-auto max-w-3xl text-center">
    <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
    <h2 className="font-display mt-5 text-balance text-4xl font-semibold leading-[1.05] text-gradient-silver md:text-6xl">{title}</h2>
    {sub && <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-silver/80 md:text-lg">{sub}</p>}
  </div>
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

/* =========================================================
   NAV
========================================================= */
const navLinks = [
  { to: "/features", label: "Features" },
  { to: "/pricing", label: "Pricing" },
  { to: "/security", label: "Security" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    const prevPad = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    return () => {
      document.body.style.overflow = prev;
      document.body.style.paddingRight = prevPad;
    };
  }, [open]);
  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const on = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "bg-ink/70 backdrop-blur-xl border-b border-white/[0.06]" : "bg-transparent"}`}>
      <Container className="flex h-16 items-center justify-between md:h-20">
        <Link to="/" className="flex items-center gap-2.5" aria-label="Shoho Pay home">
          <img src="/logo.png" alt="Shoho Pay" className="h-9 w-9 rounded-lg object-contain" />
          <span className="font-display text-sm font-semibold tracking-[0.22em] text-snow">SHOHO PAY</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm transition ${isActive ? "bg-white/10 text-snow" : "text-silver hover:text-snow"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Link to="/auth" className="rounded-full px-4 py-2 text-sm text-silver hover:text-snow">Sign in</Link>
          <Link to="/waitlist" onClick={() => track("cta_click", { button_label: "nav_waitlist" })} className="group inline-flex items-center gap-1.5 rounded-full bg-glow px-4 py-2 text-sm font-medium text-white shadow-[0_8px_30px_-8px_rgba(45,127,255,0.6)] transition hover:bg-glow/90">
            Join Waitlist <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
          </Link>
        </div>
        <button onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open} className="grid h-10 w-10 place-items-center rounded-full glass md:hidden">
          <Menu className="h-4 w-4 text-snow" />
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="bd"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-ink/70 backdrop-blur-xl md:hidden"
              aria-hidden
            />
            {/* Sheet */}
            <motion.div
              key="sheet"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{ y: "-100%", opacity: 0.6 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-0 top-0 z-[70] flex max-h-[100dvh] flex-col overflow-y-auto overscroll-contain bg-ink/95 backdrop-blur-2xl pb-[max(env(safe-area-inset-bottom),1rem)] md:hidden"
              style={{ paddingTop: "max(env(safe-area-inset-top), 0px)" }}
            >
              <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
                <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2.5">
                  <img src="/logo.png" alt="Shoho Pay" className="h-9 w-9 rounded-lg object-contain" />
                  <span className="font-display text-sm font-semibold tracking-[0.22em] text-snow">SHOHO PAY</span>
                </Link>
                <button onClick={() => setOpen(false)} aria-label="Close menu" className="grid h-10 w-10 place-items-center rounded-full glass">
                  <X className="h-4 w-4 text-snow" />
                </button>
              </div>
              <nav className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-6 pt-4" aria-label="Mobile">
                {navLinks.map((l, i) => (
                  <motion.div
                    key={l.to}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <NavLink
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `block rounded-2xl px-5 py-4 text-xl transition ${isActive ? "bg-white/10 text-snow" : "text-snow hover:bg-white/5"}`
                      }
                    >
                      {l.label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>
              <div className="mx-auto mt-6 flex w-full max-w-7xl flex-col gap-3 px-6">
                <Link to="/auth" onClick={() => setOpen(false)} className="rounded-full glass px-5 py-3.5 text-center text-sm text-snow">Sign in</Link>
                <Link to="/waitlist" onClick={() => setOpen(false)} className="rounded-full bg-glow px-5 py-3.5 text-center text-sm font-medium text-white">Join Waitlist</Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

/* =========================================================
   HERO
========================================================= */
const HeroParticles = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cvs = ref.current; if (!cvs) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = cvs.getContext("2d")!;
    let w = 0, h = 0, raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };
    const N = window.innerWidth < 768 ? 50 : 90;
    type P = { x: number; y: number; vx: number; vy: number };
    let pts: P[] = [];
    const resize = () => {
      w = cvs.clientWidth; h = cvs.clientHeight;
      cvs.width = w * dpr; cvs.height = h * dpr; ctx.scale(dpr, dpr);
      pts = Array.from({ length: N }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25 }));
    };
    resize();
    const onMove = (e: PointerEvent) => { const r = cvs.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    cvs.addEventListener("pointermove", onMove); cvs.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", resize);
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
        if (d2 < 10000) { const f = (1 - d2 / 10000) * 0.6; p.vx += (dx / Math.sqrt(d2 || 1)) * f; p.vy += (dy / Math.sqrt(d2 || 1)) * f; }
        p.vx *= 0.96; p.vy *= 0.96;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i], b = pts[j], dx = a.x - b.x, dy = a.y - b.y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) { ctx.strokeStyle = `rgba(45,127,255,${(1 - d / 110) * 0.18})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
        }
      }
      ctx.fillStyle = "rgba(45,127,255,0.55)";
      for (const p of pts) { ctx.beginPath(); ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2); ctx.fill(); }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); cvs.removeEventListener("pointermove", onMove); cvs.removeEventListener("pointerleave", onLeave); };
  }, []);
  return <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />;
};

const TitaniumCard = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const ry = useTransform(scrollYProgress, [0, 1], [-25, 25]);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const onMove = (e: React.PointerEvent) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -py * 12, y: px * 14 });
  };
  return (
    <div ref={ref} className="relative mx-auto aspect-[1.586/1] w-full max-w-md [perspective:1200px]" onPointerLeave={() => setTilt({ x: 0, y: 0 })}>
      <motion.div
        style={{ rotateY: ry, transformStyle: "preserve-3d" }}
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 80, damping: 14 }}
        onPointerMove={onMove}
        className="titanium relative h-full w-full rounded-3xl p-6 will-change-transform"
      >
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          <div className="absolute -inset-x-1 -top-1/3 h-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/15 to-transparent shimmer" />
        </div>
        <div className="relative flex h-full flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="font-display text-sm font-semibold tracking-[0.3em] text-snow/90">SHOHO</div>
            <div className="h-7 w-10 rounded-md bg-gradient-gold opacity-90" />
          </div>
          <div className="space-y-2">
            <div className="font-mono text-base tracking-[0.25em] text-snow/85">5212  ••••  ••••  9947</div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[9px] uppercase tracking-widest text-silver/60">Cardholder</div>
                <div className="text-xs text-snow/85">YOUR NAME</div>
              </div>
              <div className="text-right">
                <div className="text-[9px] uppercase tracking-widest text-silver/60">Exp</div>
                <div className="text-xs text-snow/85">11 / 29</div>
              </div>
              <div className="font-display text-xl font-bold italic text-snow/90">VISA</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Hero = () => (
  <section className="relative isolate overflow-hidden pt-32 md:pt-44">
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 grid-lines opacity-[0.15]" />
      <HeroParticles />
      <div className="absolute -left-32 top-40 h-[400px] w-[400px] rounded-full bg-glow/20 blur-[120px]" />
      <div className="absolute -right-20 top-10 h-[360px] w-[360px] rounded-full bg-gold/10 blur-[120px]" />
    </div>
    <Container className="relative grid items-center gap-14 pb-24 md:grid-cols-2 md:pb-32">
      <div>
        <Reveal>
          <Eyebrow>Now in Private Beta · UAE</Eyebrow>
        </Reveal>
        <h1 className="font-display mt-6 text-balance text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
          <span className="text-gradient-silver">The Future of Money.</span><br />
          <span className="text-gradient-blue">Built for the UAE.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-silver/85">
          One app for payments, crypto, gold and AI-powered financial intelligence — engineered in Dubai for the world.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/waitlist" onClick={() => track("cta_click", { button_label: "hero_waitlist" })} className="group inline-flex items-center justify-center gap-2 rounded-full bg-glow px-6 py-4 text-sm font-medium text-white shadow-[0_14px_40px_-10px_rgba(45,127,255,0.7)] transition hover:bg-glow/90">
            Join the Waitlist <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
          <a href="#demo" onClick={() => track("cta_click", { button_label: "hero_demo" })} className="inline-flex items-center justify-center gap-2 rounded-full glass px-6 py-4 text-sm text-snow hover:bg-white/10">
            Watch the Demo <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-silver/70">
          <span className="inline-flex items-center gap-1.5"><Lock className="h-3.5 w-3.5 text-glow" /> 256-bit encryption</span>
          <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-glow" /> UAE Central Bank compliant</span>
          <span className="inline-flex items-center gap-1.5"><Fingerprint className="h-3.5 w-3.5 text-glow" /> Biometric secured</span>
        </div>
      </div>
      <Reveal delay={0.15}>
        <TitaniumCard />
      </Reveal>
    </Container>
  </section>
);

/* =========================================================
   TRUSTED BY
========================================================= */
const press = ["FORBES MIDDLE EAST", "GULF NEWS", "ARABIAN BUSINESS", "KHALEEJ TIMES", "TECHCRUNCH", "BLOOMBERG"];
const TrustedBy = () => (
  <section className="relative py-16">
    <Container>
      <p className="text-center text-[11px] uppercase tracking-[0.3em] text-silver/60">Featured in</p>
      <div className="mt-8 grid grid-cols-2 items-center gap-x-8 gap-y-6 md:grid-cols-6">
        {press.map((p) => (
          <div key={p} className="text-center font-display text-xs font-semibold tracking-[0.18em] text-silver/50 transition hover:text-silver/80">{p}</div>
        ))}
      </div>
    </Container>
  </section>
);

/* =========================================================
   PRODUCT DEMO (3 phones / mock app)
========================================================= */
const txns = [
  { name: "Carrefour MOE", amount: -184.5, type: "Card", color: "text-rose-300" },
  { name: "Salary · DMCC FZE", amount: 18250, type: "Inbound", color: "text-emerald-300" },
  { name: "Emirates Airlines", amount: -2849, type: "Card", color: "text-rose-300" },
  { name: "Send · Ahmed K.", amount: -500, type: "P2P", color: "text-rose-300" },
  { name: "Gold buy · 2.4g", amount: -612.4, type: "Vault", color: "text-rose-300" },
  { name: "BTC · 0.012", amount: -1340, type: "Crypto", color: "text-rose-300" },
  { name: "Refund · Noon", amount: 89, type: "Inbound", color: "text-emerald-300" },
];

const PhoneMock = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`relative mx-auto aspect-[9/19] w-[260px] rounded-[42px] bg-gradient-to-b from-[#1a1a1f] to-black p-1.5 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)] ${className}`}>
    <div className="absolute left-1/2 top-1.5 z-10 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-black" />
    <div className="relative h-full w-full overflow-hidden rounded-[36px] bg-ink p-4">{children}</div>
  </div>
);

const ProductDemo = () => (
  <section id="demo" className="relative py-24 md:py-32">
    <Container>
      <SectionHead eyebrow="Product · Live Demo" title={<>One app. <span className="text-gradient-blue">Every asset.</span></>} sub="Move money, hold gold, trade crypto and let Billy keep your finances in flow — without leaving Shoho." />
      <div className="mt-16 grid items-center gap-10 lg:grid-cols-3">
        <Reveal>
          <PhoneMock>
            <div className="text-[10px] uppercase tracking-widest text-silver/60">Wallet</div>
            <div className="font-display mt-1 text-3xl font-semibold text-snow">AED 24,182<span className="text-silver/40">.40</span></div>
            <div className="mt-1 text-xs text-emerald-300">+ 2.4% this week</div>
            <div className="mt-5 grid grid-cols-4 gap-2">
              {[{i: Send, l:"Send"},{i: CircleDollarSign, l:"Convert"},{i: Coins, l:"Gold"},{i: Bitcoin, l:"Crypto"}].map(({i:Ic,l})=> (
                <div key={l} className="rounded-2xl glass p-3 text-center">
                  <Ic className="mx-auto h-4 w-4 text-glow" />
                  <div className="mt-1.5 text-[10px] text-silver">{l}</div>
                </div>
              ))}
            </div>
            <div className="mt-5 text-[10px] uppercase tracking-widest text-silver/60">Recent</div>
            <div className="mt-2 space-y-2">
              {txns.slice(0,4).map((t)=>(
                <div key={t.name} className="flex items-center justify-between rounded-xl glass px-3 py-2">
                  <div>
                    <div className="text-[11px] text-snow">{t.name}</div>
                    <div className="text-[9px] uppercase tracking-widest text-silver/50">{t.type}</div>
                  </div>
                  <div className={`font-mono text-[11px] ${t.color}`}>{t.amount > 0 ? "+" : ""}{t.amount.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </PhoneMock>
        </Reveal>
        <Reveal delay={0.1}>
          <PhoneMock className="lg:-translate-y-6">
            <div className="text-[10px] uppercase tracking-widest text-silver/60">Billy · AI Accountant</div>
            <div className="mt-3 rounded-2xl glass-strong p-3 text-[11px] text-snow leading-relaxed">
              You're 12% under budget this month. Want me to auto-move <span className="text-glow">AED 1,000</span> to your gold vault?
            </div>
            <div className="mt-2 flex gap-2">
              <button className="flex-1 rounded-full bg-glow py-1.5 text-[11px] font-medium text-white">Yes, move it</button>
              <button className="rounded-full glass px-3 py-1.5 text-[11px] text-silver">Later</button>
            </div>
            <div className="mt-4 text-[10px] uppercase tracking-widest text-silver/60">Insights</div>
            <div className="mt-2 space-y-2">
              {["Smart budgeting in real time", "Auto-save when you're under budget", "FX optimized at interbank rates"].map((i)=>(
                <div key={i} className="flex items-center gap-2 rounded-xl glass px-3 py-2 text-[11px] text-snow">
                  <Sparkles className="h-3 w-3 text-glow" /> {i}
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-2xl bg-gradient-to-br from-glow/30 to-glow/0 p-3 text-[11px] text-snow">
              <TrendingUp className="mb-1 inline h-3.5 w-3.5 text-glow" /> Billy keeps your money on plan — automatically.
            </div>
          </PhoneMock>
        </Reveal>
        <Reveal delay={0.2}>
          <PhoneMock>
            <div className="text-[10px] uppercase tracking-widest text-silver/60">Gold Vault</div>
            <div className="font-display mt-1 text-3xl font-semibold text-gradient-gold">14.82 g</div>
            <div className="mt-1 text-xs text-silver/70">≈ AED 4,128 · 24K</div>
            <div className="mt-4 h-32 rounded-2xl bg-gradient-to-br from-gold/30 via-gold/10 to-transparent p-4">
              <div className="flex items-end justify-between h-full">
                {[24,38,30,52,46,68,72,60,78,84,90,96].map((h,i)=>(
                  <div key={i} className="w-2 rounded-full bg-gold-grad" style={{ height: `${h}%`, opacity: 0.4 + i*0.04 }} />
                ))}
              </div>
            </div>
            <button className="mt-4 w-full rounded-full bg-gradient-gold py-2.5 text-xs font-semibold text-ink">Buy Gold</button>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="rounded-xl glass p-2.5">
                <div className="text-[9px] uppercase tracking-widest text-silver/60">BTC</div>
                <div className="font-mono text-xs text-snow">$68,402</div>
              </div>
              <div className="rounded-xl glass p-2.5">
                <div className="text-[9px] uppercase tracking-widest text-silver/60">ETH</div>
                <div className="font-mono text-xs text-snow">$3,184</div>
              </div>
            </div>
          </PhoneMock>
        </Reveal>
      </div>
    </Container>
  </section>
);

/* =========================================================
   FEATURE CARDS
========================================================= */
const features = [
  { i: Wallet, t: "Multi-Currency Wallet", d: "Hold AED, USD, EUR, GBP and 30+ currencies. Spend natively — no FX surprises." },
  { i: Bitcoin, t: "Crypto, Made Simple", d: "Buy, hold and swap BTC, ETH and majors with institutional-grade custody." },
  { i: Coins, t: "Digital Gold", d: "Buy 24K gold by the gram. Vaulted, insured and redeemable in Dubai." },
  { i: Bot, t: "Billy — AI Accountant", d: "Your money's chief of staff. Budgets, forecasts and auto-saves on autopilot." },
  { i: Zap, t: "Instant Transfers", d: "Send to anyone — wallet to wallet — in seconds. Locally and worldwide." },
  { i: Globe2, t: "Real Interbank FX", d: "Mid-market rates, zero hidden spreads. The honest way to move money." },
];

const Features = () => (
  <section className="relative py-24 md:py-32">
    <Container>
      <SectionHead eyebrow="Capabilities" title={<>Everything your money <span className="text-gradient-blue">can do.</span></>} sub="Six core capabilities, woven into one calm interface." />
      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <Reveal key={f.t} delay={i * 0.06}>
            <div className="group relative h-full overflow-hidden rounded-3xl glass-card p-7 transition duration-500 hover:-translate-y-2 hover:border-glow/30">
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-glow/10 blur-3xl opacity-0 transition group-hover:opacity-100" />
              <div className="relative">
                <div className="grid h-11 w-11 place-items-center rounded-xl glass">
                  <f.i className="h-5 w-5 text-glow" />
                </div>
                <h3 className="font-display mt-5 text-xl font-semibold text-snow">{f.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-silver/75">{f.d}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Container>
  </section>
);

/* =========================================================
   AI SECTION
========================================================= */
const AISection = () => (
  <section className="relative overflow-hidden py-24 md:py-32">
    <div aria-hidden className="absolute inset-0 -z-10 dots-bg opacity-[0.3]" />
    <Container className="grid items-center gap-14 md:grid-cols-2">
      <Reveal>
        <Eyebrow>Meet Billy</Eyebrow>
        <h2 className="font-display mt-5 text-balance text-4xl font-semibold leading-[1.05] text-gradient-silver md:text-5xl">
          The first <span className="text-gradient-blue">AI accountant</span> inside a wallet.
        </h2>
        <p className="mt-5 text-base leading-relaxed text-silver/80 md:text-lg">
          Billy watches every dirham — categorising, forecasting, negotiating and quietly optimising your finances in real time. Calm, private, always on your side.
        </p>
        <ul className="mt-7 space-y-3 text-sm text-silver">
          {["Real-time budgeting that adapts to your life", "Auto-save & auto-invest rules that compound quietly", "Forecast your runway 90 days out — with confidence bands", "Privacy-first: your data never trains a public model"].map((p) => (
            <li key={p} className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-glow" /> {p}</li>
          ))}
        </ul>
        <Link to="/features" className="mt-8 inline-flex items-center gap-1.5 text-sm text-snow hover:gap-2 transition-all">Explore the intelligence layer <ArrowRight className="h-4 w-4" /></Link>
      </Reveal>
      <Reveal delay={0.15}>
        <div className="relative mx-auto aspect-square w-full max-w-md">
          <div className="absolute inset-0 rounded-full bg-glow/20 blur-3xl animate-pulse-glow" />
          <div className="absolute inset-8 rounded-full border border-glow/30" />
          <div className="absolute inset-16 rounded-full border border-glow/20" />
          <div className="absolute inset-24 rounded-full border border-glow/10" />
          <div className="absolute left-1/2 top-1/2 grid h-28 w-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gradient-to-br from-glow to-glow/40 glow-blue">
            <Bot className="h-12 w-12 text-white" />
          </div>
          {[
            { ic: TrendingUp, t: "On budget", cls: "top-6 left-4" },
            { ic: Sparkles, t: "Smart insights", cls: "bottom-12 right-2" },
            { ic: Coins, t: "Auto-save on", cls: "bottom-4 left-10" },
            { ic: Zap, t: "Interbank FX", cls: "top-16 right-4" },
          ].map((b, i) => (
            <motion.div key={b.t} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }} className={`absolute ${b.cls} flex items-center gap-2 rounded-full glass-strong px-3 py-2 text-[11px] text-snow shadow-xl`}>
              <b.ic className="h-3.5 w-3.5 text-glow" /> {b.t}
            </motion.div>
          ))}
        </div>
      </Reveal>
    </Container>
  </section>
);

/* =========================================================
   FX ORBIT
========================================================= */
const fxItems = [
  { sym: "USD", rate: "1 USD = 3.6725 AED" },
  { sym: "EUR", rate: "1 EUR = 3.98 AED" },
  { sym: "GBP", rate: "1 GBP = 4.64 AED" },
  { sym: "BTC", rate: "1 BTC = $68,402" },
  { sym: "ETH", rate: "1 ETH = $3,184" },
  { sym: "XAU", rate: "1g Gold = AED 278" },
];

const FXSection = () => (
  <section className="relative overflow-hidden py-24 md:py-32">
    <Container className="grid items-center gap-14 md:grid-cols-2">
      <Reveal>
        <div className="relative mx-auto aspect-square w-full max-w-md">
          <div className="absolute inset-0 grid place-items-center">
            <div className="relative h-32 w-32 rounded-full bg-gradient-to-br from-glow via-glow/60 to-glow/10 glow-blue">
              <div className="absolute inset-2 rounded-full bg-ink grid place-items-center">
                <Globe2 className="h-12 w-12 text-glow" />
              </div>
            </div>
          </div>
          {fxItems.map((it, i) => {
            const r = 150 + (i % 3) * 30;
            return (
              <div key={it.sym} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ ["--r" as string]: `${r}px`, animation: `orbit ${20 + i * 3}s linear infinite` }}>
                <div className="group relative grid h-12 w-12 place-items-center rounded-full glass-strong font-mono text-[10px] font-semibold text-snow">
                  {it.sym}
                  <div className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full glass px-2.5 py-1 text-[10px] text-silver opacity-0 transition group-hover:opacity-100">
                    {it.rate}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <Eyebrow>Borderless FX</Eyebrow>
        <h2 className="font-display mt-5 text-balance text-4xl font-semibold leading-[1.05] text-gradient-silver md:text-5xl">
          Real <span className="text-gradient-blue">interbank rates.</span> No hidden spreads.
        </h2>
        <p className="mt-5 text-base leading-relaxed text-silver/80 md:text-lg">
          30+ currencies, gold and crypto — all on one balance, all at the rates the banks actually use. Move money like you mean it.
        </p>
        <div className="mt-7 grid grid-cols-2 gap-3">
          {fxItems.slice(0,4).map((it) => (
            <div key={it.sym} className="rounded-2xl glass-card p-4">
              <div className="font-mono text-[10px] uppercase tracking-widest text-silver/60">{it.sym}</div>
              <div className="font-display mt-1 text-base text-snow">{it.rate}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </Container>
  </section>
);

/* =========================================================
   STATS
========================================================= */
const Counter = ({ to, prefix = "", suffix = "", duration = 2.4 }: { to: number; prefix?: string; suffix?: string; duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 4);
      setN(Math.round(to * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return <span ref={ref} className="font-display tabular-nums">{prefix}{n.toLocaleString()}{suffix}</span>;
};

const Stats = () => null;

/* =========================================================
   GOLD
========================================================= */
const GoldSection = () => (
  <section className="relative overflow-hidden py-24 md:py-32">
    <div aria-hidden className="absolute inset-0 -z-10">
      <div className="absolute right-0 top-1/4 h-[420px] w-[420px] rounded-full bg-gold/15 blur-[120px]" />
    </div>
    <Container className="grid items-center gap-14 md:grid-cols-2">
      <Reveal>
        <Eyebrow tone="gold">Digital Gold · Dubai-vaulted</Eyebrow>
        <h2 className="font-display mt-5 text-balance text-4xl font-semibold leading-[1.05] md:text-5xl">
          <span className="text-gradient-silver">Buy gold by the gram.</span><br/>
          <span className="text-gradient-gold">Redeemable in Dubai.</span>
        </h2>
        <p className="mt-5 text-base leading-relaxed text-silver/80 md:text-lg">
          24K investment-grade gold. Stored in a Dubai vault, insured by Lloyd's, redeemable as physical bars whenever you want.
        </p>
        <div className="mt-7 grid grid-cols-3 gap-3">
          {[{l:"Starts at",v:"AED 25"},{l:"Purity",v:"24K"},{l:"Storage",v:"Free"}].map((s)=>(
            <div key={s.l} className="rounded-2xl glass-card p-4">
              <div className="text-[10px] uppercase tracking-widest text-silver/60">{s.l}</div>
              <div className="font-display mt-1 text-xl text-snow">{s.v}</div>
            </div>
          ))}
        </div>
      </Reveal>
      <Reveal delay={0.15}>
        <div className="relative mx-auto aspect-square w-full max-w-md">
          <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-gold/40 via-gold/10 to-transparent blur-2xl" />
          <div className="relative h-full w-full rounded-[40px] glass-strong p-8">
            <div className="grid h-full grid-rows-4 gap-3">
              {[1,0.85,0.7,0.55].map((s, i)=>(
                <div key={i} className="relative overflow-hidden rounded-2xl bg-gradient-gold glow-gold" style={{ transform: `scaleX(${s})`, transformOrigin: "left" }}>
                  <div className="shimmer absolute inset-0" />
                  <div className="absolute inset-0 flex items-center justify-between px-4 text-[10px] font-mono text-ink/70">
                    <span>SHOHO · 999.9 FINE GOLD</span>
                    <span>{(0.5 + i*0.5).toFixed(1)} OZ</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </Container>
  </section>
);

/* =========================================================
   SECURITY
========================================================= */
const SecuritySection = () => (
  <section className="relative py-24 md:py-32">
    <Container>
      <SectionHead eyebrow="Security · By Design" title={<>Engineered to be <span className="text-gradient-blue">untouchable.</span></>} sub="Bank-grade defence-in-depth — independently audited, continuously verified." />
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {[
          { i: Lock, t: "256-bit Encryption", d: "End-to-end, at rest and in flight. Zero-knowledge architecture for key material." },
          { i: Fingerprint, t: "Biometric Auth", d: "Face ID, fingerprint, hardware-key support and per-device session binding." },
          { i: ShieldCheck, t: "Regulated & Compliant", d: "UAE Central Bank aligned · DIFC registered · ISO 27001 · PCI-DSS." },
          { i: Cpu, t: "Custody-Grade Vault", d: "Cold storage with multi-sig and HSMs — the same posture used by institutions." },
          { i: Sparkles, t: "AI Fraud Watch", d: "Billy flags anomalies in milliseconds and pauses suspicious flows before they ship." },
          { i: Smartphone, t: "Instant Freeze", d: "Lose your phone? Freeze cards, sessions and crypto access from any device." },
        ].map((s, i) => (
          <Reveal key={s.t} delay={i * 0.05}>
            <div className="h-full rounded-3xl glass-card p-7">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-glow/10 text-glow"><s.i className="h-5 w-5" /></div>
              <h3 className="font-display mt-5 text-lg font-semibold text-snow">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-silver/75">{s.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Container>
  </section>
);

/* =========================================================
   TESTIMONIALS
========================================================= */
const quotes = [
  { q: "Shoho replaced four apps in my pocket. The AI assistant is the part I didn't know I needed.", n: "Layla H.", r: "Founder · Dubai" },
  { q: "Saved me AED 12,000 in transfer fees last year. The FX rates are simply honest.", n: "Marcus W.", r: "Operator · Abu Dhabi" },
  { q: "Buying gold from my phone, vaulted in Dubai, while Billy budgets in the background. Brilliant.", n: "Fatima A.", r: "Designer · Sharjah" },
];

const Testimonials = () => (
  <section className="relative py-24 md:py-32">
    <Container>
      <SectionHead eyebrow="Loved by the UAE" title={<>Built for how the <span className="text-gradient-blue">UAE moves money.</span></>} />
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {quotes.map((q, i) => (
          <Reveal key={q.n} delay={i * 0.08}>
            <figure className="h-full rounded-3xl glass-card p-7">
              <div className="flex gap-0.5 text-gold">{Array.from({length:5}).map((_,j)=><Star key={j} className="h-4 w-4 fill-current" />)}</div>
              <blockquote className="mt-4 text-base leading-relaxed text-snow">"{q.q}"</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-glow to-glow/30 text-xs font-semibold text-white">{q.n.split(" ").map(p=>p[0]).join("")}</div>
                <div>
                  <div className="text-sm text-snow">{q.n}</div>
                  <div className="text-xs text-silver/60">{q.r}</div>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Container>
  </section>
);

/* =========================================================
   PRICING PREVIEW
========================================================= */
const plans = [
  { n: "Lite", p: "Free", d: "Everything you need to start.", f: ["Multi-currency wallet", "Send & receive in seconds", "Billy AI · essentials"], cta: "Start free" },
  { n: "Plus", p: "AED 29", s: "/mo", d: "For people who move money seriously.", f: ["Real interbank FX", "Gold vault · zero fees", "Crypto with priority spreads", "Billy AI · forecasting"], cta: "Go Plus", featured: true },
  { n: "Private", p: "AED 199", s: "/mo", d: "Concierge-grade finance for high-net-worth.", f: ["Dedicated relationship manager", "Higher limits, lower spreads", "Bespoke AI playbooks", "Priority custody & support"], cta: "Apply" },
];

const PricingPreview = () => (
  <section className="relative py-24 md:py-32">
    <Container>
      <SectionHead eyebrow="Pricing" title={<>Simple plans. <span className="text-gradient-blue">No surprises.</span></>} sub="Pay only for what you use. Cancel anytime." />
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {plans.map((pl, i) => (
          <Reveal key={pl.n} delay={i * 0.08}>
            <div className={`relative h-full rounded-3xl p-8 ${pl.featured ? "glass-strong border-glow/40 glow-blue" : "glass-card"}`}>
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
          </Reveal>
        ))}
      </div>
    </Container>
  </section>
);

/* =========================================================
   FAQ
========================================================= */
const faqs = [
  { q: "Is Shoho Pay licensed in the UAE?", a: "Yes — Shoho Pay operates aligned with UAE Central Bank guidelines and is registered in DIFC. Custody and gold vaulting are handled by regulated institutional partners." },
  { q: "What does Billy, the AI assistant, actually do?", a: "Billy categorises spending in real time, builds adaptive budgets, forecasts your runway, negotiates better subscriptions and quietly auto-saves or auto-invests according to rules you set." },
  { q: "Can I redeem my digital gold as physical bars?", a: "Absolutely. Any balance over 10g can be redeemed as physical 24K gold from our Dubai partner vault, with delivery or in-person collection." },
  { q: "Which currencies and assets are supported?", a: "AED, USD, EUR, GBP, and 30+ more currencies. Plus BTC, ETH and majors for crypto, and 24K gold by the gram." },
  { q: "How is my money protected?", a: "256-bit end-to-end encryption, biometric login, multi-sig cold custody for crypto, insured gold vaulting, ISO 27001 and PCI-DSS aligned operations." },
];

const FAQ = () => {
  const [open, setOpen] = useState(0);
  return (
    <section className="relative py-24 md:py-32">
      <Container>
        <SectionHead eyebrow="FAQ" title={<>Answered <span className="text-gradient-blue">honestly.</span></>} />
        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.05}>
                <div className="overflow-hidden rounded-2xl glass-card">
                  <button onClick={() => { setOpen(isOpen ? -1 : i); track("faq_expanded", { question: f.q }); }} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-4 p-5 text-left">
                    <span className="font-display text-base font-medium text-snow md:text-lg">{f.q}</span>
                    <span className="grid h-8 w-8 flex-none place-items-center rounded-full glass">
                      {isOpen ? <Minus className="h-4 w-4 text-glow" /> : <Plus className="h-4 w-4 text-glow" />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.22,1,0.36,1] }}>
                        <div className="px-5 pb-5 text-sm leading-relaxed text-silver/80">{f.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        })
      }} />
    </section>
  );
};

/* =========================================================
   FINAL CTA + WAITLIST FORM
========================================================= */
export const WaitlistForm = ({ compact = false }: { compact?: boolean }) => {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setErrMsg(null);
    if (website) return; // bot honeypot
    const clean = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean) || clean.length > 254) {
      setErrMsg("Please enter a valid email address.");
      return;
    }
    setState("loading");
    try {
      const { supabase } = await import("./integrations/supabase/client");
      const { error } = await supabase
        .from("waitlist")
        .insert({
          email: clean,
          source: typeof window !== "undefined" ? window.location.pathname : null,
          user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
        });
      if (error) {
        // Postgres unique-violation code = 23505
        if ((error as any).code === "23505" || /duplicate/i.test(error.message)) {
          setState("done");
          track("waitlist_signup_duplicate", { email_domain: clean.split("@")[1] });
          return;
        }
        throw error;
      }
      setState("done");
      track("waitlist_signup", { email_domain: clean.split("@")[1] });
    } catch (err: any) {
      setState("idle");
      setErrMsg(err?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className={`mx-auto w-full ${compact ? "max-w-md" : "max-w-lg"}`}>
      <form onSubmit={submit} className="flex w-full flex-col gap-3 sm:flex-row">
        <input type="text" name="website" value={website} onChange={(e)=>setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
        <label className="sr-only" htmlFor="wl-email">Email</label>
        <input
          id="wl-email"
          type="email"
          required
          maxLength={120}
          placeholder="you@dubai.ae"
          value={email}
          onChange={(e)=>{ setEmail(e.target.value); if (errMsg) setErrMsg(null); }}
          disabled={state === "done"}
          className="flex-1 rounded-full bg-white/[0.04] px-5 py-3.5 text-sm text-snow outline-none transition placeholder:text-silver/40 hairline focus:bg-white/[0.07] focus:ring-2 focus:ring-glow/40 disabled:opacity-60"
        />
        <button type="submit" disabled={state !== "idle"} className="inline-flex items-center justify-center gap-2 rounded-full bg-glow px-6 py-3.5 text-sm font-medium text-white transition hover:bg-glow/90 disabled:opacity-70">
          {state === "loading" && <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />}
          {state === "done" ? <><CheckCircle2 className="h-4 w-4" /> You're in</> : "Join Waitlist"}
        </button>
      </form>
      {errMsg && <p className="mt-2 text-center text-xs text-red-300" role="alert">{errMsg}</p>}
      {state === "done" && (
        <p className="mt-3 text-center text-xs text-emerald-300">
          Thank you — your email is on the list. We'll be in touch.
        </p>
      )}
    </div>
  );
};

const FinalCTA = () => (
  <section className="relative overflow-hidden py-24 md:py-32">
    <div aria-hidden className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute left-1/2 top-0 h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-glow/15 blur-[120px]" />
    </div>
    <Container className="text-center">
      <Reveal>
        <Eyebrow>Early Access · Limited</Eyebrow>
        <h2 className="font-display mx-auto mt-5 max-w-3xl text-balance text-5xl font-semibold leading-[1.02] text-gradient-silver md:text-7xl">
          Money is changing.<br/><span className="text-gradient-blue">Be early.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base text-silver/80 md:text-lg">Join the Shoho Pay waitlist. We'll email you when your seat opens.</p>
        <div className="mt-9"><WaitlistForm /></div>
        <p className="mt-4 text-[11px] text-silver/50">Single opt-in. We never share your email. Spam-protected.</p>
      </Reveal>
    </Container>
  </section>
);

/* =========================================================
   FOOTER
========================================================= */
const footerCols = [
  { t: "Product", links: [["Features","/features"], ["Pricing","/pricing"], ["Security","/security"], ["Waitlist","/waitlist"]] as const },
  { t: "Company", links: [["About","/about"], ["Contact","/contact"]] as const },
  { t: "Legal",   links: [["Privacy","/contact"], ["Terms","/contact"], ["Compliance","/security"]] as const },
];

export const Footer = () => (
  <footer className="relative border-t border-white/[0.06] py-16">
    <Container>
      <div className="grid gap-12 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Shoho Pay" className="h-9 w-9 rounded-lg object-contain" />
            <span className="font-display text-sm font-semibold tracking-[0.22em] text-snow">SHOHO PAY</span>
          </div>
          <p className="mt-5 max-w-sm text-sm text-silver/70">The luxury wallet of the UAE — payments, crypto, gold and Billy, your AI accountant. Built in Dubai.</p>
          <form onSubmit={(e)=>e.preventDefault()} className="mt-6 flex max-w-sm gap-2">
            <input type="email" placeholder="Newsletter email" className="flex-1 rounded-full bg-white/[0.04] px-4 py-2.5 text-sm text-snow outline-none hairline placeholder:text-silver/40 focus:ring-2 focus:ring-glow/40" />
            <button className="rounded-full bg-snow px-4 py-2.5 text-sm font-medium text-ink hover:bg-white">Subscribe</button>
          </form>
          <div className="mt-6 flex gap-3 text-silver">
            <a href="https://www.instagram.com/shoho_pay" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-full glass hover:text-snow"><Instagram className="h-4 w-4" /></a>
          </div>
        </div>
        {footerCols.map((c)=>(
          <div key={c.t}>
            <div className="text-[11px] uppercase tracking-[0.2em] text-silver/50">{c.t}</div>
            <ul className="mt-4 space-y-2.5 text-sm">
              {c.links.map(([l,h])=>(
                <li key={l}><Link to={h} className="text-silver hover:text-snow">{l}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/[0.06] pt-6 text-xs text-silver/60 md:flex-row md:items-center">
        <div>© {new Date().getFullYear()} Shoho Pay. Aligned with UAE Central Bank guidelines · DIFC registered.</div>
        <div className="flex items-center gap-3">
          <button className="rounded-full glass px-3 py-1 hover:text-snow">EN</button>
          <button className="rounded-full px-3 py-1 hover:text-snow">عربي</button>
        </div>
      </div>
    </Container>
  </footer>
);

/* =========================================================
   HOME
========================================================= */
export default function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <ProductDemo />
      <Features />
      <AISection />
      <FXSection />
      
      <GoldSection />
      <SecuritySection />
      <Testimonials />
      <PricingPreview />
      <FAQ />
      <FinalCTA />
    </>
  );
}
