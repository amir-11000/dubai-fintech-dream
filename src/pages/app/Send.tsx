import { useState } from "react";
import { motion } from "framer-motion";
import { useStore } from "../../lib/store";
import { aed } from "../../lib/format";
import { toast } from "sonner";

export default function SendPage() {
  const { send, state } = useStore();
  const [to, setTo] = useState("");
  const [amt, setAmt] = useState(100);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = () => {
    if (!to.trim() || amt <= 0) return toast.error("Add recipient and amount");
    if (amt > state.balances.AED) return toast.error("Insufficient AED balance");
    setLoading(true);
    setTimeout(() => {
      send(to, amt, note);
      setLoading(false);
      toast.success(`Sent ${aed(amt)} to ${to}`);
      setTo(""); setAmt(100); setNote("");
    }, 700);
  };

  return (
    <div className="mx-auto max-w-md pb-10">
      <h1 className="text-2xl font-semibold text-white">Send money</h1>
      <p className="mt-1 text-sm text-silver/60">Instant, free, in AED. Available {aed(state.balances.AED)}.</p>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-4 rounded-3xl glass-strong p-6">
        <label className="block">
          <span className="mb-1.5 block text-[11px] uppercase tracking-widest text-silver/60">To</span>
          <input value={to} onChange={(e) => setTo(e.target.value)} placeholder="Name or @handle" className="w-full rounded-xl bg-white/[0.03] px-4 py-3 text-sm text-white outline-none hairline" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[11px] uppercase tracking-widest text-silver/60">Amount (AED)</span>
          <input type="number" value={amt} onChange={(e) => setAmt(Number(e.target.value))} className="w-full rounded-xl bg-white/[0.03] px-4 py-3 text-2xl font-semibold text-white outline-none hairline" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[11px] uppercase tracking-widest text-silver/60">Note (optional)</span>
          <input value={note} onChange={(e) => setNote(e.target.value)} className="w-full rounded-xl bg-white/[0.03] px-4 py-3 text-sm text-white outline-none hairline" />
        </label>
        <button onClick={submit} disabled={loading} className="w-full rounded-full bg-gold-grad py-3.5 text-sm font-medium text-ink disabled:opacity-60">
          {loading ? "Sending…" : `Send ${aed(amt)}`}
        </button>
      </motion.div>
    </div>
  );
}
