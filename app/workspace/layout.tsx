"use client";
import MainSidebar from "@/components/base/main-sidebar";
import SwrInitor from "@/components/swr-initor";
import { AppContextProvider } from "@/context/app-context";
import { SocketProvider } from "@/context/socket-context";
import { useTheme } from "@mui/joy";

export default function Layout({ children }: { children: React.ReactNode }) {
  const theme = useTheme();

  return (
    <SwrInitor>
      <AppContextProvider>
        <SocketProvider autoConnect={true}>
          <div
            className="flex h-screen overflow-hidden p-3 gap-4"
            style={{ backgroundColor: theme.palette.custom.lightGray100 }}
          >
            <MainSidebar />
            <div className="bg-white flex-1 h-full rounded-[14px]  overflow-hidden">
              {children}
            </div>
          </div>
        </SocketProvider>
      </AppContextProvider>
    </SwrInitor>
  );
}
