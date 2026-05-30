import { vi } from 'vitest';

/** Mocked global HTTP client for product API tests. */
export const apiClient = {
  get: vi.fn(),
};
