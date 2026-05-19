export const aed = (n: number, opts: Intl.NumberFormatOptions = {}) =>
  new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    maximumFractionDigits: 2,
    ...opts,
  }).format(n);

export const num = (n: number, d = 2) =>
  n.toLocaleString(undefined, { maximumFractionDigits: d, minimumFractionDigits: d });

export const pct = (n: number, d = 0) => `${(n * 100).toFixed(d)}%`;

export const dateShort = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, { day: "2-digit", month: "short" });

export const monthName = (m: number) =>
  new Date(2000, m, 1).toLocaleString(undefined, { month: "long" });

export const uid = () => Math.random().toString(36).slice(2, 10);
