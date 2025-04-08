import { requestBreeds } from "../routes/apis/breeds.js";
// import { requestBreed } from "../routes/apis/breed.js";

export const RouteServerMap = {
  "/breeds": requestBreeds,
  "/breeds/:id": requestBreeds,
};
