import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";

export type Lang = "en" | "ar";

const STORAGE_KEY = "shoho_lang";

/* =========================================================
   DICTIONARY
   - English values are the source of truth.
   - Missing Arabic keys fall back to English so the site
     never shows a raw key on screen.
========================================================= */
type Dict = Record<string, string>;

const en: Dict = {
  // Splash
  "splash.welcome": "Welcome to SHOHO PAY",
  "splash.subtitle": "Choose your preferred language",
  "splash.english": "English",
  "splash.arabic": "العربية",
  "splash.continue_en": "Continue in English",
  "splash.continue_ar": "المتابعة بالعربية",
  "splash.tagline": "The luxury wallet of the UAE",

  // Nav
  "nav.features": "Features",
  "nav.pricing": "Pricing",
  "nav.security": "Security",
  "nav.careers": "Careers",
  "nav.about": "About",
  "nav.contact": "Contact",
  "nav.signin": "Sign in",
  "nav.join_waitlist": "Join Waitlist",
  "nav.open_menu": "Open menu",
  "nav.close_menu": "Close menu",
  "nav.language": "Language",

  // Footer
  "footer.tagline": "The luxury wallet of the UAE — payments, crypto, gold and Billy, your AI accountant. Built in Dubai.",
  "footer.newsletter_placeholder": "Newsletter email",
  "footer.subscribe": "Subscribe",
  "footer.product": "Product",
  "footer.company": "Company",
  "footer.legal": "Legal",
  "footer.privacy": "Privacy",
  "footer.terms": "Terms",
  "footer.compliance": "Compliance",
  "footer.waitlist": "Waitlist",
  "footer.copyright": "© {year} Shoho Pay. Aligned with UAE Central Bank guidelines · DIFC registered.",
};

const ar: Dict = {
  // Splash
  "splash.welcome": "مرحباً بك في شوهو باي",
  "splash.subtitle": "اختر لغتك المفضلة",
  "splash.english": "English",
  "splash.arabic": "العربية",
  "splash.continue_en": "Continue in English",
  "splash.continue_ar": "المتابعة بالعربية",
  "splash.tagline": "محفظة الإمارات الفاخرة",

  // Nav
  "nav.features": "المميزات",
  "nav.pricing": "الأسعار",
  "nav.security": "الأمان",
  "nav.careers": "الوظائف",
  "nav.about": "من نحن",
  "nav.contact": "اتصل بنا",
  "nav.signin": "تسجيل الدخول",
  "nav.join_waitlist": "انضم لقائمة الانتظار",
  "nav.open_menu": "فتح القائمة",
  "nav.close_menu": "إغلاق القائمة",
  "nav.language": "اللغة",

  // Footer
  "footer.tagline": "محفظة الإمارات الفاخرة — مدفوعات، عملات رقمية، ذهب، وبيلي مساعدك المالي بالذكاء الاصطناعي. صُممت في دبي.",
  "footer.newsletter_placeholder": "بريدك للنشرة الإخبارية",
  "footer.subscribe": "اشترك",
  "footer.product": "المنتج",
  "footer.company": "الشركة",
  "footer.legal": "القانونية",
  "footer.privacy": "الخصوصية",
  "footer.terms": "الشروط",
  "footer.compliance": "الامتثال",
  "footer.waitlist": "قائمة الانتظار",
  "footer.copyright": "© {year} شوهو باي. متوافقة مع إرشادات مصرف الإمارات المركزي · مسجلة في مركز دبي المالي العالمي.",
};

const DICTS: Record<Lang, Dict> = { en, ar };

/* ===================== CONTEXT ===================== */
type Ctx = {
  lang: Lang;
  dir: "ltr" | "rtl";
  setLang: (l: Lang) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
  hasChosen: boolean;
  /** Re-open the language selector (clears the flag and shows splash). */
  reopenSplash: () => void;
};

const I18nContext = createContext<Ctx | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === "ar" || saved === "en" ? saved : "en";
  });
  const [hasChosen, setHasChosen] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    return window.localStorage.getItem(STORAGE_KEY) !== null;
  });

  const dir: "ltr" | "rtl" = lang === "ar" ? "rtl" : "ltr";

  // Apply to <html> + <body>
  useEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = dir;
    document.body.classList.toggle("theme-ar", lang === "ar");
    document.body.classList.toggle("theme-en", lang === "en");
  }, [lang, dir]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    setHasChosen(true);
    try { window.localStorage.setItem(STORAGE_KEY, l); } catch {}
  }, []);

  const reopenSplash = useCallback(() => {
    try { window.localStorage.removeItem(STORAGE_KEY); } catch {}
    setHasChosen(false);
  }, []);

  const t = useCallback((key: string, vars?: Record<string, string | number>) => {
    const dict = DICTS[lang] || en;
    let raw = dict[key] ?? en[key] ?? key;
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        raw = raw.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
      }
    }
    return raw;
  }, [lang]);

  return (
    <I18nContext.Provider value={{ lang, dir, setLang, t, hasChosen, reopenSplash }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within <LanguageProvider>");
  return ctx;
};
