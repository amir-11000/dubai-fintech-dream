import { useMemo, useState } from "react";
import { ArrowDown } from "lucide-react";
import { PageShell, PageHeader, GlowCard, PrimaryButton, SuccessToast } from "../components/ui";

const rates: Record<string, number> = { AED: 1, USD: 0.2723, EUR: 0.2521, GBP: 0.2148, JPY: 41.86, INR: 23.05, SAR: 1.0207 };
const codes = Object.keys(rates);

export default function Exchange() {
  const [from, setFrom] = useState("AED");
  const [to, setTo] = useState("USD");
  const [amt, setAmt] = useState("10000");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const converted = useMemo(() => {
    const v = parseFloat(amt || "0");
    const result = (v / rates[from]) * rates[to];
    return result.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 });
  }, [amt, from, to]);

  const swap = () => { setFrom(to); setTo(from); };

  const confirm = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); setTimeout(() => setDone(false), 3200); }, 900);
  };

  return (
    <PageShell>
      <PageHeader eyebrow="Instant Exchange" title={<>Convert at the <span className="text-gradient-blue">real interbank rate.</span></>} sub="Zero hidden spreads. Borderless by design." />

      <div className="mx-auto mt-12 max-w-md">
        <GlowCard>
          <div className="rounded-2xl bg-white/[0.03] p-4 hairline">
            <div className="flex items-center justify-between text-xs text-silver/50">
              <span>You send</span><span>Balance · 48,290</span>
            </div>
            <div className="mt-2 flex items-center justify-between gap-3">
              <input value={amt} onChange={(e) => setAmt(e.target.value.replace(/[^0-9.]/g,""))} className="w-full bg-transparent text-3xl font-semibold tracking-tight text-white outline-none" />
              <select value={from} onChange={(e) => setFrom(e.target.value)} className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white hairline outline-none">
                {codes.map(c => <option key={c} className="bg-ink">{c}</option>)}
              </select>
            </div>
          </div>

          <div className="my-2 grid place-items-center">
            <button onClick={swap} className="grid h-10 w-10 place-items-center rounded-full glass transition hover:bg-white/10">
              <ArrowDown className="h-4 w-4 text-white" />
            </button>
          </div>

          <div className="rounded-2xl bg-white/[0.03] p-4 hairline">
            <div className="flex items-center justify-between text-xs text-silver/50">
              <span>You receive</span><span>Rate · {(rates[to]/rates[from]).toFixed(4)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between gap-3">
              <div className="text-3xl font-semibold tracking-tight text-gradient-blue">{converted}</div>
              <select value={to} onChange={(e) => setTo(e.target.value)} className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white hairline outline-none">
                {codes.map(c => <option key={c} className="bg-ink">{c}</option>)}
              </select>
            </div>
          </div>

          <div className="mt-5"><PrimaryButton onClick={confirm} loading={loading}>Confirm Exchange</PrimaryButton></div>
          <SuccessToast show={done} text={`Exchanged ${amt} ${from} → ${converted} ${to}`} />
        </GlowCard>
      </div>
    </PageShell>
  );
}
