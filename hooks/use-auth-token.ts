import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function useAuthToken() {
  const {data: session} = useSession()
  const [token, setTokenState] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if(session?.user) setTokenState((session?.user as any).accessToken);
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
