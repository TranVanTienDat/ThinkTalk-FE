"use client";
import MainSidebar from "@/components/base/main-sidebar";
import SwrInitor from "@/components/swr-initor";
import { AppContextProvider } from "@/context/app-context";
import { MessageHandlerProvider } from "@/context/message-handler-context";
import { SocketProvider } from "@/context/socket-context";
import { Box, styled } from "@mui/joy";

const BoxStyled = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "100%",
  overflow: "hidden",
  padding: "12px",
  gap: "16px",
  backgroundColor: theme.palette.custom.lightGray100,
}));

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SwrInitor>
      <AppContextProvider>
        <SocketProvider autoConnect={true}>
          <MessageHandlerProvider>
            <BoxStyled>
              <MainSidebar />
              <div className=" flex-1 h-full rounded-[14px]  overflow-hidden">
                {children}
              </div>
            </BoxStyled>
          </MessageHandlerProvider>
        </SocketProvider>
      </AppContextProvider>
    </SwrInitor>
  );
}
