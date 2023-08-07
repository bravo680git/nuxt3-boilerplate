import { Axios } from 'axios';

export type AuthApi = {
  checkToken: () => Promise<any>;
  login: (data: any) => Promise<any>;
};

export default (axios: Axios): AuthApi => ({
  checkToken: () => axios.post('/check-token'),
  login: (data: any) => axios.post('/login', data),
});
