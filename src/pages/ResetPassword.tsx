import { useState, FormEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { z } from "zod";
import { supabase } from "../integrations/supabase/client";
import { toast } from "sonner";
import { ArrowRight, ShieldCheck, Eye, EyeOff, Loader2 } from "lucide-react";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(72, "Password must be under 72 characters")
  .regex(/[A-Za-z]/, "Include at least one letter")
  .regex(/[0-9]/, "Include at least one number");

export default function ResetPasswordPage() {
  const nav = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    // Supabase places the recovery token in the URL hash; getSession picks it up.
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || session) setReady(true);
    });
    return () => subscription.unsubscribe();
  }, []);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const p = passwordSchema.safeParse(password);
    if (!p.success) return toast.error(p.error.issues[0].message);
    if (password !== confirm) return toast.error("Passwords do not match");

    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password: p.data });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Password updated. You're signed in.");
    nav("/", { replace: true });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-ink pt-32 pb-24">
      <div className="absolute inset-0 -z-10 grid-lines opacity-[0.15]" />
      <div className="absolute left-1/2 top-32 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-glow/15 blur-3xl" />
      <div className="mx-auto w-full max-w-md px-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full hairline px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-glow">
              <ShieldCheck className="h-3 w-3" /> Set new password
            </div>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-gradient-silver">Create a new password</h1>
            <p className="mt-3 text-sm text-silver/70">Choose a strong password you haven't used before.</p>
          </div>

          <div className="mt-10 rounded-3xl glass-strong p-6 md:p-8">
            {!ready ? (
              <div className="space-y-4 text-center text-sm text-silver/70">
                <Loader2 className="mx-auto h-5 w-5 animate-spin text-glow" />
                <p>Verifying your reset link…</p>
                <p className="text-xs text-silver/50">
                  If this takes too long, the link may have expired. <Link to="/auth" className="text-glow hover:underline">Request a new one</Link>.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <label className="block">
                  <span className="mb-1.5 block text-[11px] uppercase tracking-widest text-silver/60">New password</span>
                  <div className="relative">
                    <input
                      type={show ? "text" : "password"}
                      required
                      value={password}
                      autoComplete="new-password"
                      placeholder="••••••••"
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-xl bg-white/[0.03] px-4 py-3 pr-11 text-sm text-white outline-none placeholder:text-silver/30 hairline focus:bg-white/[0.06] focus:ring-2 focus:ring-glow/40"
                    />
                    <button type="button" onClick={() => setShow(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-silver/50 hover:text-white">
                      {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <span className="mt-1.5 block text-[10px] text-silver/40">At least 8 characters, with a letter and a number.</span>
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-[11px] uppercase tracking-widest text-silver/60">Confirm password</span>
                  <input
                    type={show ? "text" : "password"}
                    required
                    value={confirm}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    onChange={(e) => setConfirm(e.target.value)}
                    className="w-full rounded-xl bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-silver/30 hairline focus:bg-white/[0.06] focus:ring-2 focus:ring-glow/40"
                  />
                </label>

                <button
                  type="submit"
                  disabled={busy}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-ink transition hover:bg-white/90 disabled:opacity-60"
                >
                  {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Update password <ArrowRight className="h-4 w-4" /></>}
                </button>
              </form>
            )}
          </div>

          <div className="mt-6 text-center">
            <Link to="/auth" className="text-xs text-silver/50 hover:text-white">← Back to sign in</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
