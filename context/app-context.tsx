"use client";

import { UserDetail } from "@/types";
import useSWR from "swr";
import {
  createContext,
  useContext,
  useContextSelector,
} from "use-context-selector";

import auth from "@/apiRequest/auth";
import { useEffect, useState, type FC, type ReactNode } from "react";
import Loading from "@/components/base/Loading";

export type AppContextValue = {
  user: UserDetail;
  useSelector: typeof useSelector;
  mutateUser: () => void;
};

const AppContext = createContext<AppContextValue>({
  user: {
    id: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    email: "",
    password: "",
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

  if (!userDetail) return <Loading type="app" />;

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
