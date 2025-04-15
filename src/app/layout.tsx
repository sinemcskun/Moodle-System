import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AYBU Moodle System",
  description: "Generated by AYBU Moodle",
};

export default function RootLayout({ children }: { children: React.ReactNode}) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/*Main Content*/}
        <main className="bg-white min-h-screen">{children}</main>
        {/*Footer*/}
        <footer className="bg-gray-900 text-white text-sm p-4 text-center">
          <p>AYBU Moodle System &copy; 2025 | <Link href="#" className="text-red-400">Creative Commons</Link></p>
          <div className="flex justify-center space-x-3 mt-2">
            <Link href="#"><Image src="/youtube.svg" alt="YouTube" width={24} height={24} /></Link>
            <Link href="#"><Image src="/twitter.svg" alt="Twitter" width={24} height={24} /></Link>
            <Link href="#"><Image src="/facebook.svg" alt="Facebook" width={24} height={24} /></Link>
        </div>
        </footer>
      </body>
    </html>
  );
}
