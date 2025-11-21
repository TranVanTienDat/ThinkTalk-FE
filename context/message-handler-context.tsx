"use client";

import { useQueryClient } from "@tanstack/react-query";
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

// Helper functions for query data manipulation
const removeMessageSendStatus = (message: Message): Omit<Message, 'sendStatus'> => {
  const { sendStatus, ...rest } = message;
  return rest;
};

const updateMessageInPages = (
  pages: any[],
  predicate: (message: Message) => boolean,
  updater: (message: Message) => Message
) => {
  return pages.map((page: any) => ({
    ...page,
    data: page.data.map((item: Message) => 
      predicate(item) ? updater(item) : item
    ),
  }));
};

const cleanSendStatusFromPages = (pages: any[]) => {
  return pages.map((page: any) => ({
    ...page,
    data: page.data.map(removeMessageSendStatus),
  }));
};

const addMessageToFirstPage = (pages: any[], newMessage: Message) => {
  return pages.map((page: any, index: number) => {
    if (index === 0) {
      const cleanMessage = removeMessageSendStatus(newMessage);
      return {
        ...page,
        data: [cleanMessage, ...page.data.map(removeMessageSendStatus)],
      };
    }
    return {
      ...page,
      data: page.data.map(removeMessageSendStatus),
    };
  });
};

const updateConversationLastMessage = (
  pages: any[],
  chatId: string,
  lastMessage: Message,
  isRead: boolean = false
) => {
  return pages.map((page: any) => {
    const itemIndex = page.data.findIndex((item: ChatItem) => item.id === chatId);
    
    if (itemIndex === -1) {
      return page;
    }

    const newData = [...page.data];
    newData[itemIndex] = {
      ...newData[itemIndex],
      lastMessage,
      updatedAt: new Date().toISOString(),
      isRead,
    };

    // Move to top
    const [movedItem] = newData.splice(itemIndex, 1);
    newData.unshift(movedItem);

    return {
      ...page,
      data: newData,
    };
  });
};

const addNewChatToConversations = (pages: any[], chat: ChatItem) => {
  return [
    {
      data: [chat],
    },
    ...pages,
  ];
};

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
    const message = msgRes as Message;

    // Handle successful message sent by current user
    if (status === "success" && message.senderId === user.id) {
      queryClient.setQueryData([`msg-${message.chatId}`], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          pages: updateMessageInPages(
            old.pages,
            (item) => item.id === tempMsgIdRef.current,
            (item) => ({ ...item, sendStatus: SendStatus.SENT })
          ),
        };
      });
      return;
    }

    // Handle message received from another user
    if (status === "success" && message.senderId !== user.id) {
      // Update messages query
      queryClient.setQueryData([`msg-${message.chatId}`], (old: any) => {
        if (!old) return old;

        // Avoid duplicate messages
        const alreadyExists = old.pages.some((page: any) =>
          page.data.some((item: Message) => item.id === message.id)
        );
        if (alreadyExists) return old;

        return {
          ...old,
          pages: addMessageToFirstPage(old.pages, message),
        };
      });

      // Update conversations query
      queryClient.setQueryData(["conversations"], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page: any) => {
            const itemIndex = page.data.findIndex(
              (item: ChatItem) => item.id === message.chatId
            );

            // If chat not found, add new chat to the list
            if (itemIndex === -1 && message.chat) {
              const newChat: ChatItem = {
                ...message.chat,
                isRead: false,
                lastMessage: message,
              } as ChatItem;

              return { ...page, data: [newChat, ...page.data] };
            }

            // Update existing chat
            if (itemIndex !== -1) {
              const newData = [...page.data];
              newData[itemIndex] = {
                ...newData[itemIndex],
                lastMessage: message,
                updatedAt: newData[itemIndex]?.updatedAt || new Date().toISOString(),
                isRead: false,
              };

              // Move to top
              const [movedItem] = newData.splice(itemIndex, 1);
              newData.unshift(movedItem);

              return { ...page, data: newData };
            }

            return page;
          }),
        };
      });
      return;
    }

    // Handle failed message send
    if (status === "error" && userId === user.id) {
      queryClient.setQueryData([`msg-${message.chatId}`], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          pages: updateMessageInPages(
            old.pages,
            (item) => item.id === tempMsgIdRef.current,
            (item) => ({ ...item, sendStatus: SendStatus.FAILED })
          ),
        };
      });
    }
  });

  useSocketEvent("created-group", (response: ResponseCreateGroup) => {
    const { status, data: chat, sender } = response;
    
    if (status === "success") {
      // Invalidate conversations to refetch with new group
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      
      // Redirect to new chat if current user created it
      if (sender.id === user.id) {
        router.replace(`/workspace/t/${chat.id}`);
      }
    }
  });

  // Add optimistic message to the first page
  const updateEventMessage = useCallback(
    (msg: Message) => {
      queryClient.setQueryData([`msg-${msg.chatId}`], (old: any) => {
        if (!old) return old;
        
        return {
          ...old,
          pages: old.pages.map((page: any, index: number) => 
            index === 0 
              ? { ...page, data: [msg, ...(page.data || [])] }
              : page
          ),
        };
      });
    },
    [queryClient]
  );

  // Update conversation list with new message
  const updateEventConversation = useCallback(
    (msg: Message) => {
      queryClient.setQueryData(["conversations"], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          pages: updateConversationLastMessage(old.pages, msg.chatId, msg, true),
        };
      });
    },
    [queryClient]
  );

  // Batch read messages to reduce socket emissions
  const sendBatchRead = useDebouncedCallback(() => {
    if (pendingReads.current.size === 0) return;

    const reads = Array.from(pendingReads.current.values());

    // Group by chatId for separate batch emissions
    const readsByChat = reads.reduce((acc, read) => {
      if (!acc[read.chatId]) {
        acc[read.chatId] = [];
      }
      acc[read.chatId].push(read.messageId);
      return acc;
    }, {} as Record<string, string[]>);

    // NOTE: Batch read emission currently disabled
    // Uncomment when backend endpoint is ready:
    // Object.entries(readsByChat).forEach(([chatId, messageIds]) => {
    //   emit("messages:batch-read", { messageIds, chatId });
    // });

    pendingReads.current.clear();
  }, 3000);

  const markAsRead = useCallback(
    (messageId: string, chatId: string) => {
      const key = `${chatId}-${messageId}`;
      
      if (!pendingReads.current.has(key)) {
        pendingReads.current.set(key, { messageId, chatId });
        sendBatchRead();
      }
    },
    [sendBatchRead]
  );

  const getUserNewGroup = useCallback((value: Option[]) => {
    setUserNewGroup(value);
  }, []);

  const getNameGroup = useCallback((value: string) => {
    setNewGroupName(value);
  }, []);

  const setMessageRead = useCallback((msgId: string, msgRead: MessageRead[]) => {
    setMsgRead((prev) => ({ ...prev, [msgId]: msgRead }));
  }, []);

  // Get private chat ID when only one user is selected
  const getPrivateChatIdBetweenUsers = useCallback(() => {
    return userNewGroup.length === 1 ? userNewGroup[0].chatId : undefined;
  }, [userNewGroup]);

  const updateHandler = useCallback(
    (message: MessageInputType) => {
      // Generate unique temporary message ID
      tempMsgIdRef.current = uuidv4();
      
      // Check if we're creating a new conversation or using existing one
      const isNewConversation = pathName.includes("/workspace/t/new");
      const privateChatId = getPrivateChatIdBetweenUsers();
      
      // Handle existing conversation or private chat
      if (!isNewConversation || privateChatId) {
        const targetChatId = privateChatId ?? message.chatId;
        
        const msg = createMessage({
          chatId: targetChatId,
          content: message.message,
          type: message.type,
          msgId: tempMsgIdRef.current,
          user,
        });

        // Optimistically update UI
        updateEventMessage(msg);
        updateEventConversation(msg);
        
        // Send message via socket
        emit("send-message", { ...message, chatId: targetChatId });
        return;
      }

      // Handle new group/private chat creation
      const isPrivateChat = userNewGroup.length === 1;
      const newChat = {
        name: isPrivateChat ? userNewGroup[0].label : newGroupName,
        avatar: isPrivateChat ? userNewGroup[0].avatar : null,
        type: isPrivateChat ? "private" : "group",
        chatMembers: userNewGroup.map((item) => ({
          userId: item.value,
          role: ChatRole.MEMBER,
        })),
        message: {
          content: message.message,
          type: message.type,
        },
      };

      emit("create-group", newChat);
    },
    [
      user,
      updateEventMessage,
      updateEventConversation,
      emit,
      getPrivateChatIdBetweenUsers,
      userNewGroup,
      pathName,
      newGroupName,
    ]
  );

  // Cleanup: flush any pending read receipts on unmount
  useEffect(() => {
    return () => {
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
