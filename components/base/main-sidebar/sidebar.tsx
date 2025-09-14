"use client";

import { tabItems } from "@/constants";
import { Badge, Box, Tab, TabList, useTheme } from "@mui/joy";
import dynamic from "next/dynamic";
import Image from "next/image";
import SettingDrawer from "./setting-drawer";
import { useNotification } from "@/context/notification-context";

const MenuAccount = dynamic(() => import("./menu-account"), { ssr: false });

export default function Sidebar() {
  const theme = useTheme();
    const {  unreadCount } = useNotification()

  return (
    <Box
      className="w-14 px-2.5 py-4  flex flex-col justify-between items-center  rounded-l-md
    border-r border-gray-200
    "
      sx={{
        backgroundColor: theme.palette.background,
      }}
    >
      <TabList
        disableUnderline
        sx={{
          paddingBottom: "16px",
          paddingX: "10px",
          width: "56px",
        }}
      >
        <>
          <Image
            src="/images/icon.png"
            alt="Logo"
            width={56}
            height={56}
            className="mb-12"
          />
          <div className=" space-y-4">
            {tabItems.map((item, index) => (
              <Tab
                disableIndicator
                variant="plain"
                key={index}
                sx={{
                  borderRadius: "6px",
                  width: "100%",
                  paddingX: "8px",
                }}
              >
                {item.label === "Notifications" ? (
                  <Badge badgeContent={unreadCount} max={10} variant="solid" size="sm">
                    <item.icon size={item.size} />
                  </Badge>
                ) : (
                  <item.icon size={item.size} />
                )}
              </Tab>
            ))}
          </div>
        </>
      </TabList>

      <div>
        <SettingDrawer />

        <MenuAccount />
      </div>
    </Box>
  );
}
