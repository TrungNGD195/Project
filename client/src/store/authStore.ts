import { type AuthUser } from "../api/authApi";
import { setAccessToken } from "../lib/axios";

// Simple in-memory auth state with optional localStorage persistence
let currentUser: AuthUser | null = null;
const STORAGE_KEY = "auth";

export function setUser(user: AuthUser | null, token?: string) {
  currentUser = user;
  setAccessToken(token ?? null);

  try {
    if (user && token) {
      const payload = { user, token } as const;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // Ignore storage errors (e.g., SSR or privacy mode)
  }
}

export function getUser(): AuthUser | null {
  if (currentUser) return currentUser;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { user: AuthUser; token: string };
    setAccessToken(parsed.token ?? null);
    currentUser = parsed.user ?? null;
    return currentUser;
  } catch {
    return null;
  }
}
