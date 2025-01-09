import { Tabs, TabsList } from "@/components/ui/tabs";
import { TabTrigger } from "./TabTrigger";
import { memo } from "react";
import Conversations from "../Conversations";

const MessageTabs = () => {
  return (
    <Tabs defaultValue="chats" className="overflow-hidden px-4">
      <TabsList className=" flex justify-end gap-3 p-0 h-auto bg-white">
        <TabTrigger label="Chats" value="chats" />
        <TabTrigger label="Friends" value="friends" />
      </TabsList>
      <Conversations />
    </Tabs>
  );
};

export default memo(MessageTabs);
