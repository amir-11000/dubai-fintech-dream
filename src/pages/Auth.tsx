import { useState, FormEvent, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { z } from "zod";
import { supabase } from "../integrations/supabase/client";
import { lovable } from "../integrations/lovable";
import { useAuth } from "../lib/auth";
import { toast } from "sonner";
import { ArrowRight, ShieldCheck, Eye, EyeOff, Mail, Loader2 } from "lucide-react";

type Mode = "signin" | "signup" | "forgot";

const emailSchema = z.string().trim().email("Enter a valid email").max(255);
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(72, "Password must be under 72 characters")
  .regex(/[A-Za-z]/, "Include at least one letter")
  .regex(/[0-9]/, "Include at least one number");
const nameSchema = z.string().trim().min(2, "Enter your full name").max(100);

export default function AuthPage() {
  const nav = useNavigate();
  const { session, loading } = useAuth();
  const [mode, setMode] = useState<Mode>("signin");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPwd, setShowPwd] = useState(false);
  const [busy, setBusy] = useState(false);
  const [sentTo, setSentTo] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && session) nav("/", { replace: true });
  }, [session, loading, nav]);

  const friendlyError = (msg: string) => {
    const m = msg.toLowerCase();
    if (m.includes("invalid login")) return "Incorrect email or password";
    if (m.includes("email not confirmed")) return "Please verify your email before signing in";
    if (m.includes("already registered") || m.includes("user already")) return "An account with this email already exists";
    if (m.includes("rate") || m.includes("too many")) return "Too many attempts. Please wait a moment and try again";
    return msg;
  };

  const onSignUp = async (e: FormEvent) => {
    e.preventDefault();
    const nameP = nameSchema.safeParse(fullName);
    const emailP = emailSchema.safeParse(email);
    const pwdP = passwordSchema.safeParse(password);
    if (!nameP.success) return toast.error(nameP.error.issues[0].message);
    if (!emailP.success) return toast.error(emailP.error.issues[0].message);
    if (!pwdP.success) return toast.error(pwdP.error.issues[0].message);

    setBusy(true);
    const { data, error } = await supabase.auth.signUp({
      email: emailP.data.toLowerCase(),
      password: pwdP.data,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: { full_name: nameP.data, email: emailP.data.toLowerCase() },
      },
    });
    setBusy(false);
    if (error) return toast.error(friendlyError(error.message));

    if (data.user && !data.session) {
      setSentTo(emailP.data);
      toast.success("Verification email sent. Please check your inbox.");
    } else if (data.session) {
      toast.success("Account created");
      nav("/", { replace: true });
    }
  };

  const onSignIn = async (e: FormEvent) => {
    e.preventDefault();
    const emailP = emailSchema.safeParse(email);
    if (!emailP.success) return toast.error(emailP.error.issues[0].message);
    if (!password) return toast.error("Enter your password");

    try {
      // Honor "remember me" by switching storage for this session
      (supabase.auth as any).storage = remember ? localStorage : sessionStorage;
    } catch {}

    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: emailP.data.toLowerCase(),
      password,
    });
    setBusy(false);
    if (error) return toast.error(friendlyError(error.message));
    toast.success("Welcome back");
    nav("/", { replace: true });
  };

  const onForgot = async (e: FormEvent) => {
    e.preventDefault();
    const emailP = emailSchema.safeParse(email);
    if (!emailP.success) return toast.error(emailP.error.issues[0].message);
    setBusy(true);
    const { error } = await supabase.auth.resetPasswordForEmail(emailP.data.toLowerCase(), {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setBusy(false);
    if (error) return toast.error(friendlyError(error.message));
    setSentTo(emailP.data);
    toast.success("Password reset email sent. Please check your inbox.");
  };

  const titles: Record<Mode, { eyebrow: string; title: string; sub: string }> = {
    signin: { eyebrow: "Secure access", title: "Welcome back", sub: "Sign in with your email and password." },
    signup: { eyebrow: "Get started", title: "Create your account", sub: "Join Shoho Pay — it only takes a minute." },
    forgot: { eyebrow: "Recover access", title: "Forgot your password?", sub: "We'll email you a secure reset link." },
  };
  const t = titles[mode];

  return (
    <div className="relative min-h-screen overflow-hidden bg-ink pt-32 pb-24">
      <div className="absolute inset-0 -z-10 grid-lines opacity-[0.15]" />
      <div className="absolute left-1/2 top-32 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-glow/15 blur-3xl" />
      <div className="mx-auto w-full max-w-md px-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full hairline px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-glow">
              <ShieldCheck className="h-3 w-3" /> {t.eyebrow}
            </div>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-gradient-silver">{t.title}</h1>
            <p className="mt-3 text-sm text-silver/70">{t.sub}</p>
          </div>

          <div className="mt-10 rounded-3xl glass-strong p-6 md:p-8">
            {!sentTo && mode !== "forgot" && (
              <>
                <GoogleButton
                  busy={busy}
                  onClick={async () => {
                    setBusy(true);
                    const result = await lovable.auth.signInWithOAuth("google", {
                      redirect_uri: window.location.origin,
                    });
                    if (result.redirected) return;
                    setBusy(false);
                    if (result.error) {
                      toast.error(result.error.message || "Google sign-in failed");
                      return;
                    }
                    toast.success("Welcome");
                    nav("/", { replace: true });
                  }}
                />
                <div className="my-5 flex items-center gap-3 text-[10px] uppercase tracking-widest text-silver/40">
                  <span className="h-px flex-1 bg-white/10" />
                  or continue with email
                  <span className="h-px flex-1 bg-white/10" />
                </div>
              </>
            )}
            {sentTo && (mode === "signup" || mode === "forgot") ? (
              <div className="space-y-5 text-center">
                <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-glow/15 text-glow">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-medium text-white">Check your inbox</h2>
                  <p className="mt-2 text-sm text-silver/70">
                    {mode === "signup" ? "Verification email sent to" : "Password reset link sent to"}{" "}
                    <span className="text-white">{sentTo}</span>
                  </p>
                  <p className="mt-2 text-xs text-silver/50">
                    Didn't receive it? Check your spam folder or try again in a minute.
                  </p>
                </div>
                <button
                  onClick={() => { setSentTo(null); setMode("signin"); }}
                  className="text-xs text-glow hover:underline"
                >
                  Back to sign in
                </button>
              </div>
            ) : mode === "signin" ? (
              <form onSubmit={onSignIn} className="space-y-4">
                <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" autoComplete="email" required />
                <PasswordField
                  label="Password"
                  value={password}
                  onChange={setPassword}
                  show={showPwd}
                  onToggle={() => setShowPwd(s => !s)}
                  autoComplete="current-password"
                />
                <div className="flex items-center justify-between text-xs">
                  <label className="inline-flex items-center gap-2 text-silver/70 select-none cursor-pointer">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className="h-3.5 w-3.5 rounded border-white/20 bg-white/[0.04] accent-glow"
                    />
                    Remember me
                  </label>
                  <button type="button" onClick={() => setMode("forgot")} className="text-glow hover:underline">
                    Forgot password?
                  </button>
                </div>
                <SubmitButton busy={busy}>Sign in <ArrowRight className="h-4 w-4" /></SubmitButton>
                <p className="text-center text-xs text-silver/60">
                  New to SHOHO PAY?{" "}
                  <button type="button" onClick={() => setMode("signup")} className="text-glow hover:underline">
                    Create account
                  </button>
                </p>
              </form>
            ) : mode === "signup" ? (
              <form onSubmit={onSignUp} className="space-y-4">
                <Field label="Full name" value={fullName} onChange={setFullName} placeholder="Your name" autoComplete="name" required />
                <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" autoComplete="email" required />
                <PasswordField
                  label="Password"
                  value={password}
                  onChange={setPassword}
                  show={showPwd}
                  onToggle={() => setShowPwd(s => !s)}
                  autoComplete="new-password"
                  hint="At least 8 characters, with a letter and a number."
                />
                <SubmitButton busy={busy}>Create account <ArrowRight className="h-4 w-4" /></SubmitButton>
                <p className="text-center text-xs text-silver/60">
                  Already have an account?{" "}
                  <button type="button" onClick={() => setMode("signin")} className="text-glow hover:underline">
                    Sign in
                  </button>
                </p>
              </form>
            ) : (
              <form onSubmit={onForgot} className="space-y-4">
                <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" autoComplete="email" required />
                <SubmitButton busy={busy}>Send reset link <ArrowRight className="h-4 w-4" /></SubmitButton>
                <p className="text-center text-xs text-silver/60">
                  Remembered it?{" "}
                  <button type="button" onClick={() => setMode("signin")} className="text-glow hover:underline">
                    Back to sign in
                  </button>
                </p>
              </form>
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

const Field = ({ label, value, onChange, type = "text", required, placeholder, autoComplete }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean; placeholder?: string; autoComplete?: string;
}) => (
  <label className="block">
    <span className="mb-1.5 block text-[11px] uppercase tracking-widest text-silver/60">{label}</span>
    <input
      type={type} required={required} value={value} placeholder={placeholder} autoComplete={autoComplete}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-silver/30 hairline focus:bg-white/[0.06] focus:ring-2 focus:ring-glow/40"
    />
  </label>
);

const PasswordField = ({ label, value, onChange, show, onToggle, autoComplete, hint }: {
  label: string; value: string; onChange: (v: string) => void; show: boolean; onToggle: () => void; autoComplete?: string; hint?: string;
}) => (
  <label className="block">
    <span className="mb-1.5 block text-[11px] uppercase tracking-widest text-silver/60">{label}</span>
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        required
        value={value}
        autoComplete={autoComplete}
        placeholder="••••••••"
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl bg-white/[0.03] px-4 py-3 pr-11 text-sm text-white outline-none placeholder:text-silver/30 hairline focus:bg-white/[0.06] focus:ring-2 focus:ring-glow/40"
      />
      <button
        type="button"
        onClick={onToggle}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-silver/50 hover:text-white"
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
    {hint && <span className="mt-1.5 block text-[10px] text-silver/40">{hint}</span>}
  </label>
);

const SubmitButton = ({ busy, children }: { busy: boolean; children: React.ReactNode }) => (
  <button
    type="submit"
    disabled={busy}
    className="group flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-ink transition hover:bg-white/90 disabled:opacity-60"
  >
    {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : children}
  </button>
);

const GoogleButton = ({ busy, onClick }: { busy: boolean; onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={busy}
    className="flex w-full items-center justify-center gap-3 rounded-full hairline bg-white/[0.04] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-white/[0.08] disabled:opacity-60"
  >
    <svg className="h-4 w-4" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.5 0 10.4-2.1 14.1-5.5l-6.5-5.5c-2 1.4-4.6 2.3-7.6 2.3-5.3 0-9.7-3.4-11.3-8.1l-6.5 5C9.6 39.6 16.2 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.3 5.5l6.5 5.5C41.9 36 44 30.4 44 24c0-1.3-.1-2.4-.4-3.5z"/>
    </svg>
    {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Continue with Google"}
  </button>
);
