import { useStore } from "../../lib/store";
import { aed, num } from "../../lib/format";
import { LiveNumber } from "../../components/Live";

const wallets = [
  { code: "AED", flag: "🇦🇪", grad: "from-emerald-400/30 to-emerald-700/10" },
  { code: "USD", flag: "🇺🇸", grad: "from-blue-400/30 to-blue-700/10" },
  { code: "EUR", flag: "🇪🇺", grad: "from-indigo-400/30 to-indigo-700/10" },
  { code: "GBP", flag: "🇬🇧", grad: "from-rose-400/30 to-rose-700/10" },
] as const;

export default function Wallets() {
  const { state, netWorthAED } = useStore();
  const aedRate: Record<string, number> = { AED: 1, USD: state.prices.USD, EUR: state.prices.EUR, GBP: state.prices.GBP };
  return (
    <div className="space-y-6 pb-10">
      <header>
        <div className="text-[11px] uppercase tracking-widest text-silver/60">Multi-currency</div>
        <h1 className="mt-1 text-3xl font-semibold text-gradient-silver">Your wallets</h1>
        <div className="mt-1 text-sm text-silver/60">Total · <LiveNumber value={netWorthAED} prefix="AED " /></div>
      </header>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {wallets.map((w) => {
          const bal = state.balances[w.code as keyof typeof state.balances] as number;
          const inAED = bal * (aedRate[w.code] || 1);
          return (
            <div key={w.code} className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${w.grad} p-6 hairline`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-widest text-silver/60">{w.code} · {w.flag}</div>
                  <div className="mt-2 text-3xl font-semibold tracking-tight text-white">{num(bal)}</div>
                  <div className="mt-1 text-xs text-silver/60">≈ {aed(inAED)}</div>
                </div>
                <div className="text-right text-[11px] text-silver/50">
                  <div>1 {w.code}</div>
                  <div className="text-white">{(aedRate[w.code] || 1).toFixed(4)} AED</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="rounded-3xl glass p-5">
        <div className="text-[11px] uppercase tracking-widest text-silver/60">Assets</div>
        <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
          <Asset label="Gold (g)" v={state.balances.GOLD} px={state.prices.goldPerGram} />
          <Asset label="BTC" v={state.balances.BTC} px={state.prices.BTC} />
          <Asset label="ETH" v={state.balances.ETH} px={state.prices.ETH} />
          <Asset label="SOL" v={state.balances.SOL} px={state.prices.SOL} />
        </div>
      </div>
    </div>
  );
}

const Asset = ({ label, v, px }: { label: string; v: number; px: number }) => (
  <div className="rounded-xl bg-white/[0.03] p-4 hairline">
    <div className="text-[11px] text-silver/60">{label}</div>
    <div className="mt-1 text-lg font-semibold text-white">{num(v, 4)}</div>
    <div className="text-[11px] text-silver/50">≈ {aed(v * px)}</div>
  </div>
);
