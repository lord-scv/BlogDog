import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BlogDog — Thoughts on development, design, and modern web experiences",
  description: "A mature, calm, minimal, and developer-focused editorial platform.",
  metadataBase: new URL("https://blogdog.dev"),
  openGraph: {
    title: "BlogDog — Thoughts on development, design, and modern web experiences",
    description: "A mature, calm, minimal, and developer-focused editorial platform.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-neutral-bg text-neutral-text font-sans">
        {children}
      </body>
    </html>
  );
}
