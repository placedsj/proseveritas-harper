import { render, screen, fireEvent } from '@testing-library/react';
import ScottSchedule from './ScottSchedule';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import React from 'react';
import { ScottLogEntry } from '../types';

describe('ScottSchedule', () => {
  const mockLogs: ScottLogEntry[] = [
    {
      id: '1',
      incidentDate: '2025-01-01T12:00:00',
      category: 'Denial of Parenting Time',
      theSay: 'Not today',
      theFact: 'It is my day',
      childImpact: 'Crying',
      exhibitRef: 'ex1.png',
      statuteTag: 'Statute 1'
    }
  ];

  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('scottLogs', JSON.stringify(mockLogs));

    // Mock URL.createObjectURL and URL.revokeObjectURL
    global.URL.createObjectURL = vi.fn(() => 'blob:test');
    global.URL.revokeObjectURL = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders correctly and loads initial data', () => {
    render(<ScottSchedule />);

    expect(screen.getByText('Scott Schedule')).toBeInTheDocument();
    expect(screen.getByText('Denial of Parenting Time')).toBeInTheDocument();
    expect(screen.getByText('"Not today"')).toBeInTheDocument();
    expect(screen.getByText('It is my day')).toBeInTheDocument();
  });

  it('toggles the guide', () => {
    render(<ScottSchedule />);

    const guideButton = screen.getByText('Guide');
    fireEvent.click(guideButton);

    expect(screen.getByText('The Strategy: Truth vs Allegation')).toBeInTheDocument();

    fireEvent.click(guideButton);
    expect(screen.queryByText('The Strategy: Truth vs Allegation')).not.toBeInTheDocument();
  });

  it('adds a new log entry', () => {
    render(<ScottSchedule />);

    const logButton = screen.getByText('Log Incident');
    fireEvent.click(logButton);

    expect(screen.getByText('New Record')).toBeInTheDocument();

    // Fill form
    const sayInput = screen.getByPlaceholderText("Ex: 'Craig was aggressive and late for pickup...'");
    const factInput = screen.getByPlaceholderText("Ex: 'Arrived at 4:00 PM. Stayed in car. Ring logs show Emma did not open the door.'");

    fireEvent.change(sayInput, { target: { value: 'New Allegation' } });
    fireEvent.change(factInput, { target: { value: 'New Fact' } });

    const saveButton = screen.getByText('COMMIT TO RECORD');
    fireEvent.click(saveButton);

    // Verify it appears in the list
    expect(screen.getByText('"New Allegation"')).toBeInTheDocument();
    expect(screen.getByText('New Fact')).toBeInTheDocument();

    // Verify localStorage update
    const savedLogs = JSON.parse(localStorage.getItem('scottLogs') || '[]');
    expect(savedLogs).toHaveLength(2);
    expect(savedLogs[0].theSay).toBe('New Allegation');
  });

  it('exports CSV', () => {
    render(<ScottSchedule />);

    // Mock HTMLAnchorElement.prototype.click
    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});

    // Spy on document.createElement to return a real anchor element but spy on it
    const createElementSpy = vi.spyOn(document, 'createElement');

    const exportButton = screen.getByText('Export CSV');
    fireEvent.click(exportButton);

    // Verify interactions
    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(clickSpy).toHaveBeenCalled();
  });
});
