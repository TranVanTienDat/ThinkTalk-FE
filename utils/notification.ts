import { NotificationType } from "@/types/enum";
import { ChipProps } from "@mui/joy";

type NotificationTitleInfo = {
  title: string;
  color: ChipProps["color"];
};

/**
 * Ánh xạ NotificationType sang tiêu đề thông báo tiếng Việt.
 * @param type - Loại thông báo.
 * @returns Tiêu đề thông báo tương ứng.
 */
export const getNotificationTitle = (
  type: NotificationType
): NotificationTitleInfo => {
  switch (type) {
    case NotificationType.GROUP_CREATED:
      return { title: "Nhóm Mới", color: "success" };
    case NotificationType.ADDED_TO_GROUP:
      return { title: "Thêm vào nhóm", color: "primary" };
    case NotificationType.REMOVED_FROM_GROUP:
      return { title: "Xóa khỏi nhóm", color: "danger" };
    case NotificationType.GROUP_UPDATED:
      return { title: "Cập nhật nhóm", color: "warning" };
    case NotificationType.NEW_ADMIN:
      return { title: "Admin mới", color: "neutral" };
    default:
      console.warn(`Unknown notification type: ${type}`);
      return { title: "Thông báo mới", color: "neutral" };
  }
};
