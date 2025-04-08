import axios from "axios";

// 创建 axios 实例
const request = axios.create({
  baseURL: BASE_API,
});

export { request };
