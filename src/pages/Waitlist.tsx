import { ShieldCheck, Zap, Lock } from "lucide-react";
import { Seo, breadcrumb } from "../lib/seo";
import { WaitlistForm } from "../Home";

export default function Waitlist() {
  return (
    <>
      <Seo
        title="Join the Waitlist — Shoho Pay | Early Access in the UAE"
        description="Join the Shoho Pay waitlist. The UAE's luxury wallet — payments, crypto, gold and Billy, your AI accountant."
        path="/waitlist"
        jsonLd={breadcrumb([{ name: "Home", path: "/" }, { name: "Waitlist", path: "/waitlist" }])}
      />

      <section className="relative min-h-[80vh] pt-36 pb-24 md:pt-44">
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-hero" />
        <div aria-hidden className="absolute inset-0 -z-10 grid-lines opacity-[0.12]" />

        <div className="mx-auto max-w-3xl px-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full hairline px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-glow">
            <span className="h-1.5 w-1.5 rounded-full bg-glow shadow-[0_0_10px_currentColor]" /> Early Access · Limited
          </span>
          <h1 className="font-display mt-6 text-balance text-5xl font-semibold leading-[1.02] text-gradient-silver md:text-7xl">
            Money is changing.<br /><span className="text-gradient-blue">Be early.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-silver/80 md:text-lg">
            One field. One email. We'll let you know when your seat opens — and what's coming next.
          </p>

          <div className="mt-10"><WaitlistForm /></div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] text-silver/60">
            <span className="inline-flex items-center gap-1.5"><Lock className="h-3 w-3 text-glow" /> Single opt-in</span>
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3 w-3 text-glow" /> Never shared</span>
            <span className="inline-flex items-center gap-1.5"><Zap className="h-3 w-3 text-glow" /> Spam-protected</span>
          </div>

        </div>
      </section>
    </>
  );
}
