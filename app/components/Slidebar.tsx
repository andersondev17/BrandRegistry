"use client";

import { Button } from "@/app/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { BookmarkPlus, LayoutDashboard, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, useEffect, useState } from "react";

interface NavItemProps {
    href: ComponentProps<typeof Link>["href"];
    children: React.ReactNode;
    icon: React.ElementType;
    isCollapsed: boolean;
}

export function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();
    
    // Maneja el estado inicial basado en el tamaño de la ventana
    useEffect(() => {
        const handleResize = () => {
            setIsCollapsed(window.innerWidth < 1024);
        };
        handleResize();
        
        window.addEventListener('resize', handleResize);
        
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const NavItem = ({ href, children, icon: Icon, isCollapsed }: NavItemProps) => {
        const isActive = pathname === href || 
            (typeof href === 'string' && pathname.startsWith(href));

        return (
            <motion.div
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
            >
                <Link
                    href={href}
                    className={cn(
                        "flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-all",
                        "relative overflow-hidden",
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
                        <span className="font-medium">{children}</span>
                    )}
                </Link>
            </motion.div>
        );
    };

    return (
        <>
            {/* Botón de toggle para móvil */}
            <Button
                variant="ghost"
                size="icon"
                className="fixed top-1 left-4 z-50 lg:hidden"
                onClick={() => setIsCollapsed(!isCollapsed)}
            >
                {isCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
            </Button>

            <AnimatePresence mode="wait">
                <motion.div 
                    className={cn(
                        "fixed top-0 left-0 z-40 h-screen bg-white/80 dark:bg-black/80 backdrop-blur-lg",
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
                    <div className="flex flex-col gap-4 p-6">
                        <div className="px-3 py-2">
                            {!isCollapsed && (
                                <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                                    Dashboard
                                </h2>
                            )}
                            <div className="space-y-1">
                                <NavItem href="/" icon={LayoutDashboard} isCollapsed={isCollapsed}>
                                    Panel
                                </NavItem>
                            </div>
                        </div>
                        <div className="px-3 py-2">
                            {!isCollapsed && (
                                <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                                    Servicios
                                </h2>
                            )}
                            <div className="space-y-1">
                                <NavItem 
                                    href="/registro-marca/crear" 
                                    icon={BookmarkPlus}
                                    isCollapsed={isCollapsed}
                                >
                                    Registro de Marca
                                </NavItem>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Overlay para cerrar el menú en móvil */}
            {!isCollapsed && (
                <motion.div
                    className="fixed inset-0 bg-black/20 z-30 lg:hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsCollapsed(true)}
                />
            )}
        </>
    );
}