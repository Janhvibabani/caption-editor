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

export const metadata: Metadata = {
  title: "caption editor",
  description: "A simple caption editor for photos.",
  icons: "/icon.svg",
  openGraph: {
    title: "Caption Editor",
    description: "A simple caption editor for photos.",
    url: "https://caption-editor-theta.vercel.app/",
    siteName: "Caption Editor",
    images: [
      {
        url: "https://caption-editor-theta.vercel.app/og.png",
        width: 1200,
        height: 630,
        alt: "Caption Editor – Add captions to photos",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Caption Editor",
    description: "A simple caption editor for photos.",
    images: ["https://caption-editor-theta.vercel.app/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
