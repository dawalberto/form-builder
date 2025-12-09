# Form Builder

A React/TypeScript form builder that generates React form components from JSON schemas with live preview.

## What is this?

Form Builder is a tool that allows you to define form schemas in JSON format and instantly see a live preview of the generated React component. It features a two-view architecture:

- **Schema Builder**: JSON editor with real-time validation
- **Form Preview**: Live React component preview powered by Sandpack

The generated forms use React's `useState` pattern with TypeScript types automatically inferred from your schema.

## Getting Started

### Installation

```bash
npm install
# or
pnpm install
```

### Development

```bash
npm run dev
# or
pnpm dev
```

Visit `http://localhost:5173` and start building your form by pasting a JSON schema.

### Other Commands

```bash
npm run build   # Build for production
npm run preview # Preview production build
npm run lint    # Run Biome linter
npm run format  # Format code with Biome
```

## Schema Structure

A valid form schema consists of a form name and an array of fields:

```json
{
  "name": "ContactForm",
  "fields": [
    {
      "id": "email",
      "name": "email",
      "label": "Email Address",
      "type": "text",
      "placeholder": "Enter your email",
      "required": true
    },
    {
      "id": "age",
      "name": "age",
      "type": "number",
      "label": "Age"
    }
  ]
}
```

### Form Properties

- **name** (required): Form name - must be a valid JavaScript identifier (letters, numbers, `_`, `$`)

### Field Properties

- **id** (required): Unique field identifier - must be a valid JavaScript identifier
- **name** (required): Unique field name - must be a valid JavaScript identifier
- **type** (required): Field type - one of: `text`, `number`, `textarea`, `select`, `checkbox`, `radio`
- **label** (optional): Display label for the field
- **placeholder** (optional): Placeholder text
- **class** (optional): CSS class names
- **required** (optional): Whether the field is required (boolean)
- **defaultValue** (optional): Initial value for the field
- **options** (required for `select` and `radio`): Array of option objects with `label` and `value`

### Supported Field Types

#### text
```json
{
  "id": "username",
  "name": "username",
  "type": "text",
  "label": "Username",
  "placeholder": "Enter username"
}
```

#### number
```json
{
  "id": "age",
  "name": "age",
  "type": "number",
  "label": "Age",
  "defaultValue": 18
}
```

#### textarea
```json
{
  "id": "message",
  "name": "message",
  "type": "textarea",
  "label": "Message",
  "placeholder": "Your message here..."
}
```

#### checkbox
```json
{
  "id": "subscribe",
  "name": "subscribe",
  "type": "checkbox",
  "label": "Subscribe to newsletter",
  "defaultValue": false
}
```

#### select
```json
{
  "id": "country",
  "name": "country",
  "type": "select",
  "label": "Country",
  "options": [
    { "label": "United States", "value": "us" },
    { "label": "Canada", "value": "ca" }
  ]
}
```

#### radio
```json
{
  "id": "gender",
  "name": "gender",
  "type": "radio",
  "label": "Gender",
  "options": [
    { "label": "Male", "value": "male" },
    { "label": "Female", "value": "female" }
  ]
}
```

## Validation Rules

The schema validator enforces these rules:

- ✅ Form must have a `name` property
- ✅ Form must have at least one field
- ✅ Field `id` and `name` must be unique (case-insensitive)
- ✅ Field `id` and `name` cannot be JavaScript reserved words (`if`, `for`, `function`, etc.)
- ✅ Field `id` and `name` must follow JavaScript identifier rules (start with letter, `_`, or `$`)
- ✅ `select` and `radio` fields must have at least one option
- ✅ Option labels cannot be empty

The editor will display validation errors in real-time as you edit your schema.

## Current State

**Status**: Initial implementation (v0.0.0)

### What Works
- JSON schema editor with syntax highlighting
- Real-time schema validation with user-friendly error messages
- Live form preview with Sandpack
- Automatic TypeScript type generation
- Support for all basic field types
- LocalStorage persistence of schemas
- Generated forms use `useState` pattern

### Limitations
- Only `useState` pattern is supported (no form libraries yet)
- No field validation in generated forms
- No conditional fields or inter-field dependencies
- Single-page forms only (no multi-step)

## Roadmap

Future enhancements planned:

- Multiple state management patterns (URL persistence, `react-hook-form`, `formik`)
- Field validation strategies (client-side, schema-based validation)
- Conditional field rendering based on other field values
- Multi-step forms
- Dynamic field arrays
- File upload support
- Custom field components
- Export/import schemas
- Code export in multiple formats

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Zustand** - State management
- **Zod** - Schema validation
- **Sandpack** - Live code preview
- **Wouter** - Routing
- **Biome** - Linting and formatting
- **Tailwind CSS** - Styling

## License

See [LICENSE](LICENSE) file for details.
