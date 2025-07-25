# BUY Token Landing Page

## Overview

This is a full-stack web application for BUY Token, a cryptocurrency project featuring a modern, dark-themed landing page with animated components and a community-focused design. The application is built using React with TypeScript for the frontend and Express.js for the backend, with PostgreSQL database integration via Drizzle ORM.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a monorepo structure with clear separation between client and server code:

### Frontend Architecture
- **React 18** with TypeScript for type safety
- **Vite** as the build tool for fast development and optimized production builds
- **Tailwind CSS** for utility-first styling with custom crypto-themed color variables
- **shadcn/ui** component library for consistent, accessible UI components
- **Wouter** for lightweight client-side routing
- **TanStack Query** for server state management and API calls

### Backend Architecture
- **Express.js** server with TypeScript
- **Drizzle ORM** for database operations with PostgreSQL
- **Neon Database** serverless PostgreSQL integration
- RESTful API design with health check and stats endpoints

### UI/UX Design
- Dark theme optimized for cryptocurrency/fintech aesthetics
- Neon green (#00FF88) and crypto red color scheme
- Custom animations including floating particles, intersection observers, and smooth scrolling
- Mobile-responsive design with dedicated mobile navigation
- Orbitron font for futuristic crypto branding

## Key Components

### Frontend Components
1. **Landing Page Sections**:
   - Hero section with animated BUY buttons and rotating slogans
   - About section with tokenomics and stats
   - Philosophy section explaining the buy-and-hold strategy
   - Community section showcasing holder statistics
   - Vision section with feature cards
   - Join section with social media links

2. **Interactive Elements**:
   - Floating particle background animation
   - Intersection observer-based scroll animations
   - Mobile navigation with sheet overlay
   - Smooth scroll navigation between sections

3. **Reusable UI Components**:
   - Complete shadcn/ui component library implementation
   - Custom hooks for mobile detection, intersection observation, and smooth scrolling
   - Toast notifications and tooltip providers

### Backend Components
1. **API Endpoints**:
   - `/api/health` - Health check endpoint
   - `/api/stats` - Community statistics (placeholder data)
   - Static asset serving for attached assets

2. **Database Schema**:
   - User table with username/password fields
   - Drizzle schema with Zod validation
   - PostgreSQL-specific configuration

## Data Flow

1. **Client-Side Rendering**: React components render the landing page with smooth animations
2. **API Communication**: TanStack Query manages API calls to backend endpoints
3. **Static Assets**: Images and assets served from `/attached_assets` directory
4. **Database Operations**: Drizzle ORM handles PostgreSQL interactions (prepared for future user features)

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with PostCSS
- **Components**: Radix UI primitives via shadcn/ui
- **State Management**: TanStack Query for server state
- **Routing**: Wouter for lightweight routing
- **Animations**: CSS-based animations with custom keyframes

### Backend Dependencies
- **Server**: Express.js with TypeScript
- **Database**: Neon Database (serverless PostgreSQL)
- **ORM**: Drizzle ORM with Drizzle Kit for migrations
- **Validation**: Zod for schema validation

### Development Tools
- **Build Tool**: Vite with React plugin
- **Type Checking**: TypeScript with strict configuration
- **Development**: tsx for TypeScript execution
- **Bundling**: esbuild for server-side bundling

## Deployment Strategy

### Development
- **Client**: Vite dev server with HMR (Hot Module Replacement)
- **Server**: tsx watch mode for automatic TypeScript compilation
- **Database**: Drizzle push commands for schema synchronization

### Production Build
1. **Frontend**: Vite builds optimized static assets to `dist/public`
2. **Backend**: esbuild bundles server code to `dist/index.js`
3. **Static Assets**: Express serves built frontend and attached assets
4. **Database**: Drizzle migrations handle schema updates

### Environment Configuration
- **Database**: `DATABASE_URL` environment variable for PostgreSQL connection
- **Development**: NODE_ENV-based environment detection
- **Replit Integration**: Special handling for Replit development environment

The application is structured for easy deployment on platforms like Replit, with built-in support for development banners and cartographer tooling when running in the Replit environment.

## Recent Changes

### July 25, 2025
- **Website Conversion to Static HTML/CSS/JS**: Converted entire React application to standalone HTML, CSS, and JavaScript files for easy deployment
  - Created `index.html` with complete website structure and all sections
  - Created `styles.css` with full responsive styling and animations  
  - Created `script.js` with all interactive functionality
  - Preserved contract address revealing animation (9-second cycle)
  - Maintained all social platform links and 3D button graphics
  - Added mobile-first responsive design with touch interactions
  - External dependencies: Google Fonts, Lucide Icons, attached assets