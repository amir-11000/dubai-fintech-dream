import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Search, Check } from "lucide-react";
import { COUNTRIES, Country } from "../lib/countries";

type Props = {
  value: Country;
  onChange: (c: Country) => void;
};

export default function CountrySelect({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 0);
    else setQuery("");
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.dial.includes(q.replace(/^\+/, "")),
    );
  }, [query]);

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Select country"
        className="flex h-full items-center gap-1.5 rounded-l-xl border-r border-white/10 bg-white/[0.04] px-3 py-3 text-sm text-white transition hover:bg-white/[0.08]"
      >
        <span className="text-base leading-none">{value.flag}</span>
        <span className="font-medium tabular-nums">+{value.dial}</span>
        <ChevronDown className={`h-3.5 w-3.5 text-silver/50 transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 w-[300px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-white/10 bg-ink/95 shadow-2xl backdrop-blur-xl">
          <div className="border-b border-white/5 p-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-silver/40" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search country or code"
                className="w-full rounded-lg bg-white/[0.04] py-2 pl-9 pr-3 text-sm text-white outline-none placeholder:text-silver/40 focus:bg-white/[0.08]"
              />
            </div>
          </div>
          <ul className="max-h-72 overflow-y-auto py-1">
            {filtered.map((c) => {
              const active = c.code === value.code;
              return (
                <li key={c.code}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(c);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center gap-3 px-3 py-2 text-left text-sm transition hover:bg-white/[0.06] ${active ? "bg-white/[0.04]" : ""}`}
                  >
                    <span className="text-base leading-none">{c.flag}</span>
                    <span className="flex-1 truncate text-white">{c.name}</span>
                    <span className="text-xs text-silver/50 tabular-nums">+{c.dial}</span>
                    {active && <Check className="h-3.5 w-3.5 text-glow" />}
                  </button>
                </li>
              );
            })}
            {!filtered.length && (
              <li className="px-3 py-6 text-center text-xs text-silver/40">No country found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
