import type { AuthUser } from "../api/authApi";
import { setAccessToken } from "../lib/axios";

interface State {
  user: AuthUser | null;
}

const state: State = { user: null };

export function setUser(user: AuthUser | null, token?: string) {
  state.user = user;
  if (token !== undefined) setAccessToken(token || null);
}

export function getUser() {
  return state.user;
}
