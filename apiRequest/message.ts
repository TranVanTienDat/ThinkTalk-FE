import servicesApi from "@/services/api";
import { Message, Meta } from "@/types";

const path = {
  get: (id: string) => `/message/conversation/${id}`,
};

export const messageApi = {
  get: async ({
    params,
    id,
  }: {
    params: any;
    id: string;
  }): Promise<{ data: Message[]; meta: Meta }> => {
    try {
      return await servicesApi.get(path.get(id), {
        params: params,
      });
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  },
};
