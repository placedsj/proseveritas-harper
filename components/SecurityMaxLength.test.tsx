import { render, screen } from '@testing-library/react';
import CoFounderChat from './CoFounderChat';
import SpiralJournal from './SpiralJournal';
import { expect, test } from 'vitest';
import '@testing-library/jest-dom/vitest';

test('CoFounderChat input has maxLength 2000', () => {
    render(<CoFounderChat />);
    const input = screen.getByPlaceholderText(/Ask for direction/i);
    expect(input).toHaveAttribute('maxLength', '2000');
});

test('SpiralJournal textarea has maxLength 2000', () => {
    render(<SpiralJournal />);
    const textarea = screen.getByPlaceholderText(/I'm worried about/i);
    expect(textarea).toHaveAttribute('maxLength', '2000');
});