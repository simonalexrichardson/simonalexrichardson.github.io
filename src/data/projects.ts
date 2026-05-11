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
    url: 'https://www.reaperdrones.com',
    description: 'CAA risk assessments for UK drone operators.',
    tag: 'Web app',
    image: '/images/reaperdrones.jpg',
    imageAlt: 'Screenshot of the Reaper Drones web app',
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
    url: 'https://www.thenonstarters.com',
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
];

export const concepts: Project[] = [
  {
    name: 'Voltline Electrical',
    url: 'https://voltline-electrical.vercel.app',
    description: 'Local sparky. Certified work. No guesswork.',
    tag: 'Electrical',
    image: '/images/voltline.jpg',
    imageAlt: 'Concept marketing site for an electrical contractor',
  },
  {
    name: 'Hartley & Sons Landscapes',
    url: 'https://wildmoor-gardens.vercel.app',
    description: 'Honest landscape work, done properly.',
    tag: 'Landscape',
    image: '/images/hartley.jpg',
    imageAlt: 'Concept marketing site for a landscape contractor',
  },
  {
    name: 'Northbridge Plumbing',
    url: 'https://northbridge-plumbing.vercel.app',
    description: 'On call. On time. On the level.',
    tag: 'Plumbing',
    image: '/images/northbridge.jpg',
    imageAlt: 'Concept marketing site for a plumbing & heating business',
  },
  {
    name: 'Beechwood Care',
    url: 'https://beechwood-care.vercel.app',
    description: 'Care that comes home.',
    tag: 'Home care',
    image: '/images/beechwood.jpg',
    imageAlt: 'Concept marketing site for a home care provider',
  },
  {
    name: 'Tideway Swim Academy',
    url: 'https://tideway-swim-academy.vercel.app',
    description: 'First splash to confident strokes.',
    tag: 'Swim school',
    image: '/images/tideway.jpg',
    imageAlt: 'Concept marketing site for a swim school',
  },
  {
    name: 'Cobalt Aerospace',
    url: 'https://aero-mandate-radar.vercel.app',
    description: 'Aircraft mods, certified properly.',
    tag: 'Aerospace',
    image: '/images/cobalt.jpg',
    imageAlt: 'Concept marketing site for an aerospace engineering firm',
  },
];
