"use client";
import { useMessageHandler } from "@/context/message-handler-context";
import { useMessages } from "@/hooks/use-messages";
import { useScroll } from "@/hooks/use-scroll";
import { useConversationInfoStore } from "@/stores/conversation-info-store";
import { Params } from "@/types";
import {
  Avatar,
  AvatarGroup,
  Box,
  Stack,
  Typography,
  useTheme,
} from "@mui/joy";
import { memo, ReactNode } from "react";
import { useStore } from "zustand";
import { InputBox } from "./input-box";
import MessagesPane from "./message/message-pane";

export const ChatBox = ({ params }: { params: Params }) => {
  const { isFetchingNextPage: isNextPage, fetchStatus } = useMessages({
    id: params.id,

    enabled: params.id !== "new" ? true : false,
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
          // backgroundImage: `url(${bgImgConfig["025c84a0-b438-4c8a-b8e9-8a52a025a7b9"].img})`,
          backgroundSize: "cover",
        }}
        ref={ref}
      >
        <MessagesPane params={params} parentRef={ref} />
      </Box>
      <InputBox
        params={params}
        scrollToBottom={scrollToBottom}
        // bgColor={bgImgConfig["025c84a0-b438-4c8a-b8e9-8a52a025a7b9"].color}
      />
    </Stack>
  );
};

const AvatarHeader = ({ params }: { params: Params }) => {
  const theme = useTheme();
  const { userNewGroup } = useMessageHandler();
  const userInfo = useStore(useConversationInfoStore, (state) => state.data);
  const chatInfo = userInfo[params.id];
  const showAvatar = userNewGroup.slice(0.3);
  return (
    <>
      {chatInfo && (
        <CommonLayout>
          <Avatar
            alt={""}
            src={chatInfo.avatar}
            size="lg"
            sx={{ width: "80px", height: "80px" }}
          />

          <Typography
            level="h4"
            lineHeight={1}
            sx={{ fontWeight: 700, color: theme.palette.primary[700] }}
          >
            {chatInfo.name}
          </Typography>
        </CommonLayout>
      )}

      {!!userNewGroup.length && !chatInfo && (
        <CommonLayout>
          <AvatarGroup
            sx={{
              flexDirection: "row-reverse",
              "--AvatarGroup-gap": "-30px",
              position: "relative",
              left: "13px",
            }}
          >
            {showAvatar.map((user) => {
              return (
                <Avatar key={user.value} alt={user.label} src={user.avatar} />
              );
            })}
          </AvatarGroup>
          <Typography
            level="h4"
            lineHeight={1}
            sx={{ fontWeight: 700, color: theme.palette.primary[700] }}
          >
            {userNewGroup?.length === 1 ? userNewGroup[0].label : "Nhóm mới"}
          </Typography>
        </CommonLayout>
      )}
    </>
  );
};
export default memo(AvatarHeader);

const CommonLayout = ({ children }: { children: ReactNode }) => {
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
      {children}
    </Stack>
  );
};
