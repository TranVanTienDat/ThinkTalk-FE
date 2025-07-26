/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useQueryClient } from "@tanstack/react-query";
// import { MessageType } from "antd/es/message/interface";
import {
  ChatItem,
  Message,
  MessageType,
  SendStatus,
  UserDetail,
} from "@/types";
import {
  createContext,
  useCallback,
  useContext,
  useRef,
  type ReactNode,
} from "react";
import { useAppContext } from "./app-context";
import { useSocketEvent } from "@/hooks/use-socket-event";
import { useSocketEmit } from "@/hooks/use-socket-emit";
import { v4 as uuidv4 } from "uuid";
export interface Response {
  status: "success" | "error";
  data: Message | MessageInputType;
  message: string;
  userId?: string;
}

type MessageContextType = {
  updateHandler: (message: any) => void;
};

type MessageInputType = {
  chatId: string;
  message: string;
  type: MessageType;
};

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export function MessageHandlerProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const { user } = useAppContext();
  const { emit } = useSocketEmit();
  const tempMsgIdRef = useRef("");

  useSocketEvent("sended-message", (response: Response) => {
    const { status, data: msgRes, userId } = response;
    console.log("response", response);

    if (status === "success" && (msgRes as Message).senderId === user.id) {
      queryClient.setQueryData([`msg-${msgRes.chatId}`], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page: any) => {
            return {
              ...page,
              data: page.data.map((item: Message) => {
                if (item.id !== tempMsgIdRef.current) {
                  const { sendStatus, ...rest } = item;
                  return {
                    ...rest,
                  };
                }

                return {
                  ...item,
                  sendStatus: SendStatus.SENT,
                };
              }),
            };
          }),
        };
      });
    } else if (
      status === "success" &&
      (msgRes as Message).senderId !== user.id
    ) {
      queryClient.setQueryData([`msg-${msgRes.chatId}`], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page: any) => {
            return {
              ...page,
              data: [msgRes, ...page.data].map((item: Message) => {
                const { sendStatus, ...rest } = item;
                return {
                  ...rest,
                };
              }),
            };
          }),
        };
      });

      queryClient.setQueryData(["conversations"], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page: any) => {
            // Tìm index của item cần cập nhật
            const itemIndex = page.data.findIndex(
              (item: ChatItem) => item.id === msgRes.chatId
            );

            if (itemIndex === -1) {
              const newChat: ChatItem = {
                ...((msgRes as Message).chat as ChatItem),
                isRead: false,
                lastMessage: msgRes as Message,
              };

              return { ...page, data: [newChat, ...page.data] };
            }

            // Tạo bản sao của data để không mutate trực tiếp
            const newData = [...page.data];

            // Cập nhật item
            const updatedItem: ChatItem = {
              ...newData[itemIndex],
              lastMessage: msgRes as Message,
              updatedAt:
                newData[itemIndex]?.updatedAt || new Date().toISOString(),
              createdAt: newData[itemIndex].createdAt,
              isRead: false,
            };
            // Gán item đã cập nhật
            newData[itemIndex] = updatedItem;

            // Di chuyển item lên đầu mảng
            const [movedItem] = newData.splice(itemIndex, 1);
            newData.unshift(movedItem);

            return {
              ...page,
              data: newData,
            };
          }),
        };
      });
    } else if (status === "error" && userId === user.id) {
      queryClient.setQueryData(
        [`msg-${(msgRes as Message).chatId}`],
        (old: any) => {
          if (!old) return old;

          return {
            ...old,
            pages: old.pages.map((page: any) => {
              return {
                ...page,
                data: page.data.map((item: Message) => {
                  if (item.id === tempMsgIdRef.current) {
                    return {
                      ...item,
                      sendStatus: SendStatus.FAILED,
                    };
                  }
                  return item;
                }),
              };
            }),
          };
        }
      );
    }
  });

  const updateMessage = useCallback(
    (msg: Message) => {
      queryClient.setQueryData([`msg-${msg.chatId}`], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page: any, index: number) => {
            if (index === 0) {
              return {
                ...page,
                data: [msg, ...(page.data || [])],
              };
            }
            return page;
          }),
        };
      });
    },
    [queryClient]
  );

  const updateConversation = useCallback(
    (msg: Message) => {
      queryClient.setQueryData(["conversations"], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page: any) => {
            return {
              ...page,
              data: page.data.map((item: ChatItem) => {
                if (item.id === msg.chatId) {
                  return {
                    ...item,
                    lastMessage: msg,
                    updatedAt: new Date().toISOString(),
                    createdAt: item.createdAt,
                  };
                }
                return item;
              }),
            };
          }),
        };
      });
    },
    [queryClient]
  );

  const updateHandler = useCallback(
    (message: MessageInputType) => {
      tempMsgIdRef.current = uuidv4();
      const msg: Message = {
        id: tempMsgIdRef.current,
        chatId: message.chatId,
        content: message.message,
        type: message.type,
        user: user as Omit<UserDetail, "accessToken" | "refreshToken">,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
        senderId: user.id as string,
        messageStatus: [],
        sendStatus: SendStatus.SENDING,
      };
      updateMessage(msg);
      updateConversation(msg);
      emit("send-message", { ...message });
    },
    [user, updateMessage, updateConversation, emit]
  );

  return (
    <MessageContext.Provider
      value={{
        updateHandler,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}

export function useMessageHandler() {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
}
