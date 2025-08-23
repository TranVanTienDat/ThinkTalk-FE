import servicesApi from "@/services/api";
import { ApiParams, Meta, UserPrivateConversation } from "@/types";
import { DeviceUser } from "@/types/device-system";

const path = {
  get: "/user/users-with-chat-private",
  getDeviceUser: "/user/device-information",
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

  getDeviceUser: async (): Promise<DeviceUser> => {
    try {
      return await servicesApi.get(path.getDeviceUser);
    } catch (error) {
      console.error("Error fetching device user:", error);
      throw error;
    }
  },
};
