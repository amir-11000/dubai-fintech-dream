import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PageShell, PageHeader, GlowCard, Field, PrimaryButton, GhostButton, SuccessToast } from "../components/ui";
import { useStore } from "../lib/store";

export default function SignIn() {
  const nav = useNavigate();
  const { signIn } = useStore();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);

  const go = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false); setOk(true); signIn();
      setTimeout(() => nav("/app"), 600);
    }, 700);
  };
  const submit = (e: FormEvent) => { e.preventDefault(); go(); };

  return (
    <PageShell>
      <PageHeader eyebrow="Welcome back" title={<>Sign in to <span className="text-gradient-gold">Billy Pay</span></>} sub="Your AI accountant is waiting." />
      <div className="mx-auto mt-12 max-w-md">
        <GlowCard>
          <form onSubmit={submit} className="space-y-4">
            <Field label="Email" type="email" placeholder="you@billypay.com" value={email} onChange={setEmail} required />
            <Field label="Password" type="password" placeholder="••••••••" value={pwd} onChange={setPwd} required />
            <div className="flex justify-end">
              <Link to="/signin" className="text-xs text-silver/60 hover:text-glow">Forgot password?</Link>
            </div>
            <PrimaryButton type="submit" loading={loading}>Continue</PrimaryButton>
          </form>
          <div className="my-5 flex items-center gap-3 text-[10px] uppercase tracking-widest text-silver/40">
            <div className="h-px flex-1 bg-white/10" /> or <div className="h-px flex-1 bg-white/10" />
          </div>
          <GhostButton onClick={go} className="w-full">
            <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#fff" d="M21.35 11.1H12v2.83h5.36c-.23 1.4-1.62 4.1-5.36 4.1-3.23 0-5.86-2.67-5.86-5.96S8.77 6.1 12 6.1c1.84 0 3.07.78 3.78 1.45l2.58-2.5C16.9 3.5 14.7 2.6 12 2.6 6.93 2.6 2.84 6.7 2.84 11.77c0 5.06 4.1 9.16 9.16 9.16 5.28 0 8.78-3.7 8.78-8.93 0-.6-.07-1.05-.13-1.5z"/></svg>
            Continue with Google
          </GhostButton>
          <SuccessToast show={ok} text="Welcome back. Opening your wallet…" />
          <p className="mt-5 text-center text-xs text-silver/60">
            No account? <Link to="/signup" className="text-glow hover:underline">Create one</Link>
          </p>
        </GlowCard>
      </div>
    </PageShell>
  );
}
