"use client";

import { Sheet } from "@mui/joy";
import { Header } from "./_header";
import { ChatBox } from "./chat-box";
import { Params } from "@/types";

export const ChatArea = ({ params }: { params: Params }) => {
  return (
    <Sheet sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Header params={params} />
      <ChatBox params={params} />
    </Sheet>
  );
};
