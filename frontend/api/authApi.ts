import api from "./axiosInstance";

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
};

export const authApi = {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const res = await api.post<LoginResponse>("/auth/login", payload);
    return res.data;
  },

  async register(payload: {
    name: string;
    email: string;
    password: string;
  }): Promise<LoginResponse> {
    const res = await api.post<LoginResponse>("/auth/register", payload);
    return res.data;
  },
};
