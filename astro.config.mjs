import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import { routes } from './src/i18n/routes.ts';

// hreflang alternates for the sitemap: FR/EN slugs differ, so pair them from the route map.
const pairs = Object.values(routes).map((r) => [r.fr, r.en]);
// The deploy workflow sets these from the Pages settings: the custom domain at the root, or
// <user>.github.io/<repo> before the domain is switched. Local builds default to the real domain.
const site = process.env.SITE_URL || 'https://hamelphoto.com';
const base = process.env.BASE_PATH || '/';
const prefix = site + base.replace(/\/$/, '');

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/og/') && !page.endsWith('/404/'),
      serialize(item) {
        const path = new URL(item.url).pathname.slice(prefix.length - site.length);
        const pair = pairs.find((p) => p.includes(path));
        if (pair) {
          item.links = [
            { lang: 'fr-CA', url: prefix + pair[0] },
            { lang: 'en-CA', url: prefix + pair[1] },
            { lang: 'x-default', url: prefix + pair[0] },
          ];
        }
        return item;
      },
    }),
  ],
});
