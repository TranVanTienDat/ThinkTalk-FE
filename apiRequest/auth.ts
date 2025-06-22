import servicesApi from "@/services/api";

const auth = {
  login: async (data: any) => {
    try {
      return await servicesApi.post("/auth/login", data);
    } catch (error) {
      console.log(error);
    }
  },
  register: async (data: any) => {
    try {
      return await servicesApi.post("/auth/register", data);
    } catch (error) {
      console.log(error);
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
