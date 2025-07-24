// hooks/useConversations.ts
import { conversationApi } from "@/apiRequest/conversation";
import { useInfiniteQuery } from "@tanstack/react-query";

const fetchConversations = async ({ pageParam = 1 }) => {
  const response = await conversationApi.get({
    params: { page: pageParam },
  });
  const { data, meta } = response;
  return {
    data: data || [],
    nextCursor: meta.page < meta.totalPage ? meta.page + 1 : undefined,
  };
};

export const useConversations = () => {
  // const queryClient = useQueryClient();

  return useInfiniteQuery({
    queryKey: ["conversations"],
    queryFn: fetchConversations,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor;
    },
  });

  //    useSocketEvent('new-message', (message) => {
  //   queryClient.setQueryData(["conversations"], (old: any[]) => {
  //         const updated = old.filter(
  //           (conv) => conv.id !== message.conversationId
  //         );
  //         const conversation = old.find(
  //           (conv) => conv.id === message.conversationId
  //         );

  //         if (conversation) {
  //           conversation.lastMessage = message;
  //           conversation.updatedAt = new Date().toISOString();
  //           return [conversation, ...updated]; // Đưa lên đầu mảng
  //         }
  //         return old;
  //       });
  //    })
};
