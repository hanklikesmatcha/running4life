import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { CSPostHogProvider } from "./providers";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://running4.life"),
  title: "running4.life",
  description: "We run for life.",
  openGraph: {
    images: "/og-image.png",
    url: "https://running4.life",
    siteName: "Running4.Life",
    // Twitter
    card: "summary_large_image",
    site: "@running4life"
  }
};

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <CSPostHogProvider>
          <body className={inter.className}>{children}</body>
        </CSPostHogProvider>
      </SessionProvider>
    </html>
  );
}
