import servicesApi from "@/services/api";
import { ApiParams, Meta, UserPrivateConversation } from "@/types";

const path = {
  get: "/user/users-with-chat-private",
};

export const userApi = {
  get: async ({
    params,
  }: {
    params: ApiParams & { search: string };
  }): Promise<{ data: UserPrivateConversation[]; meta: Meta }> => {
    try {
      return await servicesApi.get(path.get, {
        params: params,
      });
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  },
};
