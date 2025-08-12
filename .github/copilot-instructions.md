# Waku Auth Example - AI Agent Instructions

## 🏗️ Architecture Overview

This is a **Waku React framework** project using **Vertical Slices Architecture** with **better-auth** for authentication. All related functionality is co-located within feature slices, making code highly discoverable.

## 📁 Key Directory Structure

```
src/
├── features/           # Feature slices (auth, counter, dashboard)
│   └── auth/           # Authentication feature slice
│       ├── components/ # Auth-specific components  
│       ├── api/        # Auth client configuration
│       └── types/      # Auth type definitions
├── shared/             # Reusable components and utilities
│   └── components/ui/  # Design system components (Button, Input)
├── pages/              # Waku pages (orchestration layer)
│   └── api/auth/       # Auth API routes
├── middleware/         # Waku middleware (auth middleware)
└── auth.ts             # Better-auth configuration
```

## 🔧 Development Commands

- **Start dev server**: `pnpm dev` (Waku dev server on port 3000)
- **Build**: `pnpm build` (Waku build process)
- **Auth migrations**: `pnpm exec @better-auth/cli migrate` (run after schema changes)
- **Generate auth schema**: `pnpm exec @better-auth/cli generate`

## 🎯 Key Patterns

### Feature Organization
- Each feature is self-contained in `src/features/[feature-name]/`
- Use barrel exports (`index.ts`) for clean imports
- Feature components import from `../../../shared/components` for UI primitives

### Authentication Flow
- **Server config**: `src/auth.ts` - better-auth setup with SQLite
- **Client config**: `src/features/auth/api/auth-client.ts` - React client
- **API routes**: `src/pages/api/auth/[...route].ts` - handles GET/POST to auth.handler
- **Middleware**: `src/middleware/auth.ts` - injects session into Waku context via `ctx.data.session`

### Component Patterns
- Shared UI in `src/shared/components/ui/` (Button with variants, Input with labels)
- Use `"use client"` directive for interactive components
- Auth forms use `useTransition` for pending states
- Error handling via local state in forms

### Import Conventions
```typescript
// Feature imports (use barrel exports)
import { AuthForms, SignInForm } from '../features/auth';

// Shared component imports
import { Button, Input } from '../shared/components';

// Auth client usage
import { authClient } from '../features/auth/api/auth-client';
```

## 🔗 Integration Points

### Waku Framework
- **Middleware chain**: context → dev-server → auth → handler (defined in `waku.config.ts`)
- **Pages**: Server-side rendered with session data from middleware
- **API routes**: Export GET/POST functions that call `auth.handler(request)`

### Better-Auth Integration
- **Database**: SQLite file `./sqlite.db` with auto-generated schema
- **Session management**: Server middleware provides session to pages via `ctx.data.session`
- **Client methods**: `authClient.signIn.email()`, `authClient.signUp.email()`, `authClient.signOut()`

### Styling
- **Tailwind CSS** for component styling
- **Design tokens**: Consistent variants (primary/secondary/link buttons, sm/md/lg sizes)

## 🚀 When Adding Features

1. **New feature slice**: Create `src/features/[name]/` with components, hooks, types folders
2. **Shared components**: Add to `src/shared/components/ui/` if reusable across features  
3. **Pages**: Use as orchestration layer - import from features and compose
4. **Types**: Feature-specific types in feature slice, shared types in `src/shared/types/`

## 🔍 Common Tasks

- **Find auth logic**: Everything in `src/features/auth/`
- **Add UI component**: Create in `src/shared/components/ui/` with Tailwind variants
- **Debug auth**: Check middleware logs, session in `ctx.data.session`
- **Database changes**: Run `@better-auth/cli migrate` after modifying auth config

This structure optimizes for feature discoverability and maintains clear boundaries between shared and feature-specific code.
