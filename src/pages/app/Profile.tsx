import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../lib/store";
import { BillyMark } from "../../components/billy/BillyMark";
import { toast } from "sonner";

export default function ProfilePage() {
  const { state, setUser, signOut } = useStore();
  const nav = useNavigate();
  const [name, setName] = useState(state.user.name);
  const [lang, setLang] = useState(state.user.language);

  const save = () => {
    setUser({ name, language: lang });
    toast.success("Profile updated");
  };

  return (
    <div className="mx-auto max-w-md space-y-6 pb-10">
      <header className="flex items-center gap-4">
        <BillyMark size={56} />
        <div>
          <div className="text-[11px] uppercase tracking-widest text-silver/60">Profile</div>
          <h1 className="text-2xl font-semibold text-white">{state.user.name}</h1>
          <div className="text-xs text-gold">{state.user.tier}</div>
        </div>
      </header>
      <div className="space-y-4 rounded-3xl glass-strong p-6">
        <label className="block">
          <span className="mb-1.5 block text-[11px] uppercase tracking-widest text-silver/60">Display name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl bg-white/[0.03] px-4 py-3 text-sm text-white outline-none hairline" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[11px] uppercase tracking-widest text-silver/60">Language</span>
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="w-full rounded-xl bg-white/[0.03] px-4 py-3 text-sm text-white outline-none hairline">
            <option value="en" className="bg-ink">English</option>
            <option value="ar" className="bg-ink">العربية</option>
          </select>
        </label>
        <button onClick={save} className="w-full rounded-full bg-gold-grad py-3 text-sm font-medium text-ink">Save</button>
        <button onClick={() => { signOut(); nav("/"); }} className="w-full rounded-full bg-white/5 py-3 text-sm text-white hairline hover:bg-white/10">Sign out</button>
      </div>
    </div>
  );
}
