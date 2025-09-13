import { UserType } from "@/stores/user-store";
import { NotificationType } from "./enum";

export type DeviceType = {
  type: string;
  device_token: string;
  info: Record<string, any>;
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
  id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  fullName: string;
  nickname: string;
  avatar: string;
  accessToken: string;
  refreshToken: string;
  status?: UserStatus;
  devices?: DeviceType;
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

export type MessageRead = {
  id: string;
  createdAt: string;
  updatedAt: string;
  user: MsgUserStatus;
};

export type Member = {
  createdAt: string;
  updatedAt: string;
  role: "member" | "admin";
  user: UserType;
};

export type GroupPosition = "start" | "end" | "middle" | "single";
export type ChatItemType = "group" | "private";
export enum ChatRole {
  ADMIN = "admin",
  MEMBER = "member",
}

export type Message = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  content: string;
  senderId: string;
  chatId: string;
  type: MessageType;
  user: UserType;
  messageRead: MessageRead[];
  sendStatus?: SendStatus;
  chat?: Omit<ChatItem, "lastMessage">;
  group?: { position: GroupPosition };
  read?: boolean;
};

export type ChatItem = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  name: string;
  type: ChatItemType;
  avatar?: string;
  userIds: string[];
  lastMessage: Message;
  isRead?: boolean;
  chatMembers: Member[];
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
export type ApiParams = { page: number; limit: number };

export type UserPrivateConversation = UserType & {
  chatId?: string;
};



export type Notification = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  type: NotificationType;
  isRead: boolean;
  receiverId: UserType; 
  target?: string | null;
  actor?: string | null;
  message: string;
  data?: Record<string, any> | null;
};
