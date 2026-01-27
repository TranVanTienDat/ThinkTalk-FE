import { Rubik } from "next/font/google";
import { TanstackQueryIniter } from "@/context/query-client";
import type { Metadata } from "next";
import "./globals.css";
import ThemeRegistry from "./ThemeRegistry";
import InitColorSchemeScript from "@mui/joy/InitColorSchemeScript";
import { SessionProvider } from "next-auth/react";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-rubik",
});

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
    <html lang="en" suppressHydrationWarning={true} className={rubik.variable}>
      <body className="font-sans">
        <InitColorSchemeScript />
        <SessionProvider>
          <TanstackQueryIniter>
            <ThemeRegistry options={{ key: "joy" }}>{children}</ThemeRegistry>
          </TanstackQueryIniter>
        </SessionProvider>
      </body>
    </html>
  );
}
