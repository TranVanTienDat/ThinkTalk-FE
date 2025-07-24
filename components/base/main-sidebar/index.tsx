import { Tabs } from "@mui/joy";
import Sidebar from "./sidebar";
import ConversationTab from "./conversation-tab";
import NotificationTab from "./notification-tab";
import { memo } from "react";

const MainSidebar = () => {
  return (
    <Tabs
      aria-label="Vertical tabs"
      orientation="vertical"
      sx={{
        width: 350,
        borderRadius: "14px",
        backgroundColor: "white",
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
