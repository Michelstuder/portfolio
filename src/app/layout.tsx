import { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { roboto } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Michel Studer",
};

export default function RootLayout({ children }: PropsWithChildren) {
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
