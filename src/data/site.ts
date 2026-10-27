// Single source of truth for business facts. Name, phone and email must stay
// character-for-character identical to the Google Business Profile and socials.
export const site = {
  name: 'Hamel Photo',
  url: 'https://hamelphoto.com',
  phone: '+1 (514) 802-6778',
  phoneDisplay: '514 802-6778',
  phoneHref: 'tel:+15148026778',
  email: 'info@hamelphoto.com',
  foundingYear: 2012,
  founder: {
    name: 'Jo Hamel',
    jobTitle: { fr: 'Fondateur et directeur de création', en: 'Founder & Creative Director' },
  },
  cities: ['Montréal', 'Laval', 'Longueuil', 'Rive-Sud', 'Rive-Nord'],
  // TODO: replace with the real profile URLs. Empty strings are skipped everywhere.
  socials: {
    instagram: 'https://www.instagram.com/',
    linkedin: 'https://www.linkedin.com/',
  },
  googleBusinessProfile: '',
  // Placeholders: any value still in [brackets] is treated as "not configured" and never loaded.
  analytics: {
    ga4: '[GA4_ID]',
    ads: '[ADS_ID]',
    adsLabelPhone: '[ADS_LABEL_PHONE]',
    adsLabelEmail: '[ADS_LABEL_EMAIL]',
    metaPixel: '[META_PIXEL_ID]',
  },
} as const;

export const sameAs = [...Object.values(site.socials), site.googleBusinessProfile].filter(Boolean);
