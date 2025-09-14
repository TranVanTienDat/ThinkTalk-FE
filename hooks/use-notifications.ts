import { notificationApi } from "@/apiRequest/notification";
import { useInfiniteQuery } from "@tanstack/react-query";

const fetchNotifications = async ({
  pageParam = 1,
  limit = 10,
  search = "",
}: {
  pageParam?: number;
  limit?: number;
  search?: string;
}) => {
  const response = await notificationApi.get({
    params: { page: pageParam,limit, search },
  });
  const { data, meta } = response;
  return {
    data: data || [],
    nextCursor: meta.page < meta.totalPage ? meta.page + 1 : undefined,
  };
};

export const useNotifications = (search: string = "") => {
  return useInfiniteQuery({
    queryKey: ["notifications"],
    queryFn: ({ pageParam }) => fetchNotifications({ pageParam, search }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor;
    },
  });
};