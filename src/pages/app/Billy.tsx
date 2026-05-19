import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import { supabase } from "../../integrations/supabase/client";
import { useStore } from "../../lib/store";
import { BILLY_SYSTEM_PROMPT, buildBillyContext, BUDGET_CATEGORIES, BudgetCategory } from "../../lib/billy";
import { BillyMark } from "../../components/billy/BillyMark";
import { InsightCard } from "../../components/billy/InsightCard";
import { aed, uid } from "../../lib/format";
import { toast } from "sonner";

const renderRich = (text: string) =>
  text.split(/(\*\*[^*]+\*\*)/g).map((s, i) =>
    s.startsWith("**") && s.endsWith("**") ? (
      <strong key={i} className="text-gold">{s.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{s}</span>
    )
  );

export default function BillyHub() {
  const { state, addChat, netWorthAED, setBudget, addGoal, markInsightsRead } = useStore();
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  // Budget form
  const [monthly, setMonthly] = useState(state.budget?.monthly ?? 6000);

  // Goal form
  const [gName, setGName] = useState("");
  const [gTarget, setGTarget] = useState(5000);

  useEffect(() => { markInsightsRead(); }, [markInsightsRead]);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [state.chat]);

  const send = async () => {
    const text = input.trim();
    if (!text || busy) return;
    addChat({ id: uid(), role: "user", content: text, ts: new Date().toISOString() });
    setInput("");
    setBusy(true);

    const context = buildBillyContext({
      user: state.user,
      balances: state.balances as any,
      prices: state.prices as any,
      savingsAED: state.savingsAED,
      netWorthAED,
      budget: state.budget,
      goals: state.goals,
      transactions: state.transactions,
    });

    const recent = [...state.chat, { id: "u", role: "user" as const, content: text, ts: "" }]
      .slice(-12)
      .map((m) => ({ role: m.role, content: m.content }));

    try {
      const { data, error } = await supabase.functions.invoke("ask-billy", {
        body: { system: BILLY_SYSTEM_PROMPT, context, messages: recent },
      });
      if (error) throw error;
      if (!data?.ok) throw new Error(data?.error || "Billy could not reply");
      addChat({ id: uid(), role: "assistant", content: data.content, ts: new Date().toISOString() });
    } catch (e: any) {
      const msg = e?.message || "Billy is unavailable right now.";
      toast.error(msg);
      addChat({ id: uid(), role: "assistant", content: `Sorry — ${msg}`, ts: new Date().toISOString() });
    } finally {
      setBusy(false);
    }
  };

  const saveBudget = () => {
    setBudget({
      monthly: Number(monthly) || 0,
      categories: state.budget?.categories ?? {},
      setAt: new Date().toISOString(),
    });
    toast.success("Budget updated");
  };

  const updateCat = (c: BudgetCategory, v: number) => {
    if (!state.budget) return;
    setBudget({ ...state.budget, categories: { ...state.budget.categories, [c]: v } });
  };

  const submitGoal = () => {
    if (!gName.trim() || gTarget <= 0) return;
    addGoal({ name: gName, target: gTarget, saved: 0 });
    setGName(""); setGTarget(5000);
    toast.success("Goal added — Billy will track it");
  };

  return (
    <div className="grid grid-cols-1 gap-6 pb-10 lg:grid-cols-3">
      {/* Chat */}
      <section className="lg:col-span-2">
        <div className="rounded-3xl glass-strong p-5">
          <div className="mb-4 flex items-center gap-3">
            <BillyMark size={40} />
            <div>
              <div className="text-base font-medium text-white">Billy</div>
              <div className="text-[11px] text-gold">Your AI accountant · online</div>
            </div>
          </div>
          <div className="max-h-[460px] space-y-3 overflow-y-auto pr-1">
            <AnimatePresence>
              {state.chat.map((m) => (
                <motion.div key={m.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className={`flex ${m.role === "user" ? "justify-end" : ""}`}>
                  <div className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${m.role === "user" ? "bg-white text-ink" : "bg-white/5 text-silver hairline"}`}>
                    {m.role === "assistant" ? renderRich(m.content) : m.content}
                  </div>
                </motion.div>
              ))}
              {busy && (
                <div className="flex">
                  <div className="rounded-2xl bg-white/5 px-4 py-2 text-sm text-silver/60 hairline">Billy is thinking…</div>
                </div>
              )}
            </AnimatePresence>
            <div ref={endRef} />
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-2xl bg-white/[0.03] px-3 py-2 hairline">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask Billy anything about your money…"
              className="flex-1 bg-transparent px-2 py-2 text-sm text-white outline-none placeholder:text-silver/40"
            />
            <button onClick={send} disabled={busy} className="grid h-9 w-9 place-items-center rounded-full bg-gold-grad text-ink transition hover:scale-105 disabled:opacity-60">
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {["How much did I spend on food this month?", "Am I on track with my budget?", "What should I do with my surplus?"].map((q) => (
              <button key={q} onClick={() => setInput(q)} className="rounded-full bg-white/5 px-3 py-1 text-[11px] text-silver/70 hairline hover:bg-white/10">{q}</button>
            ))}
          </div>
        </div>

        {state.insights.length > 0 && (
          <div className="mt-6 space-y-3">
            <div className="text-[11px] uppercase tracking-widest text-silver/60">All insights</div>
            {state.insights.map((i) => <InsightCard key={i.id} insight={i} />)}
          </div>
        )}
      </section>

      {/* Budget + Goals */}
      <aside className="space-y-6">
        <div className="rounded-3xl glass p-5">
          <div className="text-[11px] uppercase tracking-widest text-silver/60">Monthly budget</div>
          <div className="mt-2 flex items-end gap-2">
            <input type="number" value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} className="w-full rounded-xl bg-white/[0.03] px-3 py-2 text-xl font-semibold text-white outline-none hairline focus:ring-2 focus:ring-gold/40" />
            <button onClick={saveBudget} className="rounded-full bg-gold-grad px-4 py-2 text-xs font-medium text-ink">Save</button>
          </div>
          <div className="mt-4 space-y-2">
            {BUDGET_CATEGORIES.map((c) => (
              <div key={c} className="flex items-center justify-between gap-3">
                <span className="text-xs text-silver/70">{c}</span>
                <input
                  type="number"
                  value={state.budget?.categories?.[c] ?? 0}
                  onChange={(e) => updateCat(c, Number(e.target.value))}
                  className="w-28 rounded-lg bg-white/[0.03] px-2 py-1 text-right text-xs text-white outline-none hairline"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl glass p-5">
          <div className="text-[11px] uppercase tracking-widest text-silver/60">Goals</div>
          <div className="mt-3 space-y-3">
            {state.goals.map((g) => (
              <div key={g.id} className="rounded-xl bg-white/[0.03] p-3 hairline">
                <div className="flex items-center justify-between text-sm text-white">
                  <span>{g.name}</span>
                  <span className="text-xs text-silver/60">{aed(g.saved)} / {aed(g.target)}</span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                  <div className="h-full bg-gold" style={{ width: `${Math.min(100, (g.saved / g.target) * 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-2">
            <input value={gName} onChange={(e) => setGName(e.target.value)} placeholder="Goal name" className="w-full rounded-xl bg-white/[0.03] px-3 py-2 text-sm text-white outline-none hairline" />
            <input type="number" value={gTarget} onChange={(e) => setGTarget(Number(e.target.value))} placeholder="Target AED" className="w-full rounded-xl bg-white/[0.03] px-3 py-2 text-sm text-white outline-none hairline" />
            <button onClick={submitGoal} className="w-full rounded-full bg-white/5 px-4 py-2 text-xs text-white hairline hover:bg-white/10">Add goal</button>
          </div>
        </div>
      </aside>
    </div>
  );
}
