"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepIndicatorProps {
    currentStep: number;
    totalSteps?: number;
}

export function StepIndicator({ currentStep, totalSteps = 3 }: StepIndicatorProps) {
    return (
        <div className="relative flex justify-center">
            {/* Línea de progreso */}
            <div className="absolute top-5 left-0 h-0.5 w-full bg-gray-200">
                <div
                    className="h-full bg-red-600 transition-all duration-500"
                    style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
                />
            </div>

            {/* Pasos */}
            <div className="relative flex w-full max-w-2xl justify-between">
                {Array.from({ length: totalSteps }).map((_, index) => {
                    const stepNumber = index + 1;
                    const isCompleted = stepNumber < currentStep;
                    const isCurrent = stepNumber === currentStep;

                    return (
                        <div key={stepNumber} className="flex flex-col items-center">
                            <div
                                className={cn(
                                    "relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors duration-300",
                                    isCompleted && "border-red-600 bg-red-600",
                                    isCurrent && "border-red-600 bg-white",
                                    !isCompleted && !isCurrent && "border-gray-300 bg-white"
                                )}
                            >
                                {isCompleted ? (
                                    <Check className="h-5 w-5 text-white" />
                                ) : (
                                    <span
                                        className={cn(
                                            "text-sm font-semibold",
                                            isCurrent ? "text-red-600" : "text-gray-500"
                                        )}
                                    >
                                        {stepNumber}
                                    </span>
                                )}
                            </div>
                            <span className="mt-2 text-xs font-medium text-gray-500">
                                {stepNumber === 1 ? "Marca" : stepNumber === 2 ? "Titular" : "Resumen"}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}