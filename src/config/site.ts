/**
 * Every business detail on the site lives here: prices, contact details, booking link,
 * service area and case studies. Change it here and it changes everywhere.
 *
 * Anything set to '' or marked `placeholder: true` shows a dashed PLACEHOLDER box on the
 * page until you fill it in. README.md lists all of them.
 */
export const site = {
  name: 'Simon Richardson',
  url: 'https://simonrichardson.dev',
  email: 'simonalexrichardson@gmail.com',

  /** TODO: your number, in international format, e.g. '+447700900000'. Empty hides the link. */
  phone: '',
  /** TODO: digits only with country code, e.g. '447700900000'. Empty shows a placeholder. */
  whatsapp: '',
  /** TODO: your Cal.com or Calendly link. Empty sends "Book a chat" to the contact page. */
  bookingUrl: '',

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

  /** TODO: swap these for real work. Never add a client, result or quote that isn't real. */
  caseStudies: [
    {
      placeholder: true,
      name: 'PLACEHOLDER: client name',
      trade: 'PLACEHOLDER: what they do',
      result: 'PLACEHOLDER: one line on what changed for them',
      before: 'Before screenshot',
      after: 'After screenshot',
    },
    {
      placeholder: true,
      name: 'PLACEHOLDER: client name',
      trade: 'PLACEHOLDER: what they do',
      result: 'PLACEHOLDER: one line on what changed for them',
      before: 'Before screenshot',
      after: 'After screenshot',
    },
    {
      placeholder: true,
      name: 'PLACEHOLDER: client name',
      trade: 'PLACEHOLDER: what they do',
      result: 'PLACEHOLDER: one line on what changed for them',
      before: 'Before screenshot',
      after: 'After screenshot',
    },
  ],
};

export const bookingHref = site.bookingUrl || '/contact#book';
export const serviceAreaText = site.serviceArea.join(' and ');
