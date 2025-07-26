import { ChatArea } from "@/components/chat-area";
import { Params } from "@/types";

export default function Page({ params }: { params: Params }) {
  return <ChatArea params={params} />;
}
