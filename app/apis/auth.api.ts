import { User } from "../types";
import http from "../utils/http";

export const URL_LOGIN = "login";
export const URL_REGISTER = "register";
export const URL_LOGOUT = "logout";
export const URL_REFRESH_TOKEN = "refresh-access-token";

const authApi = {
  login(body: { email: string; password: string }) {
    return http.post<User>(URL_LOGIN, body);
  },
  register(body: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    bYear: number;
    bMonth: number;
    bDay: number;
    gender: string;
  }) {
    return http.post<any>(URL_REGISTER, body);
  },
};

export default authApi;
