import { createContext, useContext, useEffect, useMemo, useReducer, ReactNode, useRef } from "react";
import {
  Balances,
  Prices,
  Transaction,
  initialBalances,
  initialPrices,
  seedTransactions,
} from "./mock-data";
import { Budget, ChatMsg, Goal, Insight, InsightAction, detectInsights } from "./billy";
import { uid } from "./format";

type User = { name: string; tier: string; language: string };

type State = {
  authed: boolean;
  user: User;
  balances: Balances;
  prices: Prices;
  transactions: Transaction[];
  savingsAED: number;
  budget: Budget | null;
  goals: Goal[];
  insights: Insight[];
  chat: ChatMsg[];
};

const initial: State = {
  authed: false,
  user: { name: "Khalid", tier: "Premier", language: "en" },
  balances: initialBalances,
  prices: initialPrices,
  transactions: seedTransactions,
  savingsAED: 4200,
  budget: { monthly: 6000, categories: { Food: 1500, Transport: 600, Shopping: 1000, Bills: 2000, Entertainment: 400, Other: 500 }, setAt: new Date().toISOString() },
  goals: [{ id: "g1", name: "Tokyo trip", target: 18400, saved: 6820, byDate: new Date(Date.now() + 92 * 864e5).toISOString(), createdAt: new Date().toISOString() }],
  insights: [],
  chat: [
    { id: "c0", role: "assistant", content: "Hi — I'm **Billy**, your accountant. Ask me anything about your money. I see your balances, budget, goals and every transaction.", ts: new Date().toISOString() },
  ],
};

type Action =
  | { type: "AUTH"; on: boolean; user?: Partial<User> }
  | { type: "TICK_PRICES" }
  | { type: "ADD_TX"; tx: Transaction; deltas?: Partial<Balances>; savingsDelta?: number }
  | { type: "SET_BUDGET"; budget: Budget }
  | { type: "ADD_GOAL"; goal: Goal }
  | { type: "SET_INSIGHTS"; insights: Insight[] }
  | { type: "DISMISS_INSIGHT"; id: string }
  | { type: "MARK_INSIGHTS_READ" }
  | { type: "ADD_CHAT"; msg: ChatMsg }
  | { type: "SET_USER"; user: Partial<User> }
  | { type: "HYDRATE"; state: Partial<State> };

const reducer = (s: State, a: Action): State => {
  switch (a.type) {
    case "AUTH":
      return { ...s, authed: a.on, user: a.user ? { ...s.user, ...a.user } : s.user };
    case "TICK_PRICES": {
      const jitter = (v: number, pct: number) => v * (1 + (Math.random() - 0.5) * pct);
      return {
        ...s,
        prices: {
          ...s.prices,
          goldPerGram: +jitter(s.prices.goldPerGram, 0.002).toFixed(2),
          BTC: +jitter(s.prices.BTC, 0.004).toFixed(0),
          ETH: +jitter(s.prices.ETH, 0.005).toFixed(0),
          SOL: +jitter(s.prices.SOL, 0.006).toFixed(0),
          USD: +jitter(s.prices.USD, 0.0005).toFixed(4),
          EUR: +jitter(s.prices.EUR, 0.0008).toFixed(4),
          GBP: +jitter(s.prices.GBP, 0.0008).toFixed(4),
        },
      };
    }
    case "ADD_TX": {
      const balances = { ...s.balances };
      if (a.deltas) for (const k in a.deltas) (balances as any)[k] = +((balances as any)[k] + (a.deltas as any)[k]).toFixed(6);
      const savingsAED = +(s.savingsAED + (a.savingsDelta || 0)).toFixed(2);
      return { ...s, transactions: [a.tx, ...s.transactions], balances, savingsAED };
    }
    case "SET_BUDGET":
      return { ...s, budget: a.budget };
    case "ADD_GOAL":
      return { ...s, goals: [a.goal, ...s.goals] };
    case "SET_INSIGHTS":
      return { ...s, insights: a.insights };
    case "DISMISS_INSIGHT":
      return { ...s, insights: s.insights.filter((i) => i.id !== a.id) };
    case "MARK_INSIGHTS_READ":
      return { ...s, insights: s.insights.map((i) => ({ ...i, read: true })) };
    case "ADD_CHAT":
      return { ...s, chat: [...s.chat, a.msg] };
    case "SET_USER":
      return { ...s, user: { ...s.user, ...a.user } };
    case "HYDRATE":
      return { ...s, ...a.state };
    default:
      return s;
  }
};

type Ctx = {
  state: State;
  netWorthAED: number;
  signIn: (name?: string) => void;
  signOut: () => void;
  send: (toName: string, amountAED: number, note?: string) => void;
  convert: (from: keyof Balances, to: keyof Balances, amount: number) => void;
  topUp: (amountAED: number) => void;
  buyGold: (amountAED: number, viaBilly?: boolean) => void;
  sellGoldGrams: (grams: number, viaBilly?: boolean) => void;
  buyCrypto: (symbol: "BTC" | "ETH" | "SOL", amountAED: number, viaBilly?: boolean) => void;
  sellCrypto: (symbol: "BTC" | "ETH" | "SOL", amountAED: number) => void;
  moveToSavings: (amountAED: number, viaBilly?: boolean) => void;
  pullFromSavings: (amountAED: number, viaBilly?: boolean) => void;
  setBudget: (b: Budget) => void;
  addGoal: (g: Omit<Goal, "id" | "createdAt">) => void;
  dismissInsight: (id: string) => void;
  markInsightsRead: () => void;
  addChat: (m: ChatMsg) => void;
  setUser: (u: Partial<User>) => void;
  executeBillyAction: (a: InsightAction) => void;
};

const StoreCtx = createContext<Ctx | null>(null);

const LS_KEY = "billypay-state-v1";

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initial, (s) => {
    if (typeof window === "undefined") return s;
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) return { ...s, ...JSON.parse(raw) };
    } catch {}
    return s;
  });

  // Persist
  useEffect(() => {
    try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch {}
  }, [state]);

  // Live price ticking
  useEffect(() => {
    const id = setInterval(() => dispatch({ type: "TICK_PRICES" }), 2400);
    return () => clearInterval(id);
  }, []);

  // Compute insights on mount + when txs/budget change
  const lastRun = useRef(0);
  useEffect(() => {
    const now = Date.now();
    if (now - lastRun.current < 500) return;
    lastRun.current = now;
    const fresh = detectInsights(state.transactions, state.budget, state.insights);
    if (fresh.length) dispatch({ type: "SET_INSIGHTS", insights: [...fresh, ...state.insights] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.transactions, state.budget]);

  const netWorthAED = useMemo(() => {
    const { balances, prices, savingsAED } = state;
    return (
      balances.AED +
      balances.USD * prices.USD +
      balances.EUR * prices.EUR +
      balances.GBP * prices.GBP +
      balances.GOLD * prices.goldPerGram +
      balances.BTC * prices.BTC +
      balances.ETH * prices.ETH +
      balances.SOL * prices.SOL +
      savingsAED
    );
  }, [state.balances, state.prices, state.savingsAED]);

  const ctx: Ctx = {
    state,
    netWorthAED,
    signIn: (name) => dispatch({ type: "AUTH", on: true, user: name ? { name } : undefined }),
    signOut: () => dispatch({ type: "AUTH", on: false }),
    send: (toName, amountAED, note) =>
      dispatch({
        type: "ADD_TX",
        tx: { id: uid(), date: new Date().toISOString(), type: "send", amount: -Math.abs(amountAED), currency: "AED", counterparty: toName, note, category: "Other" },
        deltas: { AED: -Math.abs(amountAED) },
      }),
    convert: (from, to, amount) => {
      // simplistic FX between currency wallets, value in AED
      const p = state.prices;
      const rateAED: Record<string, number> = { AED: 1, USD: p.USD, EUR: p.EUR, GBP: p.GBP };
      const aedVal = amount * (rateAED[from as string] ?? 1);
      const outAmt = aedVal / (rateAED[to as string] ?? 1);
      dispatch({
        type: "ADD_TX",
        tx: { id: uid(), date: new Date().toISOString(), type: "fx", amount: -Math.abs(amount), currency: from as any, counterparty: `Convert ${from} → ${to}`, note: `${amount} ${from} → ${outAmt.toFixed(2)} ${to}` },
        deltas: { [from]: -Math.abs(amount), [to]: outAmt } as Partial<Balances>,
      });
    },
    topUp: (amt) =>
      dispatch({
        type: "ADD_TX",
        tx: { id: uid(), date: new Date().toISOString(), type: "topup", amount: Math.abs(amt), currency: "AED", counterparty: "Top up" },
        deltas: { AED: Math.abs(amt) },
      }),
    buyGold: (amountAED, viaBilly) => {
      const grams = +(amountAED / state.prices.goldPerGram).toFixed(4);
      dispatch({
        type: "ADD_TX",
        tx: { id: uid(), date: new Date().toISOString(), type: "gold_buy", amount: -amountAED, currency: "AED", counterparty: `Gold · ${grams}g`, note: `${grams}g · 24k`, viaBilly },
        deltas: { AED: -amountAED, GOLD: grams },
      });
    },
    sellGoldGrams: (grams, viaBilly) => {
      const aed = +(grams * state.prices.goldPerGram).toFixed(2);
      dispatch({
        type: "ADD_TX",
        tx: { id: uid(), date: new Date().toISOString(), type: "gold_sell", amount: aed, currency: "AED", counterparty: `Sold ${grams}g gold`, viaBilly },
        deltas: { AED: aed, GOLD: -grams },
      });
    },
    buyCrypto: (symbol, amountAED, viaBilly) => {
      const units = +(amountAED / state.prices[symbol]).toFixed(6);
      dispatch({
        type: "ADD_TX",
        tx: { id: uid(), date: new Date().toISOString(), type: "crypto_buy", amount: -amountAED, currency: "AED", counterparty: `Buy ${symbol}`, note: `${units} ${symbol}`, viaBilly },
        deltas: { AED: -amountAED, [symbol]: units } as Partial<Balances>,
      });
    },
    sellCrypto: (symbol, amountAED) => {
      const units = +(amountAED / state.prices[symbol]).toFixed(6);
      dispatch({
        type: "ADD_TX",
        tx: { id: uid(), date: new Date().toISOString(), type: "crypto_sell", amount: amountAED, currency: "AED", counterparty: `Sell ${symbol}`, note: `${units} ${symbol}` },
        deltas: { AED: amountAED, [symbol]: -units } as Partial<Balances>,
      });
    },
    moveToSavings: (amt, viaBilly) =>
      dispatch({
        type: "ADD_TX",
        tx: { id: uid(), date: new Date().toISOString(), type: "savings_in", amount: -amt, currency: "AED", counterparty: "Savings vault", viaBilly },
        deltas: { AED: -amt },
        savingsDelta: amt,
      }),
    pullFromSavings: (amt, viaBilly) =>
      dispatch({
        type: "ADD_TX",
        tx: { id: uid(), date: new Date().toISOString(), type: "savings_out", amount: amt, currency: "AED", counterparty: "From Savings vault", viaBilly },
        deltas: { AED: amt },
        savingsDelta: -amt,
      }),
    setBudget: (b) => dispatch({ type: "SET_BUDGET", budget: b }),
    addGoal: (g) => dispatch({ type: "ADD_GOAL", goal: { ...g, id: uid(), createdAt: new Date().toISOString() } }),
    dismissInsight: (id) => dispatch({ type: "DISMISS_INSIGHT", id }),
    markInsightsRead: () => dispatch({ type: "MARK_INSIGHTS_READ" }),
    addChat: (m) => dispatch({ type: "ADD_CHAT", msg: m }),
    setUser: (u) => dispatch({ type: "SET_USER", user: u }),
    executeBillyAction: (action) => {
      switch (action.kind) {
        case "move_to_savings":
          ctx.moveToSavings(action.amount, true); break;
        case "buy_gold":
          ctx.buyGold(action.amountAED, true); break;
        case "buy_crypto":
          ctx.buyCrypto(action.symbol, action.amountAED, true); break;
        case "split_surplus": {
          const a = action.amount;
          ctx.moveToSavings(+(a * 0.5).toFixed(2), true);
          ctx.buyGold(+(a * 0.3).toFixed(2), true);
          ctx.buyCrypto("BTC", +(a * 0.2).toFixed(2), true);
          break;
        }
        case "pull_from_savings":
          ctx.pullFromSavings(action.amount, true); break;
        case "sell_gold_grams":
          ctx.sellGoldGrams(action.grams, true); break;
        case "adjust_budget":
          if (state.budget) ctx.setBudget({ ...state.budget, monthly: action.amount }); break;
        case "set_daily_limit":
          // soft no-op (informational)
          break;
        case "open":
          if (typeof window !== "undefined") window.location.href = action.path;
          break;
      }
    },
  };

  return <StoreCtx.Provider value={ctx}>{children}</StoreCtx.Provider>;
};

export const useStore = () => {
  const v = useContext(StoreCtx);
  if (!v) throw new Error("useStore outside provider");
  return v;
};
