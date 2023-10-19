import axios, { AxiosInstance } from "axios";
import configHttp from "../constants/configHttp";
export class Http {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: configHttp.baseUrl,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
const http = new Http().instance;
export default http;
