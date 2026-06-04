import { motion, AnimatePresence } from "framer-motion";
import { useI18n, Lang } from "../lib/i18n";

/**
 * Premium language selection splash, shown once on first visit.
 * Dark blue/gold luxury aesthetic — matches the English brand,
 * but works equally well as a neutral entry point for Arabic users.
 */
export default function LanguageSplash() {
  const { hasChosen, setLang } = useI18n();

  const choose = (l: Lang) => {
    setLang(l);
  };

  return (
    <AnimatePresence>
      {!hasChosen && (
        <motion.div
          key="lang-splash"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Choose your language"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(45,127,255,0.18), transparent 60%)," +
              "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(201,168,76,0.12), transparent 60%)," +
              "#070709",
          }}
        >
          {/* subtle grid */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
              maskImage:
                "radial-gradient(ellipse at center, black 40%, transparent 75%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, black 40%, transparent 75%)",
            }}
          />

          {/* soft gold halo */}
          <motion.div
            aria-hidden
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute h-[520px] w-[520px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(201,168,76,0.18) 0%, transparent 70%)",
              filter: "blur(20px)",
            }}
          />

          <motion.div
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 mx-6 w-full max-w-xl rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center backdrop-blur-2xl md:p-12"
            style={{
              boxShadow:
                "0 30px 120px -30px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
          >
            {/* logo */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="mx-auto flex w-fit items-center gap-3"
            >
              <img
                src="/logo.png"
                alt="Shoho Pay"
                className="h-12 w-12 rounded-xl object-contain"
                style={{ boxShadow: "0 0 40px -6px rgba(201,168,76,0.45)" }}
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="font-display mt-6 text-3xl font-semibold leading-[1.1] tracking-tight md:text-4xl"
              style={{
                background:
                  "linear-gradient(180deg, #ffffff 0%, #d4d4d8 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Welcome to SHOHO PAY
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="mt-3 text-sm text-white/60 md:text-base"
            >
              Choose your preferred language ·{" "}
              <span dir="rtl" className="font-[Tajawal]">
                اختر لغتك المفضلة
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="mt-8 grid gap-3 md:grid-cols-2"
            >
              <LangButton
                onClick={() => choose("en")}
                label="English"
                sub="Continue in English"
                accent="blue"
                dir="ltr"
              />
              <LangButton
                onClick={() => choose("ar")}
                label="العربية"
                sub="المتابعة بالعربية"
                accent="gold"
                dir="rtl"
                fontFamily='"Tajawal", "Amiri", system-ui, sans-serif'
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75, duration: 0.6 }}
              className="mt-8 text-[11px] uppercase tracking-[0.24em] text-white/35"
            >
              Made in Dubai · UAE
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function LangButton({
  onClick,
  label,
  sub,
  accent,
  dir,
  fontFamily,
}: {
  onClick: () => void;
  label: string;
  sub: string;
  accent: "blue" | "gold";
  dir: "ltr" | "rtl";
  fontFamily?: string;
}) {
  const ring =
    accent === "gold"
      ? "hover:border-[#C9A84C]/60 hover:shadow-[0_0_40px_-10px_rgba(201,168,76,0.55)]"
      : "hover:border-[#2D7FFF]/60 hover:shadow-[0_0_40px_-10px_rgba(45,127,255,0.55)]";
  const dot = accent === "gold" ? "bg-[#C9A84C]" : "bg-[#2D7FFF]";
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      dir={dir}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition ${ring}`}
      style={{ fontFamily }}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-xl font-semibold text-white">{label}</div>
          <div className="mt-1 text-xs text-white/55">{sub}</div>
        </div>
        <span
          className={`grid h-9 w-9 place-items-center rounded-full ${dot}/15`}
          style={{
            background:
              accent === "gold"
                ? "radial-gradient(circle, rgba(201,168,76,0.22), transparent 70%)"
                : "radial-gradient(circle, rgba(45,127,255,0.22), transparent 70%)",
          }}
        >
          <span className={`h-2 w-2 rounded-full ${dot} shadow-[0_0_12px_currentColor]`} />
        </span>
      </div>
    </motion.button>
  );
}
