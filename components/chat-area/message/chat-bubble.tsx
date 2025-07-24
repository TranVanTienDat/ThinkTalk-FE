import { Message } from "@/types";
import { useTheme } from "@mui/joy";
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
      <Box sx={{ position: "relative" }}>
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
      </Box>
    </Box>
  );
}
