import { useAuthStore } from '@/stores';
import authModuleRoute from '@/modules/authen/routes';

export default defineNuxtRouteMiddleware(async (to) => {
  const { checkToken } = useAuthStore();
  const { isLoggedIn } = await checkToken();

  if (!isLoggedIn && to.name !== authModuleRoute.login.name) {
    return navigateTo(authModuleRoute.login.path);
  }
});
