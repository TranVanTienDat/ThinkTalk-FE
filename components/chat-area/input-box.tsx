import { Box, IconButton, Sheet, Stack, styled, Textarea } from "@mui/joy";
import { ImagePlus, Paperclip, SendHorizonal } from "lucide-react";
import { useCallback, useState } from "react";
import { IconButtonCustomize } from "../base/button-loading";
import { EmojiPopover } from "./emojis";
import { bgImgConfig } from "@/constants/chat.config";

const SheetStyles = styled(Sheet)(() => ({
  width: "100%",
  position: "sticky",
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
}));

const TextareaStyles = styled(Textarea)(({ theme }) => ({
  border: "none",
  boxShadow: "none",
  outline: "none",
  color: theme.palette.custom.textInputQuest,
  width: "100%",
  px: "8px",
  pr: "24px",
  "--Textarea-focusedThickness": "0",
}));

export const InputBox = () => {
  const [messageInput, setMessageInput] = useState("");

  const handleSubmit = useCallback(() => {
    if (messageInput.trim() === "") return;

    setMessageInput("");
  }, [messageInput]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (
        event.key === "Enter" &&
        !event.shiftKey &&
        !event.ctrlKey &&
        !event.altKey &&
        !event.metaKey
      ) {
        event.preventDefault();
        handleSubmit();
        return;
      }
      if (event.key === "Enter" && event.ctrlKey) {
        event.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  return (
    <SheetStyles
      sx={{
        backgroundColor:
          bgImgConfig["025c84a0-b438-4c8a-b8e9-8a52a025a7b9"].color,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{
          padding: "12px 10px",
        }}
      >
        <Box className="mb-auto flex">
          <IconButtonCustomize icon={Paperclip} />
          <IconButtonCustomize icon={ImagePlus} />
        </Box>
        <Box sx={{ position: "relative", width: "100%" }}>
          <TextareaStyles
            minRows={1}
            maxRows={8}
            spellCheck={false}
            size="md"
            variant="soft"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: "0",
              right: "0",
              zIndex: 1000,
            }}
          >
            <EmojiPopover />
          </Box>
        </Box>
        <IconButton variant="soft" onClick={handleSubmit}>
          <SendHorizonal />
        </IconButton>
      </Stack>
    </SheetStyles>
  );
};
