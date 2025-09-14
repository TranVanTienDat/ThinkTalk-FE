import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useFilterNotification = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filter = (searchParams.get("filter") as "all" | "unread") || "all";
  const search = searchParams.get("search") || "";

  const setFilter = (value: "all" | "unread") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("filter", value);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const setSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", value);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return {
    filter,
    search,
    setFilter,
    setSearch,
  };
};