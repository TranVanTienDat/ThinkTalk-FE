import axios from "axios";
import { getSession } from "next-auth/react";

export const isClient = () => typeof window !== "undefined";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1`,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    let token = "";
    if (isClient()) {
      const session = await getSession();
      token = session?.user?.accessToken;
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      await signOut({ callbackUrl: "/login" });
      router.push("/login");
      return;
    }
    throw error;
  }
);

const get = async (url, config = {}) => {
  try {
    const response = await axiosInstance.get(url, config);
    return response.data;
  } catch (error) {
    throw error.response || error.message;
  }
};

const post = async (url, data, config = {}) => {
  try {
    const response = await axiosInstance.post(url, data, config);
    return response.data;
  } catch (error) {
    throw error.response || error.message;
  }
};

const put = async (url, data, config = {}) => {
  try {
    const response = await axiosInstance.put(url, data, config);
    return response.data;
  } catch (error) {
    throw error.response || error.message;
  }
};

const servicesApi = { get, post, put };

export default servicesApi;
