import { useState } from "react";
import { QrCode, Send, ArrowDownLeft } from "lucide-react";
import { PageShell, PageHeader, GlowCard, PrimaryButton, GhostButton, SuccessToast, Field } from "../components/ui";

const contacts = [
  { n: "Layla Hassan", a: "L", c: "from-pink-300 to-rose-500" },
  { n: "Omar Khalifa", a: "O", c: "from-sky-300 to-blue-600" },
  { n: "Sara Al Suwaidi", a: "S", c: "from-amber-200 to-amber-500" },
  { n: "Yusuf Hadid", a: "Y", c: "from-emerald-300 to-emerald-600" },
  { n: "Nora Faisal", a: "N", c: "from-violet-300 to-violet-600" },
  { n: "Karim Aziz", a: "K", c: "from-cyan-300 to-cyan-600" },
];

export default function SocialPayments() {
  const [selected, setSelected] = useState(contacts[0]);
  const [amount, setAmount] = useState("120");
  const [mode, setMode] = useState<"send" | "request" | "qr" | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const fire = (action: string) => {
    setMsg(`${action} of AED ${amount} ${action === "Send" ? "to" : "from"} ${selected.n} confirmed.`);
    setMode(null);
    setTimeout(() => setMsg(null), 3000);
  };

  return (
    <PageShell>
      <PageHeader eyebrow="Social Payments" title={<>No IBAN. <span className="text-gradient-blue">Just instant finance.</span></>} sub="Pay anyone in your contacts in a tap." />

      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <GlowCard>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Contacts</h2>
            <span className="text-xs text-silver/50">{contacts.length} verified</span>
          </div>
          <ul className="space-y-2">
            {contacts.map((c) => (
              <li key={c.n}>
                <button onClick={() => setSelected(c)} className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 transition ${selected.n === c.n ? "glass-strong" : "glass hover:bg-white/5"}`}>
                  <div className="flex items-center gap-3">
                    <div className={`grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br ${c.c} text-sm font-semibold text-white`}>{c.a}</div>
                    <div className="text-sm text-white">{c.n}</div>
                  </div>
                  <span className="text-[11px] text-glow">SHOHO PAY</span>
                </button>
              </li>
            ))}
          </ul>
        </GlowCard>

        <GlowCard>
          <div className="text-[11px] uppercase tracking-widest text-silver/60">Selected</div>
          <div className="mt-2 text-2xl font-semibold text-white">{selected.n}</div>
          <div className="mt-6"><Field label="Amount (AED)" type="number" value={amount} onChange={setAmount} /></div>
          <div className="mt-5 grid grid-cols-3 gap-2">
            <PrimaryButton onClick={() => { setMode("send"); fire("Send"); }}><Send className="h-4 w-4" /> Send</PrimaryButton>
            <GhostButton onClick={() => { setMode("request"); fire("Request"); }}><ArrowDownLeft className="h-4 w-4" /> Request</GhostButton>
            <GhostButton onClick={() => setMode("qr")}><QrCode className="h-4 w-4" /> QR Pay</GhostButton>
          </div>
          {mode === "qr" && (
            <div className="mt-5 grid place-items-center rounded-2xl bg-white p-6">
              <div className="grid grid-cols-12 gap-[3px]">
                {Array.from({ length: 144 }).map((_, i) => (
                  <div key={i} className="h-3 w-3" style={{ background: Math.random() > 0.55 ? "#000" : "transparent" }} />
                ))}
              </div>
              <div className="mt-3 text-xs text-ink/70">Scan to pay {selected.n} · AED {amount}</div>
            </div>
          )}
          <SuccessToast show={!!msg} text={msg ?? ""} />
        </GlowCard>
      </div>
    </PageShell>
  );
}
