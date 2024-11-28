"use client";

import { cn } from "@/lib/utils";
import { BookmarkPlus, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
    const pathname = usePathname();

    const NavItem = ({
        href,
        children,
        icon: Icon,
    }: {
        href: string;
        children: React.ReactNode;
        icon: React.ElementType;
    }) => {
        const isActive = pathname === href || pathname.startsWith(href);

        return (
            <Link
                href={href}
                className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                    isActive
                        ? "bg-red-50 text-red-600"
                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                )}
            >
                <Icon className="h-4 w-4" />
                {children}
            </Link>
        );
    };

    return (
        <div className="w-64 min-h-screen border-r bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="flex flex-col gap-4 p-6">
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                        Dashboard
                    </h2>
                    <div className="space-y-1">
                        <NavItem href="/" icon={LayoutDashboard}>
                            Panel
                        </NavItem>
                    </div>
                </div>
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                        Servicios
                    </h2>
                    <div className="space-y-1">
                        <NavItem href="/registro-marca/crear" icon={BookmarkPlus}>
                            Registro de Marca
                        </NavItem>
                    </div>
                </div>
            </div>
        </div>
    );
}