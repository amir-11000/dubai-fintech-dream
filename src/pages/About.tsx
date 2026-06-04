import { Seo, breadcrumb } from "../lib/seo";

const investors = ["SEQUOIA", "A16Z", "INDEX", "GULF CAPITAL", "MUBADALA", "DUBAI FUTURE"];
const team = [
  { n: "Amir Ansari", r: "Founder & CEO", b: "Ex-Goldman Sachs. Built three fintechs across MENA and EU." },
  { n: "Layla Hassan", r: "Co-founder & CTO", b: "Former Stripe staff engineer. Custody & FX infrastructure." },
  { n: "Marcus Werner", r: "Head of Design", b: "Previously at Apple. Translates restraint into product." },
];

export default function About() {
  return (
    <>
      <Seo
        title="About — Shoho Pay | Built in Dubai, for the World"
        description="Shoho Pay is a Dubai-based fintech building the calmest, most intelligent financial experience in the UAE — backed by world-class operators and investors."
        path="/about"
        jsonLd={breadcrumb([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])}
      />

      <section className="relative pt-36 pb-12 md:pt-44">
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-hero" />
        <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
          <h1 className="font-display text-balance text-5xl font-semibold leading-[1.02] text-gradient-silver md:text-7xl">
            Built in Dubai.<br/><span className="text-gradient-blue">For the world.</span>
          </h1>
          <p className="mx-auto mt-6 text-base leading-relaxed text-silver/80 md:text-lg">
            We're a small team obsessed with one question: what does money look like when it's been designed properly — for the UAE, and for the next decade?
          </p>
        </div>
      </section>


      <section className="py-16">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <h2 className="font-display text-center text-3xl font-semibold text-gradient-silver md:text-4xl">The team</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {team.map((p) => (
              <div key={p.n} className="rounded-3xl glass-card p-7">
                <div className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-glow to-glow/30 font-display text-base font-semibold text-white">
                  {p.n.split(" ").map((s) => s[0]).join("")}
                </div>
                <div className="font-display mt-5 text-lg font-semibold text-snow">{p.n}</div>
                <div className="text-xs uppercase tracking-widest text-glow">{p.r}</div>
                <p className="mt-3 text-sm text-silver/75 leading-relaxed">{p.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <p className="text-center text-[11px] uppercase tracking-[0.3em] text-silver/60">Backed by</p>
          <div className="mt-8 grid grid-cols-2 items-center gap-x-8 gap-y-6 md:grid-cols-6">
            {investors.map((p) => (
              <div key={p} className="text-center font-display text-xs font-semibold tracking-[0.18em] text-silver/50">{p}</div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
