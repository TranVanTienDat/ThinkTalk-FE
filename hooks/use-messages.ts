import { messageApi } from "@/apiRequest/message";
import { useMessageHandler } from "@/context/message-handler-context";
import { Message } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";

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
  const { setMessageRead } = useMessageHandler();

  const query = useInfiniteQuery({
    queryKey: [`msg-${id}`],
    queryFn: ({ pageParam }) => fetchConversations({ pageParam, id }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor;
    },
    staleTime: 60 * 1000, // 1 phút
    refetchOnWindowFocus: false,
  });
  const { isLoading, data } = query;

  useEffect(() => {
    const dataFlat = data?.pages.flatMap((page) => page.data) || [];

    if (!isLoading && dataFlat.length) {
      dataFlat.forEach((msg: Message) => {
        setMessageRead(msg.id, msg.messageRead);
      });
    }
  }, [isLoading, data, setMessageRead]);

  return query;
};
