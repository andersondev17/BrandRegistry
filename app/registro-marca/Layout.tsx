export default function RegisterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto p-6">
                <div className="bg-white rounded-lg shadow-sm p-8">
                    <div className="mb-6">
                        <h1 className="text-xl font-medium mb-2">Panel</h1>
                        <div className="text-lg text-red-400">Servicios/Registro de Marca</div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}