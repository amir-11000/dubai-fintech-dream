import { motion } from "framer-motion";
import { ReactNode } from "react";

export const PageHeader = ({ eyebrow, title, sub }: { eyebrow: string; title: ReactNode; sub?: string }) => (
  <div className="mx-auto max-w-3xl text-center">
    <span className="inline-flex items-center gap-2 rounded-full hairline px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-glow">
      <span className="h-1.5 w-1.5 rounded-full bg-glow shadow-[0_0_10px_currentColor]" />
      {eyebrow}
    </span>
    <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-gradient-silver md:text-6xl">
      {title}
    </h1>
    {sub && <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-silver/70 md:text-lg">{sub}</p>}
  </div>
);

export const PageShell = ({ children }: { children: ReactNode }) => (
  <section className="relative pt-36 pb-24 md:pt-44">
    <div className="absolute inset-0 -z-10 grid-lines opacity-[0.18]" />
    <div className="absolute left-1/2 top-20 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-glow/15 blur-3xl" />
    <div className="mx-auto w-full max-w-7xl px-6 md:px-10">{children}</div>
  </section>
);

export const GlowCard = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    className={`rounded-3xl glass-strong p-6 md:p-8 ${className}`}
  >
    {children}
  </motion.div>
);

export const Field = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) => (
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

export const PrimaryButton = ({
  children,
  onClick,
  type = "button",
  loading,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  loading?: boolean;
  className?: string;
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={loading}
    className={`group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-ink transition hover:bg-white/90 disabled:opacity-60 ${className}`}
  >
    {loading && <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-ink/30 border-t-ink" />}
    {children}
  </button>
);

export const GhostButton = ({
  children,
  onClick,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center justify-center gap-2 rounded-full glass px-6 py-3.5 text-sm font-medium text-white transition hover:bg-white/10 ${className}`}
  >
    {children}
  </button>
);

export const SuccessToast = ({ show, text }: { show: boolean; text: string }) => (
  <motion.div
    initial={false}
    animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 10, pointerEvents: "none" }}
    className="mt-5 rounded-xl border border-glow/30 bg-glow/10 px-4 py-3 text-sm text-glow"
  >
    {text}
  </motion.div>
);
