export type Lang = 'fr' | 'en';
export type PageKey = 'home' | 'event' | 'headshot' | 'workplace' | 'realestate' | 'privacy';
export type Service = 'event' | 'headshot' | 'workplace' | 'realestate';

export const services: Service[] = ['event', 'headshot', 'workplace', 'realestate'];

export const routes: Record<PageKey, Record<Lang, string>> = {
  home: { fr: '/', en: '/en/' },
  event: { fr: '/photographe-evenementiel/', en: '/en/event-photography/' },
  headshot: { fr: '/portraits-corporatifs/', en: '/en/corporate-headshots/' },
  workplace: { fr: '/photographie-corporative/', en: '/en/corporate-photography/' },
  realestate: { fr: '/photographie-immobiliere/', en: '/en/real-estate-photography/' },
  privacy: { fr: '/confidentialite/', en: '/en/privacy/' },
};

export const htmlLang: Record<Lang, string> = { fr: 'fr-CA', en: 'en-CA' };
