import { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { roboto } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Michel Studer'
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className="antialiased bg-surface text-foreground max-w-[7xl] mx-auto min-h-screen px-4"
        style={roboto.style}
      >
        {children}
      </body>
    </html>
  );
}
