import { useState, useRef, useEffect } from "react";
import { Bot, Send, TrendingUp, CircleDollarSign, Sparkles } from "lucide-react";
import { PageShell, PageHeader, GlowCard } from "../components/ui";

type Msg = { role: "user" | "ai"; text: string };

const seed: Msg[] = [
  { role: "user", text: "I want to save for a Tokyo trip in 3 months." },
  { role: "ai", text: "Perfect. Tokyo target: AED 18,400 by 16 Aug.\n\n• Save AED 1,420 / week from your salary\n• Pause 2 underused subscriptions (saves AED 184/mo)\n• Move 70% of saved cash into a low-risk yield vault (+2.6% projected)\n• Allocate 30% to digital gold as inflation hedge\n\nWant me to automate this plan today?" },
];

const replies: Record<string, string> = {
  default: "I'll model that against your cash flow and propose an optimized plan. Shall I activate auto-budgeting?",
  save: "Got it — I'll set up an auto-saving rule and notify you weekly.",
  invest: "Based on your risk profile, I'd allocate 60% yield vault, 30% gold, 10% BTC. Shall I open it?",
  spend: "Your top 3 discretionary spends this month: dining, ride-hailing, and streaming. I can suggest cuts.",
};

export default function AIAssistant() {
  const [messages, setMessages] = useState<Msg[]>(seed);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Msg = { role: "user", text: input };
    const lower = input.toLowerCase();
    const reply = lower.includes("save") ? replies.save : lower.includes("invest") ? replies.invest : lower.includes("spend") ? replies.spend : replies.default;
    setMessages([...messages, userMsg]);
    setInput("");
    setTimeout(() => setMessages((m) => [...m, { role: "ai", text: reply }]), 700);
  };

  return (
    <PageShell>
      <PageHeader eyebrow="AI Financial Assistant" title={<>Your money, <span className="text-gradient-blue">thinking ahead.</span></>} sub="Plans, budgets and invests with you — in plain language." />

      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-5">
        <GlowCard className="lg:col-span-3">
          <div className="mb-4 flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-glow/15 text-glow"><Bot className="h-5 w-5" /></div>
            <div>
              <div className="text-sm text-white">DIRHAMPAY Intelligence</div>
              <div className="flex items-center gap-1 text-[11px] text-glow"><span className="h-1.5 w-1.5 rounded-full bg-glow" /> Online</div>
            </div>
          </div>
          <div className="max-h-[440px] space-y-3 overflow-y-auto pr-1">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : ""}`}>
                <div className={`max-w-[80%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${m.role === "user" ? "bg-white text-ink" : "bg-white/5 text-silver hairline"}`}>{m.text}</div>
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <div className="mt-5 flex items-center gap-2 rounded-2xl bg-white/[0.03] px-3 py-2 hairline">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Ask anything about your money…" className="flex-1 bg-transparent px-2 py-2 text-sm text-white outline-none placeholder:text-silver/40" />
            <button onClick={send} className="grid h-9 w-9 place-items-center rounded-full bg-glow text-ink transition hover:scale-105">
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </GlowCard>

        <div className="space-y-4 lg:col-span-2">
          <GlowCard className="p-5">
            <div className="text-[11px] uppercase tracking-widest text-silver/60">Tokyo trip · 92 days</div>
            <div className="mt-1 text-2xl font-semibold text-gradient-blue">AED 6,820 / 18,400</div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/5"><div className="h-full bg-glow" style={{ width: "37%" }} /></div>
            <div className="mt-2 text-xs text-silver/60">On track · ahead by 4 days</div>
          </GlowCard>
          {[
            { icon: TrendingUp, t: "Adaptive budgeting", d: "Auto-categorized spend, weekly insights." },
            { icon: CircleDollarSign, t: "Smart saving goals", d: "Set a goal — we set the plan." },
            { icon: Sparkles, t: "Personalized investing", d: "Tuned to your real cash flow." },
          ].map((f) => (
            <div key={f.t} className="flex items-start gap-4 rounded-2xl glass p-5">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/5 text-glow hairline"><f.icon className="h-5 w-5" /></div>
              <div>
                <div className="text-base font-medium text-white">{f.t}</div>
                <div className="mt-1 text-sm text-silver/60">{f.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
