import { PropsWithChildren, ReactNode } from "react";
import type { Metadata } from "next";
import { roboto } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Michel Studer",
};

type RootLayoutProps = {
  children: ReactNode;
  params: Promise<Record<string, never>>;
};

export default async function RootLayout({children}: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className="bg-surface text-foreground mx-auto min-h-screen max-w-[7xl] px-4 antialiased"
        style={roboto.style}
      >
        {children}
      </body>
    </html>
  );
}
