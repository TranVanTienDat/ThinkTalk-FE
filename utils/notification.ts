import { NotificationType } from "@/types/enum";
import { ChipProps } from "@mui/joy";

type NotificationTitleInfo = {
  title: string;
  color: ChipProps["color"];
};

/**
 * Maps NotificationType to an English notification title.
 * @param type - Loại thông báo.
 * @returns The corresponding notification title.
 */
export const getNotificationTitle = (
  type: NotificationType
): NotificationTitleInfo => {
  switch (type) {
    case NotificationType.GROUP_CREATED:
      return { title: "New Group", color: "success" };
    case NotificationType.ADDED_TO_GROUP:
      return { title: "Added to Group", color: "primary" };
    case NotificationType.REMOVED_FROM_GROUP:
      return { title: "Removed from Group", color: "danger" };
    case NotificationType.GROUP_UPDATED:
      return { title: "Group Updated", color: "warning" };
    case NotificationType.NEW_ADMIN:
      return { title: "New Admin", color: "neutral" };
    default:
      console.warn(`Unknown notification type: ${type}`);
      return { title: "New Notification", color: "neutral" };
  }
};
