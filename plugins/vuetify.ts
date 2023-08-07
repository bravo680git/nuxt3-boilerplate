import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { mdi } from 'vuetify/iconsets/mdi';
import { aliases, fa } from 'vuetify/iconsets/fa';

import '@mdi/font/css/materialdesignicons.css'; // Ensure you are using css-loader
import '@fortawesome/fontawesome-free/css/all.css';

export default defineNuxtPlugin((nuxtApp: any) => {
  const vuetify = createVuetify({
    components,
    directives,
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
        fa,
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
