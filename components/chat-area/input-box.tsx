"use client";
import { useMessageHandler } from "@/context/message-handler-context";
import { MessageType, Params } from "@/types";
import {
  Box,
  IconButton,
  Sheet,
  Stack,
  styled,
  Textarea,
  Tooltip,
  useTheme,
} from "@mui/joy";
import { ImagePlus, Paperclip, SendHorizonal, Plus } from "lucide-react";
import { useCallback, useState } from "react";
import { IconButtonCustomize } from "../base/button-loading";
import { EmojiPopover } from "./emojis";
import { useRouter } from "next/navigation";

const InputWrapper = styled(Box)(() => ({
  padding: "16px 24px",
  position: "relative",
  background: "transparent",
  width: "100%",
}));

const StyledSheet = styled(Sheet)(({ theme }) => ({
  borderRadius: "24px",
  boxShadow: theme.vars.shadow.md,
  border: `1px solid ${theme.vars.palette.divider}`,
  overflow: "hidden",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  backgroundColor: theme.vars.palette.background.surface,
  "&:focus-within": {
    boxShadow: theme.vars.shadow.lg,
    borderColor: theme.vars.palette.primary[300],
    transform: "translateY(-2px)",
  },
}));

const StyledTextarea = styled(Textarea)(({ theme }) => ({
  border: "none",
  boxShadow: "none",
  backgroundColor: "transparent",
  flex: 1,
  "--Textarea-focusedThickness": "0",
  paddingTop: "12px",
  paddingBottom: "12px",
  fontSize: "1rem",
  lineHeight: 1.5,
  color: theme.vars.palette.text.primary,
  "&::placeholder": {
    color: theme.vars.palette.text.tertiary,
    opacity: 0.7,
  },
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
  const theme = useTheme();
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
    router,
  ]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        handleSubmit();
        return;
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
    <InputWrapper sx={{ backgroundColor: bgColor }}>
      <StyledSheet>
        <Stack direction="row" alignItems="flex-end" sx={{ p: 0.75 }}>
          <Stack direction="row" spacing={0.5} sx={{ pb: 0.5, pl: 0.5 }}>
            <Tooltip title="Tiện ích" variant="soft">
              <IconButton
                size="sm"
                variant="plain"
                color="neutral"
                sx={{ borderRadius: "50%" }}
              >
                <Plus size={20} />
              </IconButton>
            </Tooltip>
            <IconButtonCustomize
              icon={Paperclip}
              sx={{ color: "text.secondary" }}
            />
            <IconButtonCustomize
              icon={ImagePlus}
              sx={{ color: "text.secondary" }}
            />
          </Stack>

          <StyledTextarea
            placeholder="Nhập tin nhắn..."
            minRows={1}
            maxRows={8}
            spellCheck={false}
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <Stack
            direction="row"
            spacing={0.75}
            alignItems="center"
            sx={{ pb: 0.5, pr: 0.5 }}
          >
            <EmojiPopover getEmoji={getEmoji} />
            <IconButton
              variant="solid"
              color="primary"
              onClick={handleSubmit}
              disabled={!messageInput.trim()}
              sx={{
                borderRadius: "50%",
                width: 36,
                height: 36,
                minHeight: 36,
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  transform: "scale(1.1)",
                  boxShadow: theme.vars.shadow.md,
                },
                "&:active": {
                  transform: "scale(0.95)",
                },
              }}
            >
              <SendHorizonal size={18} />
            </IconButton>
          </Stack>
        </Stack>
      </StyledSheet>
    </InputWrapper>
  );
};
