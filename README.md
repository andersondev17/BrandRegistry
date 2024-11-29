# 🎯 Sistema de Registro de Marcas 

<div align="center">

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

</div>

## 📋 Contenido
- [Demo](#-demo)
- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Arquitectura](#-arquitectura)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Autor](#-autor)

## 🚀 Demo

- **Live Demo**: [Brand Registry System](https://brand-registry.vercel.app/)
- **Repositorio**: [GitHub](https://github.com/andersondev17/BrandRegistry)

## ✨ Características

- 🔄 CRUD completo de registros de marca
- 📱 Diseño responsivo
- 🎨 UI moderna con animaciones fluidas
- 🔒 Validación de formularios
- 💾 Persistencia de datos
- 🌙 Modo oscuro

## 🛠 Tecnologías

### Core
```json
{
  "next": "15.0.3",
  "react": "19.0.0-rc-66855b96-20241106",
  "typescript": "^5.7.2"
}
UI/UX
jsonCopy{
  "tailwindcss": "^3.4.1",
  "framer-motion": "^10.16.4",
  "lucide-react": "^0.263.1",
  "shadcn/ui": "^0.3.0"
}
Utilidades
jsonCopy{
  "zod": "^3.22.4",
  "clsx": "^2.0.0",
  "tailwind-merge": "^1.14.0"
}

```

## 🏗 Arquitectura
Patrones de Diseño
### 1. Context Pattern (Estado Global)
typescriptCopyexport const BrandProvider = ({ children }: Props) => {
  const [brands, setBrands] = useState<Brand[]>(initialBrands);
  // Gestión centralizada del estado
};
### 2. Container/Presentational Pattern

Separación de lógica y presentación
Componentes reutilizables
Facilita testing

### 3. Custom Hooks

typescriptCopyexport const useBrands = () => {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error("useBrands must be used within BrandProvider");
  }
  return context;
};
### Flujo de Datos

Carga inicial desde localStorage
Operaciones CRUD actualizan Context y localStorage
Componentes UI reaccionan a cambios de estado

### 📁 Estructura del Proyecto
Copysrc/
├── app/                  # Directorio principal
│   ├── components/      # Componentes reutilizables
│   ├── layout.tsx      # Layout principal
│   └── page.tsx        # Página principal
├── lib/                 # Utilidades
│   ├── types/         # Types TypeScript
│   └── utils/         # Funciones auxiliares
└── context/            # Estado global
### 🚀 Instalación
bashCopy# Clonar repositorio
git clone https://github.com/andersondev17/BrandRegistry.git

# Instalar dependencias
npm install --legacy-peer-deps

# Desarrollo
npm run dev

# Producción
npm run build
npm start
💻 Uso

Iniciar servidor de desarrollo

bashCopynpm run dev

Abrir navegador en http://localhost:3000
Comenzar a gestionar registros de marca

👨‍💻 Autor
<div align="center">
Anderson López Martínez
Show Image
Show Image
Show Image
</div>

<div align="center">
Desarrollado con ❤️ por Anderson López
</div>
```
