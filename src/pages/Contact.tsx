import { useState, FormEvent } from "react";
import { MapPin, Mail, Phone } from "lucide-react";
import { PageShell, PageHeader, GlowCard, Field, PrimaryButton, SuccessToast } from "../components/ui";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const set = (k: string) => (v: string) => setForm({ ...form, [k]: v });
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setOk(true); setForm({ name: "", email: "", company: "", message: "" }); setTimeout(() => setOk(false), 3500); }, 900);
  };

  return (
    <PageShell>
      <PageHeader eyebrow="Contact" title={<>Let's <span className="text-gradient-blue">talk.</span></>} sub="Partnerships, press and investor inquiries — direct line to our Dubai HQ." />

      <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-5">
        <GlowCard className="lg:col-span-3">
          <form onSubmit={submit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Name" value={form.name} onChange={set("name")} required />
            <Field label="Email" type="email" value={form.email} onChange={set("email")} required />
            <div className="md:col-span-2"><Field label="Company" value={form.company} onChange={set("company")} /></div>
            <label className="block md:col-span-2">
              <span className="mb-1.5 block text-[11px] uppercase tracking-widest text-silver/60">Message</span>
              <textarea required value={form.message} onChange={(e) => set("message")(e.target.value)} rows={5} className="w-full rounded-xl bg-white/[0.03] px-4 py-3 text-sm text-white outline-none hairline focus:bg-white/[0.06] focus:ring-2 focus:ring-glow/40" />
            </label>
            <div className="md:col-span-2"><PrimaryButton type="submit" loading={loading}>Submit</PrimaryButton></div>
          </form>
          <SuccessToast show={ok} text="Message sent. We'll respond within 24h." />
        </GlowCard>

        <GlowCard className="lg:col-span-2">
          <div className="text-[11px] uppercase tracking-widest text-silver/60">DIRHAMPAY HQ</div>
          <div className="mt-2 text-2xl font-semibold text-gradient-silver">Dubai · DIFC</div>
          <div className="mt-6 space-y-4 text-sm text-silver/80">
            <div className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 text-glow" /> Gate Village 10, DIFC, Dubai, UAE</div>
            <div className="flex items-start gap-3"><Mail className="mt-0.5 h-4 w-4 text-glow" /> hello@dirhampay.com</div>
            <div className="flex items-start gap-3"><Phone className="mt-0.5 h-4 w-4 text-glow" /> +971 4 000 0000</div>
          </div>
          <div className="mt-6 rounded-2xl bg-white/[0.03] p-4 hairline text-xs text-silver/60">
            We're a Dubai-based fintech startup building the next generation of borderless finance. Open to strategic investors, partners and press.
          </div>
        </GlowCard>
      </div>
    </PageShell>
  );
}
