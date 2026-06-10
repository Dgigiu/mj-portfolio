// Base path normalized to a guaranteed single trailing slash,
// e.g. "/mj-portfolio/" on the staging deploy. Collapses to "/" once
// the custom domain removes `base` from astro.config.mjs.
export const base = import.meta.env.BASE_URL.replace(/\/$/, "") + "/";
