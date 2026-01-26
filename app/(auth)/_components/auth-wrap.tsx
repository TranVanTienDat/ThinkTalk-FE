import { Box, Sheet, useTheme } from "@mui/joy";

export const AuthWrap = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();

  return (
    <Sheet
      sx={{
        backgroundImage: `url(/images/bgs/bg-auth.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: { xs: "center", sm: "flex-end" },
        px: { xs: 2, sm: "15%" },
        py: 4,
        overflowY: "auto",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "420px",
          backgroundColor: "background.surface",
          boxShadow: theme.vars.shadow.xl,
          borderRadius: "24px",
          p: { xs: 3, sm: 4 },
          position: "relative",
          zIndex: 1,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        {children}
      </Box>
    </Sheet>
  );
};
