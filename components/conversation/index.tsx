import { useAppContext } from "@/context/app-context";
import { useMessageHandler } from "@/context/message-handler-context";
import { useConversations } from "@/hooks/use-conversations";
import { useConversationInfoStore } from "@/stores/conversation-info-store";
import useConversationTemp from "@/stores/conversationTemp";
import { ChatItem, ChatItemType, Member, Message } from "@/types";
import { getDurationDate, hasPassedTwoDays } from "@/utils";
import {
  Avatar,
  Badge,
  Box,
  Stack,
  styled,
  Typography,
  useTheme,
} from "@mui/joy";
import { X } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useStore } from "zustand";
import { IconButtonCustomize } from "../base/button-loading";
import Loading from "../base/Loading";
import ConversationMenu from "./_menu";
import { ConversationLoading } from "./skeleton-loading";

export const BoxStyled = styled(Box)(({ theme }) => ({
  padding: "8px",
  paddingRight: " 16px",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  position: "relative",
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: theme.palette.custom.softBlue,
    cursor: "pointer",
  },
}));

const LastMessageItem = ({
  isRead,
  lastMsg,
}: {
  isRead: boolean;
  lastMsg: Message;
}) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography
        level="h1"
        className="truncate"
        textColor={isRead ? theme.palette.secondary[300] : undefined}
        sx={[
          {
            fontWeight: isRead ? 500 : 700,
            maxWidth: "130px",
            fontSize: "13px",
            flex: 1,
          },
        ]}
      >
        {lastMsg?.content}
      </Typography>
      <Typography
        level="body-xs"
        textColor={isRead ? theme.palette.secondary[300] : undefined}
        sx={[
          {
            lineHeight: 1,
            ml: 0.5,
            fontWeight: 500,
          },
        ]}
      >
        {getDurationDate(lastMsg?.createdAt)}
      </Typography>
    </Box>
  );
};

const Content = ({
  name,
  id,
  isRead,
  lastMsg,
}: {
  name: string;
  id: string;
  isRead: boolean;
  lastMsg: Message;
}) => {
  const theme = useTheme();

  return (
    <Link href={`/workspace/t/${id}`} className="w-full">
      <Stack
        direction="column"
        sx={{ alignItems: "flex-start", justifyContent: "space-evenly" }}
      >
        <Typography
          className="truncate"
          level="body-lg"
          sx={{
            fontSize: "14px",
            fontWeight: 600,
            maxWidth: "200px",
            color: theme.palette.secondary[100],
          }}
        >
          {name}
        </Typography>

        <LastMessageItem isRead={isRead} lastMsg={lastMsg} />
      </Stack>
    </Link>
  );
};

const ConversationItem = ({
  name,
  isRead = true,
  avatar,
  id,
  lastMsg,
  isActive,
  type,
  members,
}: {
  name: string;
  isRead?: boolean;
  avatar?: string;
  id: string;
  lastMsg: Message;
  isActive: boolean;
  type: ChatItemType;
  members: Member[];
}) => {
  const { user } = useAppContext();
  const theme = useTheme();
  const [key, setKey] = useState("");
  const [open, setOpen] = useState(false);
  const onOpenChange = useCallback(
    (event: React.SyntheticEvent | null, isOpen: boolean) => {
      if (key === "invitation" && !isOpen) return;
      setOpen(isOpen);
    },
    [key]
  );

  const menuMemo = useMemo(() => {
    return (
      <ConversationMenu props={{ id, type, open, onOpenChange, key, setKey }} />
    );
  }, [onOpenChange, open, id, type, key, setKey]);

  const getMyFriend = () => {
    return members.find((m) => m.user.id !== user.id)?.user;
  };
  return (
    <BoxStyled
      sx={[
        !open && {
          "&:hover .MuiIconButton-root": {
            display: "flex",
          },
          "& .MuiIconButton-root": {
            display: "none",
          },
        },
        {
          backgroundColor: isActive
            ? theme.palette.custom.softBlue
            : "transparent",
        },
      ]}
    >
      <Avatar
        alt={name}
        src={type === "group" ? avatar : getMyFriend()?.avatar}
        sx={{
          backgroundColor: theme.palette.custom.softBlue,
        }}
      />
      <Content
        id={id}
        name={type === "group" ? name : getMyFriend()?.fullName ?? ""}
        isRead={isRead}
        lastMsg={lastMsg}
      />
      <Badge
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        invisible={isRead}
        size="sm"
        sx={{
          "& .MuiBadge-badge": {
            backgroundColor: theme.palette.primary[700],
          },
          marginLeft: "auto",
        }}
      />

      {menuMemo}
    </BoxStyled>
  );
};
const ConversationItemMemo = memo(ConversationItem);

const ConversationItemTemp = () => {
  const theme = useTheme();
  const router = useRouter();
  const path = usePathname();
  const { getUserNewGroup } = useMessageHandler();
  const { conversationTemp, setConversationTemp } = useStore(
    useConversationTemp,
    (state) => state
  );

  useEffect(() => {
    if (path.includes("workspace/t/new")) {
      setConversationTemp(true);
      return;
    }
    getUserNewGroup([]);
    setConversationTemp(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  return (
    <>
      {conversationTemp && (
        <Link href={"workspace/new"}>
          <BoxStyled
            sx={[
              {
                backgroundColor: theme.palette.custom.softBlue,
                padding: "16px 10px",
                fontWeight: 600,
                fontSize: "14px",
              },
            ]}
          >
            <Avatar alt="" variant="outlined" />
            {conversationTemp.name}
            <IconButtonCustomize
              icon={X}
              variant="outlined"
              sx={{
                position: "absolute",
                right: "10px",
                borderRadius: "50%",
              }}
              handleOnClick={() => {
                router.back();
                setConversationTemp(false);
              }}
            />
          </BoxStyled>
        </Link>
      )}
    </>
  );
};
const ConversationItemTempMemo = memo(ConversationItemTemp);

type RenderConversationProps = {
  dataFlat: any[];
  isLoading: boolean;
  hasNextPage: boolean;
  bottomRef: (node?: Element | null) => void;
};

const RenderConversation = ({
  dataFlat,
  isLoading,
  hasNextPage,
  bottomRef,
}: RenderConversationProps) => {
  const { id } = useParams();
  return (
    <>
      {dataFlat.map((co: ChatItem) => (
        <ConversationItemMemo
          key={co.id}
          id={co.id}
          name={co.name}
          isRead={co?.isRead}
          avatar={co?.avatar}
          lastMsg={co.lastMessage}
          isActive={(id as string) === co.id}
          type={co.type}
          members={co.chatMembers}
        />
      ))}
      {isLoading && <ConversationLoading />}
      {hasNextPage && (
        <div ref={bottomRef} className="my-3">
          <Loading type="area" />
        </div>
      )}
    </>
  );
};

const ListConversation = () => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useConversations();
  const { addInfo, data: conversationStore } = useStore(
    useConversationInfoStore,
    (state) => state
  );
  const dataFlat = data?.pages.flatMap((page) => page.data) || [];
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage?.();
    }
  }, [inView, fetchNextPage]);

  useEffect(() => {
    dataFlat.forEach((co) => {
      if (
        !conversationStore[co.id] ||
        hasPassedTwoDays(conversationStore[co.id].lastUpdated)
      ) {
        addInfo(co.id, {
          ...co,
          lastUpdated: new Date().toISOString(),
        });
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationStore, dataFlat]);

  return (
    <Box
      className="h-[calc(100vh-186px)] overflow-y-auto custom-scrollbar"
      sx={{
        "&.MuiBox-root": {
          marginX: "-16px",
        },
      }}
    >
      <ConversationItemTempMemo />
      <RenderConversation
        dataFlat={dataFlat}
        isLoading={isLoading}
        hasNextPage={hasNextPage}
        bottomRef={ref}
      />
    </Box>
  );
};

export default memo(ListConversation);
