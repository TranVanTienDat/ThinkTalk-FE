import servicesApi from "@/services/api";
import { UserDetail } from "@/types";

const auth = {
  login: async (data: any): Promise<UserDetail | undefined> => {
    try {
      const res = await servicesApi.post("/auth/login", data);
      if (res?.statusCode === 200) return res.user;
      return undefined;
    } catch (error) {
      throw error;
    }
  },
  register: async (data: any): Promise<UserDetail | undefined> => {
    try {
      const res = await servicesApi.post("/auth/register", data);
      if (res?.statusCode === 201) return res.user;
      return undefined;
    } catch (error) {
      throw error;
    }
  },

  getMe: async () => {
    try {
      return await servicesApi.get("/auth/get-me");
    } catch (error) {
      throw error;
    }
  },
};
export default auth;
