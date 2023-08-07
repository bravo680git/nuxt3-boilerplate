import { defineNuxtModule } from 'nuxt/kit';
import { resolve } from 'pathe';
import authModuleRoutes from './routes';

export default defineNuxtModule({
  setup(options, nuxt) {
    nuxt.hook('pages:extend', (pages) => {
      pages.push({
        name: authModuleRoutes.login.name,
        path: authModuleRoutes.login.path,
        file: resolve(__dirname, './pages/LoginVue.vue'),
      });
    });
  },
});
