"use client";

import { motion } from "framer-motion";

export default function RegisterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <motion.div 
                className="max-w-4xl mx-auto p-6 pt-20 lg:pt-6" 
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
                        {children}
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}