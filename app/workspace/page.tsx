import { features } from "@/constants";
import { Sheet, Typography } from "@mui/joy";
import Image from "next/image";

export default function WelcomePage() {
  return (
    <div className="h-full overflow-hidden">
      <Sheet
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "8px",
          padding: "10px",
        }}
        className=" overflow-y-auto custom-scrollbar "
      >
        <Typography level="h2" sx={{ fontWeight: 700 }}>
          Chào mừng đến với ThinkTalk
        </Typography>
        <Image alt="" src="/images/logo-max-size.png" width={200} height={90} />

        <div className="flex justify-center flex-wrap mt-8 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...(feature as any)} />
          ))}
        </div>
      </Sheet>
    </div>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard = ({ title, description }: FeatureCardProps) => {
  return (
    <Sheet
      variant="outlined"
      color="neutral"
      sx={{
        width: 220,
        p: 2,
        borderRadius: 4,
        textAlign: "center",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: 4,
          border: "2px solid #1976d2",
          transform: "scale(1.05)",
        },
      }}
    >
      <Typography level="h3" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Typography level="body-sm">{description}</Typography>
    </Sheet>
  );
};
