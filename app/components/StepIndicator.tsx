"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";

interface StepIndicatorProps {
    currentStep: number;
    totalSteps?: number;
}

export function StepIndicator({ currentStep, totalSteps = 3 }: StepIndicatorProps) {
    const steps = ["Marca", "Titular", "Resumen"];

    const progressVariants = {
        initial: { width: "0%" },
        animate: {
            width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
            transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
        }
    };

    const stepVariants = {
        inactive: { scale: 0.95, opacity: 0.7 },
        active: { 
            scale: 1,
            opacity: 1,
            transition: { type: "spring", stiffness: 300, damping: 20 }
        },
        completed: {
            scale: 1,
            opacity: 1
        }
    };

    return (
        <div className="relative flex justify-center px-4 py-8">
            {/* Línea de progreso con efecto de brillo */}
            <div className="absolute top-[2.15rem] left-0 h-1 w-full bg-gradient-to-r from-gray-200/50 to-gray-200/30 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-gradient-to-r from-red-600 via-red-500 to-purple-600"
                    variants={progressVariants}
                    initial="initial"
                    animate="animate"
                >
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)] animate-shine" />
                </motion.div>
            </div>

            {/* Contenedor de pasos */}
            <div className="relative flex w-full max-w-2xl justify-between">
                {steps.map((stepName, index) => {
                    const stepNumber = index + 1;
                    const isCompleted = stepNumber < currentStep;
                    const isCurrent = stepNumber === currentStep;

                    return (
                        <motion.div
                            key={stepNumber}
                            className="flex flex-col items-center"
                            variants={stepVariants}
                            initial="inactive"
                            animate={isCurrent ? "active" : isCompleted ? "completed" : "inactive"}
                        >
                            <div className="relative">
                                {/* Círculo exterior con efecto de brillo */}
                                <motion.div
                                    className={cn(
                                        "absolute -inset-1 rounded-full",
                                        "bg-gradient-to-r from-red-600/20 to-purple-600/20 blur-sm",
                                        isCurrent && "animate-pulse"
                                    )}
                                />
                                
                                {/* Círculo principal */}
                                <div
                                    className={cn(
                                        "relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2",
                                        "transition-all duration-500 ease-out",
                                        isCompleted && "border-transparent bg-gradient-to-r from-red-600 to-purple-600",
                                        isCurrent && "border-red-600 bg-white shadow-lg",
                                        !isCompleted && !isCurrent && "border-gray-300 bg-white"
                                    )}
                                >
                                    <AnimatePresence mode="wait">
                                        {isCompleted ? (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                exit={{ scale: 0 }}
                                            >
                                                <Check className="h-6 w-6 text-white" />
                                            </motion.div>
                                        ) : (
                                            <span
                                                className={cn(
                                                    "text-base font-semibold",
                                                    isCurrent ? "text-red-600" : "text-gray-500"
                                                )}
                                            >
                                                {stepNumber}
                                            </span>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            {/* Etiqueta del paso */}
                            <motion.span 
                                className={cn(
                                    "mt-4 text-sm font-medium",
                                    isCurrent ? "text-red-600" : "text-gray-500"
                                )}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                {stepName}
                            </motion.span>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}