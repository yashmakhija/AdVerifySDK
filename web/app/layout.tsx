import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* No-flash theme init — applies .dark before paint (default dark). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('adverify-theme')||'dark';if(t!=='light')document.documentElement.classList.add('dark');}catch(e){document.documentElement.classList.add('dark');}`,
          }}
        />
      </head>
      <body className={`${jakarta.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
