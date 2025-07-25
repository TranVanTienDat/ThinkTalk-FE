import { Sheet, Typography } from "@mui/joy";
import Image from "next/image";

export const features = [
  {
    title: "Chat AI thông minh",
    description:
      "Trò chuyện với AI để nhận phản hồi nhanh, chính xác và tự nhiên như người thật.",
    variant: "solid",
    color: "primary",
  },
  {
    title: "Kết nối dễ dàng",
    description:
      "Giao diện thân thiện, hỗ trợ nhiều thiết bị giúp bạn kết nối mọi lúc mọi nơi.",
  },
  {
    title: "Bảo mật & riêng tư",
    description:
      "Dữ liệu trò chuyện được bảo vệ an toàn, đảm bảo quyền riêng tư của bạn.",
  },
  {
    title: "Trải nghiệm mới mẻ",
    description:
      "Khám phá các tính năng AI độc đáo, nâng cao hiệu quả giao tiếp và học hỏi mỗi ngày.",
  },
  {
    title: "Hỗ trợ đa ngôn ngữ",
    description:
      "Giao tiếp dễ dàng với bạn bè quốc tế nhờ khả năng dịch thuật tự động.",
  },
  {
    title: "Tùy chỉnh cá nhân",
    description:
      "Cá nhân hóa trải nghiệm chat theo sở thích và nhu cầu của bạn.",
  },
];

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
  variant?: "outlined" | "solid";
  color?: "primary" | "neutral" | "danger" | "success" | "warning";
}

const FeatureCard = ({
  title,
  description,
  variant = "outlined",
  color = "neutral",
}: FeatureCardProps) => {
  return (
    <Sheet
      variant={variant}
      color={color}
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
