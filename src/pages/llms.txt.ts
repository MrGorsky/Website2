import type { APIRoute } from 'astro';
import { site, sameAs } from '../data/site';
import { routes } from '../i18n/routes';
import { pages } from '../i18n/strings';

const url = (path: string) => new URL(path, site.url).href;
const cities = site.cities.join(', ');

// Plain-markdown summary for AI assistants. Built from the same data as the pages.
export const GET: APIRoute = () => {
  const body = `# ${site.name}

> ${site.name} is a professional photography company for businesses in Greater Montreal, Quebec, founded in ${site.foundingYear} by ${site.founder.name}. Services: event photography, corporate headshots and workplace photography.
> ${site.name} est une entreprise de photographie professionnelle pour les entreprises du Grand Montréal, fondée en ${site.foundingYear} par ${site.founder.name}.

## Contact

- Phone / Téléphone: ${site.phone}
- Email / Courriel: ${site.email}
- Website: ${site.url}/
- Area served / Territoire desservi: ${cities} (service-area business, no public storefront)
- Languages: French, English
${sameAs.length ? sameAs.map((s) => `- ${s}`).join('\n') + '\n' : ''}
## Services

1. Event photography / Photographie d’événements — conferences, galas, corporate events.
2. Corporate headshots / Portraits corporatifs — executives, teams and professionals, on site.
3. Workplace photography / Photographie corporative en milieu de travail — employees at work in offices, workshops and plants, for websites, careers pages and annual reports.

## Pages (français)

${(['home', 'event', 'headshot', 'workplace', 'privacy'] as const).map((k) => `- [${pages[k].fr.h1}](${url(routes[k].fr)}): ${pages[k].fr.description}`).join('\n')}

## Pages (English)

${(['home', 'event', 'headshot', 'workplace', 'privacy'] as const).map((k) => `- [${pages[k].en.h1}](${url(routes[k].en)}): ${pages[k].en.description}`).join('\n')}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
