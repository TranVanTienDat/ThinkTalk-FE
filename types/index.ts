export type DeviceType = {
  type: string;
  device_token: string;
};

export enum UserStatus {
  ON = "online",
  OFF = "offline",
}

export type UserDetail = {
  id: number | string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  password: string;
  fullName: string;
  nickname: string;
  avatar: string;
  accessToken: string;
  refreshToken: string;
  status?: UserStatus;
  devices?: DeviceType;
};

type NotificationType =
  | "message"
  | "friend_request"
  | "group_invite"
  | "system";
export type Notification = {
  id: number;
  title: string;
  content: string;
  isRead: boolean;
  timestamp: string; // ISO date string
  type: NotificationType;
  avatar?: string;
  name?: string;
};

export type Conversation = {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string; // ISO date string
  unreadCount: number;
  isGroup: boolean;
  createdAt: string;
  updatedAt?: string;
  isRead: boolean;
};
