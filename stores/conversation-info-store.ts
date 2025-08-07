import { ChatItem } from "@/types";
import { createIndexDBStore } from "./store";

export type ConversationInfoType = ChatItem & {
  lastUpdated: string;
};

const initialData: Record<string, ConversationInfoType> = {};

type ConversationInfoState = {
  data: Record<string, ConversationInfoType>;
  addInfo: (key: string, value: ConversationInfoType) => void;
};

export const useConversationInfoStore =
  createIndexDBStore<ConversationInfoState>({
    name: "conversation-info-storage",
    methods: (set, get) => ({
      data: initialData,
      addInfo: (key, value) =>
        set({
          data: {
            ...get().data,
            [key]: { ...value, lastUpdated: new Date().toISOString() },
          },
        }),
    }),
  });
