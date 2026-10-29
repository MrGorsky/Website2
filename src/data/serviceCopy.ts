import { routes, type Lang, type Service } from '../i18n/routes';
import { href } from '../i18n/url';

// Text shown below each service gallery. Answers may hold a link (HTML); the FAQPage schema strips it.
interface Section {
  h2: string;
  paras?: string[];
  steps?: [label: string, text: string][];
  after?: string;
}
interface Copy {
  sections: Section[];
  faqTitle: string;
  faq: { q: string; a: string }[];
}

const link = (service: Service, lang: Lang, text: string) => `<a href="${href(routes[service][lang])}">${text}</a>`;

export const serviceCopy: Record<Service, Record<Lang, Copy>> = {
  event: {
    fr: {
      sections: [
        {
          h2: 'Ce que nous photographions',
          paras: [
            'Conférences, congrès, galas, lancements de produits, assemblées annuelles, fêtes d’entreprise et activités d’équipe. Nous couvrons l’événement au complet : les conférenciers sur scène, la salle, le réseautage, les remises de prix, les commanditaires et les détails de l’aménagement.',
            'Vos photos servent ensuite à vos communications internes, à votre site Web, à vos réseaux sociaux, à votre rapport annuel et à la promotion de votre prochaine édition.',
          ],
        },
        {
          h2: 'Comment ça se passe',
          steps: [
            ['Avant', 'vous nous envoyez l’horaire et la liste des moments et des personnes à ne pas manquer.'],
            ['Pendant', 'nous suivons le déroulement prévu et travaillons avec discrétion, pour ne pas déranger les conférenciers ni les invités.'],
            ['Après', 'vous recevez une sélection de photos retouchées, prêtes pour le Web et l’impression, par lien de téléchargement.'],
          ],
          after:
            'Nous nous déplaçons à Montréal, à Laval, à Longueuil, sur la Rive-Sud et sur la Rive-Nord. Nous allons aussi à l’extérieur du Grand Montréal ; les frais de déplacement sont alors indiqués dans la soumission.',
        },
      ],
      faqTitle: 'Questions fréquentes',
      faq: [
        {
          q: 'Quand recevons-nous les photos ?',
          a: 'Rapidement. Vous recevez une première sélection peu après l’événement, puis la galerie complète. Nous confirmons le délai exact au moment de la réservation.',
        },
        {
          q: 'Pouvez-vous livrer des photos pendant l’événement ?',
          a: 'Oui, sur demande. Dites-le-nous à la réservation et nous vous enverrons quelques photos le jour même, pour vos réseaux sociaux ou un communiqué.',
        },
        {
          q: 'Combien d’heures de couverture faut-il prévoir ?',
          a: 'Cela dépend de votre horaire. Envoyez-nous le programme et nous vous proposerons une durée.',
        },
        {
          q: 'Pouvons-nous utiliser les photos librement ?',
          a: 'Oui, pour votre site Web, vos réseaux sociaux et la presse. La publicité payée demande une licence étendue : mentionnez-le dans votre demande.',
        },
        { q: 'Travaillez-vous en anglais ?', a: 'Oui, nous travaillons en français et en anglais.' },
      ],
    },
    en: {
      sections: [
        {
          h2: 'What we cover',
          paras: [
            'Conferences, conventions, galas, product launches, annual meetings, company parties and team events. We cover the whole event: speakers on stage, the room, networking, awards, sponsors and the details of the setup.',
            'The photos then work for your internal communications, website, social media, annual report and the promotion of next year’s edition.',
          ],
        },
        {
          h2: 'How it works',
          steps: [
            ['Before', 'you send us the schedule and a list of the moments and people we must not miss.'],
            ['During', 'we follow the run of show and work discreetly, without disturbing speakers or guests.'],
            ['After', 'you receive a selection of edited photos, ready for web and print, through a download link.'],
          ],
          after:
            'We travel across Montreal, Laval, Longueuil, the South Shore and the North Shore. We also travel outside Greater Montreal; travel fees are then included in the quote.',
        },
      ],
      faqTitle: 'Frequently asked questions',
      faq: [
        {
          q: 'When do we get the photos?',
          a: 'Fast. You get a first selection shortly after the event, then the full gallery. We confirm the exact timing when you book.',
        },
        {
          q: 'Can you deliver photos during the event?',
          a: 'Yes, on request. Tell us when you book and we’ll send a few photos the same day, for social media or a press release.',
        },
        {
          q: 'How many hours of coverage do we need?',
          a: 'It depends on your schedule. Send us the program and we’ll suggest a length.',
        },
        {
          q: 'Can we use the photos freely?',
          a: 'Yes, for your website, social media and the press. Paid advertising needs an extended licence: mention it when you contact us.',
        },
        { q: 'Do you work in French?', a: 'Yes, we work in both French and English.' },
      ],
    },
  },
  headshot: {
    fr: {
      sections: [
        {
          h2: 'Pour qui',
          paras: [
            'Dirigeants, conseils d’administration, équipes complètes et professionnels : avocats, comptables, courtiers, conseillers. Un portrait soigné pour votre site Web, LinkedIn, vos communiqués de presse, vos propositions d’affaires et vos conférences.',
          ],
        },
        {
          h2: 'À vos bureaux',
          paras: [
            'Nous installons notre éclairage dans une salle de réunion de vos bureaux, avec un fond de studio ou vos propres locaux en arrière-plan, selon votre préférence. Chaque personne ne s’absente que quelques minutes et retourne ensuite au travail.',
            'Pour une équipe, le fond, l’éclairage et le cadrage restent les mêmes d’une personne à l’autre : tous les portraits vont ensemble sur votre page « Notre équipe ». Nous conservons les réglages : vos nouveaux employés pourront être photographiés plus tard dans le même style.',
          ],
        },
        {
          h2: 'Le jour de la séance',
          paras: ['Nous guidons la pose et l’expression pour un résultat naturel, même pour les personnes qui n’aiment pas être photographiées.'],
        },
      ],
      faqTitle: 'Questions fréquentes',
      faq: [
        {
          q: 'Combien de personnes pouvez-vous photographier en une journée ?',
          a: 'Cela dépend de la taille de votre équipe. Envoyez-nous le nombre de personnes et nous préparerons l’horaire avec vous.',
        },
        {
          q: 'La retouche est-elle incluse ?',
          a: 'Oui, une retouche légère est incluse : teint et petites imperfections. Une retouche plus poussée est offerte en option.',
        },
        {
          q: 'Que faut-il porter ?',
          a: 'Des vêtements unis, dans des couleurs qui vous ressemblent et que vous portez au travail. Évitez les motifs très fins, qui ressortent mal à l’écran. Apportez un deuxième haut si vous hésitez.',
        },
        { q: 'Quand recevons-nous les portraits ?', a: 'Rapidement. Nous confirmons le délai exact au moment de la réservation.' },
        {
          q: 'Pouvez-vous photographier aussi l’équipe au travail le même jour ?',
          a: `Oui, les portraits se combinent bien avec des ${link('workplace', 'fr', 'photos en milieu de travail')}.`,
        },
      ],
    },
    en: {
      sections: [
        {
          h2: 'Who it’s for',
          paras: [
            'Executives, boards, whole teams and professionals: lawyers, accountants, brokers, advisors. A polished headshot for your website, LinkedIn, press releases, proposals and speaking engagements.',
          ],
        },
        {
          h2: 'At your office',
          paras: [
            'We set up our lighting in a meeting room at your office, with a studio backdrop or your own office as the background, whichever you prefer. Each person steps away for only a few minutes, then goes back to work.',
            'For a team, the backdrop, lighting and framing stay the same from one person to the next, so every headshot matches on your “Our team” page. We keep the settings on file, so new hires can be photographed later in the same style.',
          ],
        },
        {
          h2: 'On the day',
          paras: ['We guide pose and expression for a natural result, even for people who dislike being photographed.'],
        },
      ],
      faqTitle: 'Frequently asked questions',
      faq: [
        {
          q: 'How many people can you photograph in a day?',
          a: 'It depends on the size of your team. Tell us how many people and we’ll plan the schedule with you.',
        },
        {
          q: 'Is retouching included?',
          a: 'Yes, light retouching is included: skin and small blemishes. More advanced retouching is available as an option.',
        },
        {
          q: 'What should we wear?',
          a: 'Solid colours that suit you and that you’d wear to work. Avoid very fine patterns, which look busy on screen. Bring a second top if you’re unsure.',
        },
        { q: 'When do we get the headshots?', a: 'Fast. We confirm the exact timing when you book.' },
        {
          q: 'Can you also photograph the team at work on the same day?',
          a: `Yes, headshots pair well with ${link('workplace', 'en', 'workplace photography')}.`,
        },
      ],
    },
  },
  workplace: {
    fr: {
      sections: [
        {
          h2: 'Ce que nous photographions',
          paras: [
            'Vos employés au travail, là où ils travaillent vraiment : bureaux, ateliers, usines, laboratoires, entrepôts et cliniques. Des photos de votre milieu plutôt que des photos de banques d’images, pour votre site Web, votre page carrières, vos offres d’emploi, votre rapport annuel et vos réseaux sociaux.',
            'Des candidats qui voient votre vrai milieu de travail savent à quoi s’attendre, et vos clients voient les personnes derrière vos produits et services.',
          ],
        },
        {
          h2: 'Comment ça se passe',
          steps: [
            ['Planification', 'ensemble, nous dressons la liste des lieux, des postes et des personnes à photographier, et du meilleur moment pour chacun.'],
            ['Consentement', 'les employés photographiés doivent être d’accord.'],
            ['Sur place', 'nous respectons vos règles de sécurité et nous travaillons pendant les activités normales, avec le moins de dérangement possible.'],
            ['Livraison', 'une sélection de photos retouchées, prêtes pour le Web et l’impression.'],
          ],
        },
      ],
      faqTitle: 'Questions fréquentes',
      faq: [
        {
          q: 'Faut-il arrêter la production pendant la séance ?',
          a: 'Non. Nous photographions pendant le travail normal et demandons seulement quelques poses courtes au besoin.',
        },
        { q: 'Et les employés qui ne veulent pas être photographiés ?', a: 'Ils ne le seront pas. Nous composons les images autour d’eux.' },
        { q: 'Combien de temps dure une séance ?', a: 'Cela dépend du nombre de lieux et de personnes. Nous planifions la durée avec vous.' },
        {
          q: 'Pouvons-nous utiliser les photos pour le recrutement et la publicité ?',
          a: 'Pour le recrutement, oui : site Web, page carrières, offres d’emploi et réseaux sociaux sont inclus. La publicité payée demande une licence étendue : mentionnez-le dans votre demande.',
        },
        {
          q: 'Pouvez-vous faire les portraits de l’équipe le même jour ?',
          a: `Oui. Voyez nos ${link('headshot', 'fr', 'portraits corporatifs')}.`,
        },
      ],
    },
    en: {
      sections: [
        {
          h2: 'What we photograph',
          paras: [
            'Your people at work, where they actually work: offices, workshops, plants, labs, warehouses and clinics. Real photos of your workplace instead of stock images, for your website, careers page, job postings, annual report and social media.',
            'Candidates who see your real workplace know what to expect, and clients see the people behind your products and services.',
          ],
        },
        {
          h2: 'How it works',
          steps: [
            ['Planning', 'together we list the locations, roles and people to photograph, and the best time for each.'],
            ['Consent', 'employees who appear in the photos must agree.'],
            ['On site', 'we follow your safety rules and shoot during normal operations, with as little disruption as possible.'],
            ['Delivery', 'a selection of edited photos, ready for web and print.'],
          ],
        },
      ],
      faqTitle: 'Frequently asked questions',
      faq: [
        {
          q: 'Do we need to stop production during the shoot?',
          a: 'No. We photograph during normal work and only ask for a few short poses when needed.',
        },
        { q: 'What about employees who don’t want to be photographed?', a: 'They won’t be. We frame the shots around them.' },
        { q: 'How long does a shoot take?', a: 'It depends on the number of locations and people. We plan the length with you.' },
        {
          q: 'Can we use the photos for recruiting and advertising?',
          a: 'For recruiting, yes: your website, careers page, job postings and social media are included. Paid advertising needs an extended licence: mention it when you contact us.',
        },
        {
          q: 'Can you take team headshots on the same day?',
          a: `Yes. See our ${link('headshot', 'en', 'corporate headshots')}.`,
        },
      ],
    },
  },
};
