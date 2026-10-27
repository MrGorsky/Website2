export type Lang = 'fr' | 'en';
export type PageKey = 'home' | 'event' | 'headshot' | 'workplace' | 'privacy';
export type Service = 'event' | 'headshot' | 'workplace';

export const services: Service[] = ['event', 'headshot', 'workplace'];

export const routes: Record<PageKey, Record<Lang, string>> = {
  home: { fr: '/', en: '/en/' },
  event: { fr: '/photographe-evenementiel/', en: '/en/event-photography/' },
  headshot: { fr: '/portraits-corporatifs/', en: '/en/corporate-headshots/' },
  workplace: { fr: '/photographie-corporative/', en: '/en/corporate-photography/' },
  privacy: { fr: '/confidentialite/', en: '/en/privacy/' },
};

export const htmlLang: Record<Lang, string> = { fr: 'fr-CA', en: 'en-CA' };
