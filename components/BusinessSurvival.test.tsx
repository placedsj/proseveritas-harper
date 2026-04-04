import { render, screen } from '@testing-library/react';
import BusinessSurvival from './BusinessSurvival';
import { describe, it, expect, beforeEach } from 'vitest';
import React from 'react';

describe('BusinessSurvival', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('calculates total value correctly from local storage', () => {
    localStorage.setItem('bizTasks', JSON.stringify([
      { id: '1', clientOrTask: 'Task 1', dueDate: '', dollarValue: 100, completed: false },
      { id: '2', clientOrTask: 'Task 2', dueDate: '', dollarValue: 200, completed: true },
      { id: '3', clientOrTask: 'Task 3', dueDate: '', dollarValue: 300, completed: false }
    ]));
    render(<BusinessSurvival />);
    expect(screen.getByText(/\$400/)).toBeInTheDocument();
  });
});
