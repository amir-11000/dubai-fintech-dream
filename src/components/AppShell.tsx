import { ReactNode, useEffect } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Home, Wallet, ArrowLeftRight, Send, CreditCard, Coins, Bitcoin, PiggyBank, Receipt, User, LogOut } from "lucide-react";
import { useStore } from "../lib/store";
import { MarketStrip } from "./Live";
import { BillyFab } from "./billy/BillyFab";
import { BillyMark } from "./billy/BillyMark";

const topNav = [
  { to: "/app", label: "Home", end: true },
  { to: "/app/wallets", label: "Wallets" },
  { to: "/app/transactions", label: "Transactions" },
  { to: "/app/gold", label: "Gold" },
  { to: "/app/crypto", label: "Crypto" },
  { to: "/app/savings", label: "Savings" },
];

const bottomNav = [
  { to: "/app", icon: Home, label: "Home", end: true },
  { to: "/app/wallets", icon: Wallet, label: "Wallets" },
  { to: "/app/send", icon: Send, label: "Send" },
  { to: "/app/transactions", icon: Receipt, label: "Activity" },
  { to: "/app/profile", icon: User, label: "Me" },
];

export const AppShell = ({ children }: { children?: ReactNode }) => {
  const { state, signOut } = useStore();
  const nav = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  useEffect(() => {
    if (!state.authed) nav("/signin", { replace: true });
  }, [state.authed, nav]);

  return (
    <div className="relative min-h-screen pb-24 md:pb-0">
      <header className="sticky top-0 z-30 bg-ink/80 backdrop-blur-xl">
        <div className="flex items-center justify-between px-5 py-3">
          <Link to="/app" className="flex items-center gap-2.5">
            <BillyMark size={28} />
            <span className="text-sm font-semibold tracking-[0.18em] text-white">SHOHO PAY</span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {topNav.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `rounded-full px-3 py-1.5 text-xs transition ${isActive ? "bg-white/10 text-white" : "text-silver/60 hover:text-white"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
          <button onClick={() => { signOut(); nav("/"); }} className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/5" aria-label="Sign out">
            <LogOut className="h-4 w-4 text-silver/60" />
          </button>
        </div>
        <MarketStrip />
      </header>

      <main className="mx-auto w-full max-w-6xl px-5 pt-6">
        {children ?? <Outlet />}
      </main>

      {/* Bottom nav (mobile) */}
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-white/5 bg-ink/90 backdrop-blur-xl md:hidden">
        <div className="grid grid-cols-5">
          {bottomNav.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-3 text-[10px] ${isActive ? "text-gold" : "text-silver/60"}`
              }
            >
              <l.icon className="h-4 w-4" />
              {l.label}
            </NavLink>
          ))}
        </div>
      </nav>

      <BillyFab />
    </div>
  );
};
