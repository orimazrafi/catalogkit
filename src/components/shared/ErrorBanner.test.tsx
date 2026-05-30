import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ErrorBanner } from './ErrorBanner';

describe('ErrorBanner', () => {
  it('renders the default message', () => {
    render(<ErrorBanner />);

    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
  });

  it('renders a custom message', () => {
    render(<ErrorBanner message="Failed to load products." />);

    expect(screen.getByText('Failed to load products.')).toBeInTheDocument();
  });
});
