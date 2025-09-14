import servicesApi from "@/services/api";
import { ApiParams, Meta, Notification } from "@/types";

const path = {
  get: "/notification",
  update: (id: string) => `/notification/${id}`,
};

export const notificationApi = {
  get: async ({
    params,
  }: { 
    params: ApiParams & { search: string, isRead?: boolean };
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

  update: async (id: string, data: Partial<Notification>): Promise<any> => {
    try {
      return await servicesApi.patch(path.update(id),
      {...data}
    );
    } catch (error) {
      console.error("Error updating notification:", error);
      throw error;
    }
  },

};
