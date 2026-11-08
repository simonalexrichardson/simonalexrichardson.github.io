/**
 * Every business detail on the site lives here: prices, contact details and service area.
 * Change it here and it changes everywhere. Past work lives in src/data/projects.ts.
 *
 * README.md lists anything still to fill in.
 */
/** Change these two numbers and every price on the site follows. */
const buildFrom = 499;
const carePerMonth = 9.99;
const firstYear = Math.round(buildFrom + carePerMonth * 12);

export const site = {
  name: 'Simon Richardson',
  url: 'https://simonrichardson.dev',
  /** Forwards to Gmail through Cloudflare Email Routing. */
  email: 'hello@simonrichardson.dev',

  /** International format. Empty hides the link. */
  phone: '+447875761720',
  /** Digits only with country code. Empty sends "WhatsApp me" to the contact page. */
  whatsapp: '447875761720',

  /** Site token from Cloudflare Web Analytics. Empty turns analytics off. */
  cloudflareAnalyticsToken: '734719ce9ece41b488e4c1e89d268f4c',

  /** The Cloudflare Worker in /worker. PUBLIC_FORM_ENDPOINT overrides it for local testing. */
  formEndpoint: import.meta.env.PUBLIC_FORM_ENDPOINT ?? 'https://contact.simonrichardson.dev/',

  location: { town: 'Hitchin', county: 'Hertfordshire', country: 'GB' },
  serviceArea: ['Hertfordshire', 'Cambridgeshire'],

  pricing: {
    build: {
      name: 'Website build',
      price: `from £${buildFrom.toLocaleString('en-GB')}`,
      amount: buildFrom,
      summary: 'A bespoke site, designed around your business and usually live within a week.',
      includes: [
        'Designed for your business, not a template',
        'Built for phones first',
        'Set up to be found on Google locally',
        'Your domain, in your name',
      ],
    },
    care: {
      name: 'Care plan',
      price: `£${carePerMonth}/month`,
      amount: carePerMonth,
      summary: 'I look after it so you never have to think about it.',
      includes: ['Hosting', 'Security', 'Backups', 'Up to 30 mins of changes a month'],
    },
    note: `Every site comes with a care plan for the first 12 months, so your first year starts from £${firstYear.toLocaleString('en-GB')}, all in.`,
  },
};

const whatsappText = encodeURIComponent("Hi Simon, I've seen your website and I'd like a chat about mine.");
export const whatsappHref = site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${whatsappText}` : '/contact';
export const serviceAreaText = site.serviceArea.join(' and ');
