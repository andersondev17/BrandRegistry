# 🚀 Brand Registration System

A modern, brand registration management system built with Next.js 15 and TypeScript. This application showcases advanced React patterns, modern UI/UX principles, and best practices in frontend development.

![Brand Registration System Demo](public/demo.gif)

## ✨ Key Features

- **🎨 Modern UI/UX**
  - Responsive design with Tailwind CSS
  - Smooth animations with Framer Motion
  - Accessible components

- **🛠 Technical Excellence**
  - Type-safe development with TypeScript
  - Form validation with Zod
  - Performance optimizations (React.memo, useMemo)
  - SEO optimization with Next.js metadata
  - Code splitting

- **💼 Business Features**
  - Multi-step brand registration
  - Real-time validation
  - Status management
  - Comprehensive CRUD operations

## 🔧 Tech Stack

### Core
```json
{
  "frontend": {
    "framework": "Next.js 15",
    "language": "TypeScript",
    "ui": "React 19"
  },
  "styling": {
    "framework": "Tailwind CSS",
    "components": "shadcn/ui",
    "icons": "Lucide React",
    "animations": "Framer Motion"
  },
  "validation": {
    "schemas": "Zod",
    "forms": "React Hook Form"
  }
}
```

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/andersondev17/BrandRegistry.git

# Install dependencies
npm install --legacy-peer-deps

# Run development server
npm run dev

# Build for production
npm run build
```



## 🔍 Code Quality

```bash
# Lint code
npm run lint

# Format code
npm run format

# Type check
npm run type-check
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── components/        # Reusable components
│   │   ├── ui/           # Base UI components
│   │   ├── BrandTable.tsx  # Brand listing component
        ├── BrandSkeleton.tsx  # Brand listing component
│   │   ├── Sidebar.tsx     # Navigation sidebar
│   │   └── StepIndicator   # Registration progress indicator
|   ├── registro-marca/        # Reusable components
|   |   ├── crear/     
|   |   ├── editar/        
├── lib/                   # Utilities and helpers
│   ├── schemas/          # Zod schemas
│
├── types/                # TypeScript types
```



## 🌟 Performance Optimizations

- Implemented React.memo for component memoization
- Used useMemo for expensive computations
- Code splitting and dynamic imports

## 👤 Author

Anderson
- Portfolio: [https://portfolio-deploy-ebon.vercel.app/]([[https://portfolio-deploy-ebon.vercel.app/](https://portfolio-deploy-ebon.vercel.app/)])
- GitHub: [https://github.com/andersondev17]([[https://github.com/yourusername](https://github.com/andersondev17)])
- LinkedIn: [https://www.linkedin.com/in/andersonlopezmartinez/]([https://www.linkedin.com/in/andersonlopezmartinez/])
