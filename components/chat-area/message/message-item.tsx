import { Message, MessageRead, MessageType } from "@/types";
import { getDurationDate } from "@/utils";
import { Avatar, Box, Stack, Typography, Tooltip } from "@mui/joy";
import ChatBubble from "./chat-bubble";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useMessageHandler } from "@/context/message-handler-context";

const RenderByTypeSystem = ({ msg }: { msg: Message }) => {
  return (
    <Stack direction="column" alignItems="center" sx={{ my: 2 }}>
      <Typography
        level="body-xs"
        sx={{
          px: 1.5,
          py: 0.5,
          bgcolor: "background.level2",
          borderRadius: "20px",
          color: "text.secondary",
          fontWeight: 600,
          fontSize: "0.75rem",
        }}
      >
        {msg.content} • {getDurationDate(msg.createdAt)}
      </Typography>
    </Stack>
  );
};

const RenderByTypeText = ({ msg, isMe }: { msg: Message; isMe: boolean }) => {
  const position = msg.group?.position;
  const isLastInGroup =
    !position || position === "end" || position === "single";
  const isFirstInGroup =
    !position || position === "start" || position === "single";

  return (
    <Stack
      direction="column"
      sx={{
        width: "100%",
        mb: isLastInGroup ? 2 : 0.5,
      }}
    >
      <Stack
        direction={isMe ? "row-reverse" : "row"}
        spacing={1.5}
        alignItems="flex-end"
        sx={{ width: "100%", px: 2 }}
      >
        {/* Avatar Section */}
        {!isMe ? (
          <Box sx={{ width: 36, display: "flex", flexShrink: 0 }}>
            {isLastInGroup && (
              <Tooltip title={msg?.user?.fullName} variant="soft">
                <Avatar
                  size="sm"
                  variant="soft"
                  src={msg?.user?.avatar || ""}
                  sx={{
                    width: 36,
                    height: 36,
                    boxShadow: "sm",
                    border: "2px solid",
                    borderColor: "background.surface",
                  }}
                />
              </Tooltip>
            )}
          </Box>
        ) : (
          <Box sx={{ width: 12 }} />
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: isMe ? "flex-end" : "flex-start",
            flexGrow: 1,
            minWidth: 0,
          }}
        >
          {isFirstInGroup && !isMe && (
            <Typography
              level="body-xs"
              sx={{
                ml: 0.5,
                mb: 0.5,
                fontWeight: 700,
                color: "text.secondary",
                fontSize: "0.75rem",
              }}
            >
              {msg?.user?.nickname || msg?.user?.fullName}
            </Typography>
          )}

          <ChatBubble message={msg} isMe={isMe} />
        </Box>
      </Stack>

      {isLastInGroup && (
        <Stack
          direction="row"
          justifyContent={isMe ? "flex-end" : "flex-start"}
          sx={{ px: 2, mt: 0.5, ml: isMe ? 0 : 7, mr: isMe ? 2 : 0 }}
        >
          <ShowIsRead
            senderId={msg?.senderId || msg.user.id}
            data={msg.messageRead}
          />
        </Stack>
      )}
    </Stack>
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

  const showRef =
    msg.read || (msg.sendStatus && !msg.sendStatus.includes("sent"));

  return (
    <Box ref={showRef ? null : ref} sx={{ width: "100%" }}>
      {msg.type !== MessageType.SYSTEM ? (
        <RenderByTypeText msg={msg} isMe={isMe} />
      ) : (
        <RenderByTypeSystem msg={msg} />
      )}
    </Box>
  );
};

const ShowIsRead = ({
  data,
  senderId,
}: {
  data: MessageRead[];
  senderId: string;
}) => {
  if (!data?.length) return null;

  return (
    <Stack direction="row" spacing={0.5} sx={{ mt: 0.5 }}>
      {data.map((item) => {
        if (senderId === item?.user?.id) return null;
        return (
          <Tooltip
            key={item.id}
            title={`Đã xem bởi ${item?.user?.fullName}`}
            variant="soft"
          >
            <Avatar
              variant="soft"
              sx={{ width: 14, height: 14, border: "1px solid white" }}
              src={item?.user?.avatar || ""}
            />
          </Tooltip>
        );
      })}
    </Stack>
  );
};
