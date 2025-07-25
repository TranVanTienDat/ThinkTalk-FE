"use client";

import { tabItems } from "@/constants";
import { IconButton, Tab, TabList } from "@mui/joy";
import { Settings } from "lucide-react";
import Image from "next/image";

export default function Sidebar() {
  return (
    <div
      className="w-14 px-2.5 py-4 bg-white flex flex-col justify-between items-center  rounded-l-md
    border-r border-gray-200
    "
    >
      <TabList
        disableUnderline
        sx={{
          paddingBottom: "16px",
          paddingX: "10px",
          width: "56px",
        }}
      >
        <>
          <Image
            src="/images/icon.png"
            alt="Logo"
            width={56}
            height={56}
            className="mb-12"
          />
          <div className=" space-y-4">
            {tabItems.map((item, index) => (
              <Tab
                disableIndicator
                variant="plain"
                key={index}
                sx={{
                  borderRadius: "6px",
                  width: "100%",
                  paddingX: "8px",
                }}
              >
                <item.icon size={item.size} />
              </Tab>
            ))}
          </div>
        </>
      </TabList>
      <IconButton variant="plain">
        <Settings size={20} />
      </IconButton>
    </div>
  );
}
