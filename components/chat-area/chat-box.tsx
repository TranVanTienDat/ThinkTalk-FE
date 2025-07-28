"use client";
import { bgImgConfig } from "@/constants/chat.config";
import { useMessages } from "@/hooks/use-messages";
import { useScroll } from "@/hooks/use-scroll";
import { useConversationInfoStore } from "@/stores/conversation-info-store";
import { Params } from "@/types";
import { Avatar, Box, Stack, Typography, useTheme } from "@mui/joy";
import { memo } from "react";
import { useStore } from "zustand";
import { InputBox } from "./input-box";
import MessagesPane from "./message/message-pane";

export const ChatBox = ({ params }: { params: Params }) => {
  const { isFetchingNextPage: isNextPage, fetchStatus } = useMessages({
    id: params.id,
  });
  const { ref, scrollToBottom } = useScroll({
    isNextPage,
    fetchStatus,
    offset: 500,
  });

  return (
    <Stack className="h-full flex flex-col relative overflow-hidden">
      <Box
        className="overflow-y-auto custom-scrollbar h-full"
        sx={{
          backgroundImage: `url(${bgImgConfig["025c84a0-b438-4c8a-b8e9-8a52a025a7b9"].img})`,
          backgroundSize: "cover",
        }}
        ref={ref}
      >
        <MessagesPane params={params} parentRef={ref} />
      </Box>
      <InputBox params={params} scrollToBottom={scrollToBottom} />
    </Stack>
  );
};

const AvatarHeader = ({ params }: { params: Params }) => {
  const theme = useTheme();
  const data = useStore(useConversationInfoStore, (state) => state.data);
  const user = data[params.id];

  return (
    <Stack
      direction="column"
      alignItems="center"
      spacing={2}
      sx={{
        margin: "16px auto",
        backgroundColor: "transparent",
        maxWidth: "400px",
        height: "140px",
      }}
    >
      <Avatar
        alt={""}
        src={user?.avatar ?? ""}
        size="lg"
        sx={{ width: "80px", height: "80px" }}
      />

      <Typography
        level="h4"
        lineHeight={1}
        sx={{ fontWeight: 700, color: theme.palette.primary[700] }}
      >
        {user?.name || ""}
      </Typography>
    </Stack>
  );
};
export default memo(AvatarHeader);
