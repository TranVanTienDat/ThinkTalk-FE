import { Notification } from "@/types";
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
import NotificationMenu from "./_menu";

const BoxStyled = styled(Box)(({ theme }) => ({
  padding: "8px 0 8px 24px",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  position: "relative",
  "&:hover": {
    backgroundColor: theme.palette.custom.softBlue,
    cursor: "pointer",
  },
}));

const Content = ({ props }: { props: Notification }) => {
  const { name, title, content, isRead, timestamp } = props;
  const theme = useTheme();
  return (
    <Link
      href={""}
      style={{
        opacity: isRead ? 0.5 : 1,
      }}
    >
      <Badge
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        invisible={isRead}
        size="sm"
        sx={{
          "& .MuiBadge-badge": {
            backgroundColor: theme.palette.primary[700],
          },
        }}
      >
        <Stack direction="column">
          <Typography
            level="body-xs"
            sx={{
              color: theme.palette.secondary[100],
              fontWeight: 600,
            }}
          >
            {name}
          </Typography>
          <div className="text-xs font-medium overflow-hidden truncate max-w-[210px]">
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "12px",
                display: "inline-block",
                color: theme.palette.secondary[200],
              }}
              level="body-xs"
              component="span"
            >
              {title}
            </Typography>{" "}
            - {content}
          </div>
          <Typography
            level="body-xs"
            sx={{
              fontWeight: 700,
            }}
          >
            {getDurationDate(timestamp)}
          </Typography>
        </Stack>
      </Badge>
    </Link>
  );
};
const ContentMemo = memo(Content);

const ListNotification = ({ props }: { props: Notification }) => {
  const { name, isRead } = props;
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
      <Avatar
        alt={name}
        src={`https://i.pravatar.cc/150?u=${props.id}`}
        sx={{
          opacity: isRead ? 0.5 : 1,
        }}
      />
      <ContentMemo props={props} />
      <NotificationMenu props={{ ...props, open, onOpenChange }} />
    </BoxStyled>
  );
};

export default memo(ListNotification);
