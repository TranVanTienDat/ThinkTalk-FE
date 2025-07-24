import { Avatar, Box, Stack, Typography } from "@mui/joy";
import ChatBubble from "./chat-bubble";
import { Message, MessageType } from "@/types";
import { getDurationDate } from "@/utils";

const RenderByTypeSystem = ({ msg }: { msg: Message }) => {
  return (
    <Stack direction="column" alignItems="center">
      <Typography level="body-sm" sx={{}}>
        {msg.content}
      </Typography>
      <Typography level="body-xs" sx={{ color: "text.tertiary" }}>
        {getDurationDate(msg.createdAt)}
      </Typography>
    </Stack>
  );
};
const RenderByTypeText = ({ msg, isMe }: { msg: Message; isMe: boolean }) => {
  return (
    <>
      <Stack
        direction="row"
        alignItems="flex-end"
        spacing={1}
        sx={{ flexDirection: isMe ? "row-reverse" : "row", gap: "6px" }}
      >
        <Avatar
          sx={{ width: "34px", height: "34px" }}
          src={msg?.user?.avatar || ""}
        />
        <Box>
          <Typography level="body-sm" sx={{ color: "text.tertiary" }}>
            {msg?.user?.nickname || msg?.user?.fullName}
          </Typography>
          <ChatBubble message={msg} isMe={isMe} />
        </Box>
      </Stack>
      <Typography
        level="body-sm"
        sx={{
          color: "text.tertiary",
          textAlign: "center",
          "&.MuiTypography-root": { marginTop: "8px" },
        }}
      >
        {getDurationDate(msg.updatedAt)}
      </Typography>
    </>
  );
};

export const MessageItem = ({ msg, isMe }: { msg: Message; isMe: boolean }) => {
  return (
    <>
      {msg.type === MessageType.TEXT ? (
        <RenderByTypeText msg={msg} isMe={isMe} />
      ) : (
        <RenderByTypeSystem msg={msg} />
      )}
    </>
  );
};
