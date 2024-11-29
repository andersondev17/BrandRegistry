"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";

const STEP_LABELS = ["Marca", "Titular", "Resumen"] as const;

/**
 * Tipos para el indicador de pasos
 */
interface StepIndicatorProps {
    /** Paso actual en el proceso */
    currentStep: number;
    /** Número total de pasos (default: 3) */
    totalSteps?: number;
}

interface StepConfig {
    label: string;
    number: number;
    isCompleted: boolean;
    isCurrent: boolean;
}

/**
 * Variantes de animación
 */
const animations = {
    progress: {
        initial: { width: "0%" },
        animate: (progress: number) => ({
            width: `${progress}%`,
            transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
        })
    },
    step: {
        inactive: { scale: 0.95, opacity: 0.7 },
        active: { 
            scale: 1,
            opacity: 1,
            transition: { type: "spring", stiffness: 300, damping: 20 }
        },
        completed: { scale: 1, opacity: 1 }
    }
};

/**
 * Funciones auxiliares para la lógica del componente
 */
const createStepConfigs = (currentStep: number, totalSteps: number): StepConfig[] => {
    return Array.from({ length: totalSteps }, (_, index) => ({
        label: STEP_LABELS[index],
        number: index + 1,
        isCompleted: index + 1 < currentStep,
        isCurrent: index + 1 === currentStep
    }));
};

/**
 * Componentes internos para cada parte del indicador
 */
const StepCircle = ({ config }: { config: StepConfig }) => {
    return (
        <div className="relative">
            {/* Efecto de brillo exterior */}
            <motion.div
                className={cn(
                    "absolute -inset-1 rounded-full",
                    "bg-gradient-to-r from-red-600/20 to-purple-600/20 blur-sm",
                    config.isCurrent && "animate-pulse"
                )}
            />
            
            {/* Círculo principal */}
            <div
                className={cn(
                    "relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2",
                    "transition-all duration-500 ease-out",
                    config.isCompleted && "border-transparent bg-gradient-to-r from-red-600 to-purple-600",
                    config.isCurrent && "border-red-600 bg-white shadow-lg",
                    !config.isCompleted && !config.isCurrent && "border-gray-300 bg-white"
                )}
                role="status"
                aria-current={config.isCurrent ? "step" : undefined}
            >
                <AnimatePresence mode="wait">
                    {config.isCompleted ? (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                        >
                            <Check className="h-5 w-5 text-white" />
                        </motion.div>
                    ) : (
                        <span className={cn(
                            "text-sm font-semibold transition-colors",
                            config.isCurrent ? "text-red-600" : "text-gray-500"
                        )}>
                            {config.number}
                        </span>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

const ProgressBar = ({ progress }: { progress: number }) => (
    <div 
        className="absolute top-5 left-0 h-1 w-full bg-gradient-to-r from-gray-200/50 to-gray-200/30 rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
    >
        <motion.div
            className="h-full bg-gradient-to-r from-red-600 via-red-500 to-purple-600"
            variants={animations.progress}
            initial="initial"
            animate="animate"
            custom={progress}
        >
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)] animate-shine" />
        </motion.div>
    </div>
);

/**
 * StepIndicator - Componente que muestra el progreso del registro de marca
 */
export function StepIndicator({ currentStep, totalSteps = 3 }: StepIndicatorProps) {
    const steps = createStepConfigs(currentStep, totalSteps);
    const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

    return (
        <nav 
            className="relative flex justify-center mb-8 px-4"
            aria-label="Progreso del registro"
        >
            <ProgressBar progress={progress} />
            
            <div className="relative flex w-full max-w-2xl justify-between">
                {steps.map((step) => (
                    <motion.div 
                        key={step.number} 
                        className="flex flex-col items-center group"
                        variants={animations.step}
                        initial="inactive"
                        animate={step.isCurrent ? "active" : step.isCompleted ? "completed" : "inactive"}
                    >
                        <StepCircle config={step} />
                        <motion.span 
                            className={cn(
                                "mt-2 text-xs font-medium transition-colors",
                                step.isCurrent ? "text-red-600" : "text-gray-500 group-hover:text-gray-700"
                            )}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            {step.label}
                        </motion.span>
                    </motion.div>
                ))}
            </div>
        </nav>
    );
}