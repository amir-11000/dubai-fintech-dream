import { useEffect, useRef, useState } from "react";
import { num } from "../lib/format";
import { useStore } from "../lib/store";

export const LiveNumber = ({ value, decimals = 2, prefix = "", suffix = "" }: { value: number; decimals?: number; prefix?: string; suffix?: string }) => {
  const prev = useRef(value);
  const [flash, setFlash] = useState<"up" | "down" | null>(null);
  useEffect(() => {
    if (value > prev.current) setFlash("up");
    else if (value < prev.current) setFlash("down");
    prev.current = value;
    const id = setTimeout(() => setFlash(null), 500);
    return () => clearTimeout(id);
  }, [value]);
  return (
    <span className={`font-display tabular-nums transition-colors ${flash === "up" ? "text-emerald-300" : flash === "down" ? "text-red-300" : "text-white"}`}>
      {prefix}{num(value, decimals)}{suffix}
    </span>
  );
};

export const MarketStrip = () => {
  const { state } = useStore();
  const items = [
    { l: "Gold/g", v: state.prices.goldPerGram, d: 2, s: " AED" },
    { l: "BTC", v: state.prices.BTC, d: 0, s: " AED" },
    { l: "ETH", v: state.prices.ETH, d: 0, s: " AED" },
    { l: "USD/AED", v: state.prices.USD, d: 4, s: "" },
    { l: "EUR/AED", v: state.prices.EUR, d: 4, s: "" },
  ];
  return (
    <div className="flex w-full items-center gap-6 overflow-x-auto border-b border-white/5 px-6 py-2 text-xs scrollbar-hide">
      {items.map((i) => (
        <div key={i.l} className="flex shrink-0 items-center gap-2">
          <span className="text-silver/50">{i.l}</span>
          <LiveNumber value={i.v} decimals={i.d} suffix={i.s} />
        </div>
      ))}
    </div>
  );
};
