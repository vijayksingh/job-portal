import { ThemeToggle } from "@/components/Themetoggle";
import type { Metadata } from "next";
import localFont from "next/font/local";
import React from "react";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Job Portal",
  description: "Find your next gig",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} bg-[var(--background)] text-[var(--foreground)]`}
      >
        <div className="antialiased">
          <header className="flex items-center justify-between border-b p-4">
            <h1 className="text-2xl font-bold">Job Portal</h1>
            <ThemeToggle />
          </header>
          <main className="container mx-auto py-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
