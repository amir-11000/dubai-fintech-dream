import { Link } from "react-router-dom";
import { useStore } from "../../lib/store";
import { BillyMark } from "./BillyMark";

export const BillyFab = () => {
  const { state } = useStore();
  const unread = state.insights.filter((i) => !i.read).length;
  return (
    <Link
      to="/app/billy"
      className="group fixed bottom-20 right-5 z-40 flex items-center gap-3 rounded-full glass-strong p-2 pr-4 transition hover:scale-[1.02] md:bottom-6"
      aria-label="Open Billy"
    >
      <BillyMark size={42} pulse={unread > 0} />
      <div className="hidden text-left sm:block">
        <div className="text-[10px] uppercase tracking-widest text-silver/60">Ask</div>
        <div className="text-sm font-medium text-white">
          Billy{unread > 0 && <span className="ml-1.5 rounded-full bg-gold px-1.5 py-0.5 text-[10px] text-ink">{unread}</span>}
        </div>
      </div>
    </Link>
  );
};
