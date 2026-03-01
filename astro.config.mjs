import { defineConfig } from 'astro/config';

import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://infanti.studio',
  trailingSlash: 'never',

  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },

  adapter: vercel(),
});