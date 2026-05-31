import { useState, FormEvent, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../integrations/supabase/client";
import { useAuth } from "../lib/auth";
import { toast } from "sonner";
import { ArrowRight, Phone, ShieldCheck } from "lucide-react";

type Mode = "signin" | "signup";
type Step = "details" | "otp";

export default function AuthPage() {
  const nav = useNavigate();
  const { session, loading } = useAuth();
  const [mode, setMode] = useState<Mode>("signin");
  const [step, setStep] = useState<Step>("details");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && session) nav("/", { replace: true });
  }, [session, loading, nav]);

  const sendOtp = async (e: FormEvent) => {
    e.preventDefault();
    if (!phone.startsWith("+")) {
      toast.error("Phone must be in E.164 format, e.g. +971501234567");
      return;
    }
    setBusy(true);
    const opts: any = { phone };
    if (mode === "signup") {
      opts.options = { data: { full_name: fullName, email, phone } };
    }
    const { error } = await supabase.auth.signInWithOtp(opts);
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    toast.success("OTP sent to your phone");
    setStep("otp");
  };

  const verifyOtp = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.verifyOtp({ phone, token: otp, type: "sms" });
    if (error) { setBusy(false); toast.error(error.message); return; }
    // update last_login + ensure profile has email/name if it's missing
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from("profiles").update({
        last_login: new Date().toISOString(),
        ...(mode === "signup" ? { full_name: fullName, email, phone } : {}),
      }).eq("user_id", user.id);
    }
    setBusy(false);
    toast.success("Signed in");
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
              <ShieldCheck className="h-3 w-3" /> Secure access
            </div>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-gradient-silver">
              {mode === "signin" ? "Welcome back" : "Create your account"}
            </h1>
            <p className="mt-3 text-sm text-silver/70">
              {step === "details" ? "Sign in with your phone number — we'll text you a one-time code." : `Enter the 6-digit code sent to ${phone}`}
            </p>
          </div>

          <div className="mt-10 rounded-3xl glass-strong p-6 md:p-8">
            {step === "details" ? (
              <form onSubmit={sendOtp} className="space-y-4">
                {mode === "signup" && (
                  <>
                    <Field label="Full name" value={fullName} onChange={setFullName} required placeholder="Your name" />
                    <Field label="Email" type="email" value={email} onChange={setEmail} required placeholder="you@example.com" />
                  </>
                )}
                <Field label="Phone (with country code)" type="tel" value={phone} onChange={setPhone} required placeholder="+971501234567" icon={<Phone className="h-4 w-4 text-silver/50" />} />
                <button type="submit" disabled={busy} className="group flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-ink transition hover:bg-white/90 disabled:opacity-60">
                  {busy ? <Spinner /> : <>Send code <ArrowRight className="h-4 w-4" /></>}
                </button>
              </form>
            ) : (
              <form onSubmit={verifyOtp} className="space-y-4">
                <Field label="Verification code" value={otp} onChange={(v) => setOtp(v.replace(/\D/g, "").slice(0, 6))} required placeholder="123456" />
                <button type="submit" disabled={busy || otp.length < 6} className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-ink transition hover:bg-white/90 disabled:opacity-60">
                  {busy ? <Spinner /> : "Verify & continue"}
                </button>
                <button type="button" onClick={() => { setStep("details"); setOtp(""); }} className="w-full text-center text-xs text-silver/60 hover:text-white">
                  Use a different number
                </button>
              </form>
            )}

            {step === "details" && (
              <div className="mt-6 text-center text-xs text-silver/60">
                {mode === "signin" ? (
                  <>New to SHOHO PAY? <button onClick={() => setMode("signup")} className="text-glow hover:underline">Create account</button></>
                ) : (
                  <>Already have an account? <button onClick={() => setMode("signin")} className="text-glow hover:underline">Sign in</button></>
                )}
              </div>
            )}
          </div>

          <div className="mt-6 text-center">
            <Link to="/" className="text-xs text-silver/50 hover:text-white">← Back to site</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const Field = ({ label, value, onChange, type = "text", required, placeholder, icon }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean; placeholder?: string; icon?: React.ReactNode;
}) => (
  <label className="block">
    <span className="mb-1.5 block text-[11px] uppercase tracking-widest text-silver/60">{label}</span>
    <div className="relative">
      {icon && <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">{icon}</div>}
      <input
        type={type} required={required} value={value} placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-xl bg-white/[0.03] py-3 text-sm text-white outline-none placeholder:text-silver/30 hairline focus:bg-white/[0.06] focus:ring-2 focus:ring-glow/40 ${icon ? "pl-10 pr-4" : "px-4"}`}
      />
    </div>
  </label>
);

const Spinner = () => <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink" />;
