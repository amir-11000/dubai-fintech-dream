import { useState } from "react";
import { Bitcoin } from "lucide-react";
import { PageShell, PageHeader, GlowCard, PrimaryButton, GhostButton, SuccessToast } from "../components/ui";

const assets = [
  { sym: "BTC", name: "Bitcoin", price: 248210, chg: "+2.4%", up: true, holdings: 0.42 },
  { sym: "ETH", name: "Ethereum", price: 12840, chg: "+1.1%", up: true, holdings: 3.18 },
  { sym: "SOL", name: "Solana", price: 612, chg: "-0.6%", up: false, holdings: 24 },
  { sym: "USDT", name: "Tether", price: 3.67, chg: "0.00%", up: true, holdings: 4200 },
];

export default function Crypto() {
  const [active, setActive] = useState(assets[0]);
  const [msg, setMsg] = useState<string | null>(null);

  const trade = (side: "Buy" | "Sell") => {
    setMsg(`${side} order for ${active.sym} submitted successfully.`);
    setTimeout(() => setMsg(null), 3000);
  };

  const totalValue = assets.reduce((s, a) => s + a.price * a.holdings, 0);

  return (
    <PageShell>
      <PageHeader eyebrow="Crypto Ecosystem" title={<>Digital assets, <span className="text-gradient-blue">elegantly integrated.</span></>} sub="Trade, hold and earn — directly inside your wallet." />

      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <GlowCard className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-glow/15 text-glow"><Bitcoin className="h-5 w-5" /></div>
              <div>
                <div className="text-sm text-white">{active.name} · {active.sym}</div>
                <div className="text-[11px] text-silver/50">Spot · AED markets</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-semibold text-white tabular-nums">AED {active.price.toLocaleString()}</div>
              <div className={`text-xs ${active.up ? "text-glow" : "text-silver/60"}`}>{active.chg} · 24h</div>
            </div>
          </div>

          <svg viewBox="0 0 600 220" className="mt-6 h-56 w-full">
            <defs><linearGradient id="cg" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#5aa9ff" stopOpacity="0.45" /><stop offset="100%" stopColor="#5aa9ff" stopOpacity="0" /></linearGradient></defs>
            <path d="M0,160 C40,150 80,170 120,140 C160,110 200,150 240,120 C280,90 320,130 360,90 C400,55 440,100 480,70 C520,45 560,80 600,55 L600,220 L0,220 Z" fill="url(#cg)" />
            <path d="M0,160 C40,150 80,170 120,140 C160,110 200,150 240,120 C280,90 320,130 360,90 C400,55 440,100 480,70 C520,45 560,80 600,55" fill="none" stroke="#5aa9ff" strokeWidth="2" />
          </svg>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <PrimaryButton onClick={() => trade("Buy")}>Buy {active.sym}</PrimaryButton>
            <GhostButton onClick={() => trade("Sell")}>Sell {active.sym}</GhostButton>
          </div>
          <SuccessToast show={!!msg} text={msg ?? ""} />
        </GlowCard>

        <div className="space-y-3">
          <GlowCard className="p-5">
            <div className="text-[11px] uppercase tracking-widest text-silver/60">Portfolio value</div>
            <div className="mt-1 text-3xl font-semibold text-gradient-blue">AED {totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            <div className="mt-1 text-xs text-glow">+ AED 4,820 · 24h</div>
          </GlowCard>
          {assets.map((a) => (
            <button key={a.sym} onClick={() => setActive(a)} className={`flex w-full items-center justify-between rounded-2xl px-5 py-4 text-left transition ${active.sym === a.sym ? "glass-strong" : "glass hover:bg-white/5"}`}>
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-white/5 text-[10px] font-semibold text-white hairline">{a.sym}</div>
                <div>
                  <div className="text-sm text-white">{a.name}</div>
                  <div className="text-[11px] text-silver/50">{a.holdings} {a.sym}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-white tabular-nums">AED {a.price.toLocaleString()}</div>
                <div className={`text-[11px] ${a.up ? "text-glow" : "text-silver/50"}`}>{a.chg}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
