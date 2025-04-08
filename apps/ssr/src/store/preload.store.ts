import { Store } from "@tanstack/react-store";

const isServer = import.meta.env.SSR;
// console.log("store>>>", isServer);
export const preLoadStore = new Store<{ data: unknown }>({
  // @ts-expect-error okk
  data: isServer ? null : window.__LOADED_STATE__,
});
