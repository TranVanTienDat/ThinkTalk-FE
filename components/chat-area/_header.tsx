"use client";
import NewConversation from "@/app/workspace/t/[id]/_components/new-conversation";
import useDocumentTitle from "@/hooks/use-document-title";
import { useConversationInfoStore } from "@/stores/conversation-info-store";
import { Params } from "@/types";
import {
  Avatar,
  Badge,
  IconButton,
  Sheet,
  Stack,
  Typography,
  useTheme,
} from "@mui/joy";
import { EllipsisVertical, Phone, Video } from "lucide-react";
import Link from "next/link";
import { useStore } from "zustand";

export const AvatarCustomize = ({
  src,
  status,
}: {
  src: string;
  status: boolean;
}) => {
  const theme = useTheme();
  return (
    <Link href={"#"} style={{ textDecoration: "none" }}>
      <Badge
        badgeInset="14%"
        size="sm"
        invisible={!status}
        sx={{
          "& .MuiBadge-badge": {
            backgroundColor: theme.palette.primary[700],
          },
        }}
      >
        <Avatar alt={""} src={src ?? ""} size="md" />
      </Badge>
    </Link>
  );
};

export const Header = ({ params }: { params: Params }) => {
  const theme = useTheme();
  const data = useStore(useConversationInfoStore, (state) => state.data);
  const user = data[params.id];
  useDocumentTitle(user?.name ? user.name : "");
  return (
    <Sheet
      sx={{
        boxShadow: "rgba(33, 35, 38, 0.1) 0px 10px 10px -10px",
        padding: "10px 16px",
        // backgroundColor:
        //   bgImgConfig["025c84a0-b438-4c8a-b8e9-8a52a025a7b9"].color,
      }}
    >
      {params.id === "new" ? (
        <NewConversation />
      ) : (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Stack direction="row" spacing={1}>
            <AvatarCustomize src={user?.avatar || ""} status={true} />
            <Stack
              direction="column"
              spacing={1}
              sx={{ alignItems: "flex-start" }}
            >
              <Typography
                level="body-md"
                lineHeight={1}
                sx={{ fontWeight: 700 }}
              >
                {user?.name || ""}
              </Typography>
              <Typography
                level="body-xs"
                lineHeight={1}
                sx={{ fontWeight: 500, color: theme.palette.secondary[200] }}
              >
                {true ? "Đang hoạt động" : "Không hoạt động"}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={1}>
            <IconButton variant="plain" sx={{ borderRadius: "50%" }}>
              <Phone color={theme.palette.primary[700]} size={22} />
            </IconButton>
            <IconButton variant="plain" sx={{ borderRadius: "50%" }}>
              <Video color={theme.palette.primary[700]} />
            </IconButton>

            <IconButton variant="plain" sx={{ borderRadius: "50%" }}>
              <EllipsisVertical color={theme.palette.primary[700]} />
            </IconButton>
          </Stack>
        </Stack>
      )}
    </Sheet>
  );
};
