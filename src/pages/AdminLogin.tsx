import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Eye, EyeOff, Loader2, ArrowLeft, Mail, Phone } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "../integrations/supabase/client";
import { useAuth } from "../lib/auth";
import CountrySelect from "../components/CountrySelect";
import { COUNTRIES, toE164, validatePhone, type Country } from "../lib/countries";

export default function AdminLogin() {
  const nav = useNavigate();
  const { user, isAdmin, loading } = useAuth();
  const [mode, setMode] = useState<"email" | "phone">("email");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState<Country>(COUNTRIES.find(c => c.iso === "AE") || COUNTRIES[0]);
  const [localPhone, setLocalPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user && isAdmin) nav("/admin", { replace: true });
  }, [loading, user, isAdmin, nav]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setSubmitting(true);
    try {
      let creds: any;
      if (mode === "email") {
        if (!email.includes("@")) { toast.error("Enter a valid email"); setSubmitting(false); return; }
        creds = { email: email.trim().toLowerCase(), password };
      } else {
        if (!validatePhone(country, localPhone)) { toast.error("Invalid phone number"); setSubmitting(false); return; }
        creds = { phone: toE164(country, localPhone), password };
      }
      const { data, error } = await supabase.auth.signInWithPassword(creds);
      if (error) throw error;
      if (!data.user) throw new Error("Login failed");

      // Verify admin role
      const { data: roleRow } = await supabase
        .from("user_roles").select("role").eq("user_id", data.user.id).eq("role", "admin").maybeSingle();
      if (!roleRow) {
        await supabase.auth.signOut();
        toast.error("This account does not have admin access");
        setSubmitting(false);
        return;
      }
      await supabase.from("profiles").update({ last_login: new Date().toISOString() }).eq("user_id", data.user.id);
      toast.success("Welcome back, admin");
      nav("/admin", { replace: true });
    } catch (err: any) {
      toast.error(err.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="absolute top-6 left-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition">
          <ArrowLeft className="w-4 h-4" /> Back to site
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="rounded-2xl border border-border bg-card/40 backdrop-blur-xl p-8 shadow-2xl">
          <div className="flex flex-col items-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mb-3 shadow-lg shadow-primary/30">
              <ShieldCheck className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">Admin Sign In</h1>
            <p className="text-sm text-muted-foreground mt-1">Restricted access · Shoho Pay</p>
          </div>

          <div className="grid grid-cols-2 gap-1 p-1 mb-5 rounded-lg bg-muted/50 border border-border">
            <button
              type="button"
              onClick={() => setMode("email")}
              className={`flex items-center justify-center gap-2 py-2 text-sm rounded-md transition ${mode === "email" ? "bg-background text-foreground shadow" : "text-muted-foreground"}`}
            >
              <Mail className="w-4 h-4" /> Email
            </button>
            <button
              type="button"
              onClick={() => setMode("phone")}
              className={`flex items-center justify-center gap-2 py-2 text-sm rounded-md transition ${mode === "phone" ? "bg-background text-foreground shadow" : "text-muted-foreground"}`}
            >
              <Phone className="w-4 h-4" /> Phone
            </button>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            {mode === "email" ? (
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
                  autoComplete="email"
                  required
                />
              </div>
            ) : (
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Phone number</label>
                <div className="flex gap-2">
                  <CountrySelect value={country} onChange={setCountry} />
                  <input
                    type="tel"
                    value={localPhone}
                    onChange={(e) => setLocalPhone(e.target.value)}
                    placeholder="55 218 8004"
                    className="flex-1 min-w-0 px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
                    autoComplete="tel"
                    required
                  />
                </div>
                {localPhone && (
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    Will sign in as <span className="font-mono text-foreground">{toE164(country, localPhone)}</span>
                  </p>
                )}
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-11 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="Toggle password"
                >
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing in…</> : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Not an admin? <Link to="/auth" className="text-primary hover:underline">User sign-in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
