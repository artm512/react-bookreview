import axios from "axios";

export const api = axios.create({
  baseURL: "https://railway.bookreview.techtrain.dev",
  timeout: 2000,
});
