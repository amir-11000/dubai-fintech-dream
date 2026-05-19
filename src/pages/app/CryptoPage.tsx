import { useState } from "react";
import { useStore } from "../../lib/store";
import { aed, num } from "../../lib/format";
import { LiveNumber } from "../../components/Live";
import { toast } from "sonner";

const SYMBOLS = ["BTC", "ETH", "SOL"] as const;
type Sym = typeof SYMBOLS[number];

export default function CryptoPage() {
  const { state, buyCrypto, sellCrypto } = useStore();
  const [sym, setSym] = useState<Sym>("BTC");
  const [amt, setAmt] = useState(500);

  const buy = () => {
    if (amt > state.balances.AED) return toast.error("Insufficient AED");
    buyCrypto(sym, amt);
    toast.success(`Bought ${aed(amt)} of ${sym}`);
  };
  const sell = () => {
    const units = amt / state.prices[sym];
    if (units > state.balances[sym]) return toast.error(`Not enough ${sym}`);
    sellCrypto(sym, amt);
    toast.success(`Sold ${aed(amt)} of ${sym}`);
  };

  return (
    <div className="space-y-6 pb-10">
      <header>
        <div className="text-[11px] uppercase tracking-widest text-silver/60">Crypto</div>
        <h1 className="mt-1 text-3xl font-semibold text-gradient-blue">Markets</h1>
      </header>
      <div className="grid grid-cols-3 gap-3">
        {SYMBOLS.map((s) => (
          <button key={s} onClick={() => setSym(s)} className={`rounded-2xl p-4 text-left transition ${sym === s ? "glass-strong ring-2 ring-glow/40" : "glass hover:bg-white/5"}`}>
            <div className="text-[11px] uppercase tracking-widest text-silver/60">{s}</div>
            <div className="mt-1 text-base font-semibold text-white"><LiveNumber value={state.prices[s]} decimals={0} prefix="AED " /></div>
            <div className="mt-1 text-[11px] text-silver/50">Hold · {num(state.balances[s], 4)}</div>
          </button>
        ))}
      </div>
      <div className="rounded-3xl glass-strong p-6">
        <div className="text-[11px] uppercase tracking-widest text-silver/60">Trade {sym}</div>
        <div className="mt-3 rounded-2xl bg-white/[0.03] p-4 hairline">
          <label className="text-[11px] text-silver/60">Amount (AED)</label>
          <input type="number" value={amt} onChange={(e) => setAmt(Number(e.target.value))} className="mt-1 w-full bg-transparent text-3xl font-semibold text-white outline-none" />
          <div className="mt-2 text-sm text-silver/60">≈ {num(amt / state.prices[sym], 6)} {sym}</div>
          <div className="mt-3 flex gap-2">
            <button onClick={buy} className="flex-1 rounded-full bg-gold-grad py-3 text-xs font-medium text-ink">Buy {sym}</button>
            <button onClick={sell} className="flex-1 rounded-full bg-white/5 py-3 text-xs text-white hairline hover:bg-white/10">Sell {sym}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
