// Generates neutral placeholder photos + images.json until the real photos arrive.
// Usage: npm run placeholders   (overwrites src/assets/photos/placeholder-* and src/data/images.json)
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';

const sets = {
  event: {
    tone: ['#3b3f4a', '#8a7f72'],
    items: [
      ['evenement-gala-chambre-commerce-montreal', 3 / 2, 'Gala annuel de la Chambre de commerce, Montréal', 'Annual Chamber of Commerce gala, Montreal', 'Montréal', true],
      ['evenement-conference-conferenciere-scene-montreal', 2 / 3, 'Conférencière sur scène lors d’un congrès, Montréal', 'Keynote speaker on stage at a convention, Montreal', 'Montréal', false],
      ['evenement-cocktail-reseautage-laval', 3 / 2, 'Cocktail de réseautage d’entreprise, Laval', 'Corporate networking cocktail, Laval', 'Laval', false],
      ['evenement-remise-prix-gala-longueuil', 4 / 5, 'Remise de prix lors d’un gala, Longueuil', 'Award presentation at a gala, Longueuil', 'Longueuil', false],
      ['evenement-panel-discussion-congres-montreal', 16 / 9, 'Panel de discussion lors d’un congrès, Montréal', 'Panel discussion at a conference, Montreal', 'Montréal', false],
      ['evenement-party-bureau-fin-annee-montreal', 3 / 2, 'Party de bureau de fin d’année, Montréal', 'Year-end office party, Montreal', 'Montréal', false],
    ],
  },
  headshot: {
    tone: ['#5a5550', '#c9c2b8'],
    items: [
      ['portrait-corporatif-avocate-bureau-montreal', 4 / 5, 'Portrait corporatif d’une avocate dans ses bureaux, Montréal', 'Corporate headshot of a lawyer at her office, Montreal', 'Montréal', true],
      ['portrait-corporatif-dirigeant-fond-gris-montreal', 4 / 5, 'Portrait de dirigeant sur fond gris, Montréal', 'Executive headshot on grey backdrop, Montreal', 'Montréal', false],
      ['portrait-corporatif-equipe-direction-laval', 3 / 2, 'Photo d’équipe de direction, Laval', 'Leadership team photo, Laval', 'Laval', false],
      ['portrait-corporatif-ingenieur-lumiere-naturelle-longueuil', 2 / 3, 'Portrait d’un ingénieur en lumière naturelle, Longueuil', 'Engineer portrait in natural light, Longueuil', 'Longueuil', false],
      ['portrait-corporatif-courtier-immobilier-rive-sud', 4 / 5, 'Portrait d’une courtière immobilière, Rive-Sud', 'Real estate broker headshot, South Shore', 'Rive-Sud', false],
      ['portrait-corporatif-medecin-clinique-montreal', 4 / 5, 'Portrait d’un médecin en clinique, Montréal', 'Physician headshot at a clinic, Montreal', 'Montréal', false],
    ],
  },
  realestate: {
    tone: ['#6b6457', '#d8d2c4'],
    items: [
      ['photographie-immobiliere-condo-salon-laval', 3 / 2, 'Salon lumineux d’un condo, Laval', 'Bright condo living room, Laval', 'Laval', true],
      ['photographie-immobiliere-cuisine-maison-rive-nord', 3 / 2, 'Cuisine d’une maison unifamiliale, Rive-Nord', 'Single-family home kitchen, North Shore', 'Rive-Nord', false],
      ['photographie-immobiliere-facade-plex-montreal', 4 / 5, 'Façade d’un plex, Montréal', 'Plex façade, Montreal', 'Montréal', false],
      ['photographie-immobiliere-chambre-principale-longueuil', 3 / 2, 'Chambre principale, Longueuil', 'Primary bedroom, Longueuil', 'Longueuil', false],
      ['photographie-immobiliere-bureaux-commerciaux-montreal', 16 / 9, 'Bureaux commerciaux à aire ouverte, Montréal', 'Open-plan commercial offices, Montreal', 'Montréal', false],
      ['photographie-immobiliere-salle-de-bain-rive-sud', 2 / 3, 'Salle de bain rénovée, Rive-Sud', 'Renovated bathroom, South Shore', 'Rive-Sud', false],
    ],
  },
};

const entries = [];
for (const [service, { tone, items }] of Object.entries(sets)) {
  for (const [slug, ratio, fr, en, location, featured] of items) {
    const file = `placeholder-${slug}-01.jpg`;
    const w = ratio >= 1 ? 2400 : Math.round(2400 * ratio);
    const h = Math.round(w / ratio);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
      <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${tone[0]}"/><stop offset="1" stop-color="${tone[1]}"/></linearGradient></defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
      <text x="50%" y="50%" fill="#fff" fill-opacity=".55" font-family="Arial" font-size="${Math.round(w / 22)}" text-anchor="middle">${en.replace(/’/g, "'")}</text>
    </svg>`;
    await sharp(Buffer.from(svg)).jpeg({ quality: 82 }).toFile(`src/assets/photos/${file}`);
    entries.push({ file, service, caption_fr: fr, caption_en: en, location, featured });
  }
}
await writeFile('src/data/images.json', JSON.stringify(entries, null, 2) + '\n');
console.log(`${entries.length} placeholders written`);
