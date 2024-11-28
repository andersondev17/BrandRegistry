"use client";
import { StepIndicator } from "@/app/components/StepIndicator";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/Input";
import { motion } from "framer-motion";
import { LucideIcon, Mail, Phone, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { memo, ReactNode, useEffect, useState } from "react";

const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};
interface InputWrapperProps {
    children: ReactNode;
    icon: LucideIcon; 
}



const InputWrapper = memo(({ children, icon: Icon }: InputWrapperProps) => (
    <div className="relative group">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors">
            <Icon className="w-5 h-5" />
        </div>
        {children}
    </div>
));

InputWrapper.displayName = "InputWrapper";
export default function CreateBrandStep2() {
    const router = useRouter();
    const [ownerData, setOwnerData] = useState({
        name: "",
        email: "",
        phone: ""
    });

    useEffect(() => {
        const data = JSON.parse(sessionStorage.getItem("brandRegistration") || "{}");
        if (!data.name) {
            router.push("/registro-marca/crear");
        }
    }, [router]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const brandData = JSON.parse(sessionStorage.getItem("brandRegistration") || "{}");
        sessionStorage.setItem("brandRegistration", JSON.stringify({
            ...brandData,
            owner: ownerData.name,
            ownerContact: {
                email: ownerData.email,
                phone: ownerData.phone
            }
        }));
        router.push("/registro-marca/crear/resumen");
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 p-6">
        <StepIndicator currentStep={2} />
        
        <motion.div
            className="max-w-xl mx-auto mt-12"
            variants={formVariants}
            initial="hidden"
            animate="visible"
        >
            <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-900/80">
                <CardContent className="p-6">
                    <h2 className="text-3xl font-semibold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-purple-600">
                        Información del Titular
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <InputWrapper icon={User}>
                            <Input
                                type="text"
                                value={ownerData.name}
                                onChange={(e) => setOwnerData(prev => ({...prev, name: e.target.value}))}
                                className="pl-10 h-12 bg-white/50 dark:bg-gray-800/50"
                                placeholder="Nombre del titular"
                                required
                            />
                        </InputWrapper>

                        <InputWrapper icon={Mail}>
                            <Input
                                type="email"
                                value={ownerData.email}
                                onChange={(e) => setOwnerData(prev => ({...prev, email: e.target.value}))}
                                className="pl-10 h-12 bg-white/50 dark:bg-gray-800/50"
                                placeholder="Correo electrónico"
                                required
                            />
                        </InputWrapper>

                        <InputWrapper icon={Phone}>
                            <Input
                                type="tel"
                                value={ownerData.phone}
                                onChange={(e) => setOwnerData(prev => ({...prev, phone: e.target.value}))}
                                className="pl-10 h-12 bg-white/50 dark:bg-gray-800/50"
                                placeholder="Teléfono"
                                required
                            />
                        </InputWrapper>

                        <div className="flex justify-between pt-6">
                            <Button
                                type="button"
                                onClick={() => router.back()}
                                variant="outline"
                                className="w-32 relative overflow-hidden group"
                            >
                                <span className="relative z-10">Atrás</span>
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-purple-600/20"
                                    initial={false}
                                    animate={{
                                        opacity: [0, 0.2, 0]
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity
                                    }}
                                />
                            </Button>

                            <Button
                                type="submit"
                                className="w-32 bg-gradient-to-r from-red-600 to-purple-600 text-white"
                            >
                                Continuar
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </motion.div>
    </div>
);
}