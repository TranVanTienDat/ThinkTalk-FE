import ListConversation from "@/components/conversation";
import Header from "@/components/conversation/_header";
import BoxSearch from "@/components/conversation/input-search";
import { Stack, TabPanel } from "@mui/joy";
export default function ConversationTab() {
  return (
    <TabPanel value={0}>
      <Stack direction="column" spacing={3}>
        <Header />
        <BoxSearch />

        <ListConversation />
      </Stack>
    </TabPanel>
  );
}
