import servicesApi from "@/services/api";
import { ApiParams, Meta, Notification } from "@/types";

const path = {
  get: "/notification",
};

export const notificationApi = {
  get: async ({
    params,
  }: {
    params: ApiParams & { search: string };
  }): Promise<{ data: Notification[]; meta: Meta }> => {
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
