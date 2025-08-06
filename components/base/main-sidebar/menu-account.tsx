"use client";

import { menuAccount } from "@/constants";
import { useAppContext } from "@/context/app-context";
import { useLogout } from "@/hooks/use-logout";
import { useNotification } from "@/hooks/use-notification";
import { UserDetail } from "@/types";
import { getDevice } from "@/utils/getDevice";
import {
  Avatar,
  Dropdown,
  ListDivider,
  Menu,
  MenuButton,
  MenuItem,
  Stack,
  Typography,
  useTheme,
} from "@mui/joy";
import { DeviceUUID } from "device-uuid";
import { useCallback, useEffect, useRef, useState } from "react";
import Loading from "../Loading";

export default function MenuAccount() {
  const { user } = useAppContext();
  const theme = useTheme();
  const { isPending, mutateAsync } = useLogout();
  const { contextHolder, openNotification } = useNotification();
  const [key, setKey] = useState("");
  const deviceInfoRef = useRef({});
  useEffect(() => {
    const du = new DeviceUUID().parse();
    deviceInfoRef.current = { device_token: getDevice(du) };
  }, []);

  const handleLogout = async () => {
    try {
      await mutateAsync({ ...deviceInfoRef.current });
    } catch (error: any) {
      openNotification({
        title: "Đăng xuất bị lỗi",
        description: error?.data?.message || error?.message,
      });
    }
  };

  const handleFunc = useCallback((key: string) => {
    setKey(key);
    switch (key) {
      case "logout":
        handleLogout();
    }
  }, []);

  return (
    <>
      {contextHolder}
      <Dropdown>
        <MenuButton
          slots={{ root: Avatar }}
          sx={{
            mt: "20px",
            width: "35px",
            height: "35px",
          }}
        >
          <Avatar
            alt={user.fullName}
            src={user.avatar}
            sx={{
              width: "35px",
              height: "35px",
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
          <Header user={user} loading={isPending} />
          <ListDivider />
          {menuAccount.map((item) => {
            const Icon = item.icon;
            return (
              <MenuItem
                key={item.label}
                sx={{
                  fontSize: "14px",
                }}
                onClick={() => handleFunc(item.key)}
                disabled={key === item.key && isPending}
              >
                <Icon size={item.size} color={theme.palette.primary[800]} />
                {item.label}
              </MenuItem>
            );
          })}
        </Menu>
      </Dropdown>
    </>
  );
}

const Header = ({ user, loading }: { user: UserDetail; loading: boolean }) => {
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      spacing={1}
      justifyContent="space-between"
      alignItems="center"
      sx={{
        p: "12px 12px 0",
      }}
    >
      <Stack direction="row" spacing={1}>
        <Avatar
          sx={{
            width: "35px",
            height: "35px",
          }}
          src={user?.avatar || ""}
        />
        <Stack direction="column" spacing={1} sx={{ alignItems: "flex-start" }}>
          <Typography
            level="body-sm"
            textColor={theme.palette.secondary[100]}
            lineHeight={1}
            sx={{ fontWeight: 700 }}
          >
            {user?.fullName || ""}
          </Typography>
          <Typography
            level="body-xs"
            lineHeight={1}
            textColor={theme.palette.secondary[200]}
            sx={{ fontWeight: 500 }}
          >
            {user?.nickname || ""}
          </Typography>
        </Stack>
      </Stack>

      {loading && <Loading type="area" />}
    </Stack>
  );
};
