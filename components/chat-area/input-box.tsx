"use client";
import { useMessageHandler } from "@/context/message-handler-context";
import { MessageType, Params } from "@/types";
import { Box, IconButton, Sheet, Stack, styled, Textarea } from "@mui/joy";
import { ImagePlus, Paperclip, SendHorizonal } from "lucide-react";
import { useCallback, useState } from "react";
import { IconButtonCustomize } from "../base/button-loading";
import { EmojiPopover } from "./emojis";
import { useRouter } from "next/navigation";

const SheetStyles = styled(Sheet)(() => ({
  width: "100%",
  position: "sticky",
  height: "60px",
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
}));

const TextareaStyles = styled(Textarea)(({ theme }) => ({
  border: "none",
  boxShadow: "none",
  outline: "none",
  color: theme.palette.secondary[100],
  width: "100%",
  px: "8px",
  pr: "24px",
  "--Textarea-focusedThickness": "0",
}));

export const InputBox = ({
  params,
  scrollToBottom = () => {},
  bgColor,
}: {
  params: Params;
  scrollToBottom?: () => void;
  bgColor?: string;
}) => {
  const { updateHandler, getPrivateChatIdBetweenUsers } = useMessageHandler();
  const router = useRouter();
  const [messageInput, setMessageInput] = useState("");
  const handleSubmit = useCallback(async () => {
    if (messageInput.trim() === "") return;
    try {
      updateHandler({
        chatId: params.id,
        message: messageInput.trim(),
        type: MessageType.TEXT,
      });

      if (params.id === "new" && getPrivateChatIdBetweenUsers?.()) {
        router.replace(`/workspace/t/${getPrivateChatIdBetweenUsers()}`);
      }
      setMessageInput("");

      setTimeout(() => {
        scrollToBottom();
      }, 0);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }, [
    messageInput,
    params.id,
    updateHandler,
    getPrivateChatIdBetweenUsers,
    scrollToBottom,
  ]);

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

  const getEmoji = useCallback(
    (emoji: string) => {
      setMessageInput((prev) => prev + emoji);
    },
    [setMessageInput]
  );

  return (
    <SheetStyles
      sx={{
        backgroundColor: bgColor,
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
        <Box className="mb-auto flex gap-2">
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
            data-emoji-input="unicode"
          />
          <Box
            sx={{
              position: "absolute",
              bottom: "0",
              right: "0",
              zIndex: 1000,
            }}
          >
            <EmojiPopover getEmoji={getEmoji} />
          </Box>
        </Box>
        <IconButton variant="soft" onClick={handleSubmit}>
          <SendHorizonal />
        </IconButton>
      </Stack>
    </SheetStyles>
  );
};
