# Sistema de Registro de Marcas - Documentación Técnica

## 💫 Acceso al Proyecto

- **URL de la Aplicación**: [Brand Registry System](https://brand-registry-andersondev17.vercel.app/)
- **Repositorio**: [GitHub - Brand Registry](https://github.com/andersondev17/BrandRegistry)

## 🏗 Patrones de Diseño Implementados

### a. Arquitecturales

#### 1. Container/Presentational Pattern
- Implementado en `BrandTable.tsx` y `DeleteBrandDialog.tsx`
- Separación clara entre lógica de negocio y presentación
- Mejora la reutilización y el testing

#### 2. Context Pattern (BrandContext)
-The application uses React Context API for state management, with data persistence handled through localStorage. This provides a seamless experience while maintaining data between sessions.
- Browser's localStorage - Data persistence
```typescript
export const BrandProvider = ({ children }: Props) => {
  const [brands, setBrands] = useState<Brand[]>(initialBrands);
  // Lógica CRUD centralizada
};
#### 3.Custom Hooks Pattern
typescriptCopyexport const useBrands = () => {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error("useBrands must be used within BrandProvider");
  }
  return context;
};

Encapsula lógica común
Mejora la reutilización
Facilita el testing

###b. Composicionales
####1. Compound Components
typescriptCopy// StepIndicator.tsx
export const StepIndicator: FC<StepIndicatorProps> = {
  StepCircle,
  StepLabel,
  ProgressBar
};

Mejora la flexibilidad y reutilización
Mantiene el estado internamente
API intuitiva

### Data Flow
1. Initial data is loaded from localStorage or falls back to hardcoded data
2. CRUD operations update both the Context state and localStorage
3. UI components react to state changes in real-time

####2. Render Props Pattern

Usado en componentes de formulario
Permite personalización del renderizado
Mantiene la lógica encapsulada

##📚 Librerías Utilizadas
Core
jsonCopy{
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
📁 Estructura del Proyecto y Funcionalidad
Componentes Principales
####1. BrandTable.tsx
typescriptCopyexport function BrandTable() {
  const { brands } = useBrands();
  // Implementa vista principal de marcas
}

Lista de marcas registradas
Acciones CRUD
Animaciones y feedback visual

#####2. StepIndicator.tsx
typescriptCopyexport function StepIndicator({ currentStep }: Props) {
  // Muestra progreso del registro
}

Indicador de progreso visual
Transiciones animadas
Responsive design

####3. Layout.tsx
typescriptCopyexport default function RootLayout({ children }: Props) {
  // Estructura base de la aplicación
}

Estructura consistente
Navegación
Gestión de temas
# Desarrollo
npm run dev --legacy-peer-deps

# Producción
npm run build
npm start
Esta documentación detalla los aspectos técnicos más relevantes del proyecto, destacando las decisiones de arquitectura y diseño tomadas para crear una aplicación moderna, mantenible y escalable.

Anderson
- Portfolio: [https://portfolio-deploy-ebon.vercel.app/]([[https://portfolio-deploy-ebon.vercel.app/](https://portfolio-deploy-ebon.vercel.app/)])
- GitHub: [https://github.com/andersondev17]([[https://github.com/yourusername](https://github.com/andersondev17)])
- LinkedIn: [https://www.linkedin.com/in/andersonlopezmartinez/]([https://www.linkedin.com/in/andersonlopezmartinez/])
