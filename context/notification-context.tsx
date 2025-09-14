"use client";

import { useNotification as useNotificationToast } from "@/hooks/use-notification";
import { useNotifications } from "@/hooks/use-notifications";
import { useSocketEvent } from "@/hooks/use-socket-event";
import { Notification } from "@/types";
import { getNotificationTitle } from "@/utils/notification";
import { InfiniteData, UseInfiniteQueryResult, useQueryClient } from "@tanstack/react-query";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode
} from "react";
import { useAppContext } from "./app-context";

type ResponseSw = {
  status: "success" | "error";
  message: string;
  data?: Notification;
};

type NotificationContextType = {
  unreadCount: number;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  query: UseInfiniteQueryResult<InfiniteData<{ data: Notification[]; nextCursor: number | undefined; }, unknown>, Error>
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const { user } = useAppContext();
  const { contextHolder, openNotification } = useNotificationToast()
  const queryClient = useQueryClient();
  const query  = useNotifications("");


  const handleNewNotification = useCallback(
    (res: ResponseSw) => {
      console.log("ntf",res)
      if(res.status !== 'success') return 
      queryClient.setQueryData(
        ["notifications"],
        (oldData:any) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page: any) => {
                        return {
                          ...page,
                          data: [res.data, ...page.data],
                        };                  
          })
        }
      }
      );

      openNotification({
        title: getNotificationTitle(res?.data?.type as any).title,
        description: res.message,
        type: 'success'
      });
    },
    [queryClient]
  );

  useSocketEvent("notification", handleNewNotification);

  const markAsRead = useCallback(
    async (notificationId: string) => {
      queryClient.setQueryData(
        ["notifications", user?.id],
        (oldData: Notification[] = []) =>
          oldData.map((n) =>
            n.id === notificationId ? { ...n, read: true } : n
          )
      );
    },
    [queryClient, user?.id]
  );

  const markAllAsRead = useCallback(async () => {
    // TODO: Implement API call to mark all notifications as read
    // await notificationApi.readAll();
    queryClient.setQueryData(
      ["notifications", user?.id],
      (oldData: Notification[] = []) => oldData.map((n) => ({ ...n, read: true }))
    );
  }, [queryClient, user?.id]);


  const unreadCount = useMemo(() => {
     const notifications = query.data?.pages.flatMap((page) => page.data) || [];

    return notifications.filter((n) => !n.isRead).length;
  }, [query.data?.pages]);

  return (
    <NotificationContext.Provider
      value={{
        unreadCount,
        markAsRead,
        markAllAsRead,
        query
      }}
    >
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
}