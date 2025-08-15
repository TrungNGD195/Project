import { useState, useCallback } from "react";
import {
  register as apiRegister,
  login as apiLogin,
  logout as apiLogout,
  type AuthUser,
} from "../api/authApi";
import { setUser, getUser } from "../store/authStore";

export function useAuth() {
  const [user, setUserState] = useState<AuthUser | null>(getUser());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sync = (u: AuthUser | null, token?: string) => {
    setUser(u, token);
    setUserState(u);
  };

  const register = useCallback(
    async (data: { full_name: string; email: string; password: string }) => {
      setLoading(true);
      setError(null);
      try {
        const res = await apiRegister(data);
        sync(res.user, res.accessToken);
        return res.user;
      } catch (e: any) {
        setError(e.response?.data?.message || "Register failed");
        throw e;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const login = useCallback(
    async (data: { email: string; password: string }) => {
      setLoading(true);
      setError(null);
      try {
        const res = await apiLogin(data);
        sync(res.user, res.accessToken);
        return res.user;
      } catch (e: any) {
        setError(e.response?.data?.message || "Login failed");
        throw e;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const logout = useCallback(async () => {
    await apiLogout();
    sync(null, "");
  }, []);

  return { user, loading, error, login, register, logout };
}
