# Waku Auth Example - Vertical Slices Architecture

This project has been restructured using **Vertical Slices Architecture** to improve maintainability, discoverability, and AI agent friendliness.

## 🏗️ Architecture Overview

### Vertical Slices Approach
Each feature contains everything it needs in one place:
- Components
- Hooks
- API clients
- Types
- Business logic

This makes it easy to:
- Find related code quickly
- Understand feature boundaries
- Make changes without affecting other features
- Enable AI agents to locate functionality

## 📁 Directory Structure

```
src/
├── app/                          # App-level concerns
│   ├── layout/
│   │   ├── components/          # Header, Footer
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   └── index.ts         # Barrel exports
│   │   └── index.ts
│   ├── providers/               # Global providers (future)
│   └── styles/
│       └── globals.css          # Global styles
├── features/                     # Feature slices
│   ├── auth/                    # Authentication feature
│   │   ├── components/          # Auth-specific components
│   │   │   ├── auth-forms.tsx
│   │   │   ├── sign-in-form.tsx
│   │   │   ├── sign-up-form.tsx
│   │   │   ├── sign-out-button.tsx
│   │   │   └── index.ts
│   │   ├── api/                 # Auth API client
│   │   │   └── auth-client.ts
│   │   ├── types/               # Auth-specific types
│   │   │   ├── auth.types.ts
│   │   │   └── index.ts
│   │   ├── hooks/               # Auth hooks (future)
│   │   └── index.ts             # Feature exports
│   ├── counter/                 # Counter feature example
│   │   ├── components/
│   │   │   ├── counter.tsx
│   │   │   └── index.ts
│   │   ├── hooks/               # Counter hooks (future)
│   │   └── index.ts
│   └── dashboard/               # Dashboard feature
│       ├── components/
│       │   ├── welcome-section.tsx
│       │   └── index.ts
│       └── index.ts
├── shared/                       # Shared utilities
│   ├── components/
│   │   └── ui/                  # Reusable UI components
│   │       ├── button.tsx
│   │       ├── input.tsx
│   │       └── index.ts
│   ├── hooks/                   # Shared hooks
│   ├── utils/                   # Utility functions
│   ├── types/                   # Shared types
│   └── index.ts
├── pages/                        # Waku pages (orchestration layer)
│   ├── _layout.tsx
│   ├── index.tsx                # Home page
│   ├── about.tsx
│   └── api/
│       └── auth/
│           └── [...route].ts
├── middleware/
│   └── auth.ts
└── auth.ts                       # Auth configuration
```

## 🎯 Key Benefits

### 1. **Feature Colocation**
- All authentication code is in `features/auth/`
- All counter functionality is in `features/counter/`
- Easy to find what you're looking for

### 2. **Clear Boundaries**
- Each feature is self-contained
- Minimal coupling between features
- Clear import/export patterns

### 3. **Scalable Structure**
- Add new features by creating new slices
- Each slice follows the same pattern
- Easy to understand and extend

### 4. **AI Agent Friendly**
- Clear naming conventions
- Predictable structure
- Barrel exports for clean imports
- Everything related to a feature is co-located

### 5. **Maintainable Components**
- Small, focused components
- Reusable UI components in `shared/`
- Consistent design patterns

## 🧩 Component Design

### Shared UI Components
Located in `src/shared/components/ui/`:
- `Button` - Reusable button with variants (primary, secondary, link)
- `Input` - Form input with label and error handling

### Feature Components
Each feature has its own components:
- **Auth**: Sign-in/up forms, auth forms wrapper
- **Counter**: Interactive counter component
- **Dashboard**: Welcome section with user info

## 📦 Import Patterns

### Using Barrel Exports
```typescript
// Import from feature
import { AuthForms, SignInForm } from '../features/auth';

// Import from shared components
import { Button, Input } from '../shared/components';

// Import from specific component
import { WelcomeSection } from '../features/dashboard';
```

### Feature-to-Feature Communication
Features communicate through:
- Shared types in `src/shared/types/`
- Props passed from pages (orchestration layer)
- Context providers (when needed)

## 🚀 Getting Started

1. **Find Auth Code**: Look in `src/features/auth/`
2. **Find UI Components**: Look in `src/shared/components/ui/`
3. **Add New Feature**: Create `src/features/your-feature/`
4. **Add Shared Logic**: Put in `src/shared/`

## 🔄 Development Workflow

### Adding a New Feature
1. Create `src/features/my-feature/`
2. Add `components/`, `hooks/`, `types/` folders
3. Create `index.ts` barrel exports
4. Import in pages where needed

### Adding Shared Components
1. Create component in `src/shared/components/ui/`
2. Export from `src/shared/components/ui/index.ts`
3. Use across features

### Updating Existing Features
1. All related code is in the feature folder
2. Update components, types, hooks as needed
3. Exports are automatically available

## 🤖 AI Agent Benefits

This structure helps AI agents:
- **Quickly locate** auth-related code in one place
- **Understand** feature boundaries and relationships
- **Navigate** the codebase using consistent patterns
- **Suggest** improvements within feature boundaries
- **Generate** new features following the established pattern

The vertical slices architecture makes the codebase more discoverable and maintainable for both humans and AI agents!
