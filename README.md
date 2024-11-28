# Brand Registration System

A modern, efficient brand registration management system built with Next.js 15 and TypeScript. This application provides a complete CRUD interface for managing brand registrations with a sleek, user-friendly design.

![Brand Registration System](https://your-deployment-url.com/screenshot.png)

## 🚀 Live Demo

Access the live application here: [Brand Registration System](https://your-deployment-url.com)

## 🛠 Tech Stack

### Core Technologies
- [Next.js 15](https://nextjs.org/) - React framework with server-side rendering
- [TypeScript](https://www.typescriptlang.org/) - Static type checking
- [React 19](https://reactjs.org/) - UI library

### UI & Styling
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Re-usable components
- [Lucide React](https://lucide.dev/) - Modern icon set

### State Management & Data Persistence
- React Context API - Application state management
- Browser's localStorage - Data persistence

### Development Tools
- ESLint - Code linting
- Prettier - Code formatting

## 🌟 Features

- **Brand Management Dashboard**
  - Overview of all registered brands
  - Quick status indicators
  - Sorting and filtering capabilities

- **Multi-step Brand Registration**
  - Step-by-step registration process
  - Form validation
  - Progress tracking

- **Brand Editing & Updates**
  - Real-time updates
  - Data validation
  - Status management

- **Responsive Design**
  - Mobile-first approach
  - Cross-browser compatibility
  - Optimized for all screen sizes

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/andersondev17/BrandRegistry.git
cd brand-registration
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🏗 Project Structure

```
BRANDREGISTRY/
├── app/                      # Next.js app directory
│   ├── components/          # Reusable components
│   │   ├── ui/             # UI components from shadcn
│   │   ├── BrandTable.tsx  # Brand listing component
│   │   ├── Sidebar.tsx     # Navigation sidebar
│   │   └── StepIndicator   # Registration progress indicator
│   ├── registro-marca/     # Brand registration routes
│   └── page.tsx            # Main dashboard page
├── context/                 # React Context providers
├── data/                   # Static data and mock data
├── lib/                    # Utility functions and types
└── public/                 # Static assets
```

## 📖 Implementation Details

### State Management
The application uses React Context API for state management, with data persistence handled through localStorage. This provides a seamless experience while maintaining data between sessions.

### Component Architecture
Components are built following the atomic design pattern:
- Atoms: Basic UI components (buttons, inputs)
- Molecules: Combined components (form fields, cards)
- Organisms: Complex components (forms, tables)
- Templates: Page layouts
- Pages: Complete screens

### Data Flow
1. Initial data is loaded from localStorage or falls back to hardcoded data
2. CRUD operations update both the Context state and localStorage
3. UI components react to state changes in real-time

## 🔒 Security

- Form validation to prevent XSS
- Data sanitization before storage
- Secure random ID generation
- Type checking with TypeScript



## 📱 Responsive Design

The application is fully responsive with breakpoints at:
- Mobile: 320px
- Tablet: 768px
- Desktop: 1024px
- Large Desktop: 1280px

## 🚀 Deployment

The application is deployed on Vercel



## 👤 Author

Anderson

## 🙏 Acknowledgments

- [Next.js Team](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)