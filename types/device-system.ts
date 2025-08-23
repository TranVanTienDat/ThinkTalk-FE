import { UserType } from "@/stores/user-store";

export enum DarkMode {
  LIGHT = "light",
  DARK = "dark",
  SYSTEM = "system",
}

export type Device = {
  id: string;
  createdAt: string;
  updatedAt: string;
  type: string;
  info: {
    os: string;
    source: string;
    browser: string;
    version: string;
    platform: string;
  };
  status: null;
};

export type DeviceUser = UserType & {
  devices: Device[];
};
