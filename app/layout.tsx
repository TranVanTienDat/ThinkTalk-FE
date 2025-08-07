import { Toaster } from "@/components/ui/toaster";
import { TanstackQueryIniter } from "@/context/query-client";
import type { Metadata } from "next";
import "./globals.css";
import ThemeRegistry from "./ThemeRegistry";
import InitColorSchemeScript from "@mui/joy/InitColorSchemeScript";

export const metadata: Metadata = {
  title: "ThinkTalk",
  description: "Trò chuyện cùng nhau nhé!",
  icons: {
    icon: "/images/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="h-screen">
        <InitColorSchemeScript />
        <TanstackQueryIniter>
          <ThemeRegistry options={{ key: "joy" }}>
            {children}
            <Toaster />
          </ThemeRegistry>
        </TanstackQueryIniter>
      </body>
    </html>
  );
}
