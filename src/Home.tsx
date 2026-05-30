import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, FormEvent } from "react";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  Globe2,
  Bot,
  Coins,
  Bitcoin,
  Smartphone,
  ArrowUpRight,
  Play,
  CircleDollarSign,
  TrendingUp,
  Send,
  CheckCircle2,
  X,
  Mail,
  MapPin,
  Phone,
  Wallet as WalletIcon,
  Users,
  Map,
  Rocket,
} from "lucide-react";
import skyline from "./assets/dubai-skyline.jpg";
import goldBars from "./assets/gold-bars.jpg";
import iphonesDuo from "./assets/iphones-duo.png";

/* ------------------------------- Helpers ------------------------------- */

const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

/* ------------------------------- Primitives ------------------------------- */

const Container: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className = "" }) => (
  <div className={`mx-auto w-full max-w-7xl px-6 md:px-10 ${className}`}>{children}</div>
);

const Eyebrow: React.FC<React.PropsWithChildren<{ tone?: "blue" | "gold" }>> = ({ children, tone = "blue" }) => (
  <span className={`inline-flex items-center gap-2 rounded-full hairline px-3 py-1 text-[11px] uppercase tracking-[0.18em] ${tone === "gold" ? "text-gold" : "text-glow"}`}>
    <span className={`h-1.5 w-1.5 rounded-full ${tone === "gold" ? "bg-gold" : "bg-glow"} shadow-[0_0_10px_currentColor]`} />
    {children}
  </span>
);

const SectionHeader: React.FC<{ eyebrow: string; title: React.ReactNode; sub?: string; tone?: "blue" | "gold" }> = ({ eyebrow, title, sub, tone = "blue" }) => (
  <div className="mx-auto max-w-3xl text-center">
    <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
    <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-gradient-silver md:text-6xl">{title}</h2>
    {sub && <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-silver/70 md:text-lg">{sub}</p>}
  </div>
);

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 } }),
};

/* --------------------------------- Modal -------------------------------- */

const Modal: React.FC<React.PropsWithChildren<{ open: boolean; onClose: () => void; size?: "md" | "lg" }>> = ({ open, onClose, size = "md", children }) => (
  <AnimatePresence>
    {open && (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] grid place-items-center bg-ink/80 backdrop-blur-md px-4">
        <motion.div onClick={onClose} className="absolute inset-0" />
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={`relative w-full ${size === "lg" ? "max-w-4xl" : "max-w-md"} rounded-3xl glass-strong p-6 md:p-8`}
        >
          <button onClick={onClose} className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20">
            <X className="h-4 w-4" />
          </button>
          {children}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

/* -------------------------- Modal context (light) ----------------------- */

type ModalState = "none" | "updates" | "demo";
const useModal = () => {
  const [m, setM] = useState<ModalState>("none");
  return { m, open: (x: ModalState) => setM(x), close: () => setM("none") };
};

/* --------------------------------- Nav ----------------------------------- */

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const { m, open, close } = useModal();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems: { l: string; id: string }[] = [
    { l: "Overview", id: "overview" },
    { l: "Wallet", id: "wallet" },
    { l: "Exchange", id: "exchange" },
    { l: "Gold", id: "gold" },
    { l: "Crypto", id: "crypto" },
    { l: "AI Finance", id: "ai" },
    { l: "Roadmap", id: "roadmap" },
  ];

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}>
        <Container>
          <div className={`flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 ${scrolled ? "glass-strong" : ""}`}>
            <button onClick={() => scrollToId("top")} className="flex items-center gap-2.5">
              <div className="relative h-7 w-7">
                <div className="absolute inset-0 rounded-md bg-gradient-to-br from-glow to-white/20 blur-md opacity-70" />
                <div className="relative grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-white/20 to-white/5 hairline">
                  <span className="text-[10px] font-bold text-white">SH</span>
                </div>
              </div>
              <span className="text-sm font-semibold tracking-[0.18em] text-white">SHOHO PAY</span>
            </button>
            <nav className="hidden items-center gap-7 text-sm text-silver/70 lg:flex">
              {navItems.map((l) => (
                <button key={l.l} onClick={() => scrollToId(l.id)} className="hover:text-white transition">
                  {l.l}
                </button>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <button onClick={() => open("updates")} className="hidden rounded-full px-4 py-2 text-sm text-silver/80 hover:text-white md:inline-block">
                Get Updates
              </button>
              <button onClick={() => scrollToId("overview")} className="group inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink transition hover:bg-white/90">
                Explore SHOHO PAY
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </Container>
      </header>

      <UpdatesModal open={m === "updates"} onClose={close} />
    </>
  );
};

/* --------------------------- Updates Modal ------------------------------ */

const UpdatesModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOk(true);
    }, 800);
  };

  useEffect(() => {
    if (!open) {
      setTimeout(() => { setOk(false); setName(""); setEmail(""); setPhone(""); }, 200);
    }
  }, [open]);

  return (
    <Modal open={open} onClose={onClose}>
      <Eyebrow>Stay informed</Eyebrow>
      <h3 className="mt-4 text-2xl font-semibold tracking-tight text-gradient-silver md:text-3xl">Get SHOHO PAY updates.</h3>
      <p className="mt-2 text-sm text-silver/70">Be first to receive launch announcements, product updates and ecosystem milestones.</p>

      {ok ? (
        <div className="mt-6 rounded-2xl border border-glow/30 bg-glow/10 p-5 text-center">
          <CheckCircle2 className="mx-auto h-8 w-8 text-glow" />
          <div className="mt-3 text-base font-medium text-white">Thank you.</div>
          <div className="mt-1 text-sm text-silver/70">You'll receive SHOHO PAY updates and launch announcements.</div>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-6 space-y-3">
          <FieldInput label="Name" value={name} onChange={setName} required />
          <FieldInput label="Email" type="email" value={email} onChange={setEmail} required />
          <FieldInput label="Phone Number (optional)" type="tel" value={phone} onChange={setPhone} placeholder="+971 50 000 0000" />
          <button type="submit" disabled={loading} className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-ink transition hover:bg-white/90 disabled:opacity-60">
            {loading && <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-ink/30 border-t-ink" />}
            Subscribe
          </button>
        </form>
      )}
    </Modal>
  );
};

const FieldInput: React.FC<{ label: string; type?: string; value: string; onChange: (v: string) => void; required?: boolean; placeholder?: string }> = ({ label, type = "text", value, onChange, required, placeholder }) => (
  <label className="block">
    <span className="mb-1.5 block text-[11px] uppercase tracking-widest text-silver/60">{label}</span>
    <input
      type={type}
      required={required}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-silver/30 hairline focus:bg-white/[0.06] focus:ring-2 focus:ring-glow/40"
    />
  </label>
);

/* --------------------------- Demo Modal --------------------------------- */

const DemoModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => (
  <Modal open={open} onClose={onClose} size="lg">
    <Eyebrow>Cinematic preview</Eyebrow>
    <h3 className="mt-4 text-2xl font-semibold tracking-tight text-gradient-silver md:text-3xl">SHOHO PAY Product Experience <span className="text-gradient-blue">Coming Soon</span></h3>
    <p className="mt-2 text-sm text-silver/70">A glimpse into the future financial lifestyle ecosystem being built from Dubai.</p>

    <div className="relative mt-6 aspect-video w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#0c1220] via-[#0a0d18] to-black hairline">
      <img src={iphonesDuo} alt="" className="absolute inset-0 m-auto h-[78%] object-contain opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
      <div className="absolute inset-0 grid place-items-center">
        <div className="group grid h-20 w-20 place-items-center rounded-full bg-white/95 text-ink shadow-2xl">
          <Play className="h-7 w-7 translate-x-0.5 fill-ink" />
        </div>
      </div>
      <div className="absolute bottom-4 left-4 rounded-full glass-strong px-3 py-1.5 text-[10px] uppercase tracking-widest text-white">Teaser · Coming soon</div>
    </div>

    <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
      {[
        { icon: Zap, t: "Instant settlement" },
        { icon: Coins, t: "Digital gold" },
        { icon: Bot, t: "AI finance" },
        { icon: Globe2, t: "Borderless FX" },
      ].map((f) => (
        <div key={f.t} className="flex items-center gap-2 rounded-xl glass px-3 py-3 text-sm text-white">
          <f.icon className="h-4 w-4 text-glow" /> {f.t}
        </div>
      ))}
    </div>
  </Modal>
);

/* --------------------------------- Hero ---------------------------------- */

const Hero: React.FC<{ onWatchDemo: () => void }> = ({ onWatchDemo }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative isolate overflow-hidden pt-36 md:pt-44">
      <motion.div style={{ y, opacity }} className="pointer-events-none absolute inset-0 -z-10">
        <img src={skyline} alt="" className="h-full w-full object-cover opacity-[0.35]" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/70 to-ink" />
        <div className="absolute inset-0 grid-lines opacity-[0.35]" />
      </motion.div>

      <Container className="relative">
        <motion.div initial="hidden" animate="show" variants={fadeUp} className="mx-auto max-w-4xl text-center">
          <Eyebrow>Built in Dubai · For the world</Eyebrow>
          <h1 className="mt-6 text-balance text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl lg:text-[88px]">
            <span className="text-gradient-silver">The Future Financial</span>
            <br />
            <span className="text-gradient-silver">Lifestyle </span>
            <span className="text-gradient-blue">Ecosystem.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-silver/70">
            One intelligent platform — envisioning a unified home for your digital wallet, instant exchange, crypto, digital gold, AI finance and social payments.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button onClick={() => scrollToId("overview")} className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-ink transition hover:bg-white/90">
              Explore SHOHO PAY
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </button>
            <button onClick={onWatchDemo} className="group inline-flex items-center gap-2 rounded-full glass px-6 py-3.5 text-sm font-medium text-white transition hover:bg-white/10">
              <Play className="h-4 w-4 fill-white" />
              Watch Demo
            </button>
          </div>
        </motion.div>

        {/* Floating device + concept cards */}
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
                <WalletConceptScreen />
              </PhoneFrame>
            </div>
          </motion.div>

          <FloatingCard className="left-2 top-20 md:left-0 md:top-32" delay={0.6} direction="left">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-glow/20 text-glow">
                <Zap className="h-4 w-4" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-silver/60">Instant transfer</div>
                <div className="text-sm font-medium text-white">Sub-second settlement</div>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard className="right-2 top-40 md:right-0 md:top-48" delay={0.8} direction="right">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-gold/20 text-gold">
                <Coins className="h-4 w-4" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-silver/60">Digital gold</div>
                <div className="text-sm font-medium text-white">Gram-level ownership</div>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard className="bottom-6 left-6 md:bottom-12 md:left-10" delay={1} direction="left">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 text-white">
                <Globe2 className="h-4 w-4" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-silver/60">Borderless FX</div>
                <div className="text-sm font-medium text-white">Interbank concept</div>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard className="bottom-10 right-4 md:bottom-20 md:right-10" delay={1.2} direction="right">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 text-white">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-silver/60">AI assistant</div>
                <div className="text-sm font-medium text-white">Adaptive financial intelligence</div>
              </div>
            </div>
          </FloatingCard>
        </div>
      </Container>

      <div className="relative mt-12 border-y border-white/5 bg-white/[0.015] py-6">
        <div className="flex animate-[marquee_40s_linear_infinite] gap-16 whitespace-nowrap text-sm uppercase tracking-[0.25em] text-silver/40">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-16">
              {["Designed in Dubai", "Bank-grade security vision", "Regulated custody concept", "Borderless ecosystem", "AI-native architecture", "Investor-grade design", "Coming soon"].map((t) => (
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

const PhoneFrame: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className = "" }) => (
  <div className={`relative rounded-[44px] border border-white/15 bg-gradient-to-b from-white/20 to-white/5 p-[6px] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.04)] ${className}`}>
    <div className="relative h-full w-full overflow-hidden rounded-[38px] bg-gradient-to-b from-[#0c0f14] to-[#06080b]">
      <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />
      {children}
    </div>
  </div>
);

/* Conceptual wallet screen — abstract, no fake numbers */
const WalletConceptScreen = () => (
  <div className="relative flex h-full w-full flex-col p-5 pt-9">
    <div className="flex items-center justify-between">
      <div className="text-[10px] uppercase tracking-widest text-silver/50">Wallet · Concept</div>
      <div className="flex items-center gap-1 text-[10px] text-silver/50">
        <ShieldCheck className="h-3 w-3" /> Secured
      </div>
    </div>
    <div className="mt-6">
      <div className="text-[10px] uppercase tracking-wider text-silver/50">Unified balance</div>
      <div className="mt-2 flex items-baseline gap-2">
        <div className="h-8 w-44 rounded-md bg-gradient-to-r from-white/20 to-white/5" />
      </div>
      <div className="mt-2 h-2.5 w-28 rounded-md bg-glow/40" />
    </div>
    <svg viewBox="0 0 300 100" className="mt-5 h-16 w-full">
      <defs>
        <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#5aa9ff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#5aa9ff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0,70 C30,60 50,80 80,55 C110,30 140,65 170,40 C200,15 230,55 260,30 C280,15 300,30 300,30 L300,100 L0,100 Z" fill="url(#g1)" />
      <path d="M0,70 C30,60 50,80 80,55 C110,30 140,65 170,40 C200,15 230,55 260,30 C280,15 300,30 300,30" fill="none" stroke="#5aa9ff" strokeWidth="1.5" />
    </svg>
    <div className="mt-5 grid grid-cols-4 gap-2">
      {["Send", "Top up", "Swap", "More"].map((t) => (
        <div key={t} className="rounded-xl bg-white/5 px-2 py-2 text-center text-[10px] text-silver/80 hairline">{t}</div>
      ))}
    </div>
    <div className="mt-5 space-y-2">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex items-center justify-between rounded-xl bg-white/[0.03] px-3 py-2.5">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-full bg-white/10" />
            <div className="space-y-1.5">
              <div className="h-2 w-20 rounded bg-white/15" />
              <div className="h-1.5 w-12 rounded bg-white/10" />
            </div>
          </div>
          <div className="h-2 w-12 rounded bg-white/10" />
        </div>
      ))}
    </div>
    <div className="mt-auto pt-4 text-center text-[9px] uppercase tracking-widest text-silver/40">Interface concept · Preview</div>
  </div>
);

const FloatingCard: React.FC<React.PropsWithChildren<{ className?: string; delay?: number; direction?: "left" | "right" }>> = ({ children, className = "", delay = 0, direction = "left" }) => (
  <motion.div
    initial={{ opacity: 0, x: direction === "left" ? -30 : 30, y: 10 }}
    animate={{ opacity: 1, x: 0, y: 0 }}
    transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    className={`absolute z-20 hidden rounded-2xl glass px-4 py-3 shadow-2xl sm:block ${className}`}
  >
    <div className="floaty">{children}</div>
  </motion.div>
);

/* --------------------------- Product Overview --------------------------- */

const overviewPillars = [
  { icon: WalletIcon, t: "Digital Wallet", d: "A unified home for AED and global currencies." , id: "wallet" },
  { icon: Globe2, t: "Instant Exchange", d: "Borderless conversion at real interbank concept rates.", id: "exchange" },
  { icon: Coins, t: "Digital Gold", d: "Investment-grade gold, gram by gram. Vaulted concept." , id: "gold" },
  { icon: Bitcoin, t: "Crypto Ecosystem", d: "Traditional finance meets leading digital assets." , id: "crypto" },
  { icon: Bot, t: "AI Financial Assistant", d: "Adaptive intelligence across spend, save and invest." , id: "ai" },
  { icon: Users, t: "Social Payments", d: "Pay anyone in your contacts. No IBANs. No friction." , id: "social" },
];

const Overview = () => (
  <section id="overview" className="relative py-32">
    <Container>
      <SectionHeader
        eyebrow="Product overview"
        title={<>One ecosystem. <span className="text-gradient-blue">Six pillars.</span></>}
        sub="SHOHO PAY is being designed as a single intelligent platform that brings every part of your financial life into one premium experience."
      />
      <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {overviewPillars.map((p, i) => (
          <motion.button
            key={p.t}
            onClick={() => scrollToId(p.id)}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10%" }}
            custom={i}
            className="group relative overflow-hidden rounded-2xl glass p-6 text-left transition hover:bg-white/[0.06]"
          >
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition group-hover:opacity-100" />
            <p.icon className="h-5 w-5 text-glow" />
            <div className="mt-4 text-base font-medium text-white">{p.t}</div>
            <div className="mt-1.5 text-sm text-silver/60">{p.d}</div>
            <div className="mt-5 inline-flex items-center gap-1.5 text-xs text-glow opacity-0 transition group-hover:opacity-100">
              Learn more <ArrowRight className="h-3 w-3" />
            </div>
          </motion.button>
        ))}
      </div>
    </Container>
  </section>
);

/* --------------------------- Modern finance row ------------------------- */

const Principles = () => (
  <section className="relative py-24">
    <Container>
      <SectionHeader
        eyebrow="Engineering principles"
        title={<>Built for trust, <span className="text-gradient-blue">speed and clarity.</span></>}
        sub="The technical and design principles guiding the SHOHO PAY ecosystem from day one."
      />
      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          { icon: Zap, t: "Instant settlement", d: "Inter-wallet transfers designed to settle in under a second." },
          { icon: ShieldCheck, t: "Regulated custody", d: "Funds intended to be protected under UAE financial regulation." },
          { icon: Sparkles, t: "AI-native", d: "Adaptive intelligence woven across spend, save and invest." },
        ].map((f, i) => (
          <motion.div key={f.t} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-15%" }} custom={i} className="rounded-2xl glass p-6">
            <f.icon className="h-5 w-5 text-glow" />
            <div className="mt-4 text-base font-medium text-white">{f.t}</div>
            <div className="mt-1.5 text-sm text-silver/60">{f.d}</div>
          </motion.div>
        ))}
      </div>
    </Container>
  </section>
);

/* ------------------------------- Wallet --------------------------------- */

const WalletSection = () => (
  <section id="wallet" className="relative py-32">
    <Container>
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div>
          <Eyebrow>Digital Wallet Ecosystem</Eyebrow>
          <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            <span className="text-gradient-silver">One wallet.</span>
            <br />
            <span className="text-gradient-blue">Every currency. Every asset.</span>
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-silver/70">
            A single, intelligent wallet designed to hold AED, global currencies, gold and digital assets — orchestrated in one premium interface.
          </p>
          <ul className="mt-7 space-y-3">
            {["Unified multi-currency interface", "Native AED-first experience", "Designed for global residents and travelers"].map((t) => (
              <li key={t} className="flex items-start gap-3 text-sm text-silver/80">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-glow" /> {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative">
          <div className="absolute -inset-10 -z-10 rounded-full bg-glow/15 blur-3xl" />
          <div className="mx-auto w-fit">
            <PhoneFrame className="h-[560px] w-[280px] md:h-[600px] md:w-[300px]"><WalletConceptScreen /></PhoneFrame>
          </div>
        </div>
      </div>
    </Container>
  </section>
);

/* ------------------------------ Exchange -------------------------------- */

const ExchangeSection = () => (
  <section id="exchange" className="relative py-32">
    <Container>
      <SectionHeader
        eyebrow="Instant Exchange"
        title={<>Convert currencies <span className="text-gradient-blue">instantly</span> inside your wallet.</>}
        sub="Designed to deliver real interbank rates with zero hidden spreads — the way borderless finance was always meant to feel."
      />

      <div className="mt-16 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative mx-auto w-full max-w-md">
          <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-glow/10 blur-3xl" />
          <div className="rounded-3xl glass-strong p-6">
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-widest text-silver/50">Swap · Concept</div>
              <div className="flex items-center gap-1 text-xs text-glow">
                <span className="h-1.5 w-1.5 rounded-full bg-glow shadow-[0_0_10px_currentColor]" /> Preview
              </div>
            </div>

            <div className="mt-5 rounded-2xl bg-white/[0.03] p-4 hairline">
              <div className="flex items-center justify-between text-xs text-silver/50">
                <span>You send</span><span>Source currency</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div className="h-7 w-32 rounded-md bg-gradient-to-r from-white/20 to-white/5" />
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
                <span>You receive</span><span>Destination</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div className="h-7 w-32 rounded-md bg-gradient-to-r from-glow/60 to-glow/10" />
                <Chip>USD</Chip>
              </div>
            </div>

            <div className="mt-5 rounded-2xl bg-white/[0.02] py-3 text-center text-xs uppercase tracking-widest text-silver/50 hairline">
              Interface concept · Coming soon
            </div>
          </div>
        </motion.div>

        <div className="space-y-3">
          {["AED", "USD", "EUR", "GBP"].map((c, i) => (
            <motion.div key={c} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.06 }} className="flex items-center justify-between rounded-2xl glass px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-white/5 text-[10px] font-medium text-white hairline">{c}</div>
                <div>
                  <div className="text-sm text-white">{c} pair</div>
                  <div className="text-[11px] text-silver/50">Interbank concept · No spread</div>
                </div>
              </div>
              <div className="h-2 w-16 rounded bg-white/10" />
            </motion.div>
          ))}
        </div>
      </div>
    </Container>
  </section>
);

const Chip: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white hairline">
    <span className="h-1.5 w-1.5 rounded-full bg-glow" />
    {children}
  </div>
);

/* -------------------------------- Gold ---------------------------------- */

const Gold = () => (
  <section id="gold" className="relative py-32">
    <Container>
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <Eyebrow tone="gold">Digital Gold Ownership</Eyebrow>
          <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            <span className="text-gradient-silver">Own real gold.</span>
            <br />
            <span className="text-gradient-gold">Gram by gram.</span>
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-silver/70">
            SHOHO PAY is designing a digital gold experience where 24k investment-grade gold can be bought, held and redeemed — vaulted in regulated custody.
          </p>
          <ul className="mt-7 space-y-3">
            {["Concept: start from 1 gram, no minimums.", "Concept: fully insured, vaulted custody.", "Concept: redeem physical bars or request delivery."].map((t) => (
              <li key={t} className="flex items-start gap-3 text-sm text-silver/80">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-gold" /> {t}
              </li>
            ))}
          </ul>
          <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#f4e4b3] via-[#d6b56a] to-[#8a6a2e] px-5 py-3 text-xs font-medium uppercase tracking-widest text-ink">
            Coming soon
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="relative">
          <div className="absolute -inset-10 -z-10 rounded-full bg-gold/15 blur-3xl" />
          <div className="relative overflow-hidden rounded-3xl glass-strong">
            <img src={goldBars} alt="Digital gold concept" loading="lazy" className="h-[520px] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <div className="rounded-2xl glass-strong p-4">
                <div className="text-[11px] uppercase tracking-widest text-silver/60">Digital gold · Interface concept</div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                  {["Buy", "Sell", "Redeem"].map((t) => (
                    <div key={t} className="rounded-lg bg-white/5 py-2 text-xs text-white hairline">{t}</div>
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

/* -------------------------------- Crypto -------------------------------- */

const Crypto = () => (
  <section id="crypto" className="relative py-32">
    <Container>
      <SectionHeader
        eyebrow="Crypto Ecosystem"
        title={<>Traditional finance meets <span className="text-gradient-blue">digital assets.</span></>}
        sub="A planned environment to trade, hold and earn across leading digital assets — elegantly integrated with the wallet."
      />

      <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="lg:col-span-2 rounded-3xl glass-strong p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-glow/15 text-glow"><Bitcoin className="h-5 w-5" /></div>
              <div>
                <div className="text-sm text-white">Digital asset · Concept</div>
                <div className="text-[11px] text-silver/50">Interface preview · AED markets</div>
              </div>
            </div>
            <div className="rounded-full glass px-3 py-1 text-[10px] uppercase tracking-widest text-silver/70">Preview</div>
          </div>

          <svg viewBox="0 0 600 220" className="mt-6 h-56 w-full">
            <defs>
              <linearGradient id="cg" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#5aa9ff" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#5aa9ff" stopOpacity="0" />
              </linearGradient>
            </defs>
            {Array.from({ length: 5 }).map((_, i) => (
              <line key={i} x1="0" x2="600" y1={40 + i * 35} y2={40 + i * 35} stroke="rgba(255,255,255,0.05)" />
            ))}
            <path d="M0,160 C40,150 80,170 120,140 C160,110 200,150 240,120 C280,90 320,130 360,90 C400,55 440,100 480,70 C520,45 560,80 600,55 L600,220 L0,220 Z" fill="url(#cg)" />
            <path d="M0,160 C40,150 80,170 120,140 C160,110 200,150 240,120 C280,90 320,130 360,90 C400,55 440,100 480,70 C520,45 560,80 600,55" fill="none" stroke="#5aa9ff" strokeWidth="2" />
          </svg>

          <div className="mt-4 flex flex-wrap gap-2">
            {["1H", "1D", "1W", "1M", "1Y", "All"].map((t, i) => (
              <div key={t} className={`rounded-full px-3 py-1.5 text-xs ${i === 2 ? "bg-white text-ink" : "glass text-silver/70"}`}>{t}</div>
            ))}
          </div>
          <div className="mt-4 text-center text-[10px] uppercase tracking-widest text-silver/40">Abstract chart · Visual concept only</div>
        </motion.div>

        <div className="space-y-3">
          {["BTC", "ETH", "SOL", "USDT"].map((sym, i) => (
            <motion.div key={sym} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }} className="flex items-center justify-between rounded-2xl glass px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-white/5 text-[10px] font-semibold text-white hairline">{sym}</div>
                <div>
                  <div className="text-sm text-white">{sym}</div>
                  <div className="text-[11px] text-silver/50">Supported asset · Concept</div>
                </div>
              </div>
              <div className="h-2 w-12 rounded bg-white/10" />
            </motion.div>
          ))}
        </div>
      </div>
    </Container>
  </section>
);

/* ------------------------------ AI Section ------------------------------ */

const AISection = () => {
  const messages = [
    { role: "user", text: "Help me save for a trip in 3 months." },
    { role: "ai", text: "I'll build a plan around your real cash flow and suggest weekly milestones — all inside your wallet." },
    { role: "user", text: "Can I invest the rest safely?" },
    { role: "ai", text: "Yes — I'll propose a balanced allocation across low-risk yield and digital gold, tuned to your profile." },
  ];
  return (
    <section id="ai" className="relative py-32">
      <Container>
        <SectionHeader
          eyebrow="AI Financial Assistant"
          title={<>Your money, <span className="text-gradient-blue">thinking ahead.</span></>}
          sub="An envisioned private financial intelligence that plans, budgets and invests with you — in plain language."
        />

        <div className="mt-16 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="rounded-3xl glass-strong p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-glow/15 text-glow"><Bot className="h-5 w-5" /></div>
              <div>
                <div className="text-sm text-white">SHOHO PAY Intelligence</div>
                <div className="flex items-center gap-1 text-[11px] text-silver/50">Interface concept</div>
              </div>
            </div>
            <div className="space-y-3">
              {messages.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className={`flex ${m.role === "user" ? "justify-end" : ""}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${m.role === "user" ? "bg-white text-ink" : "bg-white/5 text-silver hairline"}`}>{m.text}</div>
                </motion.div>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-2 rounded-2xl bg-white/[0.03] px-3 py-2.5 hairline">
              <div className="flex-1 text-sm text-silver/50">Ask anything about your money…</div>
              <div className="grid h-8 w-8 place-items-center rounded-full bg-glow text-ink"><Send className="h-3.5 w-3.5" /></div>
            </div>
          </motion.div>

          <div className="space-y-4">
            {[
              { icon: TrendingUp, t: "Adaptive budgeting", d: "Auto-categorized spend with weekly insights." },
              { icon: CircleDollarSign, t: "Smart saving goals", d: "Set a goal — the assistant proposes the plan." },
              { icon: Sparkles, t: "Personalized investing", d: "Recommendations tuned to your real cash flow." },
            ].map((f, i) => (
              <motion.div key={f.t} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex items-start gap-4 rounded-2xl glass p-5">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/5 text-glow hairline"><f.icon className="h-5 w-5" /></div>
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

/* ------------------------------ Social --------------------------------- */

const Social = () => {
  const people = [
    { n: "Layla", a: "L", c: "from-pink-300 to-rose-500" },
    { n: "Omar", a: "O", c: "from-sky-300 to-blue-600" },
    { n: "Sara", a: "S", c: "from-amber-200 to-amber-500" },
    { n: "Yusuf", a: "Y", c: "from-emerald-300 to-emerald-600" },
    { n: "Nora", a: "N", c: "from-violet-300 to-violet-600" },
  ];
  return (
    <section id="social" className="relative py-32">
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
              Pay anyone in your contacts in a tap. Request, split, schedule — money designed to move the way you actually talk.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:max-w-md">
              {["Tap-to-pay anyone", "Split bills in seconds", "Request money", "Group payments"].map((t) => (
                <div key={t} className="flex items-center gap-2 rounded-xl glass px-3 py-2.5 text-sm text-silver/80">
                  <CheckCircle2 className="h-4 w-4 text-glow" /> {t}
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[480px]">
            <div className="absolute -inset-10 -z-10 rounded-full bg-glow/10 blur-3xl" />
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 400">
              <defs>
                <linearGradient id="ln" x1="0" x2="1">
                  <stop offset="0%" stopColor="rgba(90,169,255,0.6)" />
                  <stop offset="100%" stopColor="rgba(90,169,255,0)" />
                </linearGradient>
              </defs>
              {[[200, 200, 80, 80], [200, 200, 320, 70], [200, 200, 80, 320], [200, 200, 330, 320], [200, 200, 200, 30]].map(([x1, y1, x2, y2], i) => (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#ln)" strokeWidth="1" strokeDasharray="3 4" />
              ))}
            </svg>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="absolute -inset-3 rounded-full bg-glow/30 blur-xl" />
                <div className="relative grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-white to-silver/60 text-2xl font-semibold text-ink">You</div>
              </div>
            </div>

            {[
              { p: "top-2 left-10", person: people[0] },
              { p: "top-4 right-10", person: people[1] },
              { p: "bottom-10 left-6", person: people[2] },
              { p: "bottom-6 right-6", person: people[3] },
              { p: "-top-2 left-1/2 -translate-x-1/2", person: people[4] },
            ].map((x, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.7 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 * i, duration: 0.6 }} className={`absolute ${x.p}`}>
                <div className="flex items-center gap-3 rounded-full glass px-3 py-2">
                  <div className={`grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br ${x.person.c} text-sm font-semibold text-white`}>{x.person.a}</div>
                  <div className="pr-2 text-xs">
                    <div className="text-white">{x.person.n}</div>
                    <div className="text-silver/60">Send · Request</div>
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

/* ------------------------------ Why Dubai ------------------------------ */

const WhyDubai = () => (
  <section id="why" className="relative overflow-hidden py-32">
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
          SHOHO PAY is being built for global residents, modern travelers and digital-native users — at the center of the world's most ambitious financial city. Engineered in Dubai, designed for everywhere.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          { t: "Global by design", d: "Architected for cross-border residents and businesses." },
          { t: "Always-on infrastructure", d: "24/7 financial backbone for a connected world." },
          { t: "One platform", d: "A single intelligent wallet — for everything." },
        ].map((s) => (
          <div key={s.t} className="rounded-2xl glass p-6">
            <div className="text-base font-medium text-white">{s.t}</div>
            <div className="mt-1.5 text-sm text-silver/60">{s.d}</div>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

/* ------------------------------- Mobile -------------------------------- */

const Mobile = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  return (
    <section id="mobile" ref={ref} className="relative overflow-hidden py-32">
      <Container>
        <SectionHeader
          eyebrow="Mobile experience"
          title={<>An ecosystem in your pocket. <span className="text-gradient-blue">Beautifully.</span></>}
          sub="Every surface — wallet, exchange, gold, crypto, AI and social — flowing in one unified mobile experience."
        />
        <motion.div style={{ y }} className="relative mt-16">
          <div className="absolute left-1/2 top-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-glow/15 blur-3xl" />
          <img src={iphonesDuo} alt="SHOHO PAY mobile interface concept" loading="lazy" className="mx-auto w-full max-w-4xl" />
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

/* ------------------------------ Roadmap -------------------------------- */

const roadmap = [
  { phase: "Phase 01", title: "Foundation", body: "Brand, vision and ecosystem architecture established. Investor and partnership conversations." },
  { phase: "Phase 02", title: "Early Access", body: "Closed waitlist opens. Onboarding for first residents, businesses and design partners." },
  { phase: "Phase 03", title: "Wallet Launch", body: "Public release of the SHOHO PAY wallet — AED-first, multi-currency, AI-assisted." },
  { phase: "Phase 04", title: "Full Ecosystem", body: "Gold, crypto, social payments and the AI financial assistant unified in one platform." },
];

const Roadmap = () => (
  <section id="roadmap" className="relative py-32">
    <Container>
      <SectionHeader
        eyebrow="Future roadmap"
        title={<>A staged path to a <span className="text-gradient-blue">complete ecosystem.</span></>}
        sub="SHOHO PAY is being built deliberately — premium, regulated and global from day one."
      />
      <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {roadmap.map((r, i) => (
          <motion.div key={r.phase} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-15%" }} custom={i} className="relative rounded-2xl glass p-6">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-glow">
              <Map className="h-3.5 w-3.5" /> {r.phase}
            </div>
            <div className="mt-3 text-lg font-medium text-white">{r.title}</div>
            <div className="mt-2 text-sm text-silver/60">{r.body}</div>
          </motion.div>
        ))}
      </div>
    </Container>
  </section>
);

/* --------------------------- Early Access ------------------------------ */

const EarlyAccess = () => {
  const types = ["Individual", "Business", "Investor"] as const;
  const [type, setType] = useState<(typeof types)[number]>("Individual");
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const set = (k: string) => (v: string) => setForm({ ...form, [k]: v });
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setOk(true); }, 900);
  };

  return (
    <section id="early-access" className="relative py-32">
      <Container>
        <SectionHeader
          eyebrow="Early access · Investor interest"
          title={<>Join the <span className="text-gradient-blue">SHOHO PAY</span> waitlist.</>}
          sub="Be among the first to experience the future of finance from Dubai — or open a conversation about partnership and investment."
        />

        <div className="mx-auto mt-12 max-w-xl">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="rounded-3xl glass-strong p-6 md:p-8">
            {ok ? (
              <div className="rounded-2xl border border-glow/30 bg-glow/10 p-6 text-center">
                <CheckCircle2 className="mx-auto h-10 w-10 text-glow" />
                <div className="mt-4 text-lg font-medium text-white">Thank you.</div>
                <div className="mt-1 text-sm text-silver/70">You're on the {type.toLowerCase()} list. The SHOHO PAY team in Dubai will be in touch.</div>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <FieldInput label="Name" value={form.name} onChange={set("name")} required />
                <FieldInput label="Email" type="email" value={form.email} onChange={set("email")} required />
                <FieldInput label="Phone (optional)" type="tel" value={form.phone} onChange={set("phone")} placeholder="+971 50 000 0000" />
                <div>
                  <span className="mb-2 block text-[11px] uppercase tracking-widest text-silver/60">I am a…</span>
                  <div className="grid grid-cols-3 gap-2">
                    {types.map((t) => (
                      <button type="button" key={t} onClick={() => setType(t)} className={`rounded-xl px-3 py-3 text-sm transition ${type === t ? "bg-white text-ink" : "glass text-silver hover:bg-white/10"}`}>{t}</button>
                    ))}
                  </div>
                </div>
                <button type="submit" disabled={loading} className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-ink transition hover:bg-white/90 disabled:opacity-60">
                  {loading && <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-ink/30 border-t-ink" />}
                  Register Interest
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

/* ------------------------------ Contact -------------------------------- */

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const set = (k: string) => (v: string) => setForm({ ...form, [k]: v });
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setOk(true); }, 900);
  };

  return (
    <section id="contact" className="relative py-32">
      <Container>
        <SectionHeader
          eyebrow="Contact"
          title={<>Let's <span className="text-gradient-blue">talk.</span></>}
          sub="Partnerships, press and investor inquiries — direct line to our Dubai HQ."
        />

        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-5">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="rounded-3xl glass-strong p-6 md:p-8 lg:col-span-3">
            {ok ? (
              <div className="rounded-2xl border border-glow/30 bg-glow/10 p-6 text-center">
                <CheckCircle2 className="mx-auto h-10 w-10 text-glow" />
                <div className="mt-4 text-lg font-medium text-white">Message received.</div>
                <div className="mt-1 text-sm text-silver/70">We'll respond from Dubai within 24 hours.</div>
              </div>
            ) : (
              <form onSubmit={submit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FieldInput label="Name" value={form.name} onChange={set("name")} required />
                <FieldInput label="Email" type="email" value={form.email} onChange={set("email")} required />
                <div className="md:col-span-2"><FieldInput label="Company (optional)" value={form.company} onChange={set("company")} /></div>
                <label className="block md:col-span-2">
                  <span className="mb-1.5 block text-[11px] uppercase tracking-widest text-silver/60">Message</span>
                  <textarea required value={form.message} onChange={(e) => set("message")(e.target.value)} rows={5} className="w-full rounded-xl bg-white/[0.03] px-4 py-3 text-sm text-white outline-none hairline focus:bg-white/[0.06] focus:ring-2 focus:ring-glow/40" />
                </label>
                <div className="md:col-span-2">
                  <button type="submit" disabled={loading} className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-ink transition hover:bg-white/90 disabled:opacity-60">
                    {loading && <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-ink/30 border-t-ink" />}
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} className="rounded-3xl glass-strong p-6 md:p-8 lg:col-span-2">
            <div className="text-[11px] uppercase tracking-widest text-silver/60">SHOHO PAY HQ</div>
            <div className="mt-2 text-2xl font-semibold text-gradient-silver">Dubai · DIFC</div>
            <div className="mt-6 space-y-4 text-sm text-silver/80">
              <div className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 text-glow" /> Gate Village 10, DIFC, Dubai, UAE</div>
              <div className="flex items-start gap-3"><Mail className="mt-0.5 h-4 w-4 text-glow" /> hello@shohopay.com</div>
              <div className="flex items-start gap-3"><Phone className="mt-0.5 h-4 w-4 text-glow" /> +971 4 000 0000</div>
            </div>
            <div className="mt-6 rounded-2xl bg-white/[0.03] p-4 hairline text-xs text-silver/60">
              A Dubai-based fintech building the next generation of borderless finance. Open to strategic investors, partners and press.
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

/* --------------------------------- CTA --------------------------------- */

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
        <Eyebrow><span className="inline-flex items-center gap-1.5"><Rocket className="h-3 w-3" /> Coming soon</span></Eyebrow>
        <h2 className="mt-6 text-balance text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
          <span className="text-gradient-silver">Finance should feel</span>
          <br />
          <span className="text-gradient-blue">intelligent, seamless and borderless.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-silver/70">
          SHOHO PAY — building the next generation financial ecosystem from Dubai.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button onClick={() => scrollToId("early-access")} className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-medium text-ink transition hover:bg-white/90">
            Join Early Access
            <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
          <button onClick={() => scrollToId("contact")} className="inline-flex items-center gap-2 rounded-full glass px-7 py-4 text-sm text-white transition hover:bg-white/10">
            Contact Us
          </button>
        </div>
      </div>
    </Container>
  </section>
);

/* -------------------------------- Footer -------------------------------- */

export const Footer = () => (
  <footer className="border-t border-white/5 py-14">
    <Container>
      <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
        <div className="col-span-2">
          <div className="flex items-center gap-2.5">
            <div className="grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-white/20 to-white/5 hairline text-[10px] font-bold text-white">SH</div>
            <span className="text-sm font-semibold tracking-[0.18em] text-white">SHOHO PAY</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-silver/60">
            The future financial lifestyle ecosystem — built in Dubai, designed for the world.
          </p>
        </div>
        {[
          { h: "Ecosystem", l: [["Wallet","wallet"], ["Exchange","exchange"], ["Gold","gold"], ["Crypto","crypto"], ["AI Finance","ai"], ["Social","social"]] as [string,string][] },
          { h: "Company", l: [["Overview","overview"], ["Why Dubai","why"], ["Roadmap","roadmap"], ["Mobile","mobile"]] as [string,string][] },
          { h: "Get in touch", l: [["Early Access","early-access"], ["Contact","contact"]] as [string,string][] },
        ].map((c) => (
          <div key={c.h}>
            <div className="text-[11px] uppercase tracking-widest text-silver/40">{c.h}</div>
            <ul className="mt-4 space-y-2">
              {c.l.map(([label, id]) => (
                <li key={label}>
                  <button onClick={() => scrollToId(id)} className="text-sm text-silver/70 hover:text-white">{label}</button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/5 pt-6 text-xs text-silver/40 md:flex-row md:items-center">
        <div>© {new Date().getFullYear()} SHOHO PAY. All rights reserved.</div>
        <div>Dubai · United Arab Emirates</div>
      </div>
    </Container>
  </footer>
);

/* ---------------------------------- App ---------------------------------- */

export default function Home() {
  const [demoOpen, setDemoOpen] = useState(false);
  return (
    <>
      <Hero onWatchDemo={() => setDemoOpen(true)} />
      <Overview />
      <Principles />
      <WalletSection />
      <ExchangeSection />
      <Gold />
      <Crypto />
      <AISection />
      <Social />
      <WhyDubai />
      <Mobile />
      <Roadmap />
      <EarlyAccess />
      <Contact />
      <CTA />
      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
