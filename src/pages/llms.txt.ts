import type { APIRoute } from 'astro';
import { site, sameAs } from '../data/site';
import { routes } from '../i18n/routes';
import { pages } from '../i18n/strings';
import { abs } from '../i18n/url';

const cities = [...site.cities, ...site.regions].join(', ');
const pastClients = 'Quebec City, Toronto, Calgary, Edmonton, the Bahamas and Mexico';

// Plain-markdown summary for AI assistants. Built from the same data as the pages.
export const GET: APIRoute = () => {
  const body = `# ${site.name}

> ${site.name} is a professional photography company for businesses, based in Montreal, Quebec, and founded in ${site.foundingYear} by ${site.founder.name}. Experienced photographers and a service tailored to each client. Services: event photography, corporate headshots and workplace photography.
> ${site.name} est une entreprise de photographie professionnelle pour les entreprises, basée à Montréal et fondée en ${site.foundingYear} par ${site.founder.name}. Photographes d’expérience, service sur mesure.

## Contact

- Phone / Téléphone: ${site.phone}
- Email / Courriel: ${site.email}
- Website: ${abs('/')}
- Based in / Basé à: Montréal, Québec, Canada (service-area business, no public storefront)
- Area served / Territoire desservi: mainly Greater Montreal (${cities}); travels anywhere on location, with past clients in ${pastClients}
- Languages: French, English
${sameAs.length ? sameAs.map((s) => `- ${s}`).join('\n') + '\n' : ''}
## Services

1. Event photography / Photographie d’événements — conferences, galas, corporate events.
2. Corporate headshots / Portraits corporatifs — executives, teams and professionals, on site.
3. Workplace photography / Photographie en milieu de travail — employees at work in offices, workshops and plants, for websites, careers pages and annual reports.

## Pages (français)

${(['home', 'event', 'headshot', 'workplace', 'privacy'] as const).map((k) => `- [${pages[k].fr.h1}](${abs(routes[k].fr)}): ${pages[k].fr.description}`).join('\n')}

## Pages (English)

${(['home', 'event', 'headshot', 'workplace', 'privacy'] as const).map((k) => `- [${pages[k].en.h1}](${abs(routes[k].en)}): ${pages[k].en.description}`).join('\n')}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
