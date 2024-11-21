import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from '@/components/Navbar';
import { ClerkProvider } from '@clerk/nextjs';
import { PanicButton } from '@/components/PanicButton';

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
  title: "Cyber Stalking Response",
  description: "Comprehensive incident response system for cyber stalking victims.",
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
        <ClerkProvider
          appearance={{
            variables: {
              colorPrimary: '#000', // Customize as needed
            },
          }}
          publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        >
          <Navbar />
          {children}
          <PanicButton />
        </ClerkProvider>
      </body>
    </html>
  );
}
