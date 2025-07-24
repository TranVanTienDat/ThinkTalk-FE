import dayjs from "dayjs";
export const mappingNotificationType = {
  message: "Thống báo Tin Nhắn",
  friend_request: "Thong báo Lời Mời Kết Bạn",
  group_invite: "Thông báo Lời Mời Tham Gia Nhóm",
  system: "Thông báo Hệ Thống",
};

export const getDurationDate = (dateString: string) => {
  const now = dayjs();
  const date = dayjs(dateString);
  const diffMinutes = now.diff(date, "minute");
  const diffHours = now.diff(date, "hour");
  const diffDays = now.diff(date, "day");

  if (diffMinutes < 60) return `${diffMinutes} phút trước`;

  if (diffHours < 24) return `${diffHours} giờ trước`;

  if (diffDays <= 3) return `${diffDays} ngày trước`;

  return date.format("DD/MM/YYYY");
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
