export type DeviceType = {
  type: string;
  device_token: string;
};

export enum UserStatus {
  ON = "online",
  OFF = "offline",
}

export enum MessageType {
  TEXT = "text", // Tin nhắn văn bản
  IMAGE = "image", // Hình ảnh
  VIDEO = "video", // Video
  AUDIO = "audio", // Âm thanh / voice
  FILE = "file", // Tệp đính kèm
  STICKER = "sticker", // Sticker / emoji
  SYSTEM = "system", // Thông báo hệ thống (ví dụ: user rời nhóm)
  REPLY = "reply", // Tin nhắn dạng trả lời
  FORWARD = "forward", // Tin nhắn được chuyển tiếp
  REACTION = "reaction", // Biểu cảm (like, haha, love, v.v.)
  CALL = "call", // Thông tin cuộc gọi (voice/video)
  LOCATION = "location", // Gửi vị trí
  CONTACT = "contact", // Gửi danh bạ
}

export enum SendStatus {
  SENDING = "sending",
  SENT = "sent",
  FAILED = "failed",
  READ = "read",
}

export type UserDetail = {
  id: number | string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
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

export type MsgUserStatus = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  email: string;
  fullName: string;
  nickname: string | null;
  avatar: string | null;
  status: UserStatus;
};

export type MessageStatus = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  status: SendStatus;
  user: MsgUserStatus;
};

export type Message = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  content: string;
  senderId: string;
  chatId: string;
  type: MessageType;
  user: Omit<UserDetail, "accessToken" | "refreshToken">;
  messageStatus: MessageStatus[];
  sendStatus?: SendStatus;
};

export type ChatItem = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  name: string;
  type: "group" | "direct" | string;
  avatar?: string;
  userIds: string[];
  lastMessage: Message;
  isRead?: boolean;
};

export type Meta = {
  page: number;
  totalPage: number;
  total: number;
  limit: number;
};

export interface EmojiIcon {
  emoji: string;
  code: string;
}

export type Params = { id: string };
