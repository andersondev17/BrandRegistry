// CreateBrandStep1.tsx
"use client";

import { StepIndicator } from "@/app/components/StepIndicator";
import { Input } from "@/app/components/ui/Input";
import { Button } from "@/app/components/ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
};

export default function CreateBrandStep1() {
    const router = useRouter();
    const [brandName, setBrandName] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!brandName.trim()) return;

        try {
            sessionStorage.setItem("brandRegistration", JSON.stringify({ 
                name: brandName,
                status: 'pending' 
            }));
            
            router.push("/registro-marca/crear/titular");
        } catch (error) {
            console.error("Error en el proceso:", error);
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <StepIndicator currentStep={1} />
            
            <motion.div 
                className="max-w-xl mx-auto mt-12"
                variants={itemVariants}
            >
                <motion.h2 
                    className="text-2xl font-medium mb-8 bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent"
                    variants={itemVariants}
                >
                    Información de la Marca
                </motion.h2>
                
                <form onSubmit={handleSubmit} className="space-y-8">
                    <motion.div 
                        className="relative group"
                        variants={itemVariants}
                    >
                        <label 
                            htmlFor="brandName" 
                            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 transition-all"
                        >
                            Marca a Registrar
                        </label>
                        <Input
                            type="text"
                            id="brandName"
                            value={brandName}
                            onChange={(e) => setBrandName(e.target.value)}
                            className="w-full p-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                            placeholder="Ingrese el nombre de la marca"
                            required
                        />
                        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-red-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity blur-xl" />
                    </motion.div>

                    <motion.div 
                        className="flex justify-between mt-12"
                        variants={itemVariants}
                    >
                        <Button
                            type="button"
                            onClick={() => router.push("/")}
                            variant="outline"
                            className="w-32 group relative overflow-hidden"
                        >
                            <span className="relative z-10">Atrás</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity" />
                        </Button>
                        
                        <Button
                            type="submit"
                            className="w-32 bg-gradient-to-r from-red-600 to-purple-600 text-white hover:opacity-90 transition-opacity"
                        >
                            Continuar
                        </Button>
                    </motion.div>
                </form>
            </motion.div>
        </motion.div>
    );
}