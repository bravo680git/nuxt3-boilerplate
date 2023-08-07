import { Axios } from 'axios';
import authApi, { type AuthApi } from './auth';

export type ApiService = {
  auth: AuthApi;
};

export default (axios: Axios): ApiService => ({
  auth: authApi(axios),
});
