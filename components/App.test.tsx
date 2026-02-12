import { render, screen } from '@testing-library/react';
import App from '../App';
import { describe, it, expect } from 'vitest';
import React from 'react';

// Mock localStorage
const localStorageMock = (function () {
  let store: Record<string, string> = {};
  return {
    getItem: function (key: string) {
      return store[key] || null;
    },
    setItem: function (key: string, value: string) {
      store[key] = value.toString();
    },
    clear: function () {
      store = {};
    },
    removeItem: function (key: string) {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('App', () => {
  it('renders without crashing and shows dashboard elements', () => {
    render(<App />);

    // Check for Sidebar Logo
    const logos = screen.getAllByText('SDG');
    expect(logos.length).toBeGreaterThan(0);

    // Check for a known element in Dashboard (it is not lazy loaded)
    // "Status: Pro Se Command" is in Dashboard
    expect(screen.getByText(/Status: Pro Se Command/i)).toBeInTheDocument();
  });
});
