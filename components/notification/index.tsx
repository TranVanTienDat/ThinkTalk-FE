import { useNotification } from "@/context/notification-context";
import { Notification } from "@/types";
import { getDurationDate } from "@/utils";
import { getNotificationTitle } from "@/utils/notification";
import {
  Avatar,
  Badge,
  Box,
  Stack,
  styled,
  Typography,
  useTheme
} from "@mui/joy";
import { Tag } from "antd";
import Link from "next/link";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Loading from "../base/Loading";
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
  const { message, type, updatedAt, isRead, data } = props;
const {markAsRead} = useNotification()
  const theme = useTheme();
  return (
    <Link
      href={`/workspace/t/${data?.id}`}
      style={{
        opacity: isRead ? 0.5 : 1,
      }}

      onClick={() => markAsRead(props.id)}
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
            {data?.name}
          </Typography>
          <Typography
            level="body-xs"
            sx={{
              fontWeight: 500,
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "250px", // Giới hạn chiều rộng để ellipsis hoạt động tốt
            }}
          >
            <Tag color={getNotificationTitle(type).color} style={{ marginRight: 4 }}>
              {getNotificationTitle(type).title}
            </Tag>
            - {message}
          </Typography>
          <Typography
            level="body-xs"
            sx={{
              fontWeight: 700,
            }}
          >
            {getDurationDate(updatedAt)}
          </Typography>
        </Stack>
      </Badge>
    </Link>
  );
};
const ContentMemo = memo(Content);

const NotificationRender = ({ props }: { props: Notification }) => {
  const { data, isRead } = props;
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
        alt={data?.name}
        src={data?.avatar}
        sx={{
          opacity: isRead ? 0.5 : 1,
        }}
      />
      <ContentMemo props={props} />
      <NotificationMenu props={{ ...props, open, onOpenChange }} />
    </BoxStyled>
  );
};

export default function ListNotification() {

  const {  query } = useNotification()
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading
  } = query

    const { ref, inView } = useInView({
    threshold: 0,
  });


   useEffect(() => {
      if (inView) {
        fetchNextPage?.();
      }
    }, [inView, fetchNextPage]);


  if (isLoading) {
    return (
      <Loading />
    );
  }

  return (
    <Box>
      {data?.pages.map((page, i) => (
        <React.Fragment key={i}>
          {page.data.map((notification: Notification) => (
            <NotificationRender key={notification.id} props={notification} />
          ))}
        </React.Fragment>
      ))}
            {hasNextPage && (
              <div ref={ref} className="my-3">
                <Loading />
              </div>
            )}
    </Box>
  );
}
