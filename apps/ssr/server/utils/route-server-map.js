import axios from "axios";
export const ClientDirBasePath = "/src";
/* export const RouteServerMap = {
  "/": "App.tsx",
}; */

export const RouteServerMap = {
  "/": () => {
    return axios.get("https://jsonplaceholder.typicode.com/posts/1");
  },
};
