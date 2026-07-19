import type { ImageMetadata } from 'astro';
import frogThumb from '../assets/images/works/frog.jpg';
import afraidThumb from '../assets/images/works/afraid-of-losing.jpg';
import oysterThumb from '../assets/images/works/oyster-boy.jpg';
import intrusiveThumb from '../assets/images/works/intrusive-thoughts.jpg';
import frogMagicThumb from '../assets/images/works/frog-magic.jpg';
import dreamcoreThumb from '../assets/images/works/dreamcore.jpg';
import pigLoopThumb from '../assets/images/works/pig-loop.jpg';
import apartmentThumb from '../assets/images/works/apartment.jpg';
import messyBirdThumb from '../assets/images/works/messy-bird.jpg';
import howFeelingsAreBornThumb from '../assets/images/works/how-feelings-are-born.jpg';
import timeToBeHumanThumb from '../assets/images/works/time-to-be-human.jpg';
import metamorphoseThumb from '../assets/images/works/metamorphose.jpg';
import waterPhoenixThumb from '../assets/images/works/water-phoenix.jpg';

export interface Work {
  id: string;
  title: { fr: string; en: string };
  description: { fr: string; en: string };
  thumbnail: ImageMetadata;
  video?: string;
  externalUrl: string;
  year: number;
  featured: boolean;
}

export const works: Work[] = [
  {
    id: 'messy-bird',
    title: {
      fr: 'L\'Atelier en Désordre',
      en: 'Messy but She Knows Her Stuff',
    },
    description: {
      fr: 'Un oiseau s\'affaire dans son atelier encombré de laine, de crochet et de bricoles. Le désordre a sa propre logique.',
      en: 'A bird bustles about her workshop cluttered with wool, crochet and odds and ends. The mess has a logic of its own.',
    },
    thumbnail: messyBirdThumb,
    video: '/videos/works/messy-bird.mp4',
    externalUrl: 'https://www.instagram.com/p/DXWUyRriPrA/',
    year: 2026,
    featured: false,
  },
  {
    id: 'intrusive-thoughts',
    title: {
      fr: 'Intrusive Thoughts',
      en: 'Intrusive Thoughts',
    },
    description: {
      fr: 'Des pensées qui s\'imposent.',
      en: 'Thoughts that intrude.',
    },
    thumbnail: intrusiveThumb,
    video: '/videos/works/intrusive-thoughts.mp4',
    externalUrl: 'https://www.instagram.com/p/DWW_ZyUiNl3/',
    year: 2026,
    featured: false,
  },
  {
    id: 'dreamcore',
    title: {
      fr: 'Dreamcore',
      en: 'Dreamcore',
    },
    description: {
      fr: 'Une rêverie surréaliste en laine feutrée à l\'aiguille : fleurs, dents et symboles oniriques dans une esthétique dreamcore, animés image par image.',
      en: 'A surreal needle-felted daydream — flowers, teeth and dream symbols in a dreamcore aesthetic, animated frame by frame.',
    },
    thumbnail: dreamcoreThumb,
    video: '/videos/works/dreamcore.mp4',
    externalUrl: 'https://www.instagram.com/p/DVqDuUBCOhV/',
    year: 2026,
    featured: false,
  },
  {
    id: 'how-feelings-are-born',
    title: {
      fr: 'Comment Naissent les Sentiments',
      en: 'How Feelings Are Born',
    },
    description: {
      fr: 'Deux mèches de laine, l\'une bleue et l\'une jaune, s\'enlacent et se répondent. Une improvisation sur la naissance d\'une émotion.',
      en: 'Two strands of wool, one blue and one yellow, coil around and answer each other. An improvisation on how an emotion comes to be.',
    },
    thumbnail: howFeelingsAreBornThumb,
    video: '/videos/works/how-feelings-are-born.mp4',
    externalUrl: 'https://www.instagram.com/p/DVTDWS0iOri/',
    year: 2026,
    featured: false,
  },
  {
    id: 'time-to-be-human',
    title: {
      fr: 'Redevenir Humain',
      en: 'Time to Be Human Again',
    },
    description: {
      fr: 'Un poisson rouge sort de sa flaque, enfile un costume et attrape sa mallette. Lundi matin, en technique mixte.',
      en: 'A red fish climbs out of its puddle, pulls on a suit and picks up its briefcase. Monday morning, in mixed media.',
    },
    thumbnail: timeToBeHumanThumb,
    video: '/videos/works/time-to-be-human.mp4',
    externalUrl: 'https://www.instagram.com/p/DVBEoQsCNqI/',
    year: 2026,
    featured: false,
  },
  {
    id: 'frog-magic',
    title: {
      fr: 'Grenouille Magique',
      en: 'Magic Frog',
    },
    description: {
      fr: 'Une grenouille en laine feutrée déploie un tour de magie scintillant, animée image par image en stop motion.',
      en: 'A needle-felted frog conjures a shimmer of magic, brought to life frame by frame in stop motion.',
    },
    thumbnail: frogMagicThumb,
    video: '/videos/works/frog-magic.mp4',
    externalUrl: 'https://www.instagram.com/p/DUSerbMCOag/',
    year: 2026,
    featured: false,
  },
  {
    id: 'pig-loop',
    title: {
      fr: 'Petit Cochon',
      en: 'Pig Loop',
    },
    description: {
      fr: 'Une boucle d\'animation hypnotique en stop motion mettant en scène un petit cochon en laine feutrée à l\'aiguille.',
      en: 'A hypnotic looping stop motion animation featuring a small needle-felted pig.',
    },
    thumbnail: pigLoopThumb,
    video: '/videos/works/pig-loop.mp4',
    externalUrl: 'https://www.instagram.com/p/DUDYHV3CI65/',
    year: 2026,
    featured: false,
  },
  {
    id: 'metamorphose',
    title: {
      fr: 'Métamorphose',
      en: 'Metamorphosis',
    },
    description: {
      fr: 'Un visage en laine feutrée se dissout et se recompose dans une spirale hypnotique de couleurs. Entièrement fait main, sans IA.',
      en: 'A needle-felted face dissolves and reassembles in a hypnotic spiral of colour. Entirely handmade, no AI.',
    },
    thumbnail: metamorphoseThumb,
    video: '/videos/works/metamorphose.mp4',
    externalUrl: 'https://www.instagram.com/p/DTiMn50iFA8/',
    year: 2026,
    featured: false,
  },
  {
    id: 'apartment',
    title: {
      fr: 'POV : chercher un appart abordable',
      en: 'POV: apartment hunting',
    },
    description: {
      fr: 'POV : à la recherche d\'un appartement abordable. Une satire douce-amère du marché locatif, en stop motion et laine feutrée.',
      en: 'POV: hunting for an affordable apartment. A bittersweet stop motion take on the rental market, crafted in needle-felted wool.',
    },
    thumbnail: apartmentThumb,
    video: '/videos/works/apartment.mp4',
    externalUrl: 'https://www.instagram.com/p/DQCbCFTCPTo/',
    year: 2025,
    featured: false,
  },
  {
    id: 'water-phoenix',
    title: {
      fr: 'Phénix d\'Eau',
      en: 'Water Phoenix',
    },
    description: {
      fr: 'Un pigeon en laine feutrée, campé sur ses pattes orange, promu phénix d\'eau. Tout est dans l\'aplomb.',
      en: 'A needle-felted pigeon, planted on its orange feet, promoted to water phoenix. It is all in the poise.',
    },
    thumbnail: waterPhoenixThumb,
    video: '/videos/works/water-phoenix.mp4',
    externalUrl: 'https://www.instagram.com/p/DOxmKl_CBKI/',
    year: 2025,
    featured: false,
  },
  {
    id: 'grenouille-saxophoniste',
    title: {
      fr: 'La Grenouille Saxophoniste',
      en: 'The Saxophone Frog',
    },
    description: {
      fr: 'Une grenouille joue du saxophone tandis qu\'une silhouette en robe violette danse. Inspiré de Fantasia.',
      en: 'A frog plays the saxophone while a figure in a purple dress dances. Fantasia-inspired.',
    },
    thumbnail: frogThumb,
    video: '/videos/works/frog.mp4',
    externalUrl: 'https://www.instagram.com/reel/DJ4qYjhIAQx/',
    year: 2025,
    featured: true,
  },
  {
    id: 'afraid-of-losing',
    title: {
      fr: 'Afraid of Losing',
      en: 'Afraid of Losing',
    },
    description: {
      fr: 'Clip musical en collaboration avec Esme Emerson. Une télévision vintage en laine feutrée avec un écran lumineux.',
      en: 'Music video collaboration with Esme Emerson. A needle-felted vintage TV with a glowing screen.',
    },
    thumbnail: afraidThumb,
    video: '/videos/works/afraid-of-losing.mp4',
    externalUrl: 'https://www.instagram.com/reel/C7XGCgotfaA/',
    year: 2024,
    featured: true,
  },
  {
    id: 'enfant-huitre',
    title: {
      fr: "L'Enfant Huître",
      en: 'The Oyster Boy',
    },
    description: {
      fr: 'Inspiré de Tim Burton. Créatures marines, perles et tons roses. Leur première vidéo longue. Musique : Fabian Finkels.',
      en: 'Tim Burton inspired. Sea creatures, pearls, and pink tones. Their first longer video. Music: Fabian Finkels.',
    },
    thumbnail: oysterThumb,
    video: '/videos/works/enfant-huitre.mp4',
    externalUrl: 'https://www.instagram.com/reel/C5yzz3ZtYuz/',
    year: 2024,
    featured: true,
  },
];
