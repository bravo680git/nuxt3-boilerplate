import authModuleRoutes from '@/modules/authen/routes';

const STORAGE_KEYS = {
  accessToken: 'access-token',
};

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    token: localStorage.getItem(STORAGE_KEYS.accessToken),
  }),

  actions: {
    getToken() {
      return this.token ? 'Bearer ' + this.token : '';
    },
    clearToken() {
      this.token = '';
      localStorage.removeItem(STORAGE_KEYS.accessToken);
    },

    setToken(token: string) {
      this.token = token;
      localStorage.setItem(STORAGE_KEYS.accessToken, token);
    },

    logout: async () => {
      localStorage.clear();
      navigateTo(authModuleRoutes.login.path);
    },

    async checkToken() {
      const { $api } = useNuxtApp();
      const token = this.getToken();

      const result = {
        isLoggedIn: false,
      };

      if (!token) {
        return result;
      }

      const data = await $api.auth.checkToken();

      result.isLoggedIn = !!data?.status;
      return result;
    },
  },
});
