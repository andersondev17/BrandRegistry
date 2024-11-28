
import { BrandTable } from "./components/BrandTable";

export default function Home() {
  console.log("what am i doing here? -->/CLIENT");
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Panel</h1>
          <h2 className="text-xl text-gray-600">Servicios/Registro de Marca</h2>
        </div>
        
        <BrandTable />
      </div>
    </main>
  );
}
