/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosInstance } from 'axios';
import { type CustomEmitter } from '@/plugins/emitter';
import { type ApiService } from '@/services/api';

declare global {
  type AnyObject = Record<string, any>;
}

declare module '#app' {
  interface NuxtApp {
    $axios: AxiosInstance;
    $emitter: CustomEmitter;
    $api: ApiService;
  }
}

export {};
