import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "AdVerify - Ad Verification & PIN SDK for Android",
  description:
    "Secure ad serving and PIN-based user verification SDK for Android apps. Manage ads, API keys, and PIN authentication from one dashboard.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-sans antialiased bg-[#fafafa] text-zinc-900`}
      >
        {children}
      </body>
    </html>
  );
}
