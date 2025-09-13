"use client";

import { useSocketEvent } from "@/hooks/use-socket-event";
import { useToast } from "@/hooks/use-toast";
import { Notification } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { useAppContext } from "./app-context";

type NotificationContextType = {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const { user } = useAppContext();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: notifications = [] } = useQuery<Notification[]>({
    queryKey: ["notifications", user?.id],
    queryFn: async () => {
      // TODO: Implement API call to fetch notifications
      // const res = await notificationApi.getList();
      // return res.data;
      return []; // Returning empty array as API is not available
    },
    enabled: !!user?.id,
  });

  const handleNewNotification = useCallback(
    (newNotification: Notification) => {
      queryClient.setQueryData(
        ["notifications", user?.id],
        (oldData: Notification[] = []) => {
          return [newNotification, ...oldData];
        }
      );

      toast({
        title: newNotification.message,
        description: newNotification.message,
      });
    },
    [queryClient, user?.id, toast]
  );

  useSocketEvent("notification", handleNewNotification);

  const markAsRead = useCallback(
    async (notificationId: string) => {
      // TODO: Implement API call to mark notification as read
      // await notificationApi.read(notificationId);
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
    return notifications.filter((n) => !n.isRead).length;
  }, [notifications]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
      }}
    >
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