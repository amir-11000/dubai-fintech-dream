import { Link } from "react-router-dom";
import { Play, Zap, Coins, Bot, Globe2 } from "lucide-react";
import { PageShell, PageHeader, GlowCard } from "../components/ui";
import iphonesDuo from "../assets/iphones-duo.png";

const features = [
  { icon: Zap, t: "Instant transfers", d: "Sub-second settlement across the wallet network." },
  { icon: Coins, t: "Digital gold", d: "Buy investment-grade gold gram-by-gram." },
  { icon: Bot, t: "AI assistant", d: "Adaptive planning, budgeting and investing." },
  { icon: Globe2, t: "Borderless FX", d: "Real interbank rates, zero hidden spreads." },
];

export default function WatchDemo() {
  return (
    <PageShell>
      <PageHeader eyebrow="Cinematic walkthrough" title={<>See DIRHAMPAY <span className="text-gradient-blue">in motion.</span></>} sub="A 90-second glimpse of the future financial lifestyle ecosystem." />

      <div className="mx-auto mt-12 max-w-5xl">
        <GlowCard className="overflow-hidden p-0">
          <div className="relative aspect-video w-full bg-gradient-to-br from-[#0c1220] via-[#0a0d18] to-black">
            <img src={iphonesDuo} alt="" className="absolute inset-0 m-auto h-[80%] object-contain opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
            <div className="absolute inset-0 grid place-items-center">
              <button className="group grid h-20 w-20 place-items-center rounded-full bg-white/95 text-ink shadow-2xl transition hover:scale-105">
                <Play className="h-7 w-7 translate-x-0.5 fill-ink" />
              </button>
            </div>
            <div className="absolute bottom-4 left-4 rounded-full glass-strong px-3 py-1.5 text-[10px] uppercase tracking-widest text-white">Live preview · 01:30</div>
          </div>
        </GlowCard>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <GlowCard key={f.t} className="p-5">
            <f.icon className="h-5 w-5 text-glow" />
            <div className="mt-4 text-base font-medium text-white">{f.t}</div>
            <div className="mt-1 text-sm text-silver/60">{f.d}</div>
          </GlowCard>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Link to="/signup" className="rounded-full bg-white px-6 py-3.5 text-sm font-medium text-ink hover:bg-white/90">Get Started</Link>
        <Link to="/early-access" className="rounded-full glass px-6 py-3.5 text-sm text-white hover:bg-white/10">Join Early Access</Link>
      </div>
    </PageShell>
  );
}
