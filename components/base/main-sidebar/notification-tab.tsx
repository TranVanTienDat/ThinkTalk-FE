"use client";

import ListNotification from "@/components/notification";
import InputNotificationSearch from "@/components/notification/input-search";
import { useFilterNotification } from "@/hooks/use-filter-notification";
import {
  Box,
  Button,
  Stack,
  TabPanel,
  Typography,
  useTheme
} from "@mui/joy";

export default function NotificationTab() {
    const theme = useTheme();
   const {filter,setFilter} = useFilterNotification()


 
  return (
    <TabPanel value={1}>
      {/* search */}
      <Stack direction="column" spacing={3}>
        <InputNotificationSearch />
        <Stack direction="column" spacing={1}>
          <Typography level="h4">
            Nhận thông báo
          </Typography>
         <Stack direction={"row"} spacing={1} >
            <Button
              onClick={() => setFilter("all")}
              variant={filter === "all" ? "soft" : "plain"}
            >
              Tất cả
            </Button>
            <Button
              onClick={() => setFilter("unread")}
              variant={filter === "unread" ? "soft" : "plain"}
            >
              Chưa đọc
            </Button>
          </Stack>
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
            <ListNotification />
          </Box>
        </Stack>
      </Stack>
    </TabPanel>
  );
}
