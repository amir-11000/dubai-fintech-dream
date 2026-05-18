import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PageShell, PageHeader, GlowCard, Field, PrimaryButton, SuccessToast } from "../components/ui";

export default function SignUp() {
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", country: "United Arab Emirates", password: "" });
  const set = (k: string) => (v: string) => setForm({ ...form, [k]: v });
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setOk(true); setTimeout(() => nav("/wallet"), 1100); }, 900);
  };

  return (
    <PageShell>
      <PageHeader eyebrow="Join early access" title={<>Create your <span className="text-gradient-blue">DIRHAMPAY</span> account</>} sub="A premium onboarding to the future of finance." />
      <div className="mx-auto mt-12 max-w-xl">
        <GlowCard>
          <form onSubmit={submit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="md:col-span-2"><Field label="Full name" placeholder="Khalid Al Mansoori" value={form.name} onChange={set("name")} required /></div>
            <Field label="Email" type="email" placeholder="you@dirhampay.com" value={form.email} onChange={set("email")} required />
            <Field label="Phone" type="tel" placeholder="+971 50 000 0000" value={form.phone} onChange={set("phone")} required />
            <label className="block md:col-span-2">
              <span className="mb-1.5 block text-[11px] uppercase tracking-widest text-silver/60">Country</span>
              <select value={form.country} onChange={(e) => set("country")(e.target.value)} className="w-full rounded-xl bg-white/[0.03] px-4 py-3 text-sm text-white outline-none hairline focus:ring-2 focus:ring-glow/40">
                {["United Arab Emirates","Saudi Arabia","Qatar","Kuwait","Bahrain","Oman","United Kingdom","United States","India","Singapore"].map(c => <option key={c} className="bg-ink">{c}</option>)}
              </select>
            </label>
            <div className="md:col-span-2"><Field label="Password" type="password" placeholder="Minimum 8 characters" value={form.password} onChange={set("password")} required /></div>
            <div className="md:col-span-2"><PrimaryButton type="submit" loading={loading}>Create Account</PrimaryButton></div>
          </form>
          <SuccessToast show={ok} text="Account created. Welcome to DIRHAMPAY." />
          <p className="mt-5 text-center text-xs text-silver/60">
            Already a member? <Link to="/signin" className="text-glow hover:underline">Sign in</Link>
          </p>
        </GlowCard>
      </div>
    </PageShell>
  );
}
