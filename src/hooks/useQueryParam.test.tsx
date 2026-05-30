import type { ReactNode } from 'react';

import { renderHook, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { useQueryParam } from './useQueryParam';

/** Wraps hook tests with an in-memory router and optional search string. */
function createRouterWrapper(initialEntry = '/') {
  return function RouterWrapper({ children }: { children: ReactNode }) {
    return (
      <MemoryRouter initialEntries={[initialEntry]}>{children}</MemoryRouter>
    );
  };
}

describe('useQueryParam', () => {
  it('reads a valid positive integer from the URL', () => {
    const { result } = renderHook(() => useQueryParam('productId'), {
      wrapper: createRouterWrapper('/?productId=12'),
    });

    expect(result.current.value).toBe(12);
  });

  it('returns null for missing or invalid params', () => {
    const missing = renderHook(() => useQueryParam('productId'), {
      wrapper: createRouterWrapper('/'),
    });
    const invalid = renderHook(() => useQueryParam('productId'), {
      wrapper: createRouterWrapper('/?productId=abc'),
    });

    expect(missing.result.current.value).toBeNull();
    expect(invalid.result.current.value).toBeNull();
  });

  it('updates and clears the query param', () => {
    const { result } = renderHook(() => useQueryParam('productId'), {
      wrapper: createRouterWrapper('/'),
    });

    act(() => {
      result.current.setValue(7);
    });
    expect(result.current.value).toBe(7);

    act(() => {
      result.current.clearValue();
    });
    expect(result.current.value).toBeNull();
  });
});
