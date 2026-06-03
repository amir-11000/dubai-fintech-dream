// Lightweight analytics shim. Wire real GA4 / Meta Pixel keys when ready.
type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export const track = (event: string, params: Params = {}) => {
  try {
    window.gtag?.("event", event, params);
    if (event === "waitlist_signup") {
      window.fbq?.("track", "Lead", { content_name: "waitlist", currency: "AED" });
    }
    // dev visibility
    if (import.meta.env.DEV) console.info("[track]", event, params);
  } catch {
    /* noop */
  }
};
