export interface Project {
  name: string;
  url: string;
  description: string;
  tag: string;
  image: string;
  imageAlt: string;
  caseStudy?: string;
}

export const projects: Project[] = [
  {
    name: 'Quiet Loon',
    url: 'https://www.quietloon.com',
    description: 'The app that carries the mental load',
    tag: 'Web app',
    image: '/images/quietloon.jpg',
    imageAlt: 'Screenshot of the Quiet Loon web application',
    caseStudy: '/case-studies/quiet-loon',
  },
  {
    name: 'Reaper Drones',
    url: 'https://reaperdrones.com',
    description: 'Drone news, reviews and industry insights',
    tag: 'News site',
    image: '/images/reaperdrones.jpg',
    imageAlt: 'Screenshot of the Reaper Drones website',
  },
  {
    name: 'Altitude Drone Surveying',
    url: 'https://altitudedronesurveying.vercel.app',
    description: 'Drone surveys from a chartered surveyor',
    tag: 'Marketing site',
    image: '/images/altitude.jpg',
    imageAlt: 'Screenshot of the Altitude Drone Surveying website',
  },
  {
    name: 'The Non-Starters',
    url: 'https://thenonstarters.vercel.app',
    description: 'We never got off the ground.',
    tag: 'Band site',
    image: '/images/nonstarters.jpg',
    imageAlt: 'Screenshot of The Non-Starters website',
  },
  {
    name: 'Shabby Road',
    url: 'https://www.shabbyroadband.co.uk',
    description: 'The songs you love, played with soul.',
    tag: 'Band site',
    image: '/images/shabbyroads.jpg',
    imageAlt: 'Screenshot of the Shabby Road website',
  },
  {
    name: 'Voltline Electrical',
    url: 'https://voltline-electrical.vercel.app',
    description: 'Domestic. Commercial. Certified.',
    tag: 'Demo',
    image: '/images/voltline.jpg',
    imageAlt: 'Screenshot of the Voltline Electrical demo site',
  },
  {
    name: 'Wildmoor Gardens',
    url: 'https://wildmoor-gardens.vercel.app',
    description: 'Gardens designed for how you live.',
    tag: 'Demo',
    image: '/images/wildmoor.jpg',
    imageAlt: 'Screenshot of the Wildmoor Gardens demo site',
  },
  {
    name: 'Northbridge Plumbing',
    url: 'https://northbridge-plumbing.vercel.app',
    description: 'On call. On time. On the level.',
    tag: 'Demo',
    image: '/images/northbridge.jpg',
    imageAlt: 'Screenshot of the Northbridge Plumbing demo site',
  },
  {
    name: 'Beechwood Care',
    url: 'https://beechwood-care.vercel.app',
    description: 'Care that comes home to you.',
    tag: 'Demo',
    image: '/images/beechwood.jpg',
    imageAlt: 'Screenshot of the Beechwood Care demo site',
  },
  {
    name: 'Tideway Swim Academy',
    url: 'https://tideway-swim-academy.vercel.app',
    description: 'From first splash to confident strokes.',
    tag: 'Demo',
    image: '/images/tideway.jpg',
    imageAlt: 'Screenshot of the Tideway Swim Academy demo site',
  },
];
