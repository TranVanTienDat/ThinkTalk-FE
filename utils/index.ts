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

export const getDurationDate = (dateString: string) => {
  // Parse input as UTC
  const inputDate = dayjs(dateString).utc(true);
  // Current time in UTC
  const now = dayjs().utc();

  if (inputDate.isAfter(now)) {
    return "0 phút trước";
  }

  const diffMinutes = now.diff(inputDate, "minute");
  const diffHours = now.diff(inputDate, "hour");
  const diffDays = now.diff(inputDate, "day");

  if (diffMinutes < 60) return `${diffMinutes} phút trước`;
  if (diffHours < 24) return `${diffHours} giờ trước`;
  if (diffDays <= 3) return `${diffDays} ngày trước`;

  return inputDate.local().format("DD/MM/YYYY HH:mm");
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
