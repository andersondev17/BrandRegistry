import { Toast } from "@/app/components/ui/toast";
import { BrandProvider } from "@/context/BrandContext";
import { motion } from "framer-motion";
import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import { Sidebar } from "../components/Slidebar";
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
                        <motion.div
                            className="max-w-4xl mx-auto p-6 pt-20 lg:pt-6 flex-1"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
                                <motion.div
                                    className="p-8"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <div className="mb-6 relative">
                                        <motion.h1
                                            className="text-2xl font-medium mb-2 bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent"
                                            initial={{ x: -20 }}
                                            animate={{ x: 0 }}
                                        >
                                            Panel
                                        </motion.h1>
                                        <motion.div
                                            className="text-lg text-red-400 flex items-center gap-2"
                                            initial={{ x: -20 }}
                                            animate={{ x: 0 }}
                                            transition={{ delay: 0.1 }}
                                        >
                                            <span className="opacity-50">Servicios</span>
                                            <span className="opacity-50">/</span>
                                            <span>Registro de Marca</span>
                                        </motion.div>
                                    </div>
                                    <main>
                                        {children}
                                    </main>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                    <Toast />
                </BrandProvider>
            </body>
        </html>
    );
}