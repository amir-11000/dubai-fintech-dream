import { useState, FormEvent } from "react";
import { PageShell, PageHeader, GlowCard, Field, PrimaryButton, SuccessToast } from "../components/ui";

const types = ["Individual", "Business", "Investor"] as const;

export default function EarlyAccess() {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [type, setType] = useState<(typeof types)[number]>("Individual");
  const set = (k: string) => (v: string) => setForm({ ...form, [k]: v });
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setOk(true); setForm({ name: "", email: "", phone: "" }); }, 900);
  };

  return (
    <PageShell>
      <PageHeader eyebrow="Early access · Limited" title={<>Join the <span className="text-gradient-blue">DIRHAMPAY waitlist.</span></>} sub="Be among the first to experience the future of finance from Dubai." />

      <div className="mx-auto mt-12 max-w-xl">
        <GlowCard>
          <form onSubmit={submit} className="space-y-4">
            <Field label="Name" value={form.name} onChange={set("name")} required />
            <Field label="Email" type="email" value={form.email} onChange={set("email")} required />
            <Field label="Phone" type="tel" value={form.phone} onChange={set("phone")} placeholder="+971 50 000 0000" required />
            <div>
              <span className="mb-2 block text-[11px] uppercase tracking-widest text-silver/60">I am a…</span>
              <div className="grid grid-cols-3 gap-2">
                {types.map((t) => (
                  <button type="button" key={t} onClick={() => setType(t)} className={`rounded-xl px-3 py-3 text-sm transition ${type === t ? "bg-white text-ink" : "glass text-silver hover:bg-white/10"}`}>{t}</button>
                ))}
              </div>
            </div>
            <PrimaryButton type="submit" loading={loading}>Join Waitlist</PrimaryButton>
          </form>
          <SuccessToast show={ok} text={`You're on the list as ${type}. We'll reach out from Dubai soon.`} />
        </GlowCard>
      </div>
    </PageShell>
  );
}
