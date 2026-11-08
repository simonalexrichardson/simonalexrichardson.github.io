/**
 * Every business detail on the site lives here: prices, contact details and service area.
 * Change it here and it changes everywhere. Past work lives in src/data/projects.ts.
 *
 * README.md lists anything still to fill in.
 */
export const site = {
  name: 'Simon Richardson',
  url: 'https://simonrichardson.dev',
  email: 'simonalexrichardson@gmail.com',

  /** International format. Empty hides the link. */
  phone: '+447875761720',
  /** Digits only with country code. Empty sends "WhatsApp me" to the contact page. */
  whatsapp: '447875761720',

  /** The Cloudflare Worker in /worker. PUBLIC_FORM_ENDPOINT overrides it for local testing. */
  formEndpoint: import.meta.env.PUBLIC_FORM_ENDPOINT ?? 'https://contact.simonrichardson.dev/',

  location: { town: 'Hitchin', county: 'Hertfordshire', country: 'GB' },
  serviceArea: ['Hertfordshire', 'Cambridgeshire'],

  /** TODO: confirm these prices. */
  pricing: {
    build: {
      name: 'Website build',
      price: 'from £1,500',
      amount: 1500,
      summary: 'A bespoke site, designed around your business and built from scratch.',
      includes: [
        'Designed for your business, not a template',
        'Built for phones first',
        'Set up to be found on Google locally',
        'Your domain, in your name',
      ],
    },
    care: {
      name: 'Care plan',
      price: 'from £60/month',
      amount: 60,
      summary: 'I look after it so you never have to think about it.',
      includes: ['Hosting', 'Security', 'Backups', 'Up to 30 mins of changes a month'],
    },
    note: 'Every site comes with a care plan for the first 12 months.',
  },
};

const whatsappText = encodeURIComponent("Hi Simon, I've seen your website and I'd like a chat about mine.");
export const whatsappHref = site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${whatsappText}` : '/contact';
export const serviceAreaText = site.serviceArea.join(' and ');
