"use client";

import { menuAccount, tabItems } from "@/constants";
import { useAppContext } from "@/context/app-context";
import {
  Avatar,
  Dropdown,
  IconButton,
  ListDivider,
  Menu,
  MenuButton,
  MenuItem,
  Stack,
  Tab,
  TabList,
  Typography,
  useTheme,
} from "@mui/joy";
import { Settings } from "lucide-react";
import Image from "next/image";

export default function Sidebar() {
  return (
    <div
      className="w-14 px-2.5 py-4 bg-white flex flex-col justify-between items-center  rounded-l-md
    border-r border-gray-200
    "
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
                <item.icon size={item.size} />
              </Tab>
            ))}
          </div>
        </>
      </TabList>

      <div>
        <IconButton variant="outlined">
          <Settings size={20} />
        </IconButton>

        <MenuAccount />
      </div>
    </div>
  );
}

const MenuAccount = () => {
  const { user } = useAppContext();
  const theme = useTheme();
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: Avatar }}
        sx={{
          mt: "20px",
          width: "100%",
          height: "auto",
        }}
      >
        <Avatar
          alt={user.fullName}
          src={user.avatar}
          sx={{
            width: "auto",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        />
      </MenuButton>
      <Menu
        placement="right-end"
        sx={{
          width: "250px",
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{
            p: "6px 12px 0",
          }}
        >
          <Avatar src={user?.avatar || ""} />
          <Stack
            direction="column"
            spacing={1}
            sx={{ alignItems: "flex-start" }}
          >
            <Typography level="body-md" lineHeight={1} sx={{ fontWeight: 700 }}>
              {user?.fullName || ""}
            </Typography>
            <Typography
              level="body-xs"
              lineHeight={1}
              sx={{ fontWeight: 500, color: theme.palette.secondary[200] }}
            >
              {user?.nickname || ""}
            </Typography>
          </Stack>
        </Stack>
        <ListDivider />
        {menuAccount.map((item) => {
          const Icon = item.icon;
          return (
            <MenuItem
              key={item.label}
              sx={{
                fontSize: "14px",
              }}
            >
              <Icon size={item.size} color={theme.palette.primary[800]} />
              {item.label}
            </MenuItem>
          );
        })}
      </Menu>
    </Dropdown>
  );
};
