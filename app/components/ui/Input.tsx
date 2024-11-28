import { cn } from "@/lib/utils";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    className?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, error, ...props }, ref) => {
        return (
            <div className="relative">
                <input
                    className={cn(
                        "w-full p-3 bg-white/50 dark:bg-gray-800/50",
                        "backdrop-blur-sm border border-gray-200 dark:border-gray-700",
                        "rounded-lg transition-all duration-200 ease-in-out",
                        "focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent",
                        "placeholder:text-gray-400 dark:placeholder:text-gray-500",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        error && "border-red-500 focus:ring-red-500",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {error && (
                    <p className="mt-1 text-sm text-red-500">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export { Input };
