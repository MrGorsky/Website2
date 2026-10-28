// Post-build sanity check: one H1, canonical, hreflang, OG tags, JSON-LD and internal links on every page.
// Usage: npm run build && node scripts/check-seo.mjs (with the same SITE_URL / BASE_PATH as the build)
import { readFileSync, existsSync, globSync } from 'node:fs';

const site = process.env.SITE_URL || 'https://hamelphoto.com';
const base = (process.env.BASE_PATH || '/').replace(/\/$/, '');
const production = site === 'https://hamelphoto.com';

const files = globSync('dist/**/index.html');
let problems = 0;
const bad = (f, m) => { problems++; console.log('✗', f, m); };
for (const f of files) {
  const h = readFileSync(f, 'utf8');
  const path = f.replaceAll(String.fromCharCode(92), '/').replace('dist', '').replace('index.html', '');
  const get = (re) => (h.match(re) || [])[1];
  if ((h.match(/<h1[ >]/g) || []).length !== 1) bad(path, 'h1 count');
  const canon = get(/rel="canonical" href="([^"]+)"/);
  if (canon !== site + base + path) bad(path, 'canonical ' + canon);
  if (production === h.includes('<meta name="robots" content="noindex">')) bad(path, production ? 'noindex on the real domain' : 'test copy missing noindex');
  const hl = [...h.matchAll(/hreflang="([^"]+)" href="([^"]+)"/g)];
  if (hl.length !== 3 || !hl.some(([, l, u]) => u === canon)) bad(path, 'hreflang');
  for (const [, , u] of hl) if (!existsSync('dist' + new URL(u).pathname.slice(base.length) + 'index.html')) bad(path, 'hreflang target missing ' + u);
  const lang = get(/<html lang="([^"]+)"/);
  if (lang !== (path.startsWith('/en/') ? 'en-CA' : 'fr-CA')) bad(path, 'lang ' + lang);
  for (const m of ['og:title', 'og:description', 'og:image', 'og:url', 'twitter:card']) if (!h.includes(m)) bad(path, 'missing ' + m);
  const ld = JSON.parse(get(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/));
  const types = ld['@graph'].map((n) => n['@type']);
  const biz = ld['@graph'].find((n) => n['@type'] === 'ProfessionalService');
  for (const k of ['name', 'url', 'logo', 'image', 'telephone', 'email', 'founder', 'foundingDate', 'areaServed', 'priceRange']) if (!biz[k]) bad(path, 'business missing ' + k);
  if (biz.address) bad(path, 'business has address');
  const isService = /evenementiel|corporatifs|photographie-corporative|event-photography|corporate-headshots|corporate-photography/.test(path);
  if (isService && !(types.includes('Service') && types.includes('ImageGallery'))) bad(path, 'service schema missing');
  if (isService) for (const img of ld['@graph'].find((n) => n['@type'] === 'ImageGallery').image)
    if (!existsSync('dist' + new URL(img.contentUrl).pathname.slice(base.length))) bad(path, 'ImageObject file missing');
  for (const [, href] of h.matchAll(/href="(\/[^"#]*)"/g)) {
    if (!href.startsWith(base + '/')) { bad(path, 'link outside base path ' + href); continue; }
    const p = 'dist' + href.slice(base.length);
    if (!existsSync(p) && !existsSync(p + 'index.html')) bad(path, 'broken link ' + href);
  }
  const imgs = [...h.matchAll(/<img [^>]*>/g)].map((m) => m[0]);
  if (imgs.some((i) => !/ alt="[^"]+"/.test(i) && !i.includes('alt=""'))) bad(path, 'img without alt');
  if (imgs.some((i) => i.includes('/_astro/') && !/width="\d+"/.test(i))) bad(path, 'img without width');
  console.log('✓', path.padEnd(32), types.join(','), `title ${get(/<title>([^<]*)/).length}`);
}
console.log(problems ? `${problems} problems` : 'all checks passed');
