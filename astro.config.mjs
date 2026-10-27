import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import { routes } from './src/i18n/routes.ts';

// hreflang alternates for the sitemap: FR/EN slugs differ, so pair them from the route map.
const pairs = Object.values(routes).map((r) => [r.fr, r.en]);
const site = 'https://hamelphoto.com';

export default defineConfig({
  site,
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
        const path = new URL(item.url).pathname;
        const pair = pairs.find((p) => p.includes(path));
        if (pair) {
          item.links = [
            { lang: 'fr-CA', url: site + pair[0] },
            { lang: 'en-CA', url: site + pair[1] },
            { lang: 'x-default', url: site + pair[0] },
          ];
        }
        return item;
      },
    }),
  ],
});
