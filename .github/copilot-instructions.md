# Copilot Instructions

## Build and Development

- **Install dependencies**: `pnpm install`
- **Develop**: `pnpm run dev` - Builds TypeScript and runs the server on port 3000
- **Build only**: `pnpm run build` - Compiles TypeScript to dist/
- **Production**: `pnpm run start` - Runs the compiled JavaScript

## Architecture

Focus of this codebase:

- Node.js + Express API
- TypeScript in strict mode
- Service layer uses axios to call `jsonplaceholder.typicode.com`
- Main files:
  - `src/index.ts`
  - `src/routes/posts.ts`
  - `src/services/postService.ts`

This is a Node.js/Express API that fetches blog post data from an external API (jsonplaceholder.typicode.com).

**Project structure:**

- `src/index.ts` - Express app setup and route registration
- `src/routes/posts.ts` - Route handlers for `/posts` endpoints
- `src/services/postService.ts` - External API client and data fetching logic

**Key design:**

- Service layer (`PostService`) handles all external API communication with axios
- Routes use async/await for error handling
- All external data is treated as read-only; no mutation of external resources
- Port is configurable via `PORT` environment variable (default: 3000)

## Language Configuration

- **TypeScript**: Strict mode enabled with ES2020 modules
- **Module system**: ES modules (import/export)
- **Imports**: Must include `.js` extension for local modules when writing source code (e.g., `import Service from './service.js'`)
- The TypeScript compiler automatically handles the extension rewriting for compiled JavaScript output

## Key Endpoints

- `GET /health` - Health check, returns `{ "status": "ok" }`
- `GET /posts` - Lists all blog posts from jsonplaceholder
- `GET /posts/:id` - Gets a specific blog post by ID (numeric ID required)

## Conventions

- Error responses follow a consistent format: `{ "error": "description" }`
- Route parameters are validated (e.g., post ID must be numeric)
- All route handlers are async and properly handle exceptions
- Service layer methods throw descriptive errors for logging/debugging
