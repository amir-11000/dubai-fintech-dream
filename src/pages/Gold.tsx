import { useState } from "react";
import { Coins, Package, Truck } from "lucide-react";
import { PageShell, PageHeader, GlowCard, PrimaryButton, GhostButton, SuccessToast, Field } from "../components/ui";
import goldBars from "../assets/gold-bars.jpg";

export default function Gold() {
  const [grams, setGrams] = useState("4");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const pricePerGram = 308.42;
  const total = (parseFloat(grams || "0") * pricePerGram).toLocaleString(undefined, { maximumFractionDigits: 2 });

  const action = (text: string) => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setMsg(text); setTimeout(() => setMsg(null), 3000); }, 800);
  };

  return (
    <PageShell>
      <PageHeader eyebrow="Digital Gold · 24k" title={<>Own real gold. <span className="text-gradient-gold">Gram by gram.</span></>} sub="Vaulted in regulated custody. Redeem physical bars anytime." />

      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <GlowCard className="lg:col-span-2">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <div className="text-[11px] uppercase tracking-widest text-silver/60">Your gold balance</div>
              <div className="mt-2 text-4xl font-semibold text-gradient-gold">24.86 g</div>
              <div className="mt-1 text-sm text-silver/60">≈ AED 7,667.40</div>
              <div className="mt-6 rounded-xl bg-white/[0.03] p-4 hairline">
                <div className="flex items-center justify-between text-xs text-silver/50"><span>Gold price · 24k</span><span className="text-glow">+1.8%</span></div>
                <div className="mt-1 text-2xl font-semibold text-white">AED {pricePerGram.toFixed(2)}<span className="text-sm text-silver/50"> /g</span></div>
              </div>
            </div>
            <div>
              <Field label="Buy grams" type="number" value={grams} onChange={setGrams} placeholder="1" />
              <div className="mt-3 rounded-xl bg-white/[0.03] p-4 hairline">
                <div className="text-xs text-silver/50">Total</div>
                <div className="mt-1 text-2xl font-semibold text-gradient-gold">AED {total}</div>
              </div>
              <div className="mt-4 space-y-2">
                <PrimaryButton onClick={() => action(`Purchased ${grams}g of 24k gold.`)} loading={loading} className="bg-gradient-to-r from-[#f4e4b3] via-[#d6b56a] to-[#8a6a2e]">
                  <Coins className="h-4 w-4" /> Buy Gold
                </PrimaryButton>
                <GhostButton onClick={() => action("Physical 10g bar redemption queued at vault.")} className="w-full">
                  <Package className="h-4 w-4" /> Redeem Physical Bar
                </GhostButton>
                <GhostButton onClick={() => action("Secure delivery scheduled — courier will contact you.")} className="w-full">
                  <Truck className="h-4 w-4" /> Request Secure Delivery
                </GhostButton>
              </div>
              <SuccessToast show={!!msg} text={msg ?? ""} />
            </div>
          </div>
        </GlowCard>

        <GlowCard className="overflow-hidden p-0">
          <img src={goldBars} alt="Gold bars" className="h-full max-h-[420px] w-full object-cover" />
        </GlowCard>
      </div>
    </PageShell>
  );
}
