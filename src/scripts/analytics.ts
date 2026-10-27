// Law 25 / Consent Mode v2 (basic mode): no Google or Meta script is requested
// until the visitor clicks Accept. Rejecting is one click, same as accepting.
import { site } from '../data/site';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & { queue?: unknown[]; callMethod?: (...args: unknown[]) => void };
    _fbq?: unknown;
  }
}

type Choice = 'granted' | 'denied';
const KEY = 'hp-consent';
const id = (v: string) => (v.startsWith('[') ? '' : v);
const { ga4, ads, adsLabelPhone, adsLabelEmail, metaPixel } = site.analytics;
const GA4 = id(ga4);
const ADS = id(ads);
const PIXEL = id(metaPixel);
const banner = document.getElementById('consent');
let loaded = false;

const read = () => {
  try {
    return localStorage.getItem(KEY) as Choice | null;
  } catch {
    return null;
  }
};
const write = (v: Choice) => {
  try {
    localStorage.setItem(KEY, v);
  } catch {}
};

function addScript(src: string) {
  const s = document.createElement('script');
  s.async = true;
  s.src = src;
  document.head.append(s);
}

function load() {
  if (loaded) return;
  loaded = true;
  if (GA4 || ADS) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      // gtag requires the arguments object, not an array
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
    gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' });
    gtag('consent', 'update', { ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted', analytics_storage: 'granted' });
    gtag('js', new Date());
    if (GA4) gtag('config', GA4);
    if (ADS) gtag('config', ADS);
    addScript(`https://www.googletagmanager.com/gtag/js?id=${GA4 || ADS}`);
  }
  if (PIXEL) {
    const fbq: Window['fbq'] = Object.assign(
      (...args: unknown[]) => (fbq!.callMethod ? fbq!.callMethod(...args) : fbq!.queue!.push(args)),
      { queue: [] as unknown[] },
    );
    Object.assign(fbq, { push: fbq, loaded: true, version: '2.0' });
    window.fbq = window._fbq = fbq;
    fbq('init', PIXEL);
    fbq('track', 'PageView');
    addScript('https://connect.facebook.net/en_US/fbevents.js');
  }
}

function revoke() {
  if (!loaded) return;
  if (window.gtag) gtag('consent', 'update', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' });
  window.fbq?.('consent', 'revoke');
}

function decide(choice: Choice) {
  write(choice);
  if (banner) banner.hidden = true;
  if (choice === 'granted') load();
  else revoke();
}

const stored = read();
if (stored === 'granted') load();
else if (!stored && banner) banner.hidden = false;

document.addEventListener('click', (e) => {
  const el = (e.target as Element).closest<HTMLElement>('[data-consent], [data-consent-open], a[href^="tel:"], a[href^="mailto:"]');
  if (!el) return;
  if (el.dataset.consent) return decide(el.dataset.consent as Choice);
  if (el.hasAttribute('data-consent-open')) {
    if (banner) banner.hidden = false;
    banner?.querySelector('button')?.focus();
    return;
  }
  if (!loaded) return;
  // One event name per contact type and page, so each can be marked as its own conversion.
  const kind = el.getAttribute('href')!.startsWith('tel:') ? 'phone' : 'email';
  const page = document.body.dataset.page;
  if (window.gtag) {
    gtag('event', `${kind}_click_${page}`, { contact_type: kind, page_service: page });
    const label = id(kind === 'phone' ? adsLabelPhone : adsLabelEmail);
    if (ADS && label) gtag('event', 'conversion', { send_to: `${ADS}/${label}` });
  }
  window.fbq?.('track', 'Contact', { content_category: page });
});

function gtag(...args: unknown[]) {
  window.gtag(...args);
}
