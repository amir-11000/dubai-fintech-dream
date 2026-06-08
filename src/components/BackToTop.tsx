import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    const start = window.scrollY;
    const duration = 900;
    const startTime = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const step = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      window.scrollTo(0, start * (1 - ease(t)));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-[60] md:bottom-8 md:right-8"
        >
          <div className="group relative">
            <span
              aria-hidden
              className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/10 bg-black/70 px-3 py-1.5 text-xs font-medium text-white/90 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 group-hover:-translate-x-0 -translate-x-1"
            >
              Back to Top
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="relative flex h-13 w-13 items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:border-glow/50 hover:bg-white/10"
              style={{
                width: 52,
                height: 52,
                boxShadow:
                  "0 0 0 1px rgba(255,255,255,0.04), 0 10px 30px -10px rgba(59,130,246,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              <span
                aria-hidden
                className="absolute inset-0 rounded-full opacity-60 blur-xl transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(59,130,246,0.45), transparent 70%)",
                }}
              />
              <span className="relative font-display text-sm font-semibold tracking-wider text-white">
                SH
              </span>
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/10"
              />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
