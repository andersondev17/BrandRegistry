"use client";
import { StepIndicator } from "@/app/components/StepIndicator";
import { Button } from "@/app/components/ui/button";
import { useBrands } from "@/context/BrandContext";
import { BrandFormData } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface BrandRegistrationData extends BrandFormData {
    status: 'pending';
    ownerContact: {
        email: string;
        phone: string;
    };
}

export default function CreateBrandSummary() {
    const router = useRouter();
    const { addBrand } = useBrands();
    const [brandData, setBrandData] = useState<BrandRegistrationData | null>(null);

    useEffect(() => {
        try {
            const data = JSON.parse(sessionStorage.getItem("brandRegistration") || "{}");
            if (!data.name || !data.owner) {
                router.push("/registro-marca/crear");
                return;
            }
            setBrandData(data as BrandRegistrationData);
        } catch (error) {
            console.error("Error parsing brand data:", error);
            router.push("/registro-marca/crear");
        }
    }, [router]);

    const handleSubmit = () => {
        if (!brandData) return;

        addBrand(brandData);
        sessionStorage.removeItem("brandRegistration");
        router.push("/");
    };

    if (!brandData) return null;

    return (
        <div className="p-6">
            <StepIndicator currentStep={3} />
            <div className="max-w-xl mx-auto mt-8">
                <h2 className="text-lg font-medium mb-4 italic">Resumen del Registro</h2>

                <div className="bg-gray-50 p-6 rounded-lg space-y-4 shadow-sm">
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Marca</h3>
                        <p className="text-lg">{brandData.name}</p>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Titular</h3>
                        <p className="text-lg">{brandData.owner}</p>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Contacto</h3>
                        <p className="text-gray-700">{brandData.ownerContact.email}</p>
                        <p className="text-gray-700">{brandData.ownerContact.phone}</p>
                    </div>
                </div>

                <div className="flex justify-between mt-8">
                    <Button
                        variant="ghost"
                        onClick={() => router.back()}
                        className="w-28"
                    >
                        Atrás
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        className="bg-red-600 hover:bg-red-700 w-48"
                    >
                        Confirmar Registro
                    </Button>
                </div>
            </div>
        </div>
    );
}