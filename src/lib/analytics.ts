// Umami Cloud, cookieless and aggregate only. The website ID is public by
// design (it ships in every page), so it lives here rather than in an env var.
// Leave it empty to render no tracker at all.
export const UMAMI_SCRIPT_SRC = "https://cloud.umami.is/script.js";
export const UMAMI_WEBSITE_ID: string = "ae146c72-268d-4d4d-bf06-6d3f721cff60";
// The tracker ignores any other host, so `npm run preview` on localhost
// never reaches the dashboard even though it serves a production build.
export const UMAMI_DOMAINS = "migueljss.com";

type UmamiData = Record<string, string | number>;

interface Umami {
  track: (name: string, data?: UmamiData) => void;
  identify: (data: UmamiData) => void;
}

declare global {
  interface Window {
    umami?: Umami;
  }
}

// The tracker is a deferred third-party script that may never arrive (dev
// builds, ad blockers), so every call is a quiet no-op without it.
function whenReady(fn: (umami: Umami) => void) {
  if (window.umami) return fn(window.umami);
  window.addEventListener("load", () => window.umami && fn(window.umami), { once: true });
}

export function track(name: string, data?: UmamiData) {
  whenReady((umami) => umami.track(name, data));
}

// Tags the session with the `?ref=` from an application link (e.g.
// migueljss.com/?ref=acme) so every page in that visit can be filtered by it.
// Company-level tags only, never a person's name.
export function tagReferral() {
  const ref = new URLSearchParams(window.location.search).get("ref");
  if (ref && /^[\w-]{1,40}$/.test(ref)) {
    whenReady((umami) => umami.identify({ ref: ref.toLowerCase() }));
  }
}
