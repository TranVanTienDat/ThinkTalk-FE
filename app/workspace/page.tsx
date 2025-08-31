import { Sheet } from "@mui/joy";
import Image from "next/image";

export default function WelcomePage() {
  return (
    <div className="h-full overflow-hidden">
      <Sheet
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "8px",
          padding: "10px",
        }}
      >
        <Image alt="" src="/images/logo-max-size.png" width={200} height={90} />

      </Sheet>
    </div>
  );
}

