import { messageApi } from "@/apiRequest/message";
import { useInfiniteQuery } from "@tanstack/react-query";

const fetchConversations = async ({
  pageParam = 1,
  id,
}: {
  pageParam: any;
  id: string;
}) => {
  const response = await messageApi.get({
    params: { page: pageParam },
    id: id,
  });
  const { data, meta } = response;
  return {
    data: data || [],
    nextCursor: meta.page < meta.totalPage ? meta.page + 1 : undefined,
  };
};

export const useMessages = ({ id }: { id: string }) => {
  // const queryClient = useQueryClient();

  return useInfiniteQuery({
    queryKey: [`msg-${id}`],
    queryFn: ({ pageParam }) => fetchConversations({ pageParam, id }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor;
    },
    staleTime: 60 * 1000, // 1 phút
    refetchOnWindowFocus: false,
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
