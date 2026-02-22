import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "vartheme — Zero config dark mode for React",
  description:
    "Zero config, CSS variable based theme switching for React. Dark mode in one line.",
  keywords: ["react", "dark mode", "theming", "css variables", "npm"],
  openGraph: {
    title: "vartheme",
    description: "Zero config dark mode for React",
    url: "https://vartheme.dev",
    siteName: "vartheme",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}