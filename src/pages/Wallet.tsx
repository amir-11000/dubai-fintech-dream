import { Link } from "react-router-dom";
import { ArrowDownLeft, ArrowUpRight, Repeat, ShieldCheck } from "lucide-react";
import { PageShell, PageHeader, GlowCard } from "../components/ui";

const balances = [
  { code: "AED", amt: "48,290.40", glow: "text-gradient-silver", sub: "+ AED 1,240 this week" },
  { code: "USD", amt: "13,142.78", glow: "text-gradient-blue", sub: "+ $312 this week" },
  { code: "EUR", amt: "11,028.55", glow: "text-gradient-gold", sub: "+ €198 this week" },
];

const tx = [
  ["Apple Store", "−AED 379", "Today · 14:02", false],
  ["Emirates NBD payroll", "+AED 18,500", "Yesterday", true],
  ["Gold purchase · 4g", "−AED 1,200", "Mon", false],
  ["Layla · split dinner", "+AED 220", "Sun", true],
  ["Etihad Airways", "−AED 2,940", "Sat", false],
];

export default function Wallet() {
  return (
    <PageShell>
      <PageHeader eyebrow="Digital wallet" title={<>Your money, <span className="text-gradient-blue">unified.</span></>} sub="Multi-currency balances, instant transfers and complete control." />

      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
        {balances.map((b) => (
          <GlowCard key={b.code}>
            <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-silver/60">
              <span>{b.code} balance</span>
              <ShieldCheck className="h-3.5 w-3.5 text-glow" />
            </div>
            <div className={`mt-3 text-4xl font-semibold tracking-tight ${b.glow}`}>{b.amt}</div>
            <div className="mt-1 text-xs text-glow">{b.sub}</div>
          </GlowCard>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <Link to="/social-payments" className="flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-4 text-sm font-medium text-ink transition hover:bg-white/90">
          <ArrowUpRight className="h-4 w-4" /> Send
        </Link>
        <Link to="/social-payments" className="flex items-center justify-center gap-2 rounded-2xl glass px-4 py-4 text-sm font-medium text-white transition hover:bg-white/10">
          <ArrowDownLeft className="h-4 w-4" /> Receive
        </Link>
        <Link to="/exchange" className="flex items-center justify-center gap-2 rounded-2xl glass px-4 py-4 text-sm font-medium text-white transition hover:bg-white/10">
          <Repeat className="h-4 w-4" /> Exchange
        </Link>
      </div>

      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Recent transactions</h2>
          <Link to="/wallet" className="text-xs text-glow hover:underline">View all</Link>
        </div>
        <GlowCard className="p-0 md:p-0">
          <ul className="divide-y divide-white/5">
            {tx.map(([n, a, t, up]) => (
              <li key={n as string} className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-white/5 text-xs font-semibold text-white hairline">{(n as string)[0]}</div>
                  <div>
                    <div className="text-sm text-white">{n}</div>
                    <div className="text-[11px] text-silver/50">{t}</div>
                  </div>
                </div>
                <div className={`text-sm tabular-nums ${up ? "text-glow" : "text-silver/80"}`}>{a}</div>
              </li>
            ))}
          </ul>
        </GlowCard>
      </div>
    </PageShell>
  );
}
