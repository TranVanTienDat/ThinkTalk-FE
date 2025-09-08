import { notification, NotificationArgsProps } from "antd";

 type NotificationType = "success" | "info" | "warning" | "error";   
type ContentType = {
  title: string;
  description?: string;
  placement?: NotificationArgsProps["placement"];
    type?: NotificationType;    
};
export const useNotification = () => {
  const [api, contextHolder] = notification.useNotification();
        const openNotification = (content: ContentType) => {
          const { type = "error", title, description, placement = "topRight" } =  content         
    api[type]({
      message: title,
      description: description,
      placement: placement,
    });
  };

  return { contextHolder, openNotification };
};
