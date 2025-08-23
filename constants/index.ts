import { emojiWithCode } from "@/utils";
import {
  ArchiveRestore,
  ArrowRightFromLine,
  Bell,
  CircleUser,
  Handshake,
  Link,
  LogOut,
  MessageCircle,
  Phone,
  Pin,
  Trash2,
  UserCog,
  Video,
} from "lucide-react";

export const tabItems = [
  { icon: MessageCircle, size: 20, label: "Messages" },
  { icon: Bell, size: 20, label: "Notifications" },
  //   { icon: Settings, size: 20, label: "Settings" },
];

export const menuAccount = [
  { icon: LogOut, size: 18, label: "Đăng xuất", key: "logout" },
  { icon: UserCog, size: 18, label: "Cài đặt và bảo mật", key: "setting" },
  { icon: CircleUser, size: 18, label: "Tài khoản", key: "account" },
  { icon: Handshake, size: 18, label: "Đóng góp ý kiến", key: "contribute" },
];

export const menuConversation = [
  { icon: Pin, size: 18, label: "Ghim tin nhắn", key: "pin" },
  {
    icon: ArchiveRestore,
    size: 18,
    label: "Lưu trữ cuộc trò chuyện",
    key: "restore",
  },
  { icon: Phone, size: 18, label: "Gọi thoại", key: "phonee" },
  { icon: Video, size: 18, label: "Gọi video", key: "phoneVideo" },
  {
    icon: Trash2,
    size: 18,
    label: "Xóa cuộc trò chuyện",
    key: "trash",
  },
  {
    icon: Link,
    size: 18,
    label: "Link tham gia nhóm",
    key: "invitation",
  },
  { icon: ArrowRightFromLine, size: 18, label: "Rời khỏi nhóm", key: "leave" },
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
