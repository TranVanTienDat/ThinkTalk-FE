"use client";

import { createContext, useContext, type FC, type ReactNode } from "react";

export type ConversationContextValue = object;

const ConversationContext = createContext<ConversationContextValue | undefined>(
  undefined
);

export type ConversationProviderProps = {
  children: ReactNode;
};

export const ConversationContextProvider: FC<ConversationProviderProps> = ({
  children,
}) => {
  // const [conversations, setConversations] = useState<ChatItem[]>([]);
  // const [detailChat, setDetailChat] = useState<ChatItem | null>(null);

  return (
    <ConversationContext.Provider value={{}}>
      {children}
    </ConversationContext.Provider>
  );
};

export default ConversationContext;

export function useConversation() {
  const context = useContext(ConversationContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
}
