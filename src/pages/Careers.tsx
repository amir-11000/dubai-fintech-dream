import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, Users, ArrowRight, Sparkles, Globe, Building2, Search, Filter } from "lucide-react";
import { supabase } from "../integrations/supabase/client";
import { Seo, breadcrumb } from "../lib/seo";

export type Position = {
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
  category: string;
  sort_order: number;
};

export default function Careers() {
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState<string>("All");
  const [tab, setTab] = useState<"all" | "full_time" | "contractor">("all");

  useEffect(() => {
    (async () => {
      const { data } = await (supabase as any)
        .from("job_positions")
        .select("id, slug, title, department, employment_type, work_mode, location, experience_level, salary_range, short_description, category, sort_order")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });
      setPositions(((data as Position[]) || []));
      setLoading(false);
    })();
  }, []);

  const departments = useMemo(() => ["All", ...Array.from(new Set(positions.map(p => p.department)))], [positions]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return positions.filter(p => {
      if (tab !== "all" && p.category !== tab) return false;
      if (dept !== "All" && p.department !== dept) return false;
      if (!q) return true;
      return [p.title, p.department, p.location, p.short_description].some(v => v.toLowerCase().includes(q));
    });
  }, [positions, query, dept, tab]);

  return (
    <>
      <Seo
        title="Careers — Shoho Pay | Build the Future of Finance in the UAE"
        description="Join Shoho Pay and help build the next generation of payments, digital banking, AI and financial technology in the UAE."
        path="/careers"
        jsonLd={breadcrumb([{ name: "Home", path: "/" }, { name: "Careers", path: "/careers" }])}
      />

      {/* HERO */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28">
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-hero" />
        <div aria-hidden className="absolute inset-0 -z-10 grid-lines opacity-[0.1]" />
        <div className="mx-auto max-w-5xl px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full hairline px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-glow"
          >
            <Sparkles className="h-3 w-3" /> Careers · Hiring now
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="font-display mt-6 text-balance text-5xl font-semibold leading-[1.02] text-gradient-silver md:text-7xl"
          >
            Build the Future of Finance
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}
            className="mx-auto mt-5 max-w-2xl text-base text-silver/80 md:text-lg"
          >
            Join a world-class team shaping the next generation of payments, digital banking, AI and financial technology — designed in Dubai, built for the UAE and beyond.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <a href="#open-roles" className="group inline-flex items-center gap-2 rounded-full bg-glow px-6 py-3.5 text-sm font-medium text-white shadow-[0_14px_40px_-10px_rgba(45,127,255,0.7)] transition hover:bg-glow/90">
              View Open Roles <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
            <Link to="/careers/talent-pool" className="inline-flex items-center gap-2 rounded-full hairline bg-white/[0.04] px-6 py-3.5 text-sm font-medium text-snow hover:bg-white/10">
              Join Talent Network <Users className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* OPEN ROLES */}
      <section id="open-roles" className="relative py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-[0.18em] text-silver/50">Open positions</span>
              <h2 className="font-display mt-2 text-3xl font-semibold text-white md:text-4xl">{positions.length} roles open</h2>
            </div>
            <p className="max-w-md text-sm text-silver/60">Full-time, hybrid and remote opportunities across engineering, design, compliance, marketing and operations.</p>
          </div>

          {/* Filters */}
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-silver/40" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search roles, departments, locations…"
                className="w-full rounded-full bg-white/[0.04] py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-silver/30 hairline focus:ring-2 focus:ring-glow/40"
              />
            </div>
            <div className="flex gap-1 rounded-full hairline bg-white/[0.03] p-1 text-xs">
              {([["all","All"],["full_time","Full-time"],["contractor","Contract"]] as const).map(([k,l]) => (
                <button key={k} onClick={() => setTab(k as any)} className={`rounded-full px-4 py-2 transition ${tab===k?"bg-white/10 text-white":"text-silver/60 hover:text-white"}`}>{l}</button>
              ))}
            </div>
            <div className="relative">
              <Filter className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-silver/40" />
              <select
                value={dept}
                onChange={(e) => setDept(e.target.value)}
                className="appearance-none rounded-full bg-white/[0.04] py-3 pl-10 pr-8 text-sm text-white outline-none hairline focus:ring-2 focus:ring-glow/40"
              >
                {departments.map(d => <option key={d} value={d} className="bg-ink">{d}</option>)}
              </select>
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-44 animate-pulse rounded-2xl bg-white/[0.03]" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-2xl glass-strong py-16 text-center">
              <p className="text-silver/60">No matching roles right now.</p>
              <Link to="/careers/talent-pool" className="mt-4 inline-flex items-center gap-2 text-sm text-glow hover:underline">
                Join our talent network <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {filtered.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(i * 0.04, 0.3) }}
                >
                  <Link
                    to={`/careers/${p.slug}`}
                    className="group block h-full rounded-2xl glass-strong p-6 transition hover:bg-white/[0.06] hover:shadow-[0_24px_60px_-30px_rgba(45,127,255,0.5)]"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-glow/10 px-2.5 py-1 text-[10px] uppercase tracking-wider text-glow">
                        {p.category === "contractor" ? "Contract" : p.department}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-silver/40">{p.experience_level}</span>
                    </div>
                    <h3 className="font-display text-xl font-semibold text-white group-hover:text-gradient-blue">{p.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-silver/70">{p.short_description}</p>
                    <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-silver/60">
                      <span className="inline-flex items-center gap-1.5"><Briefcase className="h-3 w-3" />{p.employment_type}</span>
                      <span className="inline-flex items-center gap-1.5"><Globe className="h-3 w-3" />{p.work_mode}</span>
                      <span className="inline-flex items-center gap-1.5"><MapPin className="h-3 w-3" />{p.location}</span>
                      {p.salary_range && <span className="inline-flex items-center gap-1.5"><Building2 className="h-3 w-3" />{p.salary_range}</span>}
                    </div>
                    <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-glow transition group-hover:gap-2.5">
                      Apply now <ArrowRight className="h-4 w-4" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* TALENT POOL CTA */}
      <section className="relative py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="rounded-3xl glass-strong p-10 text-center md:p-14">
            <Users className="mx-auto mb-4 h-8 w-8 text-glow" />
            <h2 className="font-display text-3xl font-semibold text-white md:text-4xl">Don't see your role?</h2>
            <p className="mx-auto mt-3 max-w-xl text-silver/70">
              Join our talent network. We'll keep your profile on file and reach out when a fit opens up.
            </p>
            <Link
              to="/careers/talent-pool"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-glow px-6 py-3.5 text-sm font-medium text-white shadow-[0_14px_40px_-10px_rgba(45,127,255,0.7)] transition hover:bg-glow/90"
            >
              Join Talent Network <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
