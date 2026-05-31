# Chargeflow Product Catalog

A React product catalog built as a home assignment. It loads paginated products from [DummyJSON](https://dummyjson.com), supports infinite scroll, and opens product details in a slide-over drawer with URL-backed state.

## Features

- Infinite product grid with intersection-observer pagination
- Product detail drawer (price, category, stock, thumbnail)
- URL query param for selected product (`?productId=12`) — shareable and browser back/forward friendly
- React Query caching for list and detail requests
- Event delegation on the product grid — one click handler for the entire list
- Keyboard support (Escape to close drawer, focus restored to clicked card)
- Error boundaries around grid and drawer content
- Responsive layout with CSS Modules

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** — dev server and build
- **TanStack Query** — server state, infinite queries, cache
- **React Router** — URL search params for drawer state
- **Axios** — HTTP client for DummyJSON API
- **CSS Modules** — component-scoped styling
- **Vitest** + **React Testing Library** — unit and component tests
- **react-error-boundary** — render error fallbacks

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install & run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Other scripts

| Command            | Description                   |
| ------------------ | ----------------------------- |
| `npm run dev`      | Start dev server              |
| `npm run build`    | Typecheck + production build  |
| `npm run preview`  | Preview production build      |
| `npm run lint`     | Run ESLint                    |
| `npm run test`     | Run Vitest in watch mode      |
| `npm run test:run` | Run Vitest once (CI-friendly) |

## Project Structure

Every component lives in its own folder with a co-located CSS module, `index.ts` gateway, and test file.

```
src/
├── App.tsx
├── main.tsx
├── index.css                         # Global reset + shared utilities
├── lib/
│   └── apiClient.ts                  # Global Axios instance
├── hooks/
│   ├── useQueryParam.ts              # Sync positive int with ?key= in URL
│   └── useEscapeKey.ts               # Document-level Escape listener
├── components/shared/
│   ├── feedback/                     # Operational UI states
│   │   ├── ErrorBanner/
│   │   ├── ErrorBoundary/
│   │   └── LoadingState/
│   └── ui/                           # Generic visual primitives
│       ├── InfiniteScrollTrigger/
│       └── InlineSpinner/
└── features/products/
    ├── index.ts                      # Public feature barrel
    ├── types/product.ts
    ├── api/
    │   ├── index.ts                  # API gateway
    │   ├── productsApi.ts            # Query keys + fetchers
    │   ├── productsApi.test.ts
    │   └── __mocks__/                # Shared test fixtures
    ├── hooks/
    │   ├── index.ts                  # Hooks gateway
    │   └── useProductsQueries.ts
    └── components/
        ├── ProductCard/
        ├── ProductGrid/
        ├── ProductCatalogContent/
        ├── ProductCatalog/
        └── ProductDetailDrawer/
```

## Architecture

### Data flow

1. **`ProductCatalog`** orchestrates the page: calls `useInfiniteProducts`, flattens pages into a single product array, and wires infinite scroll + drawer.
2. **`useInfiniteProducts`** fetches paginated data via `getProducts(limit, skip)`. `getNextPageParam` computes the next `skip` offset from each page's `skip`, `limit`, and `total`.
3. **`useProductDetail`** fetches a single product when `productId` is set (enabled only when id is non-null, 5-minute `staleTime`).
4. **`useQueryParam('productId')`** syncs the selected product with `?productId=` in the URL.

### Event delegation (product grid)

Instead of attaching an `onClick` handler to every card, **`ProductGrid`** listens once on the grid container. Clicks bubble up from any card (including nested images); the handler resolves the target with `closest('[data-product-id]')` and reads the product id from the button's `data-product-id` attribute.

This keeps listener count constant as infinite scroll loads more pages and avoids creating per-item callback props on every render.

### Layering

| Layer                | Responsibility                                      |
| -------------------- | --------------------------------------------------- |
| `features/products/` | Product domain: API, hooks, types, UI             |
| `components/shared/` | Domain-agnostic feedback and UI primitives          |
| `hooks/` + `lib/`    | Cross-feature utilities (HTTP client, URL, keyboard)|

### Imports

- **`@/` path alias** maps to `src/` — used for all cross-directory imports.
- **Co-located `./` imports** are reserved for same-folder files (CSS modules, unit-under-test).
- **Gateway barrels** — import through folder `index.ts` entry points, not deep file paths:
  - `@/features/products` — public feature API and types
  - `@/features/products/components/ProductCard` — component gateways
  - `@/features/products/hooks` — feature hooks
  - `@/features/products/api` — fetchers and query keys

### Query keys

Cache keys live in `productsApi.ts` so invalidation and prefetch stay consistent:

```ts
productKeys.infiniteList()  // paginated catalog
productKeys.detail(id)      // single product
```

## Testing

Tests use Vitest with jsdom. Component tests import mock data from `@/features/products/api/__mocks__` rather than inline fixtures.

Coverage includes:

- `productsApi` — query keys and HTTP fetchers
- `useQueryParam` — URL param read/write/clear
- `ProductCard`, `ProductGrid` — rendering and delegated click handling
- `ErrorBanner` — feedback display

## Key Decisions

- **React Query over manual fetch state** — built-in caching, loading/error flags, and infinite query pagination.
- **URL for drawer state** — deep-linking and native back/forward without extra global state.
- **Feature folder (`features/products/`)** — colocates API, hooks, types, and UI for the product domain.
- **Folder-per-component** — each component gets its own directory, CSS module, gateway, and test.
- **Event delegation on the grid** — scales better with infinite scroll than per-card handlers.
- **No Redux** — server state in React Query, UI selection in URL + minimal local state (focus ref).
- **IntersectionObserver for infinite scroll** — avoids scroll listeners and plays well with lazy-loaded images.

## Tradeoffs & Possible Next Steps

- Drawer uses a document-level Escape listener instead of a full focus trap (simpler; focus trap would be the next a11y step).
- List/detail types are a subset of DummyJSON's full product shape (enough for the assignment scope).
- Could add: skeleton loaders, retry buttons on error, prefetch on card hover, route-based `/products/:id` instead of query param.

## API

Base URL: `https://dummyjson.com`

- `GET /products?limit=&skip=` — paginated list
- `GET /products/:id` — product detail
