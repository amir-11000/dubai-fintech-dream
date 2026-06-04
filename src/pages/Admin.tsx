import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../integrations/supabase/client";
import { useAuth } from "../lib/auth";
import { toast } from "sonner";
import {
  Users, MessageSquare, Activity, LogOut, Search, Download, ShieldCheck,
  CheckCircle2, Ban, Mail, Phone, ArrowLeft, Eye, EyeOff, Mailbox, Trash2,
  Briefcase, UserPlus, FileText, ExternalLink,
} from "lucide-react";

type Profile = {
  id: string; user_id: string; full_name: string | null; email: string | null;
  phone: string | null; is_blocked: boolean; last_login: string | null; created_at: string;
};
type Msg = {
  id: string; name: string; email: string; phone: string | null; message: string;
  status: string; created_at: string;
};
type Role = { user_id: string; role: string };
type Waitlist = {
  id: string; email: string; source: string | null; country: string | null;
  ip_address: string | null; user_agent: string | null; created_at: string;
};
type Application = {
  id: string; position_id: string | null; position_title: string;
  first_name: string; last_name: string; email: string; phone: string; country: string;
  linkedin_url: string | null; portfolio_url: string | null; github_url: string | null;
  current_company: string | null; cover_letter: string | null;
  cv_path: string | null; portfolio_path: string | null; supporting_path: string | null;
  status: string; admin_notes: string | null; created_at: string;
};
type TalentEntry = {
  id: string; first_name: string; last_name: string; email: string; phone: string | null;
  country: string; area_of_interest: string | null; linkedin_url: string | null;
  portfolio_url: string | null; cv_path: string | null; message: string | null;
  status: string; created_at: string;
};

const APP_STATUSES = ["new", "under_review", "interview", "shortlisted", "rejected", "hired"] as const;
const statusLabel = (s: string) => ({ new: "New", under_review: "Under Review", interview: "Interview", shortlisted: "Shortlisted", rejected: "Rejected", hired: "Hired" } as Record<string, string>)[s] || s;
const statusColor = (s: string) => ({
  new: "bg-glow/15 text-glow",
  under_review: "bg-amber-500/15 text-amber-300",
  interview: "bg-violet-500/15 text-violet-300",
  shortlisted: "bg-emerald-500/15 text-emerald-300",
  rejected: "bg-red-500/15 text-red-300",
  hired: "bg-gold/15 text-gold",
} as Record<string, string>)[s] || "bg-white/5 text-silver/60";

const fmtDate = (s: string | null) => s ? new Date(s).toLocaleString() : "—";
const fmtShort = (s: string | null) => s ? new Date(s).toLocaleDateString() : "—";

const toCSV = (rows: Record<string, any>[]) => {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  const esc = (v: any) => {
    const s = v == null ? "" : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [headers.join(","), ...rows.map(r => headers.map(h => esc(r[h])).join(","))].join("\n");
};

const download = (filename: string, content: string) => {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
};

export default function Admin() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const nav = useNavigate();
  const [tab, setTab] = useState<"overview" | "users" | "messages" | "waitlist" | "careers" | "talent">("overview");
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [waitlist, setWaitlist] = useState<Waitlist[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [talent, setTalent] = useState<TalentEntry[]>([]);
  const [waitSearch, setWaitSearch] = useState("");
  const [appSearch, setAppSearch] = useState("");
  const [appStatusFilter, setAppStatusFilter] = useState<string>("all");
  const [appPositionFilter, setAppPositionFilter] = useState<string>("all");
  const [appCountryFilter, setAppCountryFilter] = useState<string>("all");
  const [talentSearch, setTalentSearch] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "blocked">("all");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) { nav("/admin/login", { replace: true }); return; }
    if (!isAdmin) { nav("/", { replace: true }); toast.error("Admin access required"); return; }
    refresh();
  }, [user, isAdmin, loading]);

  const refresh = async () => {
    setBusy(true);
    const [{ data: p }, { data: m }, { data: r }, { data: w }, { data: ap }, { data: tp }] = await Promise.all([
      supabase.from("profiles").select("*").order("created_at", { ascending: false }),
      supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
      supabase.from("user_roles").select("user_id, role"),
      supabase.from("waitlist").select("*").order("created_at", { ascending: false }),
      (supabase as any).from("job_applications").select("*").order("created_at", { ascending: false }),
      (supabase as any).from("talent_pool").select("*").order("created_at", { ascending: false }),
    ]);
    setProfiles((p as Profile[]) || []);
    setMessages((m as Msg[]) || []);
    setRoles((r as Role[]) || []);
    setWaitlist((w as Waitlist[]) || []);
    setApplications((ap as Application[]) || []);
    setTalent((tp as TalentEntry[]) || []);
    setBusy(false);
  };

  const stats = useMemo(() => {
    const now = Date.now();
    const day = 86400000;
    const today = profiles.filter(p => now - new Date(p.created_at).getTime() < day).length;
    const week = profiles.filter(p => now - new Date(p.created_at).getTime() < 7 * day).length;
    const month = profiles.filter(p => now - new Date(p.created_at).getTime() < 30 * day).length;
    return {
      total: profiles.length, today, week, month,
      blocked: profiles.filter(p => p.is_blocked).length,
      unread: messages.filter(m => m.status === "unread").length,
      msgsTotal: messages.length,
    };
  }, [profiles, messages]);

  const filteredProfiles = useMemo(() => {
    const q = search.trim().toLowerCase();
    return profiles.filter(p => {
      if (filter === "active" && p.is_blocked) return false;
      if (filter === "blocked" && !p.is_blocked) return false;
      if (!q) return true;
      return [p.full_name, p.email, p.phone].some(v => v?.toLowerCase().includes(q));
    });
  }, [profiles, search, filter]);

  const logAction = async (action: string, target_id: string | null, metadata?: any) => {
    if (!user) return;
    await supabase.from("admin_logs").insert({ admin_id: user.id, action, target_id, metadata });
  };

  const toggleBlock = async (p: Profile) => {
    const next = !p.is_blocked;
    const { error } = await supabase.from("profiles").update({ is_blocked: next }).eq("id", p.id);
    if (error) { toast.error(error.message); return; }
    await logAction(next ? "block_user" : "unblock_user", p.user_id);
    setProfiles(prev => prev.map(x => x.id === p.id ? { ...x, is_blocked: next } : x));
    toast.success(next ? "User blocked" : "User unblocked");
  };

  const toggleRead = async (m: Msg) => {
    const next = m.status === "unread" ? "read" : "unread";
    const { error } = await supabase.from("contact_messages").update({ status: next }).eq("id", m.id);
    if (error) { toast.error(error.message); return; }
    await logAction(`mark_message_${next}`, m.id);
    setMessages(prev => prev.map(x => x.id === m.id ? { ...x, status: next } : x));
  };

  const exportUsers = () => {
    const rows = filteredProfiles.map(p => ({
      name: p.full_name || "",
      email: p.email || "",
      phone: p.phone || "",
      verified: roles.find(r => r.user_id === p.user_id) ? "yes" : "no",
      role: roles.find(r => r.user_id === p.user_id)?.role || "user",
      blocked: p.is_blocked ? "yes" : "no",
      created_at: p.created_at,
      last_login: p.last_login || "",
    }));
    download(`shoho-users-${Date.now()}.csv`, toCSV(rows));
  };

  const exportMessages = () => {
    download(`shoho-messages-${Date.now()}.csv`, toCSV(messages));
  };

  if (loading || !user || !isAdmin) {
    return <div className="grid min-h-screen place-items-center bg-ink text-silver/60">Loading…</div>;
  }

  return (
    <div className="min-h-screen bg-ink text-white">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-white/5 bg-ink/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/5">
              <ArrowLeft className="h-4 w-4 text-silver/60" />
            </Link>
            <div className="flex items-center gap-2.5">
              <div className="grid h-8 w-8 place-items-center rounded-md bg-gradient-to-br from-white/20 to-white/5 hairline">
                <ShieldCheck className="h-4 w-4 text-glow" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-silver/50">SHOHO PAY</div>
                <div className="text-sm font-semibold">Admin Console</div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-silver/60">
            <span className="hidden sm:inline">{user.email || user.phone}</span>
            <button onClick={async () => { await signOut(); nav("/"); }} className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/5" aria-label="Sign out">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
        <nav className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-6 pb-3">
          {[
            { k: "overview", l: "Overview", i: Activity },
            { k: "users", l: `Users (${stats.total})`, i: Users },
            { k: "messages", l: `Messages (${stats.unread} new)`, i: MessageSquare },
            { k: "waitlist", l: `Waitlist (${waitlist.length})`, i: Mailbox },
            { k: "careers", l: `Careers (${applications.filter(a => a.status === "new").length} new)`, i: Briefcase },
            { k: "talent", l: `Talent Pool (${talent.length})`, i: UserPlus },
          ].map(t => (
            <button
              key={t.k}
              onClick={() => setTab(t.k as any)}
              className={`flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-xs transition ${tab === t.k ? "bg-white/10 text-white" : "text-silver/60 hover:text-white"}`}
            >
              <t.i className="h-3.5 w-3.5" /> {t.l}
            </button>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {tab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <Stat label="Total users" value={stats.total} />
              <Stat label="New today" value={stats.today} accent="glow" />
              <Stat label="This week" value={stats.week} />
              <Stat label="This month" value={stats.month} />
              <Stat label="Blocked" value={stats.blocked} accent="red" />
              <Stat label="Messages" value={stats.msgsTotal} />
              <Stat label="Unread messages" value={stats.unread} accent="gold" />
              <Stat label="Admins" value={roles.filter(r => r.role === "admin").length} />
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Panel title="Latest signups">
                <ul className="divide-y divide-white/5">
                  {profiles.slice(0, 6).map(p => (
                    <li key={p.id} className="flex items-center justify-between py-3 text-sm">
                      <div>
                        <div className="font-medium text-white">{p.full_name || "Unnamed"}</div>
                        <div className="text-xs text-silver/50">{p.phone || p.email}</div>
                      </div>
                      <div className="text-xs text-silver/40">{fmtShort(p.created_at)}</div>
                    </li>
                  ))}
                  {!profiles.length && <li className="py-6 text-center text-sm text-silver/40">No users yet</li>}
                </ul>
              </Panel>
              <Panel title="Latest messages">
                <ul className="divide-y divide-white/5">
                  {messages.slice(0, 6).map(m => (
                    <li key={m.id} className="py-3 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{m.name}</span>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider ${m.status === "unread" ? "bg-glow/15 text-glow" : "bg-white/5 text-silver/50"}`}>{m.status}</span>
                      </div>
                      <div className="mt-1 line-clamp-1 text-xs text-silver/60">{m.message}</div>
                    </li>
                  ))}
                  {!messages.length && <li className="py-6 text-center text-sm text-silver/40">No messages yet</li>}
                </ul>
              </Panel>
            </div>
          </div>
        )}

        {tab === "users" && (
          <div className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-silver/40" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name, email, phone…" className="w-full rounded-full bg-white/[0.04] py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-silver/30 hairline focus:ring-2 focus:ring-glow/40" />
              </div>
              <div className="flex gap-1 rounded-full hairline bg-white/[0.03] p-1 text-xs">
                {(["all", "active", "blocked"] as const).map(f => (
                  <button key={f} onClick={() => setFilter(f)} className={`rounded-full px-3 py-1.5 capitalize transition ${filter === f ? "bg-white/10 text-white" : "text-silver/60"}`}>{f}</button>
                ))}
              </div>
              <button onClick={exportUsers} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-medium text-ink hover:bg-white/90">
                <Download className="h-3.5 w-3.5" /> Export CSV
              </button>
            </div>

            <Panel padded={false}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-white/5 text-left text-[11px] uppercase tracking-wider text-silver/50">
                    <tr>
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Contact</th>
                      <th className="px-4 py-3">Role</th>
                      <th className="px-4 py-3">Joined</th>
                      <th className="px-4 py-3">Last login</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredProfiles.map(p => {
                      const role = roles.find(r => r.user_id === p.user_id)?.role || "user";
                      return (
                        <tr key={p.id} className="hover:bg-white/[0.02]">
                          <td className="px-4 py-3">
                            <div className="font-medium text-white">{p.full_name || "—"}</div>
                          </td>
                          <td className="px-4 py-3 text-xs text-silver/70">
                            <div className="flex items-center gap-1.5"><Phone className="h-3 w-3 text-silver/40" />{p.phone || "—"}</div>
                            <div className="flex items-center gap-1.5"><Mail className="h-3 w-3 text-silver/40" />{p.email || "—"}</div>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`rounded-full px-2 py-0.5 text-[10px] uppercase ${role === "admin" ? "bg-gold/15 text-gold" : "bg-white/5 text-silver/60"}`}>{role}</span>
                          </td>
                          <td className="px-4 py-3 text-xs text-silver/60">{fmtShort(p.created_at)}</td>
                          <td className="px-4 py-3 text-xs text-silver/60">{fmtDate(p.last_login)}</td>
                          <td className="px-4 py-3">
                            {p.is_blocked
                              ? <span className="inline-flex items-center gap-1 rounded-full bg-red-500/15 px-2 py-0.5 text-[10px] uppercase text-red-300"><Ban className="h-3 w-3" /> Blocked</span>
                              : <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] uppercase text-emerald-300"><CheckCircle2 className="h-3 w-3" /> Active</span>}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <button onClick={() => toggleBlock(p)} className={`rounded-full px-3 py-1.5 text-xs transition ${p.is_blocked ? "bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20" : "bg-red-500/10 text-red-300 hover:bg-red-500/20"}`}>
                              {p.is_blocked ? "Unblock" : "Block"}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                    {!filteredProfiles.length && (
                      <tr><td colSpan={7} className="py-12 text-center text-sm text-silver/40">{busy ? "Loading…" : "No users match"}</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Panel>
          </div>
        )}

        {tab === "messages" && (
          <div className="space-y-4">
            <div className="flex items-center justify-end">
              <button onClick={exportMessages} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-medium text-ink hover:bg-white/90">
                <Download className="h-3.5 w-3.5" /> Export CSV
              </button>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {messages.map(m => (
                <Panel key={m.id}>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-medium text-white">{m.name}</span>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider ${m.status === "unread" ? "bg-glow/15 text-glow" : "bg-white/5 text-silver/50"}`}>{m.status}</span>
                        <span className="text-[11px] text-silver/40">{fmtDate(m.created_at)}</span>
                      </div>
                      <div className="mt-1 flex flex-wrap gap-4 text-xs text-silver/60">
                        <span className="inline-flex items-center gap-1.5"><Mail className="h-3 w-3" /> {m.email}</span>
                        {m.phone && <span className="inline-flex items-center gap-1.5"><Phone className="h-3 w-3" /> {m.phone}</span>}
                      </div>
                      <p className="mt-3 whitespace-pre-wrap text-sm text-silver/80">{m.message}</p>
                    </div>
                    <button onClick={() => toggleRead(m)} className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white/5 px-3 py-2 text-xs text-silver/80 hover:bg-white/10">
                      {m.status === "unread" ? <><Eye className="h-3.5 w-3.5" /> Mark read</> : <><EyeOff className="h-3.5 w-3.5" /> Mark unread</>}
                    </button>
                  </div>
                </Panel>
              ))}
              {!messages.length && <Panel><div className="py-10 text-center text-sm text-silver/40">No messages yet</div></Panel>}
            </div>
          </div>
        )}

        {tab === "waitlist" && (() => {
          const q = waitSearch.trim().toLowerCase();
          const filtered = waitlist.filter(w => !q || w.email.toLowerCase().includes(q) || (w.country || "").toLowerCase().includes(q) || (w.source || "").toLowerCase().includes(q));
          const exportWait = () => {
            const rows = filtered.map(w => ({
              email: w.email,
              created_at: w.created_at,
              source: w.source || "",
              country: w.country || "",
              ip_address: w.ip_address || "",
              user_agent: w.user_agent || "",
            }));
            download(`shoho-waitlist-${Date.now()}.csv`, toCSV(rows));
          };
          const removeWait = async (id: string, email: string) => {
            if (!confirm(`Delete waitlist entry for ${email}?`)) return;
            const { error } = await supabase.from("waitlist").delete().eq("id", id);
            if (error) { toast.error(error.message); return; }
            await logAction("delete_waitlist", id, { email });
            setWaitlist(prev => prev.filter(x => x.id !== id));
            toast.success("Waitlist entry removed");
          };
          const today = waitlist.filter(w => Date.now() - new Date(w.created_at).getTime() < 86400000).length;
          const week = waitlist.filter(w => Date.now() - new Date(w.created_at).getTime() < 7 * 86400000).length;
          return (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <Stat label="Total signups" value={waitlist.length} accent="glow" />
                <Stat label="Today" value={today} />
                <Stat label="This week" value={week} />
                <Stat label="Unique domains" value={new Set(waitlist.map(w => w.email.split("@")[1])).size} accent="gold" />
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-silver/40" />
                  <input value={waitSearch} onChange={e => setWaitSearch(e.target.value)} placeholder="Search email, country, source…" className="w-full rounded-full bg-white/[0.04] py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-silver/30 hairline focus:ring-2 focus:ring-glow/40" />
                </div>
                <button onClick={exportWait} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-medium text-ink hover:bg-white/90">
                  <Download className="h-3.5 w-3.5" /> Export CSV
                </button>
              </div>
              <Panel padded={false}>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-white/5 text-left text-[11px] uppercase tracking-wider text-silver/50">
                      <tr>
                        <th className="px-4 py-3">Email</th>
                        <th className="px-4 py-3">Source</th>
                        <th className="px-4 py-3">Country</th>
                        <th className="px-4 py-3">Joined</th>
                        <th className="px-4 py-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filtered.map(w => (
                        <tr key={w.id} className="hover:bg-white/[0.02]">
                          <td className="px-4 py-3 font-medium text-white">{w.email}</td>
                          <td className="px-4 py-3 text-xs text-silver/60">{w.source || "—"}</td>
                          <td className="px-4 py-3 text-xs text-silver/60">{w.country || "—"}</td>
                          <td className="px-4 py-3 text-xs text-silver/60">{fmtDate(w.created_at)}</td>
                          <td className="px-4 py-3 text-right">
                            <button onClick={() => removeWait(w.id, w.email)} className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-3 py-1.5 text-xs text-red-300 hover:bg-red-500/20">
                              <Trash2 className="h-3 w-3" /> Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                      {!filtered.length && (
                        <tr><td colSpan={5} className="py-12 text-center text-sm text-silver/40">{busy ? "Loading…" : "No waitlist entries yet"}</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </Panel>
            </div>
          );
        })()}

        {tab === "careers" && (
          <CareersTab
            applications={applications}
            setApplications={setApplications}
            search={appSearch}
            setSearch={setAppSearch}
            statusFilter={appStatusFilter}
            setStatusFilter={setAppStatusFilter}
            positionFilter={appPositionFilter}
            setPositionFilter={setAppPositionFilter}
            countryFilter={appCountryFilter}
            setCountryFilter={setAppCountryFilter}
            logAction={logAction}
          />
        )}

        {tab === "talent" && (
          <TalentTab
            entries={talent}
            setEntries={setTalent}
            search={talentSearch}
            setSearch={setTalentSearch}
            logAction={logAction}
          />
        )}
      </main>
    </div>
  );
}

const Stat = ({ label, value, accent }: { label: string; value: number; accent?: "glow" | "gold" | "red" }) => (
  <div className="rounded-2xl glass-strong p-5">
    <div className="text-[10px] uppercase tracking-widest text-silver/50">{label}</div>
    <div className={`mt-2 text-3xl font-semibold ${accent === "glow" ? "text-glow" : accent === "gold" ? "text-gold" : accent === "red" ? "text-red-300" : "text-white"}`}>{value}</div>
  </div>
);

const Panel = ({ title, children, padded = true }: { title?: string; children: React.ReactNode; padded?: boolean }) => (
  <section className={`rounded-2xl glass-strong ${padded ? "p-5" : ""}`}>
    {title && <h3 className="mb-3 text-xs uppercase tracking-widest text-silver/50">{title}</h3>}
    {children}
  </section>
);
