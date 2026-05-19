import { useState, useMemo } from "react";
import { ArrowDown } from "lucide-react";
import { useStore } from "../../lib/store";
import { aed, num } from "../../lib/format";
import { toast } from "sonner";

const codes = ["AED", "USD", "EUR", "GBP"] as const;
type Code = typeof codes[number];

export default function ConvertPage() {
  const { state, convert } = useStore();
  const [from, setFrom] = useState<Code>("AED");
  const [to, setTo] = useState<Code>("USD");
  const [amt, setAmt] = useState(1000);
  const [loading, setLoading] = useState(false);

  const rateAED = useMemo<Record<Code, number>>(() => ({
    AED: 1, USD: state.prices.USD, EUR: state.prices.EUR, GBP: state.prices.GBP,
  }), [state.prices]);

  const converted = (amt * rateAED[from]) / rateAED[to];

  const swap = () => { const x = from; setFrom(to); setTo(x); };

  const confirm = () => {
    if (amt <= 0) return;
    if (amt > (state.balances[from] as number)) return toast.error(`Insufficient ${from} balance`);
    setLoading(true);
    setTimeout(() => {
      convert(from as any, to as any, amt);
      setLoading(false);
      toast.success(`Converted ${num(amt)} ${from} → ${num(converted)} ${to}`);
    }, 700);
  };

  return (
    <div className="mx-auto max-w-md pb-10">
      <h1 className="text-2xl font-semibold text-white">Convert</h1>
      <p className="mt-1 text-sm text-silver/60">Interbank rates. No spreads.</p>
      <div className="mt-6 rounded-3xl glass-strong p-6">
        <div className="rounded-2xl bg-white/[0.03] p-4 hairline">
          <div className="flex items-center justify-between text-xs text-silver/50"><span>You send</span><span>Balance · {num(state.balances[from] as number)}</span></div>
          <div className="mt-2 flex items-center justify-between gap-3">
            <input type="number" value={amt} onChange={(e) => setAmt(Number(e.target.value))} className="w-full bg-transparent text-3xl font-semibold text-white outline-none" />
            <select value={from} onChange={(e) => setFrom(e.target.value as Code)} className="rounded-full bg-white/10 px-3 py-1.5 text-xs text-white hairline outline-none">
              {codes.map((c) => <option key={c} className="bg-ink">{c}</option>)}
            </select>
          </div>
        </div>
        <div className="my-2 grid place-items-center">
          <button onClick={swap} className="grid h-10 w-10 place-items-center rounded-full glass hover:bg-white/10"><ArrowDown className="h-4 w-4 text-white" /></button>
        </div>
        <div className="rounded-2xl bg-white/[0.03] p-4 hairline">
          <div className="flex items-center justify-between text-xs text-silver/50"><span>You receive</span><span>Rate · {(rateAED[from] / rateAED[to]).toFixed(4)}</span></div>
          <div className="mt-2 flex items-center justify-between gap-3">
            <div className="text-3xl font-semibold text-gradient-blue">{num(converted)}</div>
            <select value={to} onChange={(e) => setTo(e.target.value as Code)} className="rounded-full bg-white/10 px-3 py-1.5 text-xs text-white hairline outline-none">
              {codes.map((c) => <option key={c} className="bg-ink">{c}</option>)}
            </select>
          </div>
        </div>
        <button onClick={confirm} disabled={loading} className="mt-5 w-full rounded-full bg-gold-grad py-3.5 text-sm font-medium text-ink disabled:opacity-60">
          {loading ? "Converting…" : `Convert ${num(amt)} ${from}`}
        </button>
      </div>
    </div>
  );
}
