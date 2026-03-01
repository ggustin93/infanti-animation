import type { ImageMetadata } from 'astro';
import frogThumb from '../assets/images/works/frog.jpg';
import afraidThumb from '../assets/images/works/afraid-of-losing.jpg';
import oysterThumb from '../assets/images/works/oyster-boy.jpg';

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
