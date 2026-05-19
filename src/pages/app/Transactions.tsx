import { useMemo, useState } from "react";
import { useStore } from "../../lib/store";
import { TxRow } from "../../components/TxRow";
import { BUDGET_CATEGORIES, categorize, BudgetCategory } from "../../lib/billy";

export default function TransactionsPage() {
  const { state } = useStore();
  const [filter, setFilter] = useState<BudgetCategory | "All">("All");
  const filtered = useMemo(() => {
    if (filter === "All") return state.transactions;
    return state.transactions.filter((t) => categorize(t) === filter);
  }, [state.transactions, filter]);

  return (
    <div className="space-y-5 pb-10">
      <header>
        <div className="text-[11px] uppercase tracking-widest text-silver/60">Activity</div>
        <h1 className="mt-1 text-3xl font-semibold text-gradient-silver">Transactions</h1>
      </header>
      <div className="flex flex-wrap gap-2">
        {(["All", ...BUDGET_CATEGORIES] as const).map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c as any)}
            className={`rounded-full px-3 py-1.5 text-xs transition ${filter === c ? "bg-gold-grad text-ink" : "bg-white/5 text-silver/70 hairline hover:bg-white/10"}`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="rounded-3xl glass p-3">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-sm text-silver/60">No transactions</div>
        ) : (
          <div className="space-y-1">
            {filtered.map((t) => <TxRow key={t.id} tx={t} />)}
          </div>
        )}
      </div>
    </div>
  );
}
