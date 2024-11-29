"use client";

import { motion } from "framer-motion";
import { BrandTable } from "./components/BrandTable";

/**
 * Configuración de animaciones para la página
 */
const pageAnimations = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

/**
 * Componente de encabezado de la página
 */
const PageHeader = () => (
  <div className="mb-8">
    <motion.h1 
      className="text-3xl font-bold text-gray-900 dark:text-gray-100"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      Panel
    </motion.h1>
    <motion.h2 
      className="text-xl text-gray-600 dark:text-gray-400"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
    >
      Servicios/Registro de Marca
    </motion.h2>
  </div>
);

/**
 * HomePage - Página principal que muestra el panel de control de marcas
 * 
 * @component
 * @example
 * ```tsx
 * <HomePage />
 * ```
 */
export default function HomePage() {
  return (
    <motion.main 
      className="min-h-screen p-8 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
      initial="initial"
      animate="animate"
      variants={pageAnimations}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        <PageHeader />
        <BrandTable />
      </div>
    </motion.main>
  );
}