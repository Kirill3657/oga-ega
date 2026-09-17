import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://oga-ega.engelsuchi64.ru";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Подготовка к ОГЭ, ЕГЭ и ВПР — Учи.ру, Энгельс",
  description:
    "Подготовка детей к экзаменам. Оффлайн занятия в групповом формате. г. Энгельс, ул. Тельмана 14А.",
  openGraph: {
    title: "Подготовка к ОГЭ, ЕГЭ и ВПР",
    description:
      "Подготовка детей к экзаменам. Оффлайн занятия в групповом формате. г. Энгельс, ул. Тельмана 14А.",
    url: siteUrl,
    siteName: "Учи.ру",
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Подготовка к ОГЭ, ЕГЭ и ВПР",
    description:
      "Подготовка детей к экзаменам. Оффлайн занятия в групповом формате. г. Энгельс, ул. Тельмана 14А.",
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
