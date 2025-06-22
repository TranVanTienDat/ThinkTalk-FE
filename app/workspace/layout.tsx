"use client";
import MainSidebar from "@/components/base/main-sidebar";
import SwrInitor from "@/components/swr-initor";
import { AppContextProvider } from "@/context/app-context";
import { useTheme } from "@mui/joy";

export default function Layout({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  return (
    <SwrInitor>
      <AppContextProvider>
        <div
          className="flex h-screen overflow-hidden p-3 gap-4"
          style={{ backgroundColor: theme.palette.custom.lightGray100 }}
        >
          <MainSidebar />
          <div className="flex-1">{children}</div>
        </div>
      </AppContextProvider>
    </SwrInitor>
  );
}
