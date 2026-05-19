import { useState } from "react";
import { Coins } from "lucide-react";
import { useStore } from "../../lib/store";
import { aed, num } from "../../lib/format";
import { LiveNumber } from "../../components/Live";
import goldBars from "../../assets/gold-bars.jpg";
import { toast } from "sonner";

export default function GoldPage() {
  const { state, buyGold, sellGoldGrams } = useStore();
  const [grams, setGrams] = useState(2);
  const total = grams * state.prices.goldPerGram;

  const buy = () => {
    if (total > state.balances.AED) return toast.error("Insufficient AED");
    buyGold(total);
    toast.success(`Bought ${grams}g 24k gold`);
  };
  const sell = () => {
    if (grams > state.balances.GOLD) return toast.error("Not enough gold");
    sellGoldGrams(grams);
    toast.success(`Sold ${grams}g gold`);
  };

  return (
    <div className="grid grid-cols-1 gap-6 pb-10 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-5">
        <header>
          <div className="text-[11px] uppercase tracking-widest text-gold">Digital gold · 24k</div>
          <h1 className="mt-1 text-3xl font-semibold text-gradient-gold">Own real gold</h1>
        </header>
        <div className="rounded-3xl glass-strong p-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-[11px] uppercase tracking-widest text-silver/60">Holdings</div>
              <div className="mt-1 text-4xl font-semibold text-gradient-gold">{num(state.balances.GOLD, 4)}g</div>
              <div className="mt-1 text-sm text-silver/60">≈ {aed(state.balances.GOLD * state.prices.goldPerGram)}</div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-widest text-silver/60">Live price · 24k/g</div>
              <div className="mt-1 text-2xl font-semibold text-white"><LiveNumber value={state.prices.goldPerGram} decimals={2} prefix="AED " /></div>
            </div>
          </div>
          <div className="mt-5 rounded-2xl bg-white/[0.03] p-4 hairline">
            <label className="text-[11px] uppercase tracking-widest text-silver/60">Grams</label>
            <input type="number" value={grams} step="0.1" onChange={(e) => setGrams(Number(e.target.value))} className="mt-1 w-full bg-transparent text-3xl font-semibold text-white outline-none" />
            <div className="mt-2 text-sm text-silver/60">Total · {aed(total)}</div>
            <div className="mt-3 flex gap-2">
              <button onClick={buy} className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-gold-grad py-3 text-xs font-medium text-ink"><Coins className="h-3.5 w-3.5" /> Buy</button>
              <button onClick={sell} className="flex-1 rounded-full bg-white/5 py-3 text-xs text-white hairline hover:bg-white/10">Sell</button>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-hidden rounded-3xl glass">
        <img src={goldBars} alt="Gold" className="h-full w-full object-cover" />
      </div>
    </div>
  );
}
