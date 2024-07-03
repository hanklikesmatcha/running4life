import { Inter } from "next/font/google";
import "./globals.css";
import { CSPostHogProvider } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <CSPostHogProvider>
        <body className={inter.className}>{children}</body>
      </CSPostHogProvider>
    </html>
  );
}
