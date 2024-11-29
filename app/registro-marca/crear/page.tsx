"use client";

import { StepIndicator } from "@/app/components/StepIndicator";
import { FormError } from "@/app/components/ui/FormError";
import { Input } from "@/app/components/ui/Input";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { brandSchema } from "@/lib/schemas/brand.schema";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

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
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        try {
            brandSchema.shape.name.parse(brandName);
            setError("");
            return true;
        } catch (err) {
            if (err instanceof z.ZodError) {
                setError(err.errors[0].message);
            }
            return false;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        if (!validateForm()) {
            setIsSubmitting(false);
            return;
        }

        try {
            await new Promise(resolve => setTimeout(resolve, 500)); // Simular carga
            sessionStorage.setItem("brandRegistration", JSON.stringify({
                name: brandName,
                status: 'pending'
            }));

            router.push("/registro-marca/crear/titular");
        } catch (error) {
            console.error("Error en el proceso:", error);
            setError("Ha ocurrido un error. Por favor, inténtelo de nuevo.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 p-6">
            <StepIndicator currentStep={1} />

            <motion.div
                className="max-w-xl mx-auto mt-12"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-900/80">
                    <CardContent className="p-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-8"
                        >
                            <h2 className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-purple-600">
                                Información de la Marca
                            </h2>
                            <p className="text-gray-500 mt-2">
                                Por favor, ingrese el nombre de la marca que desea registrar.
                            </p>
                        </motion.div>

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
                                    aria-label="Ingrese el nombre de la marca"
                                    onChange={(e) => {
                                        setBrandName(e.target.value);
                                        setError("");
                                    }}
                                    className={`w-full p-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border transition-all ${error ? 'border-red-500 ring-red-500' : 'border-gray-200 dark:border-gray-700'
                                        }`}
                                    placeholder="Ingrese el nombre de la marca"
                                    disabled={isSubmitting}
                                    required
                                />
                                <AnimatePresence>
                                    {error && <FormError message={error} />}
                                </AnimatePresence>
                            </motion.div>

                            <motion.div
                                className="flex justify-between mt-12"
                                variants={itemVariants}
                            >
                                <Button
                                    type="button"
                                    aria-label="Atrás"
                                    onClick={() => router.push("/")}
                                    variant="outline"
                                    className="w-32 group relative overflow-hidden"
                                    disabled={isSubmitting}
                                >
                                    <span className="relative z-10">Atrás</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity" />
                                </Button>

                                <Button
                                    type="submit"
                                    className="w-32 bg-gradient-to-r from-red-600 to-purple-600 text-white hover:opacity-90 transition-opacity"
                                    aria-label="Continuar"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center gap-2">
                                            <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            {" "}
                                            Procesando...
                                        </span>
                                    ) : (
                                        "Continuar"
                                    )}
                                </Button>
                            </motion.div>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}