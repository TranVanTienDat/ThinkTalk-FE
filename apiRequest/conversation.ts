import servicesApi from "@/services/api";
import { ChatItem, Meta } from "@/types";

const path = {
  get: "/chat",
  getInviteLink: (chatId: string) => `/chat/invite-link/${chatId}`,
  getInformationInviteLink: "/chat/invite-information",
};

export const conversationApi = {
  get: async ({
    params,
  }: {
    params: any;
  }): Promise<{ data: ChatItem[]; meta: Meta }> => {
    try {
      return await servicesApi.get(path.get, {
        params: params,
      });
    } catch (error) {
      console.error("Error fetching conversations:", error);
      throw error;
    }
  },

  getInviteLink: async (chatId: string): Promise<string> => {
    try {
      return await servicesApi.get(path.getInviteLink(chatId));
    } catch (error) {
      throw error;
    }
  },

  getInformationInviteLink: async ({
    params,
  }: {
    params: any;
  }): Promise<any> => {
    try {
      return await servicesApi.get(path.getInformationInviteLink, {
        params: params,
      });
    } catch (error) {
      throw error;
    }
  },
};
