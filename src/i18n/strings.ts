import type { Lang, PageKey } from './routes';

type PageText = { title: string; description: string; h1: string; intro?: string; crumb: string };

// Titles < 60 chars, descriptions < 155 chars. Checked by the build (see Base.astro).
export const pages: Record<PageKey, Record<Lang, PageText>> = {
  home: {
    fr: {
      title: 'Photographe corporatif à Montréal | Hamel Photo',
      description:
        'Photographes d’expérience à Montréal depuis 2012 : événements, portraits corporatifs, milieux de travail et immobilier, partout où vous êtes. 514 802-6778.',
      h1: 'Photographe corporatif à Montréal : événements, portraits, milieu de travail et immobilier',
      intro: 'Des photographes d’expérience et un service sur mesure, à Montréal et partout où vous êtes.',
      crumb: 'Accueil',
    },
    en: {
      title: 'Corporate Photographer in Montreal | Hamel Photo',
      description:
        'Experienced Montreal photographers since 2012: events, corporate headshots, workplace and real estate photography, wherever you are. Call 514 802-6778.',
      h1: 'Corporate photographer in Montreal: events, headshots, workplace and real estate',
      intro: 'Experienced photographers and a service tailored to you, in Montreal and wherever you are.',
      crumb: 'Home',
    },
  },
  event: {
    fr: {
      title: 'Photographe d’événements à Montréal | Hamel Photo',
      description:
        'Couverture photo de conférences, galas et événements d’entreprise, à Montréal et partout où vous êtes. Livraison rapide. 514 802-6778.',
      h1: 'Photographe d’événements à Montréal',
      intro:
        'Des photographes d’expérience pour vos conférences, galas et événements d’entreprise, à Montréal, dans les environs ou ailleurs. Livraison rapide.',
      crumb: 'Photographe d’événements',
    },
    en: {
      title: 'Event Photography in Montreal | Hamel Photo',
      description:
        'Photo coverage of conferences, galas and corporate events in Montreal and wherever you are. Fast delivery. Call 514 802-6778.',
      h1: 'Event photographer in Montreal',
      intro:
        'Experienced photographers for your conferences, galas and corporate events, in Montreal, the surrounding area or beyond. Fast delivery.',
      crumb: 'Event photography',
    },
  },
  headshot: {
    fr: {
      title: 'Portraits corporatifs à Montréal | Hamel Photo',
      description:
        'Portraits corporatifs pour dirigeants, équipes et professionnels, réalisés à vos bureaux, à Montréal et partout où vous êtes. 514 802-6778.',
      h1: 'Portraits corporatifs à Montréal',
      intro:
        'Portraits pour dirigeants, équipes et professionnels, réalisés à vos bureaux, à Montréal, dans les environs ou ailleurs.',
      crumb: 'Portraits corporatifs',
    },
    en: {
      title: 'Corporate Headshots in Montreal | Hamel Photo',
      description:
        'Corporate headshots for executives, teams and professionals, taken at your office in Montreal and wherever you are. Call 514 802-6778.',
      h1: 'Corporate headshots in Montreal',
      intro:
        'Headshots for executives, teams and professionals, taken at your office in Montreal, the surrounding area or beyond.',
      crumb: 'Corporate headshots',
    },
  },
  workplace: {
    fr: {
      title: 'Photographie en milieu de travail à Montréal | Hamel Photo',
      description:
        'Photos de vos employés au travail, au bureau comme à l’usine, pour votre site Web, vos offres d’emploi et vos rapports. 514 802-6778.',
      h1: 'Photographie en milieu de travail à Montréal',
      intro:
        'Vos employés au travail, au bureau, à l’atelier ou à l’usine, pour votre site Web, vos offres d’emploi et vos rapports annuels. À Montréal, dans les environs ou ailleurs.',
      crumb: 'Milieu de travail',
    },
    en: {
      title: 'Workplace Photography in Montreal | Hamel Photo',
      description:
        'Photos of your people at work, in the office or on the shop floor, for your website, careers page and reports. Call 514 802-6778.',
      h1: 'Workplace photography in Montreal',
      intro:
        'Your people at work, in the office, the workshop or the plant, for your website, careers page and annual reports. In Montreal, the surrounding area or beyond.',
      crumb: 'Workplace photography',
    },
  },
  realestate: {
    fr: {
      title: 'Photographie immobilière à Montréal | Hamel Photo',
      description:
        'Photos d’immeubles, de bureaux et d’espaces commerciaux, au sol et par drone, à Montréal et partout où vous êtes. 514 802-6778.',
      h1: 'Photographie immobilière à Montréal',
      intro:
        'Immeubles de bureaux, tours, espaces commerciaux et plateaux à louer, photographiés au sol et du haut des airs, à Montréal, dans les environs ou ailleurs.',
      crumb: 'Photographie immobilière',
    },
    en: {
      title: 'Real Estate Photography in Montreal | Hamel Photo',
      description:
        'Photos of buildings, offices and commercial spaces, from the ground and by drone, in Montreal and wherever you are. Call 514 802-6778.',
      h1: 'Real estate photography in Montreal',
      intro:
        'Office buildings, towers, commercial spaces and floors for lease, photographed from the ground and from the air, in Montreal, the surrounding area or beyond.',
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
    chips: { home: 'Tout', event: 'Événements', headshot: 'Portraits corporatifs', workplace: 'Milieu de travail', realestate: 'Immobilier' },
    langSwitchLabel: 'Langue',
    serving: 'Basés à Montréal · Grand Montréal et partout où vous êtes',
    privacy: 'Confidentialité',
    cookies: 'Préférences de témoins',
    callLabel: 'Appeler Hamel Photo au',
    emailLabel: 'Écrire à Hamel Photo à',
    quote: {
      label: 'Demander une soumission',
      subject: 'Demande de soumission',
      body: 'Bonjour,\n\nDate :\nLieu :\nType de photos :\n\nMerci !',
    },
    lightbox: { close: 'Fermer', prev: 'Photo précédente', next: 'Photo suivante', label: 'Visionneuse de photos' },
    consent: {
      text: 'Nous utilisons des témoins de mesure d’audience et de publicité seulement avec votre accord.',
      accept: 'Accepter',
      reject: 'Refuser',
      more: 'Politique de confidentialité',
    },
  },
  en: {
    filterLabel: 'Filter photos by service',
    chips: { home: 'All', event: 'Events', headshot: 'Corporate headshots', workplace: 'Workplace', realestate: 'Real estate' },
    langSwitchLabel: 'Language',
    serving: 'Based in Montreal · Greater Montreal and wherever you are',
    privacy: 'Privacy',
    cookies: 'Cookie preferences',
    callLabel: 'Call Hamel Photo at',
    emailLabel: 'Email Hamel Photo at',
    quote: {
      label: 'Request a quote',
      subject: 'Quote request',
      body: 'Hello,\n\nDate:\nPlace:\nType of photos:\n\nThank you!',
    },
    lightbox: { close: 'Close', prev: 'Previous photo', next: 'Next photo', label: 'Photo viewer' },
    consent: {
      text: 'We use analytics and advertising cookies only with your consent.',
      accept: 'Accept',
      reject: 'Reject',
      more: 'Privacy policy',
    },
  },
} as const;
