import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/acenternityUi/Navbar"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aceternity-Ui Music Courses App",
  description: "This is the Aceternity-Ui Music Courses application layout.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <>
            <div className=" relative flex items-center justify-between w-full shadow-md">
                <Navbar />
            </div>
        {children}
        </>

  );
}
