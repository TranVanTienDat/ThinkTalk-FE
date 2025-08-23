"use client";
import { conversationApi } from "@/apiRequest/conversation";
import { useMutation } from "@tanstack/react-query";

export const useCreateInviteLink = () => {
  return useMutation({
    mutationFn: (chatId: string) => {
      return conversationApi.getInviteLink(chatId);
    },
    onError: (error: any) => {
      throw error;
    },
    onSuccess: () => {},
  });
};
