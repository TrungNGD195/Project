import api, { setAccessToken } from "../lib/axios";

export interface RegisterPayload {
  full_name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  full_name: string;
  role: string;
}

export interface AuthResponse {
  accessToken: string;
  user: AuthUser;
}

export async function register(data: RegisterPayload): Promise<AuthResponse> {
  const res = await api.post<AuthResponse>("/auth/register", data);
  setAccessToken(res.data.accessToken);
  return res.data;
}

export async function login(data: LoginPayload): Promise<AuthResponse> {
  const res = await api.post<AuthResponse>("/auth/login", data);
  setAccessToken(res.data.accessToken);
  return res.data;
}

export async function logout(): Promise<void> {
  try {
    await api.post("/auth/logout");
  } catch {
    // ignore
  } finally {
    setAccessToken(null);
  }
}
