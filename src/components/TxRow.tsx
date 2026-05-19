import { ArrowDownLeft, ArrowUpRight, ArrowLeftRight, Coins, Bitcoin, PiggyBank, CreditCard, Send } from "lucide-react";
import { Transaction } from "../lib/mock-data";
import { aed, dateShort } from "../lib/format";
import { categorize } from "../lib/billy";

const iconOf = (t: Transaction) => {
  switch (t.type) {
    case "card": return CreditCard;
    case "send": return Send;
    case "fx": return ArrowLeftRight;
    case "gold_buy":
    case "gold_sell": return Coins;
    case "crypto_buy":
    case "crypto_sell": return Bitcoin;
    case "savings_in":
    case "savings_out": return PiggyBank;
    case "topup": return ArrowDownLeft;
    default: return ArrowUpRight;
  }
};

export const TxRow = ({ tx }: { tx: Transaction }) => {
  const Icon = iconOf(tx);
  const positive = tx.amount > 0;
  return (
    <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-white/[0.03]">
      <div className="grid h-9 w-9 place-items-center rounded-full bg-white/5 text-silver hairline">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 truncate text-sm text-white">
          <span className="truncate">{tx.counterparty}</span>
          {tx.viaBilly && <span className="rounded-full bg-gold/15 px-1.5 py-0.5 text-[10px] text-gold">via Billy</span>}
        </div>
        <div className="text-[11px] text-silver/50">{dateShort(tx.date)} · {categorize(tx)}</div>
      </div>
      <div className={`font-display tabular-nums text-sm ${positive ? "text-emerald-300" : "text-white"}`}>
        {positive ? "+" : ""}{aed(tx.amount)}
      </div>
    </div>
  );
};
