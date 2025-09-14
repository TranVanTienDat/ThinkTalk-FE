"use client";

import ListNotification from "@/components/notification";
import InputNotificationSearch from "@/components/notification/input-search";
import { useNotification } from "@/context/notification-context";
import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Stack,
  TabPanel,
  Typography,
  useTheme,
} from "@mui/joy";

export default function NotificationTab() {
  const theme = useTheme();
    const {  unreadCount } = useNotification()
  
  return (
    <TabPanel value={1}>
      {/* search */}
      <Stack direction="column" spacing={3}>
        <InputNotificationSearch />
        <Stack direction="column" spacing={1}>
          <div className="flex justify-start
           items-center gap-4">
          <Typography level="h4"
          sx={{
           width:'fit-content'
          }}>
            Nhận thông báo
          </Typography>
          <Badge badgeContent={unreadCount} variant="solid">
</Badge>
</div>
          <ButtonGroup
            spacing="0.5rem"
            aria-label="spacing button group"
            variant="soft"
          >
            <Button>Tất cả</Button>
            <Button>Chưa đọc</Button>
          </ButtonGroup>
        </Stack>

        <Stack direction="column" spacing={1}>
          <Typography
            level="body-md"
            sx={{
              fontWeight: 600,
              color: theme.palette.secondary[200],
            }}
          >
            Thông báo
          </Typography>
          <Box
            className="h-[calc(100vh-250px)] overflow-y-auto custom-scrollbar "
            sx={{
              "&.MuiBox-root": {
                marginX: "-24px",
              },
            }}
          >
            <ListNotification/>
          </Box>
        </Stack>
      </Stack>
    </TabPanel>
  );
}
