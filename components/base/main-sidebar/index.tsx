"use client";
import { Tabs, useTheme } from "@mui/joy";
import Sidebar from "./sidebar";
import ConversationTab from "./conversation-tab";
import NotificationTab from "./notification-tab";
import { memo } from "react";

const MainSidebar = () => {
  const theme = useTheme();
  return (
    <Tabs
      aria-label="Vertical tabs"
      orientation="vertical"
      sx={{
        width: 350,
        borderRadius: "14px",
        backgroundColor: theme.palette.background,
      }}
    >
      {/* sidebar */}
      <Sidebar />

      {/* panel right */}
      <ConversationTab />
      <NotificationTab />
    </Tabs>
  );
};

export default memo(MainSidebar);
