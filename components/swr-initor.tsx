"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { SWRConfig } from "swr";

type SwrInitorProps = {
  children: ReactNode;
};
const SwrInitor = ({ children }: SwrInitorProps) => {
  const router = useRouter();

  useEffect(() => {
    const consoleTokenFromLocalStorage = localStorage?.getItem("access_token");
    const refreshTokenFromLocalStorage = localStorage?.getItem("refresh_token");

    (async () => {
      try {
        if (!(consoleTokenFromLocalStorage || refreshTokenFromLocalStorage)) {
          router.replace("/login");
          return;
        }
      } catch (error: any) {
        console.error("Error during SWR initialization:", error);
        router.replace("/login");
      }
    })();
  }, [router]);

  return (
    <SWRConfig
      value={{
        shouldRetryOnError: false,
        revalidateOnFocus: false,
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default SwrInitor;
