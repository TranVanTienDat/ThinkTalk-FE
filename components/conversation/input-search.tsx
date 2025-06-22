import { Box, IconButton, Input, Stack } from "@mui/joy";
import { ArrowLeft, Search } from "lucide-react";

const InputConversationSearch = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
        width: "100%",
      }}
    >
      <IconButton
        variant="plain"
        sx={{
          borderRadius: "50%",
        }}
      >
        <ArrowLeft size={20} />
      </IconButton>

      <Input
        placeholder="Tìm kiếm"
        sx={{
          width: "100%",
          backgroundColor: "white",
          "--Input-focusedThickness": "0",
          "& .MuiInput-input": {
            width: "100%",
          },
          "&::before": {
            transition: "box-shadow .15s ease-in-out",
          },
        }}
        startDecorator={<Search size={16} />}
      />
    </Box>
  );
};

const BoxSearch = () => {
  return (
    <Stack>
      <InputConversationSearch />
    </Stack>
  );
};
export default BoxSearch;
