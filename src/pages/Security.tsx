import { Lock, ShieldCheck, Fingerprint, Cpu, Sparkles, Smartphone, BadgeCheck } from "lucide-react";
import { Seo, breadcrumb } from "../lib/seo";

const pillars = [
  { i: Lock, t: "256-bit Encryption", d: "End-to-end, at rest and in flight. Zero-knowledge architecture for key material." },
  { i: Fingerprint, t: "Biometric Authentication", d: "Face ID, fingerprint, hardware-key support and per-device session binding." },
  { i: Cpu, t: "Custody-Grade Vaults", d: "Multi-sig HSMs for crypto. Lloyd's-insured Dubai vault for gold." },
  { i: Sparkles, t: "AI Fraud Watch", d: "Billy flags anomalies in milliseconds and pauses suspicious flows before they ship." },
  { i: Smartphone, t: "Instant Freeze", d: "Lose your device? Freeze cards, sessions and crypto access from any other device." },
  { i: ShieldCheck, t: "Continuous Audits", d: "Penetration-tested quarterly by third parties. Bug bounty paid in AED." },
];

const certs = ["UAE Central Bank aligned", "DIFC Registered", "ISO 27001", "PCI-DSS Level 1", "SOC 2 Type II", "GDPR · CCPA"];

export default function Security() {
  return (
    <>
      <Seo
        title="Security — Shoho Pay | Bank-Grade Defence by Design"
        description="How Shoho Pay protects your money — 256-bit encryption, biometric auth, multi-sig crypto custody, insured gold vaulting, and continuous third-party audits."
        path="/security"
        jsonLd={breadcrumb([{ name: "Home", path: "/" }, { name: "Security", path: "/security" }])}
      />

      <section className="relative pt-36 pb-12 text-center md:pt-44">
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-hero" />
        <div className="mx-auto max-w-3xl px-6">
          <span className="inline-flex items-center gap-2 rounded-full hairline px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-glow">
            <span className="h-1.5 w-1.5 rounded-full bg-glow shadow-[0_0_10px_currentColor]" /> Security · By Design
          </span>
          <h1 className="font-display mt-5 text-balance text-5xl font-semibold leading-[1.02] text-gradient-silver md:text-7xl">
            Engineered to be <span className="text-gradient-blue">untouchable.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-silver/80 md:text-lg">
            Defence-in-depth, audited independently, verified continuously. The same posture used by institutional custodians.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 md:grid-cols-3 md:px-10">
          {pillars.map((p) => (
            <article key={p.t} className="h-full rounded-3xl glass-card p-7">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-glow/10 text-glow"><p.i className="h-5 w-5" /></div>
              <h2 className="font-display mt-5 text-lg font-semibold text-snow">{p.t}</h2>
              <p className="mt-2 text-sm leading-relaxed text-silver/75">{p.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <div className="rounded-3xl glass-strong p-8 md:p-12 text-center">
            <h2 className="font-display text-2xl font-semibold text-gradient-silver md:text-3xl">Certifications & Compliance</h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {certs.map((c) => (
                <div key={c} className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs text-snow">
                  <BadgeCheck className="h-3.5 w-3.5 text-glow" /> {c}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
