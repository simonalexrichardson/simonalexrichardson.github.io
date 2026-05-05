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
    name: 'Quietloon',
    url: 'https://quietloon.com',
    description: 'AI-powered email workflows for families',
    tag: 'Web app',
    image: '/images/quietloon.svg',
    imageAlt: 'Screenshot of the Quietloon web application',
  },
  {
    name: 'Reaper Drones',
    url: 'https://reaperdrones.com',
    description: 'Professional drone survey and inspection services', // TODO: replace with real tagline
    tag: 'Marketing site',
    image: '/images/reaperdrones.svg',
    imageAlt: 'Screenshot of the Reaper Drones website',
  },
  {
    name: 'Altitude Drone Surveying',
    url: 'https://altitudedronesurveying.vercel.app',
    description: 'Professional drone survey and inspection services', // TODO: replace with real tagline
    tag: 'Marketing site',
    image: '/images/altitude.svg',
    imageAlt: 'Screenshot of the Altitude Drone Surveying website',
  },
  {
    name: 'The Non-Starters',
    url: 'https://thenonstarters.vercel.app',
    description: 'The band with no plans and all the songs', // TODO: replace with real tagline
    tag: 'Marketing site',
    image: '/images/nonstarters.svg',
    imageAlt: 'Screenshot of The Non-Starters website',
  },
  {
    name: 'Shabby Roads',
    url: 'https://shabbyroads.vercel.app',
    description: 'Vintage furniture and curiosities, online', // TODO: replace with real tagline
    tag: 'Marketing site',
    image: '/images/shabbyroads.svg',
    imageAlt: 'Screenshot of the Shabby Roads website',
  },
];
