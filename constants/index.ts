import { emojiWithCode } from "@/utils";
import { Bell, MessageCircle } from "lucide-react";

export const tabItems = [
  { icon: MessageCircle, size: 20, label: "Messages" },
  { icon: Bell, size: 20, label: "Notifications" },
  //   { icon: Settings, size: 20, label: "Settings" },
];
const emojiFace = [
  "😀",
  "😃",
  "😄",
  "😁",
  "😆",
  "😅",
  "😂",
  "🤣",
  "😊",
  "🙂",
  "😉",
  "😍",
  "😘",
  "😗",
  "😚",
  "😋",
  "😛",
  "😜",
  "🤪",
].map(emojiWithCode);

const emojiSadAngry = [
  "😔",
  "😞",
  "😠",
  "😡",
  "🤬",
  "😭",
  "😢",
  "😩",
  "😫",
  "😖",
  "😣",
  "😓",
  "😤",
  "😨",
  "😱",
].map(emojiWithCode);

const emojiHand = [
  "👋",
  "🤚",
  "✋",
  "🖖",
  "👌",
  "🤌",
  "🤏",
  "✌",
  "🤞",
  "🤟",
  "🤘",
  "🤙",
  "👍",
  "👎",
  "👏",
  "🙌",
  "🫶",
].map(emojiWithCode);

const emojiAnimals = [
  "🐶",
  "🐱",
  "🐭",
  "🐹",
  "🐰",
  "🦊",
  "🐻",
  "🐼",
  "🐨",
  "🦁",
  "🐮",
  "🐷",
  "🐸",
  "🐵",
  "🐔",
  "🐧",
  "🐦",
  "🐤",
  "🐣",
].map(emojiWithCode);

const emojiTravel = [
  "🚗",
  "🚕",
  "🚙",
  "🚌",
  "🏎",
  "🚓",
  "🚑",
  "✈️",
  "🛫",
  "🛬",
  "🚀",
  "🛸",
  "🚢",
  "⛵",
  "🛶",
].map(emojiWithCode);

const emojiLove = [
  "❤️",
  "🧡",
  "💛",
  "💚",
  "💙",
  "💜",
  "🖤",
  "🤍",
  "🤎",
  "💕",
  "💞",
  "💓",
  "💗",
  "💖",
  "💘",
].map(emojiWithCode);

export const EMOJI = {
  face: emojiFace,
  hand: emojiHand,
  animals: emojiAnimals,
  travel: emojiTravel,
  expression: emojiSadAngry,
  feeling: emojiLove,
};

export const features = [
  {
    title: "Chat AI thông minh",
    description:
      "Trò chuyện với AI để nhận phản hồi nhanh, chính xác và tự nhiên như người thật.",
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
