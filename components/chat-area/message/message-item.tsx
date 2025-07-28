import { Message, MessageRead, MessageType } from "@/types";
import { getDurationDate } from "@/utils";
import { Avatar, Box, Stack, Typography } from "@mui/joy";
import ChatBubble from "./chat-bubble";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useMessageHandler } from "@/context/message-handler-context";

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
  const isShowAvatarAndDate = !msg.group || msg.group.position === "end";
  const isShowName = !msg.group || msg.group.position === "start";

  return (
    <>
      <Stack
        direction="row"
        alignItems="flex-end"
        spacing={1}
        sx={{ flexDirection: isMe ? "row-reverse" : "row", gap: "6px" }}
      >
        <>
          {isShowAvatarAndDate ? (
            <Avatar
              sx={{ width: "34px", height: "34px" }}
              src={msg?.user?.avatar || ""}
            />
          ) : (
            <div className="w-[34px]"></div>
          )}
        </>

        <Box>
          {isShowName && (
            <Typography level="body-sm" sx={{ color: "text.tertiary" }}>
              {msg?.user?.nickname || msg?.user?.fullName}
            </Typography>
          )}

          <ChatBubble message={msg} isMe={isMe} />
        </Box>
      </Stack>
      {isShowAvatarAndDate && (
        <Typography
          level="body-sm"
          sx={{
            color: "text.tertiary",
            textAlign: "center",
            "&.MuiTypography-root": { marginTop: "8px" },
          }}
        >
          {getDurationDate(msg.createdAt)}
        </Typography>
      )}
      {isShowAvatarAndDate && (
        <ShowIsRead
          senderId={msg?.senderId || msg.user.id}
          data={msg.messageRead}
        />
      )}
    </>
  );
};

export const MessageItem = ({ msg, isMe }: { msg: Message; isMe: boolean }) => {
  const { markAsRead } = useMessageHandler();
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
    delay: 300,
  });

  useEffect(() => {
    if (inView) {
      markAsRead(msg.id, msg.chatId);
    }
  }, [inView, msg, markAsRead]);

  return (
    <div className="mb-[2px]" ref={!msg.read ? ref : null}>
      {msg.type !== MessageType.SYSTEM ? (
        <RenderByTypeText msg={msg} isMe={isMe} />
      ) : (
        <RenderByTypeSystem msg={msg} />
      )}
    </div>
  );
};

const ShowIsRead = ({
  data,
  senderId,
}: {
  data: MessageRead[];
  senderId: string;
}) => {
  return (
    <Stack direction="row" justifyContent="flex-end" sx={{ gap: "2px" }}>
      {!!data?.length &&
        data.map((item) => {
          if (senderId === item.user.id) return null;
          return (
            <Avatar
              key={item.id}
              sx={{ width: "12px", height: "12px" }}
              src={item.user.avatar || ""}
            />
          );
        })}
    </Stack>
  );
};
