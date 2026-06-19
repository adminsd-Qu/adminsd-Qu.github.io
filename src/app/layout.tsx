import type { Metadata } from "next";
import { Noto_Sans_SC, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeInit } from "@/components/ThemeInit";

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "LokiTank's Blog",
    template: "%s | LokiTank's Blog",
  },
  description:
    "This is a blog site created by me! There are still many things to learn, refueling together!",
  authors: [{ name: "YX/QF-CZ" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "LokiTank's Blog",
    description:
      "A personal blog about micro-electronics, embedded systems, and C programming.",
    locale: "zh_CN",
    siteName: "LokiTank's Blog",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      suppressHydrationWarning
      className={`${notoSansSC.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <ThemeInit />
      </head>
      <body className="font-sans antialiased min-h-[100dvh] flex flex-col">
        <Header />
        <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
