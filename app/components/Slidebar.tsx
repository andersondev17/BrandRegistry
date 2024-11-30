"use client";

import { Button } from "@/app/components/ui/button";
import { BrandStatus } from "@/lib/types/types";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { BookmarkPlus, LayoutDashboard, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Tipos y constantes
 */
interface NavItem {
    href: string | URL;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    label: string;
    brandStatus?: BrandStatus; // Estado opcional para navegación basada en marcas
}

interface NavItemProps extends NavItem {
    isCollapsed: boolean;
}

const NAVIGATION_ITEMS: Record<string, NavItem[]> = {
    main: [
        { href: "/", icon: LayoutDashboard, label: "Panel" }
    ],
    services: [
        { href: "/registro-marca/crear", icon: BookmarkPlus, label: "Registro de Marca" }
    ]
};

/**
 * Componentes de navegación
 */
const NavItem = ({ href, icon: Icon, label, isCollapsed, brandStatus }: NavItemProps) => {
    const pathname = usePathname();
    const isActive = pathname === href || pathname.startsWith(String(href));

    return (
        <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
            <Link
                href={href}
                aria-label="Ir a la seccion"
                className={cn(
                    "flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-all relative overflow-hidden",
                    isActive 
                        ? "bg-gradient-to-r from-red-600 to-purple-600 text-white"
                        : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                )}
            >
                {isActive && (
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-purple-600/20"
                        layoutId="activeNav"
                        initial={false}
                        transition={{ type: "spring", bounce: 0.2 }}
                    />
                )}
                <Icon className="h-5 w-5" />
                {!isCollapsed && (
                    <span className="font-medium">
                        {label} {brandStatus && `(${brandStatus})`}
                    </span>
                )}
            </Link>
        </motion.div>
    );
};

/**
 * Controles de navegación
 */
const NavToggle = ({ isCollapsed, onToggle }: { isCollapsed: boolean; onToggle: () => void }) => (
    <Button
        variant="ghost"
        size="icon"
        className="fixed top-1 left-4 z-50 lg:hidden"
        onClick={onToggle}
        aria-label={isCollapsed ? "Abrir menú" : "Cerrar menú"}
    >
        {isCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
    </Button>
);

const NavOverlay = ({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) => (
    isVisible && (
        <motion.div
            className="fixed inset-0 bg-black/20 z-30 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        />
    )
);

/**
 * Sidebar - Componente principal de navegación lateral
 * @component
 */
export function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsCollapsed(window.innerWidth < 1024);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <NavToggle 
                isCollapsed={isCollapsed} 
                onToggle={() => setIsCollapsed(!isCollapsed)} 
            />

            <AnimatePresence mode="wait">
                <motion.div 
                    className={cn(
                        "fixed top-0 left-0 z-40 h-screen",
                        "bg-white/80 dark:bg-black/80 backdrop-blur-lg",
                        "border-r border-gray-100 dark:border-gray-800",
                        "transition-all duration-300 ease-in-out",
                        "lg:relative",
                        isCollapsed ? "w-0 lg:w-20" : "w-64"
                    )}
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ 
                        x: isCollapsed ? -100 : 0,
                        opacity: isCollapsed ? 0 : 1,
                        width: isCollapsed ? 0 : 256
                    }}
                    exit={{ x: -100, opacity: 0 }}
                    transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                >
                    <nav className="flex flex-col gap-4 p-6">
                        {Object.entries(NAVIGATION_ITEMS).map(([section, items]) => (
                            <div key={section} className="px-3 py-2">
                                {!isCollapsed && (
                                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                                        {section === 'main' ? 'Dashboard' : 'Servicios'}
                                    </h2>
                                )}
                                <div className="space-y-1">
                                    {items.map((item) => (
                                        <NavItem 
                                            key={item.href.toString()}
                                            {...item}
                                            isCollapsed={isCollapsed}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </nav>
                </motion.div>
            </AnimatePresence>

            <NavOverlay 
                isVisible={!isCollapsed} 
                onClose={() => setIsCollapsed(true)} 
            />
        </>
    );
}
