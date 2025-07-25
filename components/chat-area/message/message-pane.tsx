import Loading from "@/components/base/Loading";
import { useAppContext } from "@/context/app-context";
import { useMessages } from "@/hooks/use-messages";
import { Message, Params } from "@/types";
import { sortDateHandler } from "@/utils";
import { Box, Sheet, Stack } from "@mui/joy";
import { useVirtualizer } from "@tanstack/react-virtual";
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
  parentRef,
}: {
  params: Params;
  parentRef: React.RefObject<HTMLDivElement>;
}) {
  const { user } = useAppContext();
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
    return dataFlat.sort((a, b) => sortDateHandler(a.createdAt, b.createdAt));
  }, [data]);

  const rowVirtualizer = useVirtualizer({
    count: sortMessageMemo.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    overscan: 5,
  });

  const isMe = (msg: Message) => {
    return msg.user.id === user.id;
  };

  return (
    <Sheet sx={sheetStyles}>
      {!hasNextPage && <AvatarHeader params={params} />}
      <Box
        sx={[
          scrollBoxStyles,
          {
            height: `${rowVirtualizer.getTotalSize()}px`,
            position: "relative",
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
        <Stack spacing={2} sx={{ justifyContent: "flex-end" }}>
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const msg = sortMessageMemo[virtualRow.index];
            return (
              <div
                key={msg.id}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                  margin: "0 16px",
                }}
              >
                <MessageItem key={msg.id} msg={msg} isMe={isMe(msg)} />
              </div>
            );
          })}
        </Stack>
      </Box>
    </Sheet>
  );
}
