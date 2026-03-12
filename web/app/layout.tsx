import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AdVerify - Ad Verification & PIN SDK for Android",
  description:
    "Secure ad serving and PIN-based user verification SDK for Android apps.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-white text-zinc-950`}>
        {children}
      </body>
    </html>
  );
}
