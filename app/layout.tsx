import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Noto_Serif_TC } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const displayLatin = Instrument_Serif({
  variable: "--font-display-latin",
  subsets: ["latin"],
  weight: "400",
});

const displayCjk = Noto_Serif_TC({
  variable: "--font-display-cjk",
  weight: ["600", "900"],
  preload: false,
});

export const metadata: Metadata = {
  title: "Rehearse — AI 面試模擬器",
  description: "貼上職缺,和 AI 面試官實戰演練,拿到逐題評分與更好的回答範例。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${displayLatin.variable} ${displayCjk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        <div className="flex flex-1 flex-col">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
