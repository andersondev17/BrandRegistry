import { BrandProvider } from "@/context/BrandContext";
import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import { Sidebar } from "./components/Slidebar";
import "./globals.css";


const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: "Brand Registration - Brand Management System",
  description: "An efficient platform for managing brand registrations with an easy-to-use CRUD system. Register, edit, and delete your brands securely.",
  keywords: ["brand registration", "brand management", "CRUD brands", "brand system", "brand record management"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
    <body className={inter.className}>
      <BrandProvider>
        <div className="flex">
          <Sidebar />
          <main className="flex-1">
            {children}
          </main>
        </div>
      </BrandProvider>
    </body>
  </html>
  );
}