# Chargeflow Product Catalog

A React product catalog built as a home assignment. It loads paginated products from [DummyJSON](https://dummyjson.com), supports infinite scroll, and opens product details in a slide-over drawer with URL-backed state.

## Features

- Infinite product grid with intersection-observer pagination
- Product detail drawer (price, category, stock, thumbnail)
- URL query param for selected product (`?productId=12`) — shareable and browser back/forward friendly
- React Query caching for list and detail requests
- Keyboard support (Escape to close drawer, focus restored to clicked card)
- Responsive layout with Tailwind CSS

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** — dev server and build
- **TanStack Query** — server state, infinite queries, cache
- **React Router** — URL search params for drawer state
- **Axios** — HTTP client for DummyJSON API
- **Tailwind CSS** — styling

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

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start dev server         |
| `npm run build`   | Typecheck + production build |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

## Project Structure

```
src/
├── features/
│   └── products/              # Product domain (feature-sliced)
│       ├── api/
│       │   ├── client.ts            # Axios instance + React Query keys
│       │   └── productsApi.ts       # getProducts, getProductDetail
│       ├── hooks/
│       │   ├── useProductsQueries.ts
│       │   └── useProductIdQueryParam.ts
│       ├── types/
│       │   └── product.ts
│       ├── components/
│       │   ├── ProductCard.tsx
│       │   ├── ProductDetailDrawer.tsx
│       │   └── ProductCatalog/      # List, grid, loading/error states
│       └── index.ts                 # Public feature export
├── common/
│   └── InfiniteScrollTrigger.tsx      # Shared, domain-agnostic UI
├── hooks/
│   └── useEscapeKey.ts            # Generic keyboard hook
└── lib/
    └── searchParams.ts            # URL search param utilities
```

## Architecture

### Data flow

1. **`ProductCatalog`** orchestrates the page: calls `useInfiniteProducts`, flattens pages into a single product array, and wires infinite scroll + drawer.
2. **`useInfiniteProducts`** fetches paginated data via `getProducts(limit, skip)`. `getNextPageParam` computes the next `skip` offset from each page’s `skip`, `limit`, and `total`.
3. **`useProductDetail`** fetches a single product when `productId` is set (enabled only when id is non-null, 5-minute `staleTime`).
4. **`useProductIdQueryParam`** syncs the selected product with `?productId=` in the URL.

### Layering

| Layer                 | Responsibility                               |
| --------------------- | -------------------------------------------- |
| `features/products/`  | Product domain: API, hooks, types, UI        |
| `common/`             | Shared, domain-agnostic UI primitives      |
| `hooks/` + `lib/`     | Cross-feature utilities (Escape key, URL helpers) |

### Query keys

Cache keys live in `src/features/products/api/client.ts` so invalidation and prefetch stay consistent:

```ts
productKeys.infiniteList()  // paginated catalog
productKeys.detail(id)      // single product
```

## Key Decisions

- **React Query over manual fetch state** — built-in caching, loading/error flags, and infinite query pagination.
- **URL for drawer state** — deep-linking and native back/forward without extra global state.
- **Feature folder (`features/products/`)** — colocates API, hooks, types, and UI for the product domain; shared pieces stay in `common/`.
- **No Redux** — server state in React Query, UI selection in URL + minimal local state (focus ref).
- **IntersectionObserver for infinite scroll** — avoids scroll listeners and plays well with lazy-loaded images.

## Tradeoffs & Possible Next Steps

- Drawer uses a document-level Escape listener instead of a full focus trap (simpler; focus trap would be the next a11y step).
- List/detail types are a subset of DummyJSON’s full product shape (enough for the assignment scope).
- Could add: skeleton loaders, retry buttons on error, prefetch on card hover, Vitest for hooks/utils, route-based `/products/:id` instead of query param.

## API

Base URL: `https://dummyjson.com`

- `GET /products?limit=&skip=` — paginated list
- `GET /products/:id` — product detail
