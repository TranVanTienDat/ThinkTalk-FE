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
  const tempMsgIdRef = useRef("");
  const [msgRead, setMsgRead] = useState<Record<string, MessageRead[]>>({});

  // useSocketEvent("receive-message", (response: ResponseMsg) => {
  //   const { status, data: msgRes, userId } = response;
  //   console.log("res", response);
  //   if (status === "success" && (msgRes as Message).senderId === user.id) {
  //     queryClient.setQueryData([`msg-${msgRes.chatId}`], (old: any) => {
  //       if (!old) return old;

  //       return {
  //         ...old,
  //         pages: old.pages.map((page: any) => {
  //           return {
  //             ...page,
  //             data: page.data.map((item: Message) => {
  //               if (item.id !== tempMsgIdRef.current) {
  //                 const { sendStatus, ...rest } = item;
  //                 return {
  //                   ...rest,
  //                 };
  //               }

  //               return {
  //                 ...item,
  //                 sendStatus: SendStatus.SENT,
  //               };
  //             }),
  //           };
  //         }),
  //       };
  //     });
  //   } else if (
  //     status === "success" &&
  //     (msgRes as Message).senderId !== user.id
  //   ) {
  //     queryClient.setQueryData([`msg-${msgRes.chatId}`], (old: any) => {
  //       if (!old) return old;

  //       return {
  //         ...old,
  //         pages: old.pages.map((page: any) => {
  //           return {
  //             ...page,
  //             data: [msgRes, ...page.data].map((item: Message) => {
  //               const { sendStatus, ...rest } = item;
  //               return {
  //                 ...rest,
  //               };
  //             }),
  //           };
  //         }),
  //       };
  //     });

  //     queryClient.setQueryData(["conversations"], (old: any) => {
  //       if (!old) return old;

  //       return {
  //         ...old,
  //         pages: old.pages.map((page: any) => {
  //           // Tìm index của item cần cập nhật
  //           const itemIndex = page.data.findIndex(
  //             (item: ChatItem) => item.id === msgRes.chatId
  //           );

  //           if (itemIndex === -1) {
  //             const newChat: ChatItem = {
  //               ...((msgRes as Message).chat as ChatItem),
  //               isRead: false,
  //               lastMessage: msgRes as Message,
  //             };

  //             return { ...page, data: [newChat, ...page.data] };
  //           }

  //           // Tạo bản sao của data để không mutate trực tiếp
  //           const newData = [...page.data];

  //           // Cập nhật item
  //           const updatedItem: ChatItem = {
  //             ...newData[itemIndex],
  //             lastMessage: msgRes as Message,
  //             updatedAt:
  //               newData[itemIndex]?.updatedAt || new Date().toISOString(),
  //             createdAt: newData[itemIndex].createdAt,
  //             isRead: false,
  //           };
  //           // Gán item đã cập nhật
  //           newData[itemIndex] = updatedItem;

  //           // Di chuyển item lên đầu mảng
  //           const [movedItem] = newData.splice(itemIndex, 1);
  //           newData.unshift(movedItem);

  //           return {
  //             ...page,
  //             data: newData,
  //           };
  //         }),
  //       };
  //     });
  //   } else if (status === "error" && userId === user.id) {
  //     queryClient.setQueryData(
  //       [`msg-${(msgRes as Message).chatId}`],
  //       (old: any) => {
  //         if (!old) return old;

  //         return {
  //           ...old,
  //           pages: old.pages.map((page: any) => {
  //             return {
  //               ...page,
  //               data: page.data.map((item: Message) => {
  //                 if (item.id === tempMsgIdRef.current) {
  //                   return {
  //                     ...item,
  //                     sendStatus: SendStatus.FAILED,
  //                   };
  //                 }
  //                 return item;
  //               }),
  //             };
  //           }),
  //         };
  //       }
  //     );
  //   }
  // });

  useSocketEvent("receive-message", (response: ResponseMsg) => {
    const { status, data: msgRes, userId } = response;

    // Chỉ xử lý các trạng thái 'success' hoặc 'error'
    if (status !== "success" && status !== "error") return;

    const message = msgRes as Message;
    const isCurrentUser = userId === user.id;
    const isSender = message.senderId === user.id;

    // Hàm helper để chuẩn hóa tin nhắn (loại bỏ sendStatus)
    const normalizeMessage = (msg: Message) => {
      const { sendStatus, ...rest } = msg;
      return rest;
    };

    // Cập nhật dữ liệu tin nhắn
    if (status === "success" || (status === "error" && isCurrentUser)) {
      queryClient.setQueryData([`msg-${message.chatId}`], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page: any) => {
            let updatedData = page.data;

            if (status === "success") {
              if (isSender) {
                // Cập nhật trạng thái gửi cho tin nhắn của người dùng hiện tại
                updatedData = updatedData.map((item: Message) =>
                  item.id === tempMsgIdRef.current
                    ? { ...item, sendStatus: SendStatus.SENT }
                    : normalizeMessage(item)
                );
              } else {
                // Thêm tin nhắn mới và chuẩn hóa tất cả
                updatedData = [
                  normalizeMessage(message),
                  ...updatedData.map(normalizeMessage),
                ];
              }
            } else if (status === "error" && isCurrentUser) {
              // Đánh dấu tin nhắn gửi thất bại
              updatedData = updatedData.map((item: Message) =>
                item.id === tempMsgIdRef.current
                  ? { ...item, sendStatus: SendStatus.FAILED }
                  : item
              );
            }

            return { ...page, data: updatedData };
          }),
        };
      });
    }

    // Cập nhật danh sách hội thoại cho tin nhắn nhận được
    if (status === "success" && !isSender) {
      queryClient.setQueryData(["conversations"], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page: any) => {
            const data = [...page.data];
            const itemIndex = data.findIndex(
              (item: ChatItem) => item.id === message.chatId
            );

            if (itemIndex === -1) {
              // Thêm hội thoại mới
              const newChat: ChatItem = {
                ...(message.chat as ChatItem),
                isRead: false,
                lastMessage: message,
              };
              return { ...page, data: [newChat, ...data] };
            }

            // Cập nhật hội thoại hiện có
            const updatedItem: ChatItem = {
              ...data[itemIndex],
              lastMessage: message,
              updatedAt: data[itemIndex]?.updatedAt || new Date().toISOString(),
              createdAt: data[itemIndex].createdAt,
              isRead: false,
            };

            // Di chuyển lên đầu danh sách
            data.splice(itemIndex, 1);
            data.unshift(updatedItem);

            return { ...page, data };
          }),
        };
      });
    }
  });

  useSocketEvent("created-group", (response: ResponseCreateGroup) => {
    const { status, data: chat, sender } = response;
    console.log("response", response);
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

      router.replace(`/workspace/t/${chat.id}`);
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
            : `Nhóm ${userNewGroup.map((obj) => obj.label).join(", ")}`,
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

      console.log("end");
    },
    [
      user,
      updateEventMessage,
      updateEventConversation,
      emit,
      getPrivateChatIdBetweenUsers,
      userNewGroup,
      pathName,
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
        updateHandler,
        setMessageRead,
        markAsRead,
        getUserNewGroup,
        getPrivateChatIdBetweenUsers,
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
