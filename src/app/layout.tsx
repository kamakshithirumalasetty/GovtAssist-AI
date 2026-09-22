import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GovtAssist AI - Virtual Assistant for Government Services",
  description: "AI-Powered Virtual Assistant for discovering, understanding, applying for, and tracking 30+ digital government services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} flex flex-col min-h-screen bg-slate-50 antialiased`}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
