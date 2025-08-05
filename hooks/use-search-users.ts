import { userApi } from "@/apiRequest/user.api";
import { useQuery } from "@tanstack/react-query";

export function useSearchUsers({ search }: { search: string }) {
  return useQuery({
    queryKey: ["search-users", search],
    queryFn: () =>
      userApi.get({
        params: { page: 1, limit: 10, search },
      }),
  });
}
