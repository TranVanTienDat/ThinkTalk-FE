import servicesApi from "@/services/api";
import { ChatItem, Meta } from "@/types";

const path = {
  get: "/chat",
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
};
