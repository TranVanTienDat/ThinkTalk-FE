import { MsgUserStatus } from "@/types";
import { createIndexDBStore } from "./store";

export type ConversationInfoType = {
  id: string;
  name: string;
  avatar?: string;
  members?: MsgUserStatus[];
  createdAt: string;
  updatedAt: string;
  lastUpdated: string;
  isRead?: boolean;
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
