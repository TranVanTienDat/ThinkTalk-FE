"use client";

import { UserDetail } from "@/types";
import useSWR from "swr";
import {
  createContext,
  useContext,
  useContextSelector,
} from "use-context-selector";

import auth from "@/apiRequest/auth";
import Image from "next/image";
import { useEffect, useState, type FC, type ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

export type AppContextValue = {
  user: UserDetail;
  useSelector: typeof useSelector;
  mutateUser: () => void;
};

const AppContext = createContext<AppContextValue>({
  user: {
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    email: "",
    fullName: "",
    nickname: "",
    avatar: "",
    accessToken: "",
    refreshToken: "",
  },
  useSelector,
  mutateUser: () => {},
});

export function useSelector<T>(selector: (value: AppContextValue) => T): T {
  return useContextSelector(AppContext, selector);
}

export type AppContextProviderProps = {
  children: ReactNode;
};

export const AppContextProvider: FC<AppContextProviderProps> = ({
  children,
}) => {
  const [userDetail, setUserDetail] = useState<UserDetail>();

  const { data: userResponse, mutate: mutateUser } = useSWR(
    { url: "/account" },
    auth.getMe
  );
  useEffect(() => {
    if (userResponse) {
      setUserDetail(userResponse);
    }
  }, [userResponse]);

  if (!userDetail)
    return (
      <div className="flex w-full items-center justify-center h-full">
        <Image
          alt="logo"
          src="/images/logo-max-size.png"
          width={200}
          height={90}
        />
      </div>
    );

  return (
    <AppContext.Provider
      value={{
        user: userDetail,
        useSelector,
        mutateUser,
      }}
    >
      <div className="flex h-full flex-col overflow-y-auto">{children}</div>
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

export default AppContext;
