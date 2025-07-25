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
};
