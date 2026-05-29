/** Centralized React Query cache keys for product-related queries. */
export const productKeys = {
  all: ['products'] as const,
  infiniteList: () => [...productKeys.all, 'infinite'] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: number) => [...productKeys.details(), id] as const,
};
