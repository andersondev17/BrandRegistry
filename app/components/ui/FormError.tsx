"use client";

import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { memo } from "react";

interface FormErrorProps {
    message: string;
}

export const FormError = memo(({ message }: FormErrorProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 mt-2 text-sm text-red-500"
        >
            <AlertCircle className="w-4 h-4" />
            <span>{message}</span>
        </motion.div>
    );
});

FormError.displayName = "FormError";