import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowLeft, Briefcase, MapPin, Globe, Building2, Clock, Calendar,
  CheckCircle2, Upload, Loader2, ArrowRight, FileText,
} from "lucide-react";
import { supabase } from "../integrations/supabase/client";
import { Seo, breadcrumb } from "../lib/seo";
import CountrySelect from "../components/CountrySelect";
import { COUNTRIES, Country } from "../lib/countries";

type Position = {
  id: string;
  slug: string;
  title: string;
  department: string;
  employment_type: string;
  work_mode: string;
  location: string;
  experience_level: string;
  salary_range: string | null;
  short_description: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  reporting_to: string | null;
  application_deadline: string | null;
  category: string;
};

const ALLOWED = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/msword",
  "application/vnd.ms-powerpoint",
];
const MAX_BYTES = 10 * 1024 * 1024; // 10 MB

const validFile = (f: File | null) => {
  if (!f) return null;
  if (!ALLOWED.includes(f.type) && !/\.(pdf|docx?|pptx?)$/i.test(f.name)) return "Only PDF, DOCX or PPTX allowed";
  if (f.size > MAX_BYTES) return "File must be under 10 MB";
  return null;
};

const safeName = (s: string) => s.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-80);

export default function CareerDetail() {
  const { slug } = useParams();
  const nav = useNavigate();
  const [position, setPosition] = useState<Position | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!slug) return;
      const { data } = await (supabase as any)
        .from("job_positions")
        .select("*")
        .eq("slug", slug)
        .eq("is_active", true)
        .maybeSingle();
      setPosition((data as Position) || null);
      setLoading(false);
    })();
  }, [slug]);

  if (loading) {
    return <div className="grid min-h-[60vh] place-items-center text-silver/60">Loading…</div>;
  }
  if (!position) {
    return (
      <section className="mx-auto max-w-3xl px-6 pt-40 pb-24 text-center">
        <h1 className="font-display text-4xl font-semibold text-white">Position not found</h1>
        <p className="mt-3 text-silver/60">The role you're looking for may have closed.</p>
        <Link to="/careers" className="mt-6 inline-flex items-center gap-2 text-sm text-glow hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to careers
        </Link>
      </section>
    );
  }

  return (
    <>
      <Seo
        title={`${position.title} — Careers at Shoho Pay`}
        description={position.short_description}
        path={`/careers/${position.slug}`}
        jsonLd={[
          breadcrumb([
            { name: "Home", path: "/" },
            { name: "Careers", path: "/careers" },
            { name: position.title, path: `/careers/${position.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "JobPosting",
            title: position.title,
            description: position.description,
            datePosted: new Date().toISOString().slice(0, 10),
            employmentType: position.employment_type,
            hiringOrganization: { "@type": "Organization", name: "Shoho Pay", sameAs: "https://shohopay.com" },
            jobLocation: {
              "@type": "Place",
              address: { "@type": "PostalAddress", addressLocality: position.location, addressCountry: "AE" },
            },
            validThrough: position.application_deadline || undefined,
          },
        ]}
      />

      {/* Hero */}
      <section className="relative pt-36 pb-12 md:pt-44">
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-hero" />
        <div aria-hidden className="absolute inset-0 -z-10 grid-lines opacity-[0.08]" />
        <div className="mx-auto max-w-4xl px-6">
          <Link to="/careers" className="inline-flex items-center gap-1.5 text-xs text-silver/60 hover:text-white">
            <ArrowLeft className="h-3.5 w-3.5" /> All open roles
          </Link>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-glow/10 px-2.5 py-1 text-[10px] uppercase tracking-wider text-glow">{position.department}</span>
              <span className="inline-flex items-center gap-1.5 rounded-full hairline px-2.5 py-1 text-[10px] uppercase tracking-wider text-silver/70">{position.category === "contractor" ? "Contract" : "Full-time"}</span>
              <span className="inline-flex items-center gap-1.5 rounded-full hairline px-2.5 py-1 text-[10px] uppercase tracking-wider text-silver/70">{position.experience_level}</span>
            </div>
            <h1 className="font-display mt-4 text-balance text-4xl font-semibold leading-[1.05] text-gradient-silver md:text-6xl">{position.title}</h1>
            <p className="mt-4 max-w-2xl text-silver/80 md:text-lg">{position.short_description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-silver/60">
              <span className="inline-flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5" />{position.employment_type}</span>
              <span className="inline-flex items-center gap-1.5"><Globe className="h-3.5 w-3.5" />{position.work_mode}</span>
              <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{position.location}</span>
              {position.salary_range && <span className="inline-flex items-center gap-1.5"><Building2 className="h-3.5 w-3.5" />{position.salary_range}</span>}
              {position.reporting_to && <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />Reports to {position.reporting_to}</span>}
              {position.application_deadline && <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />Apply by {new Date(position.application_deadline).toLocaleDateString()}</span>}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Body */}
      <section className="relative pb-12">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1fr,360px]">
          <article className="space-y-10">
            <Block title="About the role" body={<p className="whitespace-pre-line text-silver/80">{position.description}</p>} />
            {position.responsibilities?.length > 0 && (
              <Block title="Responsibilities" body={<List items={position.responsibilities} />} />
            )}
            {position.requirements?.length > 0 && (
              <Block title="Requirements" body={<List items={position.requirements} />} />
            )}
            {position.benefits?.length > 0 && (
              <Block title="Benefits" body={<List items={position.benefits} />} />
            )}
          </article>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl glass-strong p-6">
              <h3 className="font-display text-lg font-semibold text-white">Apply for this role</h3>
              <p className="mt-1 text-xs text-silver/60">We respond within 7 days.</p>
              <a href="#apply" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-glow px-5 py-3 text-sm font-medium text-white hover:bg-glow/90">
                Start application <ArrowRight className="h-4 w-4" />
              </a>
              <p className="mt-4 text-[11px] text-silver/40">Or <Link to="/careers/talent-pool" className="text-glow hover:underline">join our talent network</Link> for future roles.</p>
            </div>
          </aside>
        </div>
      </section>

      {/* Apply form */}
      <section id="apply" className="relative scroll-mt-24 py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-3xl glass-strong p-8 md:p-12">
            <h2 className="font-display text-3xl font-semibold text-white">Apply now</h2>
            <p className="mt-2 text-sm text-silver/70">All fields marked with <span className="text-glow">*</span> are required.</p>
            <ApplyForm position={position} onSuccess={() => nav(`/careers/${position.slug}?submitted=1`)} />
          </div>
        </div>
      </section>
    </>
  );
}

const Block = ({ title, body }: { title: string; body: React.ReactNode }) => (
  <div>
    <h2 className="font-display text-xl font-semibold text-white md:text-2xl">{title}</h2>
    <div className="mt-3 text-sm leading-relaxed md:text-[15px]">{body}</div>
  </div>
);

const List = ({ items }: { items: string[] }) => (
  <ul className="space-y-2">
    {items.map((it, i) => (
      <li key={i} className="flex gap-3 text-silver/80">
        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-glow" />
        <span>{it}</span>
      </li>
    ))}
  </ul>
);

/* ============== APPLY FORM ============== */
function ApplyForm({ position, onSuccess }: { position: Position; onSuccess: () => void }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState<Country>(COUNTRIES.find(c => c.code === "AE") || COUNTRIES[0]);
  const [nationality, setNationality] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("");
  const [noticePeriod, setNoticePeriod] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [cv, setCv] = useState<File | null>(null);
  const [portfolioFile, setPortfolioFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const upload = async (file: File | null, kind: string): Promise<string | null> => {
    if (!file) return null;
    const path = `${kind}/${position.slug}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safeName(file.name)}`;
    const { error } = await supabase.storage.from("applications").upload(path, file, {
      contentType: file.type || "application/octet-stream",
      upsert: false,
    });
    if (error) throw error;
    return path;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;

    if (!firstName.trim() || !lastName.trim()) return toast.error("Please enter your full name");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return toast.error("Please enter a valid email");
    if (phone.replace(/\D/g, "").length < 6) return toast.error("Please enter a valid phone number");
    if (!nationality.trim()) return toast.error("Please enter your nationality");
    if (!currentLocation.trim()) return toast.error("Please enter your current location");
    if (!yearsExperience.trim()) return toast.error("Please enter your years of experience");
    if (!coverLetter.trim()) return toast.error("Please tell us why you're a fit");
    if (!cv) return toast.error("Please attach your CV");

    for (const [file, label] of [[cv, "CV"], [portfolioFile, "Portfolio/Proposal"]] as const) {
      const err = validFile(file);
      if (err) return toast.error(`${label}: ${err}`);
    }

    setBusy(true);
    try {
      const [cvPath, portfolioPath] = await Promise.all([
        upload(cv, "cv"),
        upload(portfolioFile, "portfolio"),
      ]);

      const { error } = await (supabase as any).from("job_applications").insert({
        position_id: position.id,
        position_title: position.title,
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim().toLowerCase(),
        phone: `+${country.dial} ${phone.trim()}`,
        country: country.name,
        nationality: nationality.trim(),
        current_location: currentLocation.trim(),
        linkedin_url: linkedinUrl.trim() || null,
        years_experience: yearsExperience.trim(),
        expected_salary: expectedSalary.trim() || null,
        notice_period: noticePeriod.trim() || null,
        cover_letter: coverLetter.trim(),
        cv_path: cvPath,
        portfolio_path: portfolioPath,
        source: typeof window !== "undefined" ? window.location.pathname : null,
      });
      if (error) throw error;

      setDone(true);
      toast.success("Application submitted");
    } catch (err: any) {
      toast.error(err?.message || "Could not submit application");
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div className="mt-8 rounded-2xl border border-glow/30 bg-glow/5 p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-glow" />
        <h3 className="font-display mt-3 text-2xl font-semibold text-white">Application received</h3>
        <p className="mt-2 text-sm text-silver/70">
          Thank you for applying to SHOHO PAY. Your application has been submitted successfully and will be reviewed by our team.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-8 space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="First name" required value={firstName} onChange={setFirstName} />
        <Field label="Last name" required value={lastName} onChange={setLastName} />
      </div>
      <Field label="Email" required type="email" value={email} onChange={setEmail} placeholder="you@example.com" />

      <div>
        <label className="mb-1.5 block text-xs uppercase tracking-wider text-silver/60">Phone <span className="text-glow">*</span></label>
        <div className="flex overflow-hidden rounded-xl hairline bg-white/[0.04] focus-within:ring-2 focus-within:ring-glow/40">
          <CountrySelect value={country} onChange={setCountry} />
          <input
            type="tel"
            inputMode="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="50 123 4567"
            className="w-full bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-silver/30"
            required
          />
        </div>
        <p className="mt-1 text-[11px] text-silver/40">Country: <span className="text-silver/70">{country.name}</span></p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="LinkedIn (optional)" value={linkedinUrl} onChange={setLinkedinUrl} placeholder="https://linkedin.com/in/…" />
        <Field label="Portfolio (optional)" value={portfolioUrl} onChange={setPortfolioUrl} placeholder="https://…" />
        <Field label="GitHub (optional)" value={githubUrl} onChange={setGithubUrl} placeholder="https://github.com/…" />
        <Field label="Current company (optional)" value={currentCompany} onChange={setCurrentCompany} />
      </div>

      <div>
        <label className="mb-1.5 block text-xs uppercase tracking-wider text-silver/60">Cover letter (optional)</label>
        <textarea
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          rows={5}
          maxLength={4000}
          placeholder="Tell us why you're excited about Shoho Pay…"
          className="w-full resize-y rounded-xl hairline bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-silver/30 focus:ring-2 focus:ring-glow/40"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <FileInput label="CV / Resume" required file={cv} onChange={setCv} />
        <FileInput label="Portfolio (optional)" file={portfolioFile} onChange={setPortfolioFile} />
        <FileInput label="Supporting (optional)" file={supportingFile} onChange={setSupportingFile} />
      </div>
      <p className="text-[11px] text-silver/40">Allowed formats: PDF, DOCX, PPTX. Max 10 MB per file.</p>

      <button
        type="submit"
        disabled={busy}
        className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-glow px-6 py-4 text-sm font-medium text-white shadow-[0_14px_40px_-10px_rgba(45,127,255,0.7)] transition hover:bg-glow/90 disabled:opacity-60"
      >
        {busy ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting…</> : <>Submit application <ArrowRight className="h-4 w-4" /></>}
      </button>
    </form>
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

function FileInput({ label, file, onChange, required }: { label: string; file: File | null; onChange: (f: File | null) => void; required?: boolean }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs uppercase tracking-wider text-silver/60">
        {label} {required && <span className="text-glow">*</span>}
      </label>
      <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl hairline bg-white/[0.04] px-4 py-3 text-sm text-white transition hover:bg-white/[0.07]">
        <span className="flex min-w-0 items-center gap-2 truncate text-silver/80">
          {file ? <FileText className="h-4 w-4 shrink-0 text-glow" /> : <Upload className="h-4 w-4 shrink-0 text-silver/50" />}
          <span className="truncate">{file ? file.name : "Choose file"}</span>
        </span>
        <input
          type="file"
          accept=".pdf,.doc,.docx,.ppt,.pptx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.presentationml.presentation"
          required={required}
          onChange={(e) => onChange(e.target.files?.[0] || null)}
          className="hidden"
        />
      </label>
    </div>
  );
}
