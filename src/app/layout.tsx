import "./globals.css";
import type { Metadata } from "next";
import { StoreProvider } from "@/store";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OODLES Assignment | Vanit Yadav ",
  description: "Project created with Nextjs and Redux",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-lightBG">
      <body className={inter.className}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
