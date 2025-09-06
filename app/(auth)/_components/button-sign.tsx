import { Button } from "@mui/joy";
import { GoogleIcon } from "./google-icon";
import { signIn } from "@/auth";

export default function ButtonSign() {
  const handleSign = async () => {
    await signIn("google");
  };

    return   <Button
          variant="outlined"
          fullWidth
          startDecorator={<GoogleIcon />}
          sx={{
            color: "black",
            borderColor: "#E0E0E0",
            "&:hover": {
              borderColor: "#BDBDBD",
              backgroundColor: "#F5F5F5",
            },
          }}
          onClick={handleSign}
        >
          Đăng nhập bằng Google
        </Button>
}