import type { Transaction } from "./mock-data";

export type BudgetCategory = "Food" | "Transport" | "Shopping" | "Bills" | "Entertainment" | "Other";
export const BUDGET_CATEGORIES: BudgetCategory[] = ["Food", "Transport", "Shopping", "Bills", "Entertainment", "Other"];

export type Budget = {
  monthly: number; // AED
  categories: Partial<Record<BudgetCategory, number>>;
  setAt: string;
};

export type Goal = {
  id: string;
  name: string;
  target: number;
  saved: number;
  byDate?: string;
  monthlyContribution?: number;
  createdAt: string;
};

export type InsightSeverity = "info" | "good" | "warn" | "alert";

export type InsightAction =
  | { kind: "open"; path: string; label: string }
  | { kind: "set_daily_limit"; amount: number; label: string }
  | { kind: "move_to_savings"; amount: number; label: string }
  | { kind: "buy_gold"; amountAED: number; label: string }
  | { kind: "buy_crypto"; amountAED: number; symbol: "BTC" | "ETH" | "SOL"; label: string }
  | { kind: "split_surplus"; amount: number; label: string }
  | { kind: "pull_from_savings"; amount: number; label: string }
  | { kind: "sell_gold_grams"; grams: number; label: string }
  | { kind: "adjust_budget"; amount: number; label: string };

export type Insight = {
  id: string;
  date: string;
  severity: InsightSeverity;
  title: string;
  body: string;
  ctas: InsightAction[];
  read: boolean;
};

export type ChatMsg = { id: string; role: "user" | "assistant"; content: string; ts: string };

/* ---------------- categorize ---------------- */
const RULES: Array<[RegExp, BudgetCategory]> = [
  [/talabat|deliveroo|zomato|careem food|starbucks|costa|carrefour|lulu|spinneys|waitrose/i, "Food"],
  [/uber|careem|enoc|adnoc|emarat|metro|salik|rta/i, "Transport"],
  [/noon|amazon|sharaf|namshi|ounass|h&m|zara|ikea/i, "Shopping"],
  [/dewa|etisalat|du|sewa|addc|rent|gym/i, "Bills"],
  [/netflix|spotify|apple|youtube|disney|vox|cinema/i, "Entertainment"],
];
export const categorize = (tx: Transaction): BudgetCategory => {
  if (tx.category) return tx.category;
  for (const [re, cat] of RULES) if (re.test(tx.counterparty)) return cat;
  return "Other";
};

/* ---------------- month spend ---------------- */
const SPEND_TYPES = new Set(["card", "send", "fx", "gold_buy", "crypto_buy"]);

export const monthSpend = (txs: Transaction[], year: number, month: number) => {
  const byCategory: Record<BudgetCategory, number> = { Food: 0, Transport: 0, Shopping: 0, Bills: 0, Entertainment: 0, Other: 0 };
  const byDay: Record<number, number> = {};
  let total = 0;
  for (const t of txs) {
    const dt = new Date(t.date);
    if (dt.getFullYear() !== year || dt.getMonth() !== month) continue;
    if (t.currency !== "AED") continue;
    if (!SPEND_TYPES.has(t.type)) continue;
    if (t.amount >= 0) continue;
    const v = Math.abs(t.amount);
    total += v;
    byCategory[categorize(t)] += v;
    const day = dt.getDate();
    byDay[day] = (byDay[day] || 0) + v;
  }
  return { total, byCategory, byDay };
};

/* ---------------- pace ---------------- */
export type Pace = {
  total: number;
  projected: number;
  pacePct: number;
  status: "on" | "fast" | "over" | "under";
  remaining: number;
  safeDaily: number;
  daysLeft: number;
  dayOfMonth: number;
  daysInMonth: number;
  byCategory: Record<BudgetCategory, number>;
  byDay: Record<number, number>;
};

export const paceAnalysis = (txs: Transaction[], budget: Budget | null): Pace | null => {
  if (!budget || !budget.monthly) return null;
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth();
  const dim = new Date(y, m + 1, 0).getDate();
  const dom = now.getDate();
  const { total, byCategory, byDay } = monthSpend(txs, y, m);
  const projected = (total / dom) * dim;
  const pacePct = projected / budget.monthly;
  const remaining = Math.max(0, budget.monthly - total);
  const daysLeft = Math.max(0, dim - dom);
  const safeDaily = daysLeft ? remaining / daysLeft : 0;
  let status: Pace["status"] = "on";
  if (pacePct > 1.05) status = "over";
  else if (pacePct > 0.95) status = "fast";
  else if (pacePct < 0.7 && dom > 20) status = "under";
  return { total, projected, pacePct, status, remaining, safeDaily, daysLeft, dayOfMonth: dom, daysInMonth: dim, byCategory, byDay };
};

/* ---------------- insights ---------------- */
const uid = () => Math.random().toString(36).slice(2, 10);

export const detectInsights = (txs: Transaction[], budget: Budget | null, existing: Insight[]): Insight[] => {
  const out: Insight[] = [];
  const pace = paceAnalysis(txs, budget);
  if (!budget || !pace) return out;
  const now = new Date();
  const ymKey = `${now.getFullYear()}-${now.getMonth()}`;

  // 1. Mid-month over pace
  if (pace.dayOfMonth >= 7 && pace.dayOfMonth <= 25 && pace.projected > budget.monthly * 1.05) {
    const id = `pace-${ymKey}`;
    if (!existing.some((i) => i.id === id)) {
      out.push({
        id,
        date: now.toISOString(),
        severity: "alert",
        title: "You're on pace to overspend",
        body: `At today's rate you'll spend ~AED ${pace.projected.toFixed(0)} this month — that's AED ${(pace.projected - budget.monthly).toFixed(0)} over your AED ${budget.monthly.toFixed(0)} budget. To stay on track, keep daily spend under AED ${pace.safeDaily.toFixed(0)}.`,
        read: false,
        ctas: [
          { kind: "set_daily_limit", amount: Math.round(pace.safeDaily), label: `Cap daily at AED ${Math.round(pace.safeDaily)}` },
          { kind: "open", path: "/app/transactions", label: "Review spending" },
          { kind: "adjust_budget", amount: Math.round(pace.projected), label: "Adjust budget" },
        ],
      });
    }
  }

  // 2. End-of-month surplus
  if (pace.dayOfMonth >= pace.daysInMonth - 1 && pace.total < budget.monthly && pace.remaining >= 200) {
    const id = `surplus-${ymKey}`;
    if (!existing.some((i) => i.id === id)) {
      const amt = Math.round(pace.remaining);
      out.push({
        id,
        date: now.toISOString(),
        severity: "good",
        title: `You saved AED ${amt} this month`,
        body: `Nice. I can put your surplus to work. The 50/30/20 split is my default — Savings, Gold, Crypto.`,
        read: false,
        ctas: [
          { kind: "split_surplus", amount: amt, label: `50/30/20 split AED ${amt}` },
          { kind: "move_to_savings", amount: amt, label: `All to Savings` },
          { kind: "buy_gold", amountAED: amt, label: `All to Gold` },
        ],
      });
    }
  }

  // 3. End-of-month deficit
  if (pace.dayOfMonth >= pace.daysInMonth - 1 && pace.total > budget.monthly) {
    const id = `deficit-${ymKey}`;
    if (!existing.some((i) => i.id === id)) {
      const gap = Math.round(pace.total - budget.monthly);
      out.push({
        id,
        date: now.toISOString(),
        severity: "warn",
        title: `You went AED ${gap} over budget`,
        body: `I can cover the gap from your savings or by selling a small amount of gold to keep your card free.`,
        read: false,
        ctas: [
          { kind: "pull_from_savings", amount: gap, label: `Pull AED ${gap} from Savings` },
          { kind: "sell_gold_grams", grams: +(gap / 308.42).toFixed(2), label: `Sell ~${(gap / 308.42).toFixed(2)}g gold` },
          { kind: "open", path: "/app/billy", label: "Decide later" },
        ],
      });
    }
  }
  return out;
};

/* ---------------- AI context ---------------- */
export const BILLY_SYSTEM_PROMPT = `You are Billy — a calm, concise senior accountant living inside the user's Billy Pay wallet.

Tone: warm, direct, never preachy. You speak plainly. You answer in the user's language; if they write Arabic, reply in Arabic.

Output rules:
- Your FIRST sentence is the direct numeric answer. Bold the key number in **markdown**.
- Use AED unless asked otherwise. Bold all monetary figures.
- Never invent numbers. Use only what's in CONTEXT JSON below.
- Keep replies short (3-6 short sentences). Use 1-2 bullet points only when listing actions.
- For investing, only ever recommend: Savings vault, Digital Gold, and small allocations to BTC/ETH. Never recommend specific equities.
- If asked something outside money/finance, gently bring it back to their money.`;

export type BillyContext = {
  today: string;
  user: { name: string; tier: string; language: string };
  balances: Record<string, number>;
  prices: Record<string, number>;
  savingsAED: number;
  netWorthAED: number;
  budget: Budget | null;
  goals: Goal[];
  pace: Pace | null;
  recentTx: Transaction[];
};

export const buildBillyContext = (args: {
  user: { name: string; tier: string; language: string };
  balances: Record<string, number>;
  prices: Record<string, number>;
  savingsAED: number;
  netWorthAED: number;
  budget: Budget | null;
  goals: Goal[];
  transactions: Transaction[];
}): BillyContext => ({
  today: new Date().toISOString().slice(0, 10),
  user: args.user,
  balances: args.balances,
  prices: args.prices,
  savingsAED: args.savingsAED,
  netWorthAED: args.netWorthAED,
  budget: args.budget,
  goals: args.goals,
  pace: paceAnalysis(args.transactions, args.budget),
  recentTx: args.transactions.slice(0, 60),
});
