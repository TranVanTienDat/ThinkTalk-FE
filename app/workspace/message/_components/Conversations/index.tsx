"use client";
import { TabsContent } from "@/components/ui/tabs";
import { ChatItem } from "../MessagePanel";
const chatData = Array.from({ length: 20 }, (_, index) => ({
  avatar: ![2, 5, 7, 12, 16].includes(index)
    ? `https://github.com/example${index + 1}.png`
    : "",
  name: index % 2 === 0 ? `Nhóm ${index + 1}` : `User ${index + 1}`,
  lastMessage: `Đây là một tin nhắn từ nhóm ${index + 1}`,
  timestamp: `${String(8 + Math.floor(index / 2)).padStart(2, "0")}:${String(
    (index * 3) % 60
  ).padStart(2, "0")}`,
  lastSender: index % 2 === 0 ? "Bạn" : "NG A",
  read: index % 3 === 0,
}));
export default function Conversations() {
  return (
    <TabsContent
      value="chats"
      className="py-4 space-y-3 pr-0.5 overflow-y-auto h-[calc(100vh-170px)] custom-scrollbar"
    >
      {chatData.map((item) => {
        return <ChatItem key={item.timestamp} {...item} />;
      })}
    </TabsContent>
  );
}
