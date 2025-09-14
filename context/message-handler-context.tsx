/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useQueryClient } from "@tanstack/react-query";
// import { MessageType } from "antd/es/message/interface";
import { Option } from "@/app/workspace/t/[id]/_components/new-conversation";
import { useSocketEmit } from "@/hooks/use-socket-emit";
import { useSocketEvent } from "@/hooks/use-socket-event";
import {
  ChatItem,
  ChatRole,
  Message,
  MessageRead,
  MessageType,
  SendStatus,
} from "@/types";
import { createMessage } from "@/utils";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useDebouncedCallback } from "use-debounce";
import { v4 as uuidv4 } from "uuid";
import { useAppContext } from "./app-context";
import { usePathname, useRouter } from "next/navigation";

type ResponseSw = {
  status: "success" | "error";
  message: string;
  userId?: string;
};
export type ResponseMsg = ResponseSw & {
  data: Message | MessageInputType;
};

export type ResponseCreateGroup = ResponseSw & {
  data: ChatItem;
  sender: { id: string };
};

type MessageContextType = {
  msgRead: Record<string, MessageRead[]>;
  userNewGroup: Option[];
  newGroupName: string;
  getNameGroup: (value: string) => void;
  updateHandler: (message: any) => void;
  setMessageRead: (msgId: string, msgRead: MessageRead[]) => void;
  markAsRead: (messageId: string, chatId: string) => void;
  getUserNewGroup: (value: Option[]) => void;
  getPrivateChatIdBetweenUsers: () => string | undefined;

};

export type MessageInputType = {
  chatId: string;
  message: string;
  type: MessageType;
};

interface PendingRead {
  messageId: string;
  chatId: string;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export function MessageHandlerProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const { user } = useAppContext();
  const { emit } = useSocketEmit();
  const pathName = usePathname();
  const router = useRouter();
  const pendingReads = useRef<Map<string, PendingRead>>(new Map());
  const [userNewGroup, setUserNewGroup] = useState<Option[]>([]);
  const [newGroupName, setNewGroupName] = useState<string>('New group');
  const tempMsgIdRef = useRef("");
  const [msgRead, setMsgRead] = useState<Record<string, MessageRead[]>>({});

  useSocketEvent("receive-message", (response: ResponseMsg) => {
    const { status, data: msgRes, userId } = response;
    // console.log("res", response);
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

        const firstPageIndex = 0;

        // Tránh thêm trùng tin nhắn (so theo id)
        const alreadyExists = old.pages.some((page: any) =>
          page.data.some((item: Message) => item.id === (msgRes as Message).id)
        );
        if (alreadyExists) return old;

        return {
          ...old,
          pages: old.pages.map((page: any, index: number) => {
            const cleanData = page.data.map((item: Message) => {
              const { sendStatus, ...rest } = item;
              return rest;
            });

            if (index === firstPageIndex) {
              // ✅ Thêm msgRes (đã clean) vào đầu page đầu
              const { sendStatus, ...cleanMsgRes } = msgRes as Message;
              return {
                ...page,
                data: [cleanMsgRes, ...cleanData],
              };
            }

            // Các page còn lại: chỉ clean sendStatus
            return {
              ...page,
              data: cleanData,
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

  useSocketEvent("created-group", (response: ResponseCreateGroup) => {
    const { status, data: chat, sender } = response;
    // console.log("created-group", response);
    if (status === "success") {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      // queryClient.setQueryData(["conversations"], (old: any) => {
      //   if (!old) return old;

      //   return {
      //     ...old,
      //     pages: [
      //       {
      //         data: [
      //           {
      //             ...chat,
      //             senderId: sender.id,
      //           } as ChatItem,
      //         ],
      //       },
      //       ...old.pages,
      //     ],
      //   };
      // });
      if (sender.id === user.id) router.replace(`/workspace/t/${chat.id}`);
    }
  });

  const updateEventMessage = useCallback(
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

  const updateEventConversation = useCallback(
    (msg: Message) => {
      queryClient.setQueryData(["conversations"], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page: any) => {
            const itemIndex = page.data.findIndex(
              (item: ChatItem) => item.id === msg.chatId
            );

            if (itemIndex === -1) return page;

            const newData = [...page.data];

            const dataUpdate = {
              ...newData[itemIndex],
              lastMessage: msg,
              updatedAt: new Date().toISOString(),
            };

            newData[itemIndex] = dataUpdate;

            const [movedItem] = newData.splice(itemIndex, 1);
            newData.unshift(movedItem);

            return {
              ...page,
              data: newData,
            };
          }),
        };
      });
    },
    [queryClient]
  );

  const sendBatchRead = useDebouncedCallback(() => {
    if (pendingReads.current.size === 0) return;

    const reads = Array.from(pendingReads.current.values());

    // Nhóm theo chatId để gửi các batch riêng biệt
    const readsByChat = reads.reduce((acc, read) => {
      if (!acc[read.chatId]) {
        acc[read.chatId] = [];
      }
      acc[read.chatId].push(read.messageId);
      return acc;
    }, {} as Record<string, string[]>);

    // Gửi từng batch theo chatId

    // Object.entries(readsByChat).forEach(([chatId, messageIds]) => {
    //   emit("messages:batch-read", {
    //     messageIds,
    //     chatId,
    //   });
    // });

    pendingReads.current.clear();
  }, 3000); // Debounce 500ms

  const markAsRead = useCallback(
    (messageId: string, chatId: string) => {
      const key = `${chatId}-${messageId}`;
      if (!pendingReads.current.has(key)) {
        pendingReads.current.set(key, {
          messageId,
          chatId,
        });
        sendBatchRead();
      }
    },
    [sendBatchRead]
  );

  const getUserNewGroup = useCallback((value: Option[]) => {
    setUserNewGroup([...value]);
  }, []);

  const getNameGroup = useCallback((value: string) => {
    setNewGroupName(value);
  }, []);

  const setMessageRead = useCallback(
    (msgId: string, msgRead: MessageRead[]) => {
      setMsgRead((prev) => ({
        ...prev,
        [msgId]: msgRead,
      }));
    },
    []
  );
  const getPrivateChatIdBetweenUsers = useCallback(() => {
    if (userNewGroup.length === 1) {
      return userNewGroup[0].chatId;
    }
  }, [userNewGroup]);

  const updateHandler = useCallback(
    (message: MessageInputType) => {
      tempMsgIdRef.current = uuidv4();
      let msg: Message = createMessage({
        chatId: message.chatId,
        content: message.message,
        type: message.type,
        msgId: tempMsgIdRef.current,
        user,
      });
      if (
        !pathName.includes("/workspace/t/new") ||
        getPrivateChatIdBetweenUsers?.()
      ) {
        msg = {
          ...msg,
          chatId: (getPrivateChatIdBetweenUsers() as string) ?? message.chatId,
        };
        updateEventMessage(msg);
        updateEventConversation(msg);
        emit("send-message", { ...message, chatId: msg.chatId });

        return;
      }

      const newChat = {
        name:
          userNewGroup.length === 1
            ? userNewGroup[0].label
            : newGroupName,
        avatar: userNewGroup.length === 1 ? userNewGroup[0].avatar : null,
        type: userNewGroup.length === 1 ? "private" : "group",
        chatMembers: userNewGroup.map((item) => ({
          userId: item.value,
          role: ChatRole.MEMBER,
        })),
        message: {
          content: message.message,
          type: message.type,
        },
      };

      emit("create-group", {
        ...newChat,
      });
    },
    [
      user,
      updateEventMessage,
      updateEventConversation,
      emit,
      getPrivateChatIdBetweenUsers,
      userNewGroup,
      pathName,
      newGroupName
    ]
  );

  // Xử lý khi component unmount
  useEffect(() => {
    return () => {
      console.log("component unmount");
      sendBatchRead.flush();
    };
  }, [sendBatchRead]);

  return (
    <MessageContext.Provider
      value={{
        msgRead,
        userNewGroup,
        newGroupName,
        updateHandler,
        setMessageRead,
        markAsRead,
        getUserNewGroup,
        getPrivateChatIdBetweenUsers,
        getNameGroup,
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
