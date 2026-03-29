import type { ImageMetadata } from 'astro';
import frogThumb from '../assets/images/works/frog.jpg';
import afraidThumb from '../assets/images/works/afraid-of-losing.jpg';
import oysterThumb from '../assets/images/works/oyster-boy.jpg';
import intrusiveThumb from '../assets/images/works/intrusive-thoughts.jpg';
import frogMagicThumb from '../assets/images/works/frog-magic.jpg';
import dreamcoreThumb from '../assets/images/works/dreamcore.jpg';
import pigLoopThumb from '../assets/images/works/pig-loop.jpg';
import apartmentThumb from '../assets/images/works/apartment.jpg';

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
    id: 'dreamcore',
    title: {
      fr: '🌺🦷',
      en: '🌺🦷',
    },
    description: {
      fr: '',
      en: '',
    },
    thumbnail: dreamcoreThumb,
    video: '/videos/works/dreamcore.mp4',
    externalUrl: 'https://www.instagram.com/p/DVqDuUBCOhV/',
    year: 2026,
    featured: false,
  },
  {
    id: 'pig-loop',
    title: {
      fr: '🐽',
      en: '🐽',
    },
    description: {
      fr: '',
      en: '',
    },
    thumbnail: pigLoopThumb,
    video: '/videos/works/pig-loop.mp4',
    externalUrl: 'https://www.instagram.com/p/DUDYHV3CI65/',
    year: 2026,
    featured: false,
  },
  {
    id: 'frog-magic',
    title: {
      fr: '🐸✨',
      en: '🐸✨',
    },
    description: {
      fr: '',
      en: '',
    },
    thumbnail: frogMagicThumb,
    video: '/videos/works/frog-magic.mp4',
    externalUrl: 'https://www.instagram.com/p/DUSerbMCOag/',
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
    id: 'apartment',
    title: {
      fr: 'POV : chercher un appart abordable',
      en: 'POV: apartment hunting',
    },
    description: {
      fr: 'Pov : looking for an affordable apartment 👁️🏡👁️',
      en: 'Pov : looking for an affordable apartment 👁️🏡👁️',
    },
    thumbnail: apartmentThumb,
    video: '/videos/works/apartment.mp4',
    externalUrl: 'https://www.instagram.com/p/DQCbCFTCPTo/',
    year: 2025,
    featured: false,
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
