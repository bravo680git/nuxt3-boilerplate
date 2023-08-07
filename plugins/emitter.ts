import mitt, { Emitter } from 'mitt';

type Events = {
  loading: boolean;
};

export type CustomEmitter = Emitter<Events>;

const emitter: CustomEmitter = mitt<Events>();

export default defineNuxtPlugin(() => {
  return {
    provide: { emitter },
  };
});
