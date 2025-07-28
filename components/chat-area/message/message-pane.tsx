import Loading from "@/components/base/Loading";
import { useAppContext } from "@/context/app-context";
import { useMessageHandler } from "@/context/message-handler-context";
import { useMessages } from "@/hooks/use-messages";
import { Message, Params } from "@/types";
import { groupMessages, sortDateHandler } from "@/utils";
import { Box, Sheet } from "@mui/joy";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import AvatarHeader from "../chat-box";
import { MessageItem } from "./message-item";
const scrollBoxStyles = {
  display: "flex",
  flex: 1,
  minHeight: 0,
  flexDirection: "column",
  padding: "16px",
};

const sheetStyles = {
  backgroundColor: "transparent",
  width: "100%",
  margin: "auto",
};

export default function MessagesPane({
  params,
}: // parentRef,
{
  params: Params;
  parentRef: React.RefObject<HTMLDivElement>;
}) {
  const { user: userCurrent } = useAppContext();
  const { msgRead } = useMessageHandler();
  const { data, hasNextPage, isLoading, fetchNextPage } = useMessages({
    id: params.id,
  });

  const { ref, inView } = useInView({
    threshold: 0,
    delay: 300,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage?.();
    }
  }, [inView, fetchNextPage, hasNextPage]);
  const sortMessageMemo = useMemo(() => {
    const dataFlat = data?.pages.flatMap((page) => page.data) || [];
    const latestReadByUser = new Map<string, string>();
    Object.entries(msgRead).forEach(([msgId, reads]) => {
      reads.forEach((read) => {
        const userId = read.user.id;
        if (!latestReadByUser.has(userId)) {
          latestReadByUser.set(userId, msgId);
        }
      });
    });

    const dataMerges = dataFlat.map((msg: Message) => ({
      ...msg,
      messageRead: (msgRead[msg.id] || []).filter(
        (read) => latestReadByUser.get(read.user.id) === msg.id
      ),
      read: msg.messageRead.some((item) => item.user.id === userCurrent.id),
    }));

    const sortedMessages = dataMerges.sort((a, b) =>
      sortDateHandler(a.createdAt, b.createdAt)
    );
    return groupMessages(sortedMessages);
  }, [data, msgRead, userCurrent]);

  // const rowVirtualizer = useVirtualizer({
  //   count: sortMessageMemo.length,
  //   getScrollElement: () => parentRef.current,
  //   estimateSize: () => 100,
  //   measureElement: (el) => {
  //     const height = el.getBoundingClientRect().height;
  //     console.log("Measured height:", height);
  //     return height;
  //   },
  // });

  const isMe = (msg: Message) => {
    return msg.user.id === userCurrent.id;
  };
  // console.log("sortMessageMemo", sortMessageMemo);
  return (
    <Sheet sx={sheetStyles}>
      {!hasNextPage && <AvatarHeader params={params} />}
      <Box
        sx={[
          scrollBoxStyles,
          {
            // height: `${rowVirtualizer.getTotalSize()}px`,
            // position: "relative",
          },
        ]}
      >
        {hasNextPage && (
          <div ref={ref} className="mb-3">
            <Loading type="area" />
          </div>
        )}

        {isLoading && (
          <Box>
            <Loading type="area" />
          </Box>
        )}
        {/* <Stack spacing={2} sx={{ justifyContent: "flex-end" }}> */}
        {sortMessageMemo.map((msg) => {
          // const msg = sortMessageMemo[virtualRow.index];
          return (
            <div
              key={msg.id}
              // style={{
              //   position: "absolute",
              //   top: 0,
              //   left: 0,
              //   right: 0,
              //   // height: `${virtualRow.size}px`,
              //   // transform: `translateY(${virtualRow.start}px)`,
              //   margin: "0 16px",
              // }}
            >
              <MessageItem key={msg.id} msg={msg} isMe={isMe(msg)} />
            </div>
          );
        })}
        {/* </Stack> */}
      </Box>
    </Sheet>
  );
}
