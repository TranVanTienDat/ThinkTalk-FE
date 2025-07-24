import { useEffect, useState } from "react";

export function useAuthToken() {
  const [token, setTokenState] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("access_token");
    if (stored) setTokenState(stored);
    setIsHydrated(true);
  }, []);

  const setToken = (t: string | null) => {
    if (t) {
      localStorage.setItem("access_token", t);
      setTokenState(t);
    } else {
      localStorage.removeItem("access_token");
      setTokenState(null);
    }
  };

  return {
    token,
    setToken,
    clearToken: () => setToken(null),
    isAuthenticated: !!token,
    isHydrated,
  };
}
