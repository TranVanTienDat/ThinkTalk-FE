import { Box, Sheet } from "@mui/joy";

export const AuthWrap = ({ children }: { children: React.ReactNode }) => {
  return (
    <Sheet
      sx={{
        backgroundImage: `url(/images/bgs/bg-auth.jpg)`,
        backgroundSize: "cover",
        height: "100%",
        position: "relative",
      }}
    >
      <Box
        sx={{
          width: "400px",
          backgroundColor: "white",
          position: "absolute",
          top: "50%",
          left: { xs: "50%", sm: "auto" },
          right: { xs: "auto", sm: "20%" },
          transform: {
            xs: "translate(-50%, -50%)",
            sm: "translateY(-50%)",
          },
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          borderRadius: "16px",
          padding: "16px",
        }}
      >
        {children}
      </Box>{" "}
    </Sheet>
  );
};
