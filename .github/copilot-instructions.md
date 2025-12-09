# Form Builder - AI Agent Instructions

## Project Overview
A React/TypeScript form builder that accepts JSON schemas and generates React form components with live preview. Two-view architecture: Schema Builder (JSON editor with validation) and Form Preview (Sandpack-powered live React component).

## Architecture

### Module Structure (Feature-Based)
- `src/schema-builder/` - JSON schema editor and validation
- `src/form-preview/` - Dynamic form generation and rendering
- `src/shared/` - Cross-feature utilities, stores, and components

Each feature module contains: `views/`, `hooks/`, `utils/`, `models/`, `validations/`, `components/`, `constants/`

### State Management
- **Zustand** global store (`src/shared/stores/app.ts`): Schema state, validation results, and `isValidSchema` computed flag
- Use `useShallow` from `zustand/shallow` for selective subscriptions to prevent re-renders
- LocalStorage persistence via `useLocalStoragePersistence` hook (debounced by default)

### Key Data Flow
1. User edits JSON in Schema Builder → debounced validation (300ms)
2. Zod validates schema → results stored in Zustand + LocalStorage
3. Form Preview reads valid schema → `FormStringBuilder` generates React code string
4. Sandpack renders generated code with live preview

## Critical Patterns

### Code Generation (form-preview/core)
`FormStringBuilder` class generates complete React components as strings:
- Generates TypeScript types from schema fields
- Creates `useState` initialization with proper typing
- Builds specialized handlers (text/number/checkbox) based on field types present
- Uses Prettier with specific plugins (`parserBabel`, `parserTypeScript`) for formatting
- Example: `new FormStringBuilder(schema).build()` returns formatted component string

### Validation Architecture
- Zod schemas in `schema-builder/validations/schema.ts` with custom error messages
- `FormFieldSchema` validates individual fields with reserved word checking
- `FormSchema` validates entire structure with unique ID/name refinements
- Validation runs debounced (300ms) via `useMemo` + custom `debounce` utility
- Results structure: `{ validJSON: boolean | null, fieldsErrors: ZodError[] | null }`

### Field Type System
Supported types: `text`, `password`, `email`, `url`, `tel`, `search`, `number`, `range`, `date`, `datetime-local`, `time`, `month`, `week`, `color`, `file`, `textarea`, `select`, `select-multiple`, `datalist`, `checkbox`, `radio`, `progress`, `meter`, `output`
- `select`/`select-multiple`/`radio`/`datalist` require `options` array (enforced via `superRefine`)
- Each type maps to specific TypeScript types in generated code (see `generate-form-type.ts`)
  - Text-based inputs: `string` (text, password, email, url, tel, search, date, datetime-local, time, month, week, color, datalist, output)
  - Numeric inputs: `number` (number, range, progress, meter)
  - Boolean: `boolean` (checkbox)
  - File: `File | null` (file)
  - Multi-select: `string[]` (select-multiple)
  - Radio: `string | number | boolean` (radio)
- Handler generation is conditional based on field types present (`getFieldsTypesCount`)
  - `handleInputChange`: Common handler for text-based inputs and single select
  - `handleNumberChange`: Handler for number and range inputs
  - `handleCheckboxChange`: Handler for checkbox inputs
  - `handleFileChange`: Handler for file inputs
  - `handleSelectMultipleChange`: Handler for multi-select dropdowns

### Sandpack Integration
Two separate Sandpack instances:
1. **JSONEditor** (`schema-builder`): Vanilla template for JSON editing
   - Custom `ValueUpdater` component hooks into Sandpack context for change tracking
   - Debounced onChange triggers validation + persistence
2. **FormPreview** (`form-preview`): React-TS template for live component preview
   - External CSS (sakura.css) for basic styling
   - Read-only mode with `/form.tsx` as active file
   - Dynamic file generation: `/App.tsx` imports generated component

## Development Practices

### Tooling
- **Biome** for linting/formatting (not ESLint/Prettier in npm scripts)
  - `pnpm format` - Auto-format with Biome
  - `pnpm lint` - Run Biome linter
- **Vite** for dev server and building
- **pnpm** as package manager
- Path alias: `@/` → `src/`

### Code Style (Biome Config)
- Double quotes, semicolons optional (ASI), 2-space indent
- 100 char line width
- `correctness.useUniqueElementIds` disabled (form generation creates dynamic IDs)

### Routing
- **Wouter** for lightweight routing (not React Router)
- Routes defined in `App.tsx`: `/` (Schema Builder), `/form-preview` (Form Preview)
- Navigation via `NavigationButtons` component, programmatic via `useLocation` hook

### Debouncing Pattern
Custom `debounce` utility (`shared/utils/debounce.ts`) with `.cancel()` method:
```typescript
const debouncedFn = useMemo(() => debounce(callback, 300), [callback])
useEffect(() => () => debouncedFn.cancel?.(), [debouncedFn]) // Cleanup
```

### Component Patterns
- Functional components with hooks only (no class components)
- Type props with inline types or dedicated type definitions
- Export named components from `index.ts` barrel files
- Use `type` imports for type-only imports: `import type { ... }`
- **No comments in generated code** - keep generated forms clean and self-documenting
- Follow **SOLID principles** wherever possible (Single Responsibility, Open/Closed, etc.)

## Common Tasks

### Adding New Field Type
1. Add to enum in `schema-builder/validations/schema.ts` (`FormFieldSchema.type`)
2. Update `getTypeFromFieldType` in `form-preview/utils/generate-form-type.ts`
3. Create generator function in `form-preview/utils/generate-inputs-elements.ts`
4. Update handler generation in `FormStringBuilder` if new handler pattern needed
5. Update `getFieldsTypesCount` if new handler type required

### Modifying Generated Form Code
Edit `FormStringBuilder.buildCodeString()` method - this is the single source of truth for all generated React components. Changes here affect all form previews.

### Schema Validation Changes
Modify Zod schemas in `schema-builder/validations/schema.ts`. Use custom error messages for user-friendly feedback (displayed in `SchemaValidations` component).

## Testing & Running
```bash
pnpm dev          # Start Vite dev server
pnpm build        # Production build
pnpm preview      # Preview production build
pnpm lint         # Run Biome linter
pnpm format       # Format code with Biome
```

## Important Constraints
- Generated forms use `useState` pattern only (no controlled form libraries)
- Schema persists in LocalStorage under `FORM_SCHEMA_STORAGE_KEY`
- Form Preview requires valid schema - redirects to `/` if invalid
- Reserved JavaScript keywords blocked in field IDs/names
- Field IDs/names must match `/^[A-Za-z_$][A-Za-z0-9_$]*$/` pattern

## Project Vision
This project is in its initial phase with `useState` pattern implementation. The roadmap includes:
- Multiple state management patterns (URL persistence, form libraries like react-hook-form)
- Field validation strategies (client-side, schema-based)
- Conditional fields and inter-field dependencies
- Advanced form patterns (multi-step, dynamic arrays, etc.)

When implementing features, design for extensibility to accommodate these future patterns while maintaining the current simple API.

## Documentation Maintenance
**CRITICAL**: After generating or modifying code, always update all related documentation files to keep them in sync:
- `README.md` - Update usage examples, API changes, new features
- `.github/copilot-instructions.md` - Update patterns, workflows, constraints
- Any other docs files (guides, tutorials, etc.)

Documentation must accurately reflect the current state of the codebase at all times. Treat documentation updates as part of the implementation, not optional.
