"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { SWRConfig } from "swr";

type SwrInitorProps = {
  children: ReactNode;
};
const SwrInitor = ({ children }: SwrInitorProps) => {
  const router = useRouter();
 const session = useSession()
  useEffect(() => {
     if (typeof window === "undefined") return;
    (async () => {
      try {
        if (!session) {
          router.replace("/login");
          return;
        }
      } catch (error: any) {
        console.error("Error during SWR initialization:", error);
        router.replace("/login");
      }
    })();
  }, [router,session]);

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
