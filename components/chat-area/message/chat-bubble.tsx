import { Message, SendStatus } from "@/types";
import { Stack, useTheme, Tooltip } from "@mui/joy";
import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import { useMemo } from "react";
import { Check, CheckCheck, Clock, AlertCircle } from "lucide-react";

export type ChatBubbleProps = {
  message: Message;
  isMe: boolean;
};

const typographyStyles = {
  overflowWrap: "break-word",
  wordBreak: "break-word",
  whiteSpace: "pre-wrap",
  "& p": { margin: 0 },
};

export default function ChatBubble(props: ChatBubbleProps) {
  const theme = useTheme();
  const { isMe, message } = props;
  const position = message.group?.position;

  const borderRadius = useMemo(() => {
    if (isMe) {
      if (position === "start") return "20px 20px 4px 20px";
      if (position === "middle") return "20px 4px 4px 20px";
      if (position === "end") return "20px 4px 20px 20px";
      return "20px 20px 4px 20px";
    } else {
      if (position === "start") return "20px 20px 20px 4px";
      if (position === "middle") return "4px 20px 20px 4px";
      if (position === "end") return "4px 20px 20px 20px";
      return "4px 20px 20px 20px";
    }
  }, [isMe, position]);

  return (
    <Box
      sx={{
        maxWidth: "85%",
        position: "relative",
        group: "bubble",
      }}
    >
      <Stack
        sx={{
          position: "relative",
          alignItems: isMe ? "flex-end" : "flex-start",
        }}
        direction="column"
      >
        <Sheet
          variant={isMe ? "solid" : "soft"}
          color={isMe ? "primary" : "neutral"}
          sx={{
            px: 2,
            py: 1.25,
            borderRadius,
            boxShadow: theme.vars.shadow.sm,
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            cursor: "default",
            position: "relative",
            ...(isMe
              ? {
                  backgroundColor: theme.vars.palette.primary.solidBg,
                  color: theme.vars.palette.primary.solidColor,
                }
              : {
                  backgroundColor: theme.vars.palette.neutral.softBg,
                  color: theme.vars.palette.text.primary,
                  "&:hover": {
                    backgroundColor: theme.vars.palette.neutral.softHoverBg,
                  },
                }),
            "&:hover": {
              boxShadow: theme.vars.shadow.md,
              transform: "translateY(-1px)",
            },
          }}
        >
          <Typography
            sx={{
              ...typographyStyles,
              fontSize: "0.9375rem",
              lineHeight: 1.5,
              color: "inherit",
            }}
          >
            {message.content}
          </Typography>
        </Sheet>

        {isMe && message.sendStatus && (
          <Box
            sx={{ mt: 0.5, display: "flex", alignItems: "center", gap: 0.5 }}
          >
            <RenderMessageStatus status={message.sendStatus} />
          </Box>
        )}
      </Stack>
    </Box>
  );
}

const RenderMessageStatus = ({ status }: { status?: SendStatus }) => {
  const statusConfig = {
    [SendStatus.SENDING]: {
      icon: <Clock size={12} />,
      color: "text.tertiary",
      label: "Đang gửi",
    },
    [SendStatus.SENT]: {
      icon: <Check size={14} />,
      color: "text.tertiary",
      label: "Đã gửi",
    },
    [SendStatus.READ]: {
      icon: <CheckCheck size={14} />,
      color: "primary.500",
      label: "Đã xem",
    },
    [SendStatus.FAILED]: {
      icon: <AlertCircle size={14} />,
      color: "danger.500",
      label: "Lỗi gửi tin",
    },
  };

  const config = status ? statusConfig[status] : null;

  if (!config) return null;

  return (
    <Tooltip title={config.label} variant="soft" size="sm">
      <Box sx={{ color: config.color, display: "flex", alignItems: "center" }}>
        {config.icon}
      </Box>
    </Tooltip>
  );
};
