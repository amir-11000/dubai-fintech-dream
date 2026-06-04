import { useI18n } from "@/lib/i18n";
import { Globe } from "lucide-react";

/**
 * Compact EN/AR toggle for the navbar.
 * Persists choice via the i18n provider (localStorage).
 */
export default function LanguageSwitcher({
  className = "",
  onChange,
}: {
  className?: string;
  onChange?: () => void;
}) {
  const { lang, setLang, t } = useI18n();

  const toggle = () => {
    setLang(lang === "en" ? "ar" : "en");
    onChange?.();
  };

  return (
    <button
      onClick={toggle}
      aria-label={t("nav.language")}
      title={t("nav.language")}
      className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/80 transition hover:border-white/20 hover:text-white ${className}`}
    >
      <Globe className="h-3.5 w-3.5" aria-hidden />
      <span className={lang === "en" ? "text-white" : "text-white/50"}>EN</span>
      <span className="text-white/30">·</span>
      <span
        className={lang === "ar" ? "text-white" : "text-white/50"}
        style={{ fontFamily: '"Tajawal", system-ui, sans-serif' }}
      >
        عربي
      </span>
    </button>
  );
}
