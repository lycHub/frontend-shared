import { requestBreeds } from "../routes/apis/breeds.js";

export const RouteServerMap = {
  "/breeds": requestBreeds,
  "/breeds/:id": requestBreeds,
};
