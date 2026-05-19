import type { BudgetCategory } from "./billy";

export type Currency = "AED" | "USD" | "EUR" | "GBP";
export type TxType =
  | "card"
  | "send"
  | "fx"
  | "gold_buy"
  | "gold_sell"
  | "crypto_buy"
  | "crypto_sell"
  | "topup"
  | "savings_in"
  | "savings_out";

export type Transaction = {
  id: string;
  date: string; // ISO
  type: TxType;
  amount: number; // negative = outflow (in `currency`)
  currency: Currency;
  counterparty: string;
  category?: BudgetCategory;
  note?: string;
  viaBilly?: boolean;
};

export type Balances = {
  AED: number;
  USD: number;
  EUR: number;
  GBP: number;
  GOLD: number; // grams
  BTC: number;
  ETH: number;
  SOL: number;
};

export type Prices = {
  goldPerGram: number; // AED
  BTC: number; // AED
  ETH: number; // AED
  SOL: number; // AED
  USD: number; // AED per 1 USD
  EUR: number;
  GBP: number;
};

export const initialBalances: Balances = {
  AED: 18420.55,
  USD: 1240.0,
  EUR: 680.0,
  GBP: 220.0,
  GOLD: 24.86,
  BTC: 0.0142,
  ETH: 0.218,
  SOL: 4.5,
};

export const initialPrices: Prices = {
  goldPerGram: 308.42,
  BTC: 248_300,
  ETH: 12_450,
  SOL: 560,
  USD: 3.6725,
  EUR: 3.97,
  GBP: 4.65,
};

const today = new Date();
const d = (daysAgo: number, h = 12) => {
  const x = new Date(today);
  x.setDate(x.getDate() - daysAgo);
  x.setHours(h, 0, 0, 0);
  return x.toISOString();
};

export const seedTransactions: Transaction[] = [
  { id: "t1",  date: d(0, 9),  type: "card", amount: -34,  currency: "AED", counterparty: "Talabat",      category: "Food" },
  { id: "t2",  date: d(0, 14), type: "card", amount: -22,  currency: "AED", counterparty: "ENOC",          category: "Transport" },
  { id: "t3",  date: d(1, 20), type: "card", amount: -189, currency: "AED", counterparty: "Noon",          category: "Shopping" },
  { id: "t4",  date: d(1, 11), type: "card", amount: -58,  currency: "AED", counterparty: "Careem",        category: "Transport" },
  { id: "t5",  date: d(2, 21), type: "card", amount: -245, currency: "AED", counterparty: "Carrefour",     category: "Food" },
  { id: "t6",  date: d(3, 19), type: "card", amount: -129, currency: "AED", counterparty: "Netflix",       category: "Entertainment" },
  { id: "t7",  date: d(4, 13), type: "send", amount: -500, currency: "AED", counterparty: "Sara · friend", category: "Other" },
  { id: "t8",  date: d(5, 10), type: "card", amount: -78,  currency: "AED", counterparty: "Starbucks",     category: "Food" },
  { id: "t9",  date: d(6, 22), type: "card", amount: -612, currency: "AED", counterparty: "DEWA",          category: "Bills" },
  { id: "t10", date: d(7, 15), type: "card", amount: -94,  currency: "AED", counterparty: "Talabat",       category: "Food" },
  { id: "t11", date: d(9, 19), type: "card", amount: -312, currency: "AED", counterparty: "Noon",          category: "Shopping" },
  { id: "t12", date: d(11, 8), type: "topup", amount: 8000, currency: "AED", counterparty: "Salary · Acme" },
  { id: "t13", date: d(12,17), type: "gold_buy", amount: -616.84, currency: "AED", counterparty: "Gold · 2g", note: "2g · 24k", viaBilly: true },
  { id: "t14", date: d(14,11), type: "card", amount: -45,  currency: "AED", counterparty: "Spotify",       category: "Entertainment" },
  { id: "t15", date: d(16,20), type: "card", amount: -210, currency: "AED", counterparty: "Carrefour",     category: "Food" },
  { id: "t16", date: d(18,14), type: "send", amount: -350, currency: "AED", counterparty: "Omar · split",  category: "Other" },
  { id: "t17", date: d(21,18), type: "card", amount: -1450,currency: "AED", counterparty: "Etisalat",      category: "Bills" },
  { id: "t18", date: d(24,10), type: "savings_in", amount: -1000, currency: "AED", counterparty: "Savings vault", viaBilly: true },
  { id: "t19", date: d(28,9),  type: "topup", amount: 8000, currency: "AED", counterparty: "Salary · Acme" },
];
