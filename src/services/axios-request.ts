import axios from "axios";

export const server = axios.create({
  baseURL: "http://localhost:3333/api",
  withCredentials: true,
});

server.interceptors.response.use(async response => {
  if (process.env.NODE_ENV === "development") {
    await new Promise(resolve => setTimeout(resolve, 4000));
  }
  return response.data;
});
