import { notification, NotificationArgsProps } from "antd";
type ContentType = {
  title: string;
  description: string;
  placement?: NotificationArgsProps["placement"];
};
export const useNotification = () => {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (content: ContentType) => {
    api.error({
      message: content.title,
      description: content.description,
      placement: content.placement || "topRight",
    });
  };

  return { contextHolder, openNotification };
};
