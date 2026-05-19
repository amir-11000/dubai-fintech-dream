import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Snowflake, Plus } from "lucide-react";
import { toast } from "sonner";

const initialCards = [
  { id: "c1", name: "Khalid Al Mansoori", number: "5375 •••• •••• 4421", expiry: "06/29", type: "Physical · Metal", frozen: false, gradient: "from-zinc-700 via-zinc-900 to-black" },
  { id: "c2", name: "Khalid Al Mansoori", number: "4912 •••• •••• 0918", expiry: "11/27", type: "Virtual", frozen: false, gradient: "from-yellow-700 via-amber-900 to-zinc-900" },
];

export default function CardsPage() {
  const [cards, setCards] = useState(initialCards);
  const [reveal, setReveal] = useState<Record<string, boolean>>({});

  const toggleFreeze = (id: string) => {
    setCards((cs) => cs.map((c) => (c.id === id ? { ...c, frozen: !c.frozen } : c)));
    toast.success("Card updated");
  };

  const addVirtual = () => {
    const id = `c${cards.length + 1}`;
    setCards([...cards, { id, name: "Khalid Al Mansoori", number: `4111 •••• •••• ${Math.floor(1000 + Math.random() * 9000)}`, expiry: "12/30", type: "Virtual", frozen: false, gradient: "from-blue-600 via-blue-900 to-zinc-900" }]);
    toast.success("Virtual card created");
  };

  return (
    <div className="space-y-6 pb-10">
      <header className="flex items-end justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-silver/60">Cards</div>
          <h1 className="mt-1 text-3xl font-semibold text-gradient-silver">Your cards</h1>
        </div>
        <button onClick={addVirtual} className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs text-white hairline hover:bg-white/10">
          <Plus className="h-3.5 w-3.5" /> New virtual
        </button>
      </header>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {cards.map((c) => (
          <motion.div key={c.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${c.gradient} p-6 shadow-2xl`}>
            {c.frozen && <div className="absolute inset-0 z-10 grid place-items-center bg-ink/60 backdrop-blur-sm"><Snowflake className="h-10 w-10 text-glow" /></div>}
            <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-white/60">
              <span>Billy Pay · {c.type}</span>
              <span>Visa</span>
            </div>
            <div className="mt-8 font-display text-xl tracking-[0.18em] text-white">{reveal[c.id] ? c.number.replace(/•/g, "8") : c.number}</div>
            <div className="mt-6 flex items-end justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/60">Cardholder</div>
                <div className="text-sm text-white">{c.name}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/60">Exp</div>
                <div className="text-sm text-white">{c.expiry}</div>
              </div>
            </div>
            <div className="mt-5 flex gap-2">
              <button onClick={() => setReveal({ ...reveal, [c.id]: !reveal[c.id] })} className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[11px] text-white">
                {reveal[c.id] ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                {reveal[c.id] ? "Hide" : "Reveal"}
              </button>
              <button onClick={() => toggleFreeze(c.id)} className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[11px] text-white">
                <Snowflake className="h-3 w-3" /> {c.frozen ? "Unfreeze" : "Freeze"}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
