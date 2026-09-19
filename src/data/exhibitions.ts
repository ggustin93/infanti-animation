import type { ImageMetadata } from 'astro';
import bleusDencreImg from '../assets/images/exhibitions/bleu-encres-vitrine.jpg';
import whimsyPosterImg from '../assets/images/exhibitions/archives-whimsy-poster.jpg';

type Lang = 'fr' | 'en';
type Localized<T = string> = { fr: T; en: T };

export interface Exhibition {
  /** Slug, shared by both locales: /expositions/<id> and /en/exhibitions/<id>. */
  id: string;
  title: Localized;
  year: number;
  /** Short form for the home list, e.g. "18–20 sept."; the year is shown separately. */
  dateShort?: Localized;
  dateLabel: Localized;
  place: Localized;
  /** One or two lines: home list + meta description. */
  summary: Localized;
  body: Localized<string[]>;
  externalUrl: string;
  externalLabel: Localized;
  image: ImageMetadata;
  imageAlt: Localized;
  /** ISO dates + venue feed the Event JSON-LD; leave out for undated shows. */
  startDate?: string;
  endDate?: string;
  location?: {
    name: string;
    streetAddress: string;
    postalCode: string;
    locality: string;
    country: string;
  };
}

export const exhibitionPath = (id: string, lang: Lang) =>
  lang === 'fr' ? `/expositions/${id}` : `/en/exhibitions/${id}`;

// Newest first.
export const exhibitions: Exhibition[] = [
  {
    id: 'puppet-in-the-city',
    title: { fr: 'Laine des Songes — Puppet in the City', en: 'Laine des Songes — Puppet in the City' },
    year: 2026,
    dateShort: { fr: '18–20 sept.', en: '18–20 Sept.' },
    dateLabel: { fr: '18–20 septembre 2026', en: '18–20 September 2026' },
    place: {
      fr: "Librairie Bleus d'Encre, Uccle (Bruxelles)",
      en: "Bleus d'Encre bookshop, Uccle (Brussels)",
    },
    summary: {
      fr: "Marionnettes en laine feutrée en vitrine de la librairie Bleus d'Encre, à Uccle, pendant le festival Puppet in the City (18–20 septembre 2026).",
      en: "Needle-felted wool puppets in the window of the Bleus d'Encre bookshop in Uccle, during the Puppet in the City festival (18–20 September 2026).",
    },
    body: {
      fr: [
        "Puppet in the City, organisé par La Roseraie, invite la marionnette à sortir des théâtres : « les vitrines se mettent à raconter des histoires, les places publiques deviennent des scènes à ciel ouvert ». Pendant tout un week-end, Uccle se laisse envahir par le monde de la marionnette.",
        "Studio Infanti y présente Laine des Songes, une exposition autour de son travail d'animation en stop motion. En vitrine de la librairie Bleus d'Encre, au Parvis Saint-Pierre, des marionnettes en laine feutrée prennent place dans des caisses en bois, comme autant de petits théâtres à observer depuis la rue.",
        "Le programme complet du festival, avec les compagnies invitées et la billetterie, est à retrouver sur le site de La Roseraie.",
      ],
      en: [
        "Puppet in the City, organised by La Roseraie, takes puppetry out of the theatres: “shop windows start telling stories, public squares become open-air stages”. For a whole weekend, Uccle is joyfully taken over by the world of puppets.",
        "Studio Infanti presents Laine des Songes, an exhibition around its stop motion animation work. In the window of the Bleus d'Encre bookshop on Parvis Saint-Pierre, needle-felted wool puppets sit in wooden crates, like so many little theatres to watch from the street.",
        "The full festival programme, with the guest companies and ticketing, is on the La Roseraie website.",
      ],
    },
    externalUrl: 'https://www.roseraie.org/puppet-in-the-city',
    externalLabel: { fr: 'Programme sur roseraie.org', en: 'Programme on roseraie.org' },
    image: bleusDencreImg,
    imageAlt: {
      fr: "Vitrine de la librairie Bleus d'Encre : marionnettes en laine feutrée dans des caisses en bois empilées, avec un théâtre « Fortune Teller », pendant que Margot termine l'installation",
      en: "Bleus d'Encre bookshop window: needle-felted wool puppets in stacked wooden crates, with a “Fortune Teller” theatre, while Margot finishes the installation",
    },
    startDate: '2026-09-18',
    endDate: '2026-09-20',
    location: {
      name: "Bleus d'Encre",
      streetAddress: 'Parvis Saint-Pierre 10',
      postalCode: '1180',
      locality: 'Uccle',
      country: 'BE',
    },
  },
  {
    id: 'archives-whimsy-2025',
    title: { fr: 'ARCHIVES : whimsy', en: 'ARCHIVES: whimsy' },
    year: 2025,
    dateShort: { fr: '12 juil.', en: '12 July' },
    dateLabel: { fr: '12 juillet 2025', en: '12 July 2025' },
    place: {
      fr: 'The Hallway Gallery, Lafayette (Louisiane)',
      en: 'The Hallway Gallery, Lafayette, Louisiana',
    },
    summary: {
      fr: "Louise et Margot Infanti parmi plus de cinquante artistes de whimsy, exposition collective multimédia d'ARCHIVES à Lafayette (Louisiane).",
      en: "Louise and Margot Infanti among 50+ artists in whimsy, ARCHIVES' group multimedia exhibition in Lafayette, Louisiana.",
    },
    body: {
      fr: [
        "whimsy est une exposition collective multimédia qui explore l'étrange, le surréel et le ludiquement profond. Organisée par ARCHIVES, plateforme dédiée à la mise en valeur d'artistes émergents en animation et en arts visuels, elle s'est tenue le 12 juillet 2025, de 16 h à 21 h, à The Hallway Gallery (625 Garfield Street, Lafayette, Louisiane).",
        "Plus de cinquante artistes y étaient présentés, dont Louise et Margot Infanti, et plus de 600 personnes sont venues voir l'exposition. Les visiteurs étaient invités à jouer le thème et à venir dans leur tenue la plus fantaisiste.",
        "Margot y montre trois pièces de stop motion de 2025 : Chat Qui Chante et deux pièces sans titre, non destinées à la vente. Réalisatrice et animatrice stop motion belge, formée comme actrice au Conservatoire de Bruxelles, elle crée avec sa sœur Louise des mondes poétiques et surprenants : de petits univers qui, en quelques secondes, peuvent faire naître l'émotion.",
        "La laine feutrée, choisie pour des raisons esthétiques autant que pratiques, sert une esthétique brute et imparfaite, en contraste avec l'essor des images générées par IA.",
      ],
      en: [
        "whimsy is a group multimedia exhibition exploring the strange, the surreal and the playfully profound. Organised by ARCHIVES, a platform dedicated to showcasing emerging artists in animation and visual arts, it took place on 12 July 2025, from 4 to 9 pm, at The Hallway Gallery (625 Garfield Street, Lafayette, Louisiana).",
        "More than fifty artists were shown, including Louise and Margot Infanti, and over 600 people came to see the show. Visitors were invited to dress the theme and turn up in their most whimsical outfit.",
        "Margot shows three 2025 stop motion pieces: Chat Qui Chante and two untitled works, not for sale. A Belgian director and stop motion animator trained as an actress at the Brussels Conservatoire, she creates poetic and surprising worlds with her sister Louise: small universes that, in just a few seconds, can evoke emotion.",
        "Needle-felted wool, chosen for aesthetic and practical reasons alike, serves a raw and imperfect aesthetic, in contrast to the rise of AI-generated imagery.",
      ],
    },
    externalUrl: 'https://archivesexhibition.wixsite.com/my-site-4/artists/margot-infanti',
    externalLabel: { fr: 'Découvrir sur Archives Exhibitions', en: 'Discover on Archives Exhibitions' },
    image: whimsyPosterImg,
    imageAlt: {
      fr: "Affiche de whimsy : une sculpture de laine blanche couverte d'yeux et transpercée d'une flèche (œuvre de Lee Lancon), sur fond gris clair, avec la date du 12 juillet 2025 et l'adresse 625 Garfield St., Lafayette",
      en: "Poster for whimsy: a white wool sculpture covered in eyes and pierced by an arrow (a work by Lee Lancon) on a pale grey background, with the date 12 July 2025 and the address 625 Garfield St., Lafayette",
    },
    startDate: '2025-07-12T16:00:00-05:00',
    endDate: '2025-07-12T21:00:00-05:00',
    location: {
      name: 'The Hallway Gallery',
      streetAddress: '625 Garfield Street',
      postalCode: '70501',
      locality: 'Lafayette',
      country: 'US',
    },
  },
];
