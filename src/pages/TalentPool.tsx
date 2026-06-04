import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ArrowRight, CheckCircle2, FileText, Loader2, Upload, Users } from "lucide-react";
import { supabase } from "../integrations/supabase/client";
import { Seo, breadcrumb } from "../lib/seo";
import CountrySelect from "../components/CountrySelect";
import { COUNTRIES, Country } from "../lib/countries";

const ALLOWED = /\.(pdf|docx?|pptx?)$/i;
const MAX_BYTES = 10 * 1024 * 1024;
const safeName = (s: string) => s.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-80);

export default function TalentPool() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState<Country>(COUNTRIES.find(c => c.code === "AE") || COUNTRIES[0]);
  const [area, setArea] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [message, setMessage] = useState("");
  const [cv, setCv] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    if (!firstName.trim() || !lastName.trim()) return toast.error("Please enter your name");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return toast.error("Please enter a valid email");
    if (cv) {
      if (!ALLOWED.test(cv.name)) return toast.error("CV must be PDF, DOCX or PPTX");
      if (cv.size > MAX_BYTES) return toast.error("CV must be under 10 MB");
    }

    setBusy(true);
    try {
      let cvPath: string | null = null;
      if (cv) {
        cvPath = `talent/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safeName(cv.name)}`;
        const { error } = await supabase.storage.from("applications").upload(cvPath, cv, { upsert: false });
        if (error) throw error;
      }

      const { error } = await (supabase as any).from("talent_pool").insert({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone ? `+${country.dial} ${phone.trim()}` : null,
        country: country.name,
        area_of_interest: area.trim() || null,
        linkedin_url: linkedinUrl.trim() || null,
        portfolio_url: portfolioUrl.trim() || null,
        message: message.trim() || null,
        cv_path: cvPath,
      });
      if (error) throw error;

      setDone(true);
      toast.success("You're in the talent network");
    } catch (err: any) {
      toast.error(err?.message || "Could not submit");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <Seo
        title="Join Our Talent Network — Shoho Pay Careers"
        description="Even if no role matches today, join the Shoho Pay talent network. We'll reach out when a fit opens up."
        path="/careers/talent-pool"
        jsonLd={breadcrumb([
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
          { name: "Talent Network", path: "/careers/talent-pool" },
        ])}
      />

      <section className="relative pt-36 pb-12 md:pt-44">
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-hero" />
        <div aria-hidden className="absolute inset-0 -z-10 grid-lines opacity-[0.1]" />
        <div className="mx-auto max-w-3xl px-6 text-center">
          <motion.span initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 rounded-full hairline px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-glow">
            <Users className="h-3 w-3" /> Talent Network
          </motion.span>
          <h1 className="font-display mt-6 text-balance text-5xl font-semibold leading-[1.02] text-gradient-silver md:text-6xl">
            Don't see your role?
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-silver/80">
            Tell us about yourself. We'll keep your profile on file and reach out when something opens up.
          </p>
        </div>
      </section>

      <section className="relative pb-24">
        <div className="mx-auto max-w-2xl px-6">
          <div className="rounded-3xl glass-strong p-8 md:p-12">
            {done ? (
              <div className="text-center">
                <CheckCircle2 className="mx-auto h-10 w-10 text-glow" />
                <h2 className="font-display mt-3 text-2xl font-semibold text-white">You're in</h2>
                <p className="mt-2 text-sm text-silver/70">Thanks for sharing your profile. We'll reach out when a fit opens up.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="First name" required value={firstName} onChange={setFirstName} />
                  <Field label="Last name" required value={lastName} onChange={setLastName} />
                </div>
                <Field label="Email" type="email" required value={email} onChange={setEmail} placeholder="you@example.com" />
                <div>
                  <label htmlFor="talent-phone" className="mb-1.5 block text-xs uppercase tracking-wider text-silver/60">Phone (optional)</label>
                  <div className="flex overflow-hidden rounded-xl hairline bg-white/[0.04] focus-within:ring-2 focus-within:ring-glow/40">
                    <CountrySelect value={country} onChange={setCountry} />
                    <input
                      id="talent-phone"
                      type="tel"
                      inputMode="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="50 123 4567"
                      aria-label="Phone number"
                      className="w-full bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-silver/30"
                    />
                  </div>
                </div>
                <Field label="Area of interest" value={area} onChange={setArea} placeholder="e.g. Engineering, Design, Compliance" />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="LinkedIn (optional)" value={linkedinUrl} onChange={setLinkedinUrl} placeholder="https://linkedin.com/in/…" />
                  <Field label="Portfolio (optional)" value={portfolioUrl} onChange={setPortfolioUrl} placeholder="https://…" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-wider text-silver/60">A short note (optional)</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    maxLength={2000}
                    placeholder="What kind of role are you looking for?"
                    className="w-full resize-y rounded-xl hairline bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-silver/30 focus:ring-2 focus:ring-glow/40"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-wider text-silver/60">CV / Resume (optional)</label>
                  <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl hairline bg-white/[0.04] px-4 py-3 text-sm text-white transition hover:bg-white/[0.07]">
                    <span className="flex min-w-0 items-center gap-2 truncate text-silver/80">
                      {cv ? <FileText className="h-4 w-4 shrink-0 text-glow" /> : <Upload className="h-4 w-4 shrink-0 text-silver/50" />}
                      <span className="truncate">{cv ? cv.name : "Choose file (PDF, DOCX, PPTX)"}</span>
                    </span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.ppt,.pptx"
                      onChange={(e) => setCv(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={busy}
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-glow px-6 py-4 text-sm font-medium text-white shadow-[0_14px_40px_-10px_rgba(45,127,255,0.7)] transition hover:bg-glow/90 disabled:opacity-60"
                >
                  {busy ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting…</> : <>Join talent network <ArrowRight className="h-4 w-4" /></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, value, onChange, type = "text", placeholder, required }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs uppercase tracking-wider text-silver/60">
        {label} {required && <span className="text-glow">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl hairline bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-silver/30 focus:ring-2 focus:ring-glow/40"
      />
    </div>
  );
}
