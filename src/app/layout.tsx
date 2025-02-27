import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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
  title: "Fluent React",
  description:
    "Practicing the concepts and exercises from the book 'Fluent React'",
  keywords: ["React", "Fluent React", "Frontend"],
  authors: [{ name: "ooMia", url: "https://github.com/ooMia" }],
  openGraph: {
    images: ["https://oomia.github.io/hands-on-dapp/hello-world.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const menubar = (
    <div id="menubar" className="sticky top-0 w-full">
      <Link href="/">Home</Link>
    </div>
  );

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {menubar}
        {children}
      </body>
    </html>
  );
}
