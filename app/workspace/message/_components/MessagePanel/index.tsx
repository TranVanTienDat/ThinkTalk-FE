"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "antd";
import { Plus, SearchIcon } from "lucide-react";
import { useState } from "react";
import MessageTabs from "../Tabs";
import { cn } from "@/lib/utils";

export default function MessagePanel() {
  const [search, setSearch] = useState<string>("");

  const handleChangeSearch = (e: any) => {
    const value = e.target.value.trim();
    setSearch(value);
  };
  console.log("1233");
  return (
    <div>
      <div className="h-20 flex justify-between items-center border-b border-[#BEBEB] px-4">
        <Badge count={99} overflowCount={10} offset={[10, 0]}>
          <div className="text-base font-bold gap-1">Message</div>
        </Badge>
        <button className="bg-primary p-1 rounded-full  shadow-md shadow-indigo-500/50">
          <Plus className="w-5 h-5   text-white" />
        </button>
      </div>

      <div className="px-4 py-3">
        <div className="flex items-center bg-[#F3F3F3]  rounded-xl">
          <SearchIcon className="w-5 h-5 ml-2" />
          <Input
            value={search}
            onChange={handleChangeSearch}
            placeholder="Tìm kiếm"
            className="bg-[#F3F3F3] border-0 focus-visible:ring-0 shadow-none  text-sm h-10"
          />
        </div>
      </div>
      <MessageTabs />
    </div>
  );
}

type ChatItemProps = {
  avatar: string;
  name: string;
  lastSender: string;
  lastMessage: string;
  timestamp: string;
  read: boolean;
};
export const ChatItem = ({
  avatar,
  name,
  lastMessage,
  lastSender,
  timestamp,
  read,
}: ChatItemProps) => {
  console.log("avatar", avatar);
  return (
    <div className="flex justify-between items-start gap-1 cursor-pointer">
      <div className="flex justify-start gap-1 overflow-hidden">
        <Avatar>
          {avatar ? (
            <AvatarImage src="https://github.com/shadcn.png" />
          ) : (
            <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
          )}
        </Avatar>
        <div
          className={cn(
            "flex flex-col overflow-hidden ",
            !read && "font-bold text-black"
          )}
        >
          <h2 className="text-sm">{name}</h2>
          <span className="truncate text-xs">{`${lastSender}: ${lastMessage}`}</span>
        </div>
      </div>
      <div className={cn("text-xs", !read && "font-bold text-black")}>
        {timestamp}
      </div>
    </div>
  );
};
