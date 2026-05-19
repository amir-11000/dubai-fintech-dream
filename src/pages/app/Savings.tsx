import { useState } from "react";
import { useStore } from "../../lib/store";
import { aed } from "../../lib/format";
import { toast } from "sonner";

export default function SavingsPage() {
  const { state, moveToSavings, pullFromSavings } = useStore();
  const [amt, setAmt] = useState(500);

  const deposit = () => {
    if (amt <= 0 || amt > state.balances.AED) return toast.error("Check amount");
    moveToSavings(amt); toast.success(`Moved ${aed(amt)} to Savings`);
  };
  const withdraw = () => {
    if (amt <= 0 || amt > state.savingsAED) return toast.error("Check amount");
    pullFromSavings(amt); toast.success(`Pulled ${aed(amt)} from Savings`);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 pb-10">
      <header>
        <div className="text-[11px] uppercase tracking-widest text-silver/60">Vault · 4.6% APY</div>
        <h1 className="mt-1 text-3xl font-semibold text-gradient-silver">Savings</h1>
      </header>
      <div className="rounded-3xl glass-strong p-6">
        <div className="text-[11px] uppercase tracking-widest text-silver/60">Saved</div>
        <div className="mt-1 text-4xl font-semibold text-white">{aed(state.savingsAED)}</div>
        <div className="mt-1 text-xs text-emerald-300">+ {aed(state.savingsAED * 0.046 / 12)} projected this month</div>
        <div className="mt-5 rounded-2xl bg-white/[0.03] p-4 hairline">
          <input type="number" value={amt} onChange={(e) => setAmt(Number(e.target.value))} className="w-full bg-transparent text-2xl font-semibold text-white outline-none" />
          <div className="mt-3 flex gap-2">
            <button onClick={deposit} className="flex-1 rounded-full bg-gold-grad py-2.5 text-xs font-medium text-ink">Deposit</button>
            <button onClick={withdraw} className="flex-1 rounded-full bg-white/5 py-2.5 text-xs text-white hairline hover:bg-white/10">Withdraw</button>
          </div>
        </div>
      </div>
    </div>
  );
}
