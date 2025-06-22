// import { useInfiniteQuery } from "@tanstack/react-query";
//  type Params = {
//     initialPage?: number
//     limit?: number,

//  }

// export const useGetNotification = ({params}:{params:Params} ) => {
//     const { initialPage = 0, limit= 20 } = params;
//  return  useInfiniteQuery({
//     queryKey: ["notifications"],
//     queryFn: ({pageParam}) => {},
//     initialPageParam: initialPage ,
//     getNextPageParam: (lastPage, page:any) => lastPage.nextCursor,
//   });

// };
