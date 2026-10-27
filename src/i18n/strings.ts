import type { Lang, PageKey } from './routes';

type PageText = { title: string; description: string; h1: string; intro?: string; crumb: string };

// Titles < 60 chars, descriptions < 155 chars. Checked by the build (see Base.astro).
export const pages: Record<PageKey, Record<Lang, PageText>> = {
  home: {
    fr: {
      title: 'Photographe corporatif à Montréal | Hamel Photo',
      description:
        'Photographe d’événements, de portraits corporatifs et d’immobilier dans le Grand Montréal depuis 2012. Appelez au 514 802-6778.',
      h1: 'Photographe d’événements, portraits corporatifs et immobilier — Grand Montréal',
      crumb: 'Accueil',
    },
    en: {
      title: 'Corporate Photographer in Montreal | Hamel Photo',
      description:
        'Event, corporate headshot and real estate photographer serving Greater Montreal since 2012. Call 514 802-6778.',
      h1: 'Event, corporate headshot and real estate photographer — Greater Montreal',
      crumb: 'Home',
    },
  },
  event: {
    fr: {
      title: 'Photographe d’événements à Montréal | Hamel Photo',
      description:
        'Couverture photo de conférences, galas et événements d’entreprise à Montréal, Laval et sur la Rive-Sud. Livraison rapide. 514 802-6778.',
      h1: 'Photographe d’événements à Montréal',
      intro:
        'Couverture photo de conférences, galas et événements d’entreprise à Montréal, Laval et sur la Rive-Sud. Livraison rapide.',
      crumb: 'Photographe d’événements',
    },
    en: {
      title: 'Event Photography in Montreal | Hamel Photo',
      description:
        'Photo coverage of conferences, galas and corporate events in Montreal, Laval and the South Shore. Fast delivery. Call 514 802-6778.',
      h1: 'Event photographer in Montreal',
      intro:
        'Photo coverage of conferences, galas and corporate events in Montreal, Laval and the South Shore. Fast delivery.',
      crumb: 'Event photography',
    },
  },
  headshot: {
    fr: {
      title: 'Portraits corporatifs à Montréal | Hamel Photo',
      description:
        'Portraits corporatifs pour dirigeants, équipes et professionnels, réalisés à vos bureaux dans le Grand Montréal. 514 802-6778.',
      h1: 'Portraits corporatifs à Montréal',
      intro:
        'Portraits pour dirigeants, équipes et professionnels, réalisés à vos bureaux à Montréal, Laval ou Longueuil.',
      crumb: 'Portraits corporatifs',
    },
    en: {
      title: 'Corporate Headshots in Montreal | Hamel Photo',
      description:
        'Corporate headshots for executives, teams and professionals, taken at your office across Greater Montreal. Call 514 802-6778.',
      h1: 'Corporate headshots in Montreal',
      intro:
        'Headshots for executives, teams and professionals, taken at your office in Montreal, Laval or Longueuil.',
      crumb: 'Corporate headshots',
    },
  },
  realestate: {
    fr: {
      title: 'Photographie immobilière à Montréal | Hamel Photo',
      description:
        'Photos immobilières de condos, maisons, plex et espaces commerciaux pour courtiers et promoteurs du Grand Montréal. 514 802-6778.',
      h1: 'Photographe immobilier à Montréal',
      intro:
        'Photos de condos, maisons, plex et espaces commerciaux pour courtiers et promoteurs, à Montréal, sur la Rive-Nord et la Rive-Sud.',
      crumb: 'Photographie immobilière',
    },
    en: {
      title: 'Real Estate Photography in Montreal | Hamel Photo',
      description:
        'Real estate photos of condos, houses, plexes and commercial spaces for brokers and developers in Greater Montreal. Call 514 802-6778.',
      h1: 'Real estate photographer in Montreal',
      intro:
        'Photos of condos, houses, plexes and commercial spaces for brokers and developers in Montreal, the North Shore and the South Shore.',
      crumb: 'Real estate photography',
    },
  },
  privacy: {
    fr: {
      title: 'Politique de confidentialité | Hamel Photo',
      description:
        'Renseignements personnels recueillis par hamelphoto.com, leur utilisation, les témoins et la personne responsable.',
      h1: 'Politique de confidentialité',
      crumb: 'Confidentialité',
    },
    en: {
      title: 'Privacy Policy | Hamel Photo',
      description:
        'Personal information collected by hamelphoto.com, how it is used, cookies, and the person in charge of personal information.',
      h1: 'Privacy policy',
      crumb: 'Privacy',
    },
  },
};

export const ui = {
  fr: {
    filterLabel: 'Filtrer les photos par service',
    chips: { home: 'Tout', event: 'Événements', headshot: 'Portraits corporatifs', realestate: 'Immobilier' },
    langSwitchLabel: 'Langue',
    serving: 'Desservant le Grand Montréal : Montréal, Laval, Longueuil, Rive-Sud, Rive-Nord',
    privacy: 'Confidentialité',
    cookies: 'Préférences de témoins',
    callLabel: 'Appeler Hamel Photo au',
    emailLabel: 'Écrire à Hamel Photo à',
    lightbox: { close: 'Fermer', prev: 'Photo précédente', next: 'Photo suivante', label: 'Visionneuse de photos' },
    consent: {
      text: 'Nous utilisons des témoins de mesure d’audience et de publicité seulement avec votre accord.',
      accept: 'Accepter',
      reject: 'Refuser',
      more: 'En savoir plus',
    },
  },
  en: {
    filterLabel: 'Filter photos by service',
    chips: { home: 'All', event: 'Events', headshot: 'Corporate headshots', realestate: 'Real estate' },
    langSwitchLabel: 'Language',
    serving: 'Serving Greater Montreal: Montréal, Laval, Longueuil, Rive-Sud, Rive-Nord',
    privacy: 'Privacy',
    cookies: 'Cookie preferences',
    callLabel: 'Call Hamel Photo at',
    emailLabel: 'Email Hamel Photo at',
    lightbox: { close: 'Close', prev: 'Previous photo', next: 'Next photo', label: 'Photo viewer' },
    consent: {
      text: 'We use analytics and advertising cookies only with your consent.',
      accept: 'Accept',
      reject: 'Reject',
      more: 'Learn more',
    },
  },
} as const;
