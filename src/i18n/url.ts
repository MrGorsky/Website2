import { site } from '../data/site';

// Where this build is served: SITE_URL and BASE_PATH in astro.config (set by the deploy workflow).
// Kept apart from routes.ts because astro.config imports that file, where import.meta.env is not set.
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
const origin = new URL(import.meta.env.SITE).origin;

/** True only for the build served at the real domain; every other build is a noindex test copy. */
export const isProduction = origin === site.url;

/** Link to a route path ('/en/…') under the base path. */
export const href = (path: string) => base + path;

/** Absolute URL of a route path. */
export const abs = (path: string) => origin + href(path);

/** Absolute URL of a built asset; its src already includes the base path. */
export const absAsset = (src: string) => new URL(src, origin).href;
