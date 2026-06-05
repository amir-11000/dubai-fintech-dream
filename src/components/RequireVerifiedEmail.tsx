import { ReactNode, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { Mail, Loader2, ShieldAlert, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useAuth } from "../lib/auth";
import { supabase } from "../integrations/supabase/client";

type Props = { children: ReactNode; redirectTo?: string };

export default function RequireVerifiedEmail({ children, redirectTo = "/auth" }: Props) {
  const { user, loading } = useAuth();
  const [busy, setBusy] = useState(false);

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-ink">
        <Loader2 className="h-5 w-5 animate-spin text-glow" />
      </div>
    );
  }

  if (!user) return <Navigate to={redirectTo} replace />;

  // Supabase marks verified accounts with email_confirmed_at (or confirmed_at).
  const verified = Boolean(
    (user as any).email_confirmed_at || (user as any).confirmed_at
  );

  if (verified) return <>{children}</>;

  const resend = async () => {
    if (!user.email) return;
    setBusy(true);
    const { error } = await supabase.auth.resend({
      type: "signup",
      email: user.email,
      options: { emailRedirectTo: `${window.location.origin}/` },
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Verification email sent. Please check your inbox.");
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-ink pt-32 pb-24">
      <div className="absolute inset-0 -z-10 grid-lines opacity-[0.15]" />
      <div className="absolute left-1/2 top-32 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-glow/15 blur-3xl" />
      <div className="mx-auto w-full max-w-md px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl glass-strong p-8 text-center"
        >
          <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/15 text-amber-300">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <h1 className="mt-5 text-2xl font-semibold tracking-tight text-gradient-silver">
            Verify your email
          </h1>
          <p className="mt-3 text-sm text-silver/70">
            This page is only available after you confirm your email address.
            We sent a verification link to{" "}
            <span className="text-white">{user.email}</span>.
          </p>
          <p className="mt-2 text-xs text-silver/50">
            Click the link in that email, then return here and refresh the page.
          </p>

          <div className="mt-6 space-y-3">
            <button
              onClick={resend}
              disabled={busy}
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-ink transition hover:bg-white/90 disabled:opacity-60"
            >
              {busy ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Mail className="h-4 w-4" /> Resend verification email
                </>
              )}
            </button>
            <button
              onClick={() => window.location.reload()}
              className="w-full rounded-full hairline px-6 py-3 text-sm text-white/80 hover:bg-white/5"
            >
              I've verified — refresh <ArrowRight className="ml-1 inline h-3.5 w-3.5" />
            </button>
            <button
              onClick={signOut}
              className="w-full text-xs text-silver/50 hover:text-white"
            >
              Sign out
            </button>
          </div>

          <div className="mt-6">
            <Link to="/" className="text-xs text-silver/50 hover:text-white">
              ← Back to site
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
