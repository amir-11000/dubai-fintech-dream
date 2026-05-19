import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Send as SendIcon, ArrowLeftRight, Coins, Bitcoin, PiggyBank } from "lucide-react";
import { useStore } from "../../lib/store";
import { aed } from "../../lib/format";
import { LiveNumber } from "../../components/Live";
import { TxRow } from "../../components/TxRow";
import { InsightCard } from "../../components/billy/InsightCard";
import { paceAnalysis } from "../../lib/billy";

const quickActions = [
  { to: "/app/send", icon: SendIcon, label: "Send" },
  { to: "/app/convert", icon: ArrowLeftRight, label: "Convert" },
  { to: "/app/gold", icon: Coins, label: "Gold" },
  { to: "/app/crypto", icon: Bitcoin, label: "Crypto" },
  { to: "/app/savings", icon: PiggyBank, label: "Savings" },
];

export default function Dashboard() {
  const { state, netWorthAED } = useStore();
  const pace = paceAnalysis(state.transactions, state.budget);
  const top3 = state.insights.slice(0, 3);

  return (
    <div className="space-y-6 pb-10">
      {/* Net worth */}
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl glass-strong p-6">
        <div className="text-[11px] uppercase tracking-widest text-silver/60">Net worth · {state.user.name}</div>
        <div className="mt-1 text-4xl font-semibold tracking-tight text-gradient-silver md:text-5xl">
          <LiveNumber value={netWorthAED} decimals={2} prefix="AED " />
        </div>
        <div className="mt-2 text-xs text-silver/60">
          AED <LiveNumber value={state.balances.AED} decimals={2} /> available · {state.user.tier}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {quickActions.map((q) => (
            <Link key={q.to} to={q.to} className="flex items-center gap-2 rounded-full bg-white/5 px-3.5 py-2 text-xs text-white hairline hover:bg-white/10">
              <q.icon className="h-3.5 w-3.5" /> {q.label}
            </Link>
          ))}
        </div>
      </motion.section>

      {/* Budget pace */}
      {pace && state.budget && (
        <section className="rounded-3xl glass p-6">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-widest text-silver/60">This month · day {pace.dayOfMonth}/{pace.daysInMonth}</div>
              <div className="mt-1 text-2xl font-semibold text-white">{aed(pace.total)} <span className="text-sm text-silver/60">/ {aed(state.budget.monthly)}</span></div>
            </div>
            <div className={`text-xs ${pace.status === "over" || pace.status === "fast" ? "text-amber-300" : "text-emerald-300"}`}>
              {pace.status === "over" ? "Over pace" : pace.status === "fast" ? "Fast pace" : pace.status === "under" ? "Under pace" : "On track"}
            </div>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/5">
            <div className={`h-full ${pace.pacePct > 1 ? "bg-red-400" : pace.pacePct > 0.9 ? "bg-amber-300" : "bg-gold"}`} style={{ width: `${Math.min(100, pace.pacePct * 100)}%` }} />
          </div>
          <div className="mt-2 text-xs text-silver/60">Safe daily spend · {aed(pace.safeDaily)}</div>
        </section>
      )}

      {/* Insights */}
      {top3.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-[11px] uppercase tracking-widest text-silver/60">Billy says</div>
            <Link to="/app/billy" className="text-xs text-gold hover:underline">Open Billy →</Link>
          </div>
          <AnimatePresence>
            {top3.map((i) => <InsightCard key={i.id} insight={i} />)}
          </AnimatePresence>
        </section>
      )}

      {/* Recent activity */}
      <section className="rounded-3xl glass p-4">
        <div className="flex items-center justify-between px-2 pb-2">
          <div className="text-[11px] uppercase tracking-widest text-silver/60">Recent activity</div>
          <Link to="/app/transactions" className="text-xs text-glow hover:underline">See all <ArrowUpRight className="inline h-3 w-3" /></Link>
        </div>
        <div className="space-y-1">
          {state.transactions.slice(0, 8).map((t) => <TxRow key={t.id} tx={t} />)}
        </div>
      </section>
    </div>
  );
}
