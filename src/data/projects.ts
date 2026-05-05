export interface Project {
  name: string;
  url: string;
  description: string;
  tag: string;
  image: string;
  imageAlt: string;
}

export const projects: Project[] = [
  {
    name: 'Quiet Loon',
    url: 'https://quietloon.com',
    description: 'The app that carries the mental load',
    tag: 'Web app',
    image: '/images/quietloon.svg',
    imageAlt: 'Screenshot of the Quiet Loon web application',
  },
  {
    name: 'Reaper Drones',
    url: 'https://reaperdrones.com',
    description: 'Drone news, reviews and industry insights',
    tag: 'News site',
    image: '/images/reaperdrones.svg',
    imageAlt: 'Screenshot of the Reaper Drones website',
  },
  {
    name: 'Altitude Drone Surveying',
    url: 'https://altitudedronesurveying.vercel.app',
    description: 'Drone surveys from a chartered surveyor',
    tag: 'Marketing site',
    image: '/images/altitude.svg',
    imageAlt: 'Screenshot of the Altitude Drone Surveying website',
  },
  {
    name: 'The Non-Starters',
    url: 'https://thenonstarters.vercel.app',
    description: 'We never got off the ground.',
    tag: 'Band site',
    image: '/images/nonstarters.svg',
    imageAlt: 'Screenshot of The Non-Starters website',
  },
  {
    name: 'Shabby Roads',
    url: 'https://shabbyroads.vercel.app',
    description: 'The songs you love, played with soul.',
    tag: 'Band site',
    image: '/images/shabbyroads.svg',
    imageAlt: 'Screenshot of the Shabby Roads website',
  },
];
