import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Insight } from "../../lib/billy";
import { useStore } from "../../lib/store";
import { BillyMark } from "./BillyMark";

const sevStyles: Record<Insight["severity"], string> = {
  info: "text-glow border-glow/30 bg-glow/5",
  good: "text-gold border-gold/30 bg-gold/5",
  warn: "text-amber-300 border-amber-300/30 bg-amber-300/5",
  alert: "text-red-300 border-red-300/30 bg-red-300/5",
};

export const InsightCard = ({ insight }: { insight: Insight }) => {
  const { dismissInsight, executeBillyAction } = useStore();
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="relative rounded-2xl glass-strong p-5"
    >
      <button
        onClick={() => dismissInsight(insight.id)}
        className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full text-silver/50 hover:bg-white/5 hover:text-white"
        aria-label="Dismiss"
      >
        <X className="h-3.5 w-3.5" />
      </button>
      <div className="flex items-start gap-3">
        <BillyMark size={36} />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-widest ${sevStyles[insight.severity]}`}>
              {insight.severity}
            </span>
            <span className="text-[11px] text-silver/50">Billy</span>
          </div>
          <div className="mt-2 text-base font-medium text-white">{insight.title}</div>
          <p className="mt-1 text-sm leading-relaxed text-silver/75">{insight.body}</p>
          {insight.ctas.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {insight.ctas.map((c, i) => (
                <button
                  key={i}
                  onClick={() => executeBillyAction(c)}
                  className={`rounded-full px-3 py-1.5 text-xs transition ${
                    i === 0
                      ? "bg-gold-grad text-ink hover:opacity-90"
                      : "bg-white/5 text-white hairline hover:bg-white/10"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
