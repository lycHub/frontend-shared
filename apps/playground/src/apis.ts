import axios from "axios";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export function postDetail(id: number) {
  return axios.get<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`);
}
