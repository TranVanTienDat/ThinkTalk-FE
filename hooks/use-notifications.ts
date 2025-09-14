import { notificationApi } from "@/apiRequest/notification";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

const fetchNotifications = async ({
  pageParam = 1,
  limit = 10,
  search = "",
  isRead,
}: {
  pageParam?: number;
  limit?: number;
  search?: string;
  isRead?: boolean;
}) => {
  const response = await notificationApi.get({ params: { page: pageParam, limit, search, isRead } });
  const { data, meta } = response;
  return {
    data: data || [],
    nextCursor: meta.page < meta.totalPage ? meta.page + 1 : undefined,
  };
};

export const useNotifications = () => {

 const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const isRead = searchParams.get("filter") === "unread";
  return useInfiniteQuery({
    queryKey: ["notifications", search, isRead],
    queryFn: ({ pageParam }) => fetchNotifications({ pageParam, search, isRead }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor;
    },
  });
};