import { v4 as uuidv4 } from "uuid";

function createChatItem() {
  const now = new Date().toISOString();

  return {
    id: uuidv4(),
    createdAt: now,
    updatedAt: now,
    deletedAt: null,
    name: "Cuộc trò chuyện mới",
    type: "direct",
    userIds: [],
  };
}

import { create } from "zustand";

interface ConversationTemp {
  conversationTemp: any | undefined;
  setConversationTemp: (isEmpty: boolean) => void;
}

const useConversationTemp = create<ConversationTemp>()((set) => ({
  conversationTemp: undefined,
  setConversationTemp: (isEmpty: boolean) => {
    if (isEmpty) {
      set({ conversationTemp: createChatItem() });
    } else {
      set({ conversationTemp: undefined });
    }
  },
}));

export default useConversationTemp;
