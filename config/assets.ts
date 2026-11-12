/**
 * External asset URLs for the public site.
 * Swap any value for a local file later without editing components.
 *
 * Fonts, Lordicon, and its JSON are loaded through /hosted so relative
 * font files resolve on this origin. metatest.app does not send CORS
 * headers, which blocks those fetches from any other origin.
 * Images stay on the absolute host; <img> does not need CORS.
 */
export const assetOrigin = "https://metatest.app";
const hosted = "/hosted";

export const assets = {
  fontStylesheet: `${hosted}/app/assets/font.css`,
  logo: `${assetOrigin}/logo.png`,
  enamad: `${assetOrigin}/enamad.svg`,
  /** Returns 404 on the current host. The badge falls back to its label. */
  samandehi: `${assetOrigin}/samandehi.png`,
  /**
   * Hosted Ace mark found at this path. Replace with "/ace-logo.png"
   * after the local file is added to /public.
   */
  aceLogo: `${assetOrigin}/Ace_logo.png`,
  lordicon: `${hosted}/lordicon.js`,
  favicon16: `${assetOrigin}/app/favicon-16x16.png`,
  favicon32: `${assetOrigin}/app/favicon-32x32.png`,
  favicon48: `${assetOrigin}/app/favicon-48x48.png`,
  lordicons: {
    puzzle: `${hosted}/doodle-motif-10-puzzle-in-reveal.json`,
    growth: `${hosted}/doodle-motif-316-growth-in-reveal.json`,
    cloudUser: `${hosted}/doodle-motif-709-cloud-user-in-reveal.json`,
  },
  /** Motif book, recolored to the same white and purple as the home Lordicons. */
  bookIcon: "/icons/book.svg",
  /** Decorative study plates used only when an article has no cover photograph. */
  studyPlates: ["/blog/desk-pencils.jpg", "/blog/desk-orb.jpg", "/blog/desk-chart.jpg", "/blog/desk-lamp.jpg"],
} as const;

/** Phone screen image. Null keeps the empty slot. Cover-fit, never stretched. */
export const phoneScreen: string | null = null;
