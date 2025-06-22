import { conversationMockData } from "@/constants/mock-data";
import { Conversation } from "@/types";
import { getDurationDate } from "@/utils";
import {
  Avatar,
  Badge,
  Box,
  Stack,
  styled,
  Typography,
  useTheme,
} from "@mui/joy";
import Link from "next/link";
import { memo, useCallback, useState } from "react";
import ConversationMenu from "./_menu";

const BoxStyled = styled(Box)(({ theme }) => ({
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

const Content = ({ props }: { props: Conversation }) => {
  const theme = useTheme();
  const { name, isRead, createdAt } = props;

  return (
    <Stack
      direction="column"
      sx={{ alignItems: "flex-start", justifyContent: "space-evenly" }}
    >
      <Typography
        className="truncate"
        level="body-lg"
        sx={{
          fontSize: "15px",
          fontWeight: 600,
          maxWidth: "200px",
          color: theme.palette.secondary[100],
        }}
      >
        {name}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography
          level="h1"
          className="truncate"
          sx={[
            isRead
              ? {
                  opacity: 0.4,
                  fontWeight: 500,
                }
              : {
                  opacity: 1,
                  fontWeight: 700,
                  color: theme.palette.secondary[100],
                },
            {
              maxWidth: "130px",
              fontSize: "13px",
            },
          ]}
        >
          {props.lastMessage}
        </Typography>
        <Typography
          level="body-xs"
          sx={[
            {
              lineHeight: 1,
              ml: 0.5,
              color: theme.palette.secondary[300],
              fontWeight: 500,
            },
          ]}
        >
          {getDurationDate(createdAt)}
        </Typography>
      </Box>
    </Stack>
  );
};

const ConversationItem = ({ props }: { props: Conversation }) => {
  const theme = useTheme();
  const { name, isRead, avatar } = props;
  const [open, setOpen] = useState(false);

  const onOpenChange = useCallback(
    (event: React.SyntheticEvent | null, isOpen: boolean) => {
      setOpen(isOpen);
    },
    []
  );

  return (
    <BoxStyled
      sx={
        !open
          ? {
              "&:hover .MuiIconButton-root": {
                display: "flex",
              },
              "& .MuiIconButton-root": {
                display: "none",
              },
            }
          : undefined
      }
    >
      <Avatar alt={name} src={avatar} />
      <Link href={`/workspace/t/${props.id}`}>
        <Content props={props} />
      </Link>
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

      <ConversationMenu props={{ ...props, open, onOpenChange }} />
    </BoxStyled>
  );
};

const ConversationItemMemo = memo(ConversationItem);

const ListConversation = () => {
  return (
    <Box
      className="h-[calc(100vh-186px)] overflow-y-auto custom-scrollbar"
      sx={{
        "&.MuiBox-root": {
          marginX: "-16px",
        },
      }}
    >
      {conversationMockData.map((co) => (
        <ConversationItemMemo key={co.id} props={co} />
      ))}
    </Box>
  );
};

export default memo(ListConversation);
