# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

Use pnpm as the package manager:

```bash
# Development
pnpm dev               # Start development server with turbopack
pnpm build            # Build production bundle
pnpm start            # Start production server
pnpm lint             # Run ESLint

# Payload CMS
pnpm generate:types   # Generate TypeScript types from Payload collections
pnpm generate:importmap # Generate import map for Payload
```

## Architecture Overview

This is a Next.js 15 blog application with the following key architectural components:

### Core Stack
- **Next.js 15** with App Router and TypeScript
- **Payload CMS** for content management with PostgreSQL
- **Tailwind CSS** with motion animations
- **i18n** support for en/zh/ja/ko locales
- **S3 storage** for media with blurhash optimization

### Directory Structure

- `app/(app)/[lng]/` - Main application routes with i18n support
- `app/(payload)/` - Payload CMS admin interface and collections
- `app/(demo)/` - Demo components and layouts
- `app/(photo)/` - Photo gallery functionality
- `components/` - Organized by feature (blogs, layout, projects, etc.)
- `service/` - API service layer for data fetching
- `lib/` - Shared utilities and configurations
- `blocks/` - Reusable content blocks

### Key Features

**Multi-language Support:**
- Languages: en, zh, ja, ko (fallback: en)
- Middleware handles locale detection and routing
- Translation files in `app/(app)/i18n/locales/`

**Content Management:**
- Payload CMS collections: Blog, Project, Experience, Photo, Books, Journal
- Rich text editor with Lexical
- Media management with S3 and blurhash
- Global content: Home, About, BlogPage

**Routing Patterns:**
- `[lng]/blogs/[slug]` - Blog posts
- `[lng]/projects` - Project showcase
- `[lng]/journal/[slug]` - Journal entries
- `[lng]/photo/[id]` - Photo details with modal support
- `gallery/` - Photo gallery (no locale)

## Component Guidelines

**File Organization:**
- Feature-based: `/components/[page]/Component.tsx`
- Sub-components: `/components/[page]/[component]/Component.tsx`
- Always support HTML attributes with className merging using `cn()` from `lib/utils.ts`

**Styling:**
- Use Tailwind CSS for all styling
- Use `class-variance-authority` for complex style variations
- Animations: CSS-first, then framer-motion if needed
- Icons: `@iconify/react`

**Component Standards:**
- Functional components with TypeScript interfaces
- Server components by default, client components when needed for SEO
- Named exports preferred
- Descriptive variable names with auxiliary verbs

## Development Patterns

**State Management:**
- Jotai for client-side state
- TanStack Query for server state
- URL state with nuqs

**Data Fetching:**
- Service layer in `service/` directory
- Payload CMS GraphQL API
- Server components for initial data, client components for interactions

**Internationalization:**
- `useLanguage` hook for client components
- Server components receive `lng` parameter
- Middleware handles locale routing and cookie management

## Configuration Files

- `payload.config.ts` - Payload CMS configuration
- `next.config.ts` - Next.js config with Payload integration
- `middleware.ts` - i18n routing and locale detection
- `tailwind.config.ts` - Tailwind configuration
- `.cursorrules` - Development guidelines (Chinese)