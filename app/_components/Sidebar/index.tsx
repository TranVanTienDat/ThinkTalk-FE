import {
  HomeIcon,
  MessageCircleDashedIcon,
  SearchIcon,
  Settings,
} from "lucide-react";
import Image from "next/image";

export default function Sidebar() {
  return (
    <div className="w-[88px] p-4 pb-6 bg-white border-r border-gray-200 h-[100vh] flex flex-col justify-between items-center shadow-[10px_0_15px_-3px_rgba(0,0,0,0.1),4px_0_6px_-2px_rgba(0,0,0,0.05)] z-10">
      <div>
        <Image
          src="/images/logo.svg"
          alt="Logo"
          width={56}
          height={56}
          className="mb-12"
        />
        <div className="flex flex-col items-center justify-center space-y-8">
          <button>
            <HomeIcon className="w-6 h-6 text-black" />
          </button>

          <button>
            <MessageCircleDashedIcon className="w-6 h-6 text-black" />
          </button>

          <button>
            <SearchIcon className="w-6 h-6 text-black" />
          </button>
        </div>
      </div>
      <button>
        <Settings className="w-5 h-5 text-black active:rotate-45" />
      </button>
    </div>
  );
}
