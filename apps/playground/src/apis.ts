import axios from "axios";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  fn?: () => void;
}

export function getBreeds() {
  return axios.get<Post>("https://dogapi.dog/api/v2/breeds");
}
