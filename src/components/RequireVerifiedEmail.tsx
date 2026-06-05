import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import {
  Mail,
  Loader2,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Inbox,
  AlertTriangle,
  RefreshCcw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useAuth } from "../lib/auth";
import { supabase } from "../integrations/supabase/client";

type Props = { children: ReactNode; redirectTo?: string };

type Status = "idle" | "sending" | "sent" | "checking";

const RESEND_COOLDOWN = 30; // seconds

const PROVIDERS: Record<string, { label: string; url: string }> = {
  "gmail.com": { label: "Open Gmail", url: "https://mail.google.com/mail/u/0/#inbox" },
  "googlemail.com": { label: "Open Gmail", url: "https://mail.google.com/mail/u/0/#inbox" },
  "outlook.com": { label: "Open Outlook", url: "https://outlook.live.com/mail/0/inbox" },
  "hotmail.com": { label: "Open Outlook", url: "https://outlook.live.com/mail/0/inbox" },
  "live.com": { label: "Open Outlook", url: "https://outlook.live.com/mail/0/inbox" },
  "yahoo.com": { label: "Open Yahoo Mail", url: "https://mail.yahoo.com/" },
  "icloud.com": { label: "Open iCloud Mail", url: "https://www.icloud.com/mail" },
  "me.com": { label: "Open iCloud Mail", url: "https://www.icloud.com/mail" },
  "proton.me": { label: "Open Proton Mail", url: "https://mail.proton.me/u/0/inbox" },
  "protonmail.com": { label: "Open Proton Mail", url: "https://mail.proton.me/u/0/inbox" },
};

export default function RequireVerifiedEmail({ children, redirectTo = "/auth" }: Props) {
  const { user, loading } = useAuth();
  const [status, setStatus] = useState<Status>("idle");
  const [cooldown, setCooldown] = useState(0);
  const [verified, setVerified] = useState<boolean>(
    Boolean((user as any)?.email_confirmed_at || (user as any)?.confirmed_at)
  );
  const pollRef = useRef<number | null>(null);

  // Keep verified state in sync when user object changes.
  useEffect(() => {
    setVerified(
      Boolean((user as any)?.email_confirmed_at || (user as any)?.confirmed_at)
    );
  }, [user]);

  // Cooldown timer for resend button.
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = window.setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => window.clearTimeout(t);
  }, [cooldown]);

  // Auto-poll verification status while waiting.
  useEffect(() => {
    if (loading || !user || verified) return;
    const tick = async () => {
      const { data } = await supabase.auth.getUser();
      const u = data?.user as any;
      if (u?.email_confirmed_at || u?.confirmed_at) {
        setVerified(true);
        toast.success("Email verified — welcome in.");
      }
    };
    pollRef.current = window.setInterval(tick, 5000) as unknown as number;
    return () => {
      if (pollRef.current) window.clearInterval(pollRef.current);
    };
  }, [loading, user, verified]);

  const providerLink = useMemo(() => {
    const domain = user?.email?.split("@")[1]?.toLowerCase();
    return domain ? PROVIDERS[domain] : undefined;
  }, [user?.email]);

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-ink">
        <Loader2 className="h-5 w-5 animate-spin text-glow" />
      </div>
    );
  }

  if (!user) return <Navigate to={redirectTo} replace />;
  if (verified) return <>{children}</>;

  const resend = async () => {
    if (!user.email || cooldown > 0 || status === "sending") return;
    setStatus("sending");
    const { error } = await supabase.auth.resend({
      type: "signup",
      email: user.email,
      options: { emailRedirectTo: `${window.location.origin}/` },
    });
    if (error) {
      setStatus("idle");
      return toast.error(error.message);
    }
    setStatus("sent");
    setCooldown(RESEND_COOLDOWN);
    toast.success("Verification email sent.");
  };

  const recheck = async () => {
    setStatus("checking");
    const { data, error } = await supabase.auth.getUser();
    setStatus("idle");
    if (error) return toast.error(error.message);
    const u = data?.user as any;
    if (u?.email_confirmed_at || u?.confirmed_at) {
      setVerified(true);
      toast.success("Email verified — welcome in.");
    } else {
      toast.message("Still waiting on verification", {
        description: "Click the link in your email, then try again.",
      });
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const steps = [
    { label: "Account created", done: true },
    { label: "Verification email sent", done: true },
    { label: "Open the email and click the link", done: false, active: true },
    { label: "Return here — access unlocks automatically", done: false },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-ink pt-32 pb-24">
      <div className="absolute inset-0 -z-10 grid-lines opacity-[0.15]" />
      <div className="absolute left-1/2 top-32 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-glow/15 blur-3xl" />

      <div className="mx-auto w-full max-w-md px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl glass-strong p-7 md:p-8"
        >
          <div className="flex flex-col items-center text-center">
            <div className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/15 text-amber-300">
              <ShieldAlert className="h-6 w-6" />
              <span className="absolute inset-0 animate-ping rounded-full bg-amber-400/15" />
            </div>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full hairline px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-amber-300/90">
              <Loader2 className="h-3 w-3 animate-spin" /> Waiting for verification
            </div>
            <h1 className="mt-4 text-2xl font-semibold tracking-tight text-gradient-silver">
              Verify your email to continue
            </h1>
            <p className="mt-3 text-sm text-silver/70">
              We sent a verification link to{" "}
              <span className="text-white">{user.email}</span>. This page unlocks
              automatically as soon as you confirm.
            </p>
          </div>

          {/* Step progress */}
          <ol className="mt-6 space-y-2.5">
            {steps.map((s, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-medium ${
                    s.done
                      ? "bg-emerald-500/20 text-emerald-300"
                      : s.active
                      ? "bg-glow/20 text-glow"
                      : "bg-white/[0.04] text-silver/50"
                  }`}
                >
                  {s.done ? <CheckCircle2 className="h-3 w-3" /> : i + 1}
                </span>
                <span
                  className={`text-xs ${
                    s.done
                      ? "text-silver/60 line-through decoration-silver/30"
                      : s.active
                      ? "text-white"
                      : "text-silver/60"
                  }`}
                >
                  {s.label}
                </span>
              </li>
            ))}
          </ol>

          {/* Inbox quick links */}
          <div className="mt-6 grid gap-2">
            {providerLink && (
              <a
                href={providerLink.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-xl hairline bg-white/[0.03] px-4 py-3 text-sm text-white transition hover:bg-white/[0.06]"
              >
                <span className="inline-flex items-center gap-2">
                  <Inbox className="h-4 w-4 text-glow" /> {providerLink.label}
                </span>
                <ExternalLink className="h-3.5 w-3.5 text-silver/50" />
              </a>
            )}
            <div className="flex items-start gap-2 rounded-xl bg-amber-500/[0.06] px-4 py-3 text-[11px] text-amber-200/80 hairline">
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <span>
                Can't find it? Check your{" "}
                <span className="text-amber-100">Spam</span> or{" "}
                <span className="text-amber-100">Promotions</span> folder, and
                add{" "}
                <span className="text-amber-100">no-reply@shohopay.com</span> to
                your contacts.
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 space-y-2.5">
            <button
              onClick={recheck}
              disabled={status === "checking"}
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-ink transition hover:bg-white/90 disabled:opacity-60"
            >
              {status === "checking" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Checking…
                </>
              ) : (
                <>
                  I've verified — continue{" "}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </>
              )}
            </button>

            <button
              onClick={resend}
              disabled={cooldown > 0 || status === "sending"}
              className="flex w-full items-center justify-center gap-2 rounded-full hairline px-6 py-3 text-sm text-white/85 transition hover:bg-white/5 disabled:opacity-60"
            >
              <AnimatePresence mode="wait" initial={false}>
                {status === "sending" ? (
                  <motion.span
                    key="sending"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="inline-flex items-center gap-2"
                  >
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                  </motion.span>
                ) : cooldown > 0 ? (
                  <motion.span
                    key="cooldown"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="inline-flex items-center gap-2 text-silver/60"
                  >
                    <RefreshCcw className="h-4 w-4" /> Resend in {cooldown}s
                  </motion.span>
                ) : status === "sent" ? (
                  <motion.span
                    key="sent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="inline-flex items-center gap-2 text-emerald-300"
                  >
                    <CheckCircle2 className="h-4 w-4" /> Email sent — resend
                  </motion.span>
                ) : (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="inline-flex items-center gap-2"
                  >
                    <Mail className="h-4 w-4" /> Resend verification email
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <div className="flex items-center justify-between pt-1">
              <button
                onClick={signOut}
                className="text-xs text-silver/50 hover:text-white"
              >
                Sign out
              </button>
              <Link
                to="/contact"
                className="text-xs text-silver/50 hover:text-white"
              >
                Need help?
              </Link>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link to="/" className="text-xs text-silver/50 hover:text-white">
              ← Back to site
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
