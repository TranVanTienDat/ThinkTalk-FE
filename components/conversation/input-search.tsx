import { Box, IconButton, Input, Stack, useTheme } from "@mui/joy";
import { ArrowLeft, Search } from "lucide-react";

const InputConversationSearch = () => {
  const theme = useTheme();
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
          backgroundColor: theme.palette.background,
          color: theme.palette.secondary[100],
          "--Input-focusedThickness": "0",
          "& .MuiInput-input": {
            width: "100%",
          },
          "&::before": {
            transition: "box-shadow .15s ease-in-out",
          },
        }}
        startDecorator={
          <Search
            size={16}
            style={{
              cursor: "pointer",
            }}
          />
        }
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
