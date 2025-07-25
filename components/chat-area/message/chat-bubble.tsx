import { Message, SendStatus } from "@/types";
import { Stack, useTheme } from "@mui/joy";
import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import { useMemo } from "react";

export type ChatBubbleProps = {
  message: Message;
  isMe: boolean;
};

const baseSheetStyles = {
  padding: "6px",
  border: "1px solid",
};

const typographyStyles = {
  overflow: "auto",
  "& p": { margin: 0 },
};

export default function ChatBubble(props: ChatBubbleProps) {
  const theme = useTheme();
  const { isMe, message } = props;
  const sheetStyles = useMemo(
    () => [
      {
        ...baseSheetStyles,
        borderColor: theme.palette.common.white,
        borderRadius: isMe ? "0 12px 12px 12px" : "12px 0 12px 12px",
        backgroundColor: isMe
          ? theme.palette.primary[700]
          : theme.palette.secondary[400],
      },
    ],
    [theme, isMe]
  );

  return (
    <Box
      sx={{
        minWidth: "auto",
        ml: "0px !important",
        overflow: "hidden",
      }}
    >
      <Stack sx={{ position: "relative" }} direction="column" alignItems="end">
        <Sheet sx={sheetStyles}>
          <Typography
            sx={[
              {
                ...typographyStyles,
                fontSize: "15px",
                color: isMe
                  ? theme.palette.common.white
                  : theme.palette.common.black,
              },
            ]}
          >
            {message.content}
          </Typography>
        </Sheet>
        {<RenderMessageStatus status={message.sendStatus} />}
      </Stack>
    </Box>
  );
}

const RenderMessageStatus = ({ status }: { status?: SendStatus }) => {
  const getText = (status: SendStatus) => {
    if (status === SendStatus.SENDING) return "Đang gửi";
    if (status === SendStatus.SENT) return "Đã gửi";
    if (status === SendStatus.READ) return "Đã đọc";
    if (status === SendStatus.FAILED) return "Thất bại";
    return;
  };

  return (
    <>
      {status && (
        <Typography
          level="body-xs"
          sx={{
            ...(status === SendStatus.FAILED ? { color: "#D32F2F" } : {}),
            fontWeight: "500",
          }}
        >
          {getText(status)}
        </Typography>
      )}
    </>
  );
};
