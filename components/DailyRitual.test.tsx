import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DailyRitual from './DailyRitual';

describe('DailyRitual', () => {
  it('renders protocols correctly', () => {
    render(<DailyRitual audioEnabled={false} />);

    expect(screen.getByText(/Morning Protocol/i)).toBeInTheDocument();
    expect(screen.getByText(/Evening Protocol/i)).toBeInTheDocument();
  });

  it('renders checklist items', () => {
    render(<DailyRitual audioEnabled={false} />);

    expect(screen.getByText(/Did you get 5\+ hours sleep\?/i)).toBeInTheDocument();
  });
});
