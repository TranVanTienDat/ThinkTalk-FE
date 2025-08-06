"use client";
import auth from "@/apiRequest/auth";
import { useMutation } from "@tanstack/react-query";

export const useLogout = () => {
  return useMutation({
    mutationFn: (data: any) => {
      return auth.logout({ ...data });
    },
    onError: (error: any) => {
      throw error;
    },
    onSuccess: () => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_Token");
      window.location.href = "/login";
    },
  });
};
