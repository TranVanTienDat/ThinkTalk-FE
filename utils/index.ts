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
