"use client";

import ListNotification from "@/components/notification";
import InputNotificationSearch from "@/components/notification/input-search";
import {
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
  return (
    <TabPanel value={1}>
      {/* search */}
      <Stack direction="column" spacing={3}>
        <InputNotificationSearch />
        <Stack direction="column" spacing={1}>
          <Typography level="h4">Nhận thông báo</Typography>

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
