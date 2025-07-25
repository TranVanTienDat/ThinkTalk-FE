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
};
