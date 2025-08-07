import { UserType } from "@/stores/user-store";
import { GroupPosition, Message, MessageType, SendStatus } from "@/types";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);
export const mappingNotificationType = {
  message: "Thống báo Tin Nhắn",
  friend_request: "Thong báo Lời Mời Kết Bạn",
  group_invite: "Thông báo Lời Mời Tham Gia Nhóm",
  system: "Thông báo Hệ Thống",
};

export const getDurationDate = (dateInput: string | Date) => {
  // Convert input to dayjs object, assume UTC
  const inputDate = dayjs.utc(dateInput).tz("Asia/Ho_Chi_Minh");
  const now = dayjs().tz("Asia/Ho_Chi_Minh");

  if (inputDate.isAfter(now)) {
    return "0 phút trước";
  }

  const diffMinutes = now.diff(inputDate, "minute");
  const diffHours = now.diff(inputDate, "hour");
  const diffDays = now.diff(inputDate, "day");

  if (diffMinutes < 60) return `${diffMinutes} phút trước`;
  if (diffHours < 24) return `${diffHours} giờ trước`;
  if (diffDays <= 3) return `${diffDays} ngày trước`;

  return inputDate.format("DD/MM/YYYY HH:mm");
};

export const emojiWithCode = (e: string) => {
  const codePoints = Array.from(e).map(
    (c) => "U+" + c.codePointAt(0)!.toString(16).toUpperCase()
  );
  return {
    emoji: e,
    code: codePoints.join(" "),
  };
};

export const hasPassedTwoDays = (date: string): boolean => {
  const now = dayjs();
  const dateObj = dayjs(date);
  const diffDays = now.diff(dateObj, "day");
  return diffDays >= 3;
};

export const sortDateHandler = (a: string, b: string) => {
  const dateA = new Date(a);
  const dateB = new Date(b);
  return dateA.getTime() - dateB.getTime();
};

export function groupMessages(messages: Message[]): any[] {
  const TIME_THRESHOLD = 60 * 1000; // 1 phút

  return messages.map((current, index, array) => {
    // Tin nhắn hệ thống không nhóm
    if (current.type === "system") {
      return { ...current, group: undefined };
    }

    const prev = array[index - 1];
    const next = array[index + 1];

    // Kiểm tra điều kiện nhóm với tin nhắn trước
    const shouldGroupWithPrev =
      prev &&
      current.senderId === prev.senderId &&
      new Date(current.createdAt).getTime() -
        new Date(prev.createdAt).getTime() <
        TIME_THRESHOLD;

    // Kiểm tra điều kiện nhóm với tin nhắn sau
    const shouldGroupWithNext =
      next &&
      current.senderId === next.senderId &&
      new Date(next.createdAt).getTime() -
        new Date(current.createdAt).getTime() <
        TIME_THRESHOLD;

    let position: GroupPosition | undefined;

    if (shouldGroupWithPrev || shouldGroupWithNext) {
      if (shouldGroupWithPrev && shouldGroupWithNext) {
        position = "middle";
      } else if (shouldGroupWithPrev) {
        position = "end";
      } else if (shouldGroupWithNext) {
        position = "start";
      } else {
        position = "single";
      }
    }

    return {
      ...current,
      group: position ? { position } : undefined,
    };
  });
}

type CreateMessageInput = {
  chatId: string;
  content: string;
  type: MessageType;
  user: UserType;
  msgId: string;
};

export function createMessage({
  chatId,
  content,
  type,
  user,
  msgId,
}: CreateMessageInput): Message {
  return {
    id: msgId,
    chatId,
    content,
    type,
    user,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null,
    senderId: user.id,
    messageRead: [],
    sendStatus: SendStatus.SENDING,
  };
}
