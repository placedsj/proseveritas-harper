import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getSystemContext, getScottContext, getCustodyContext, getBusinessContext } from './contextService';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
        delete store[key];
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('contextService', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('should return empty messages when localStorage is empty', () => {
    const context = getSystemContext();
    expect(context).toContain('Scott Schedule: No entries logged.');
    expect(context).toContain('Custody Math: No blocks logged.');
    expect(context).toContain('Business: No active projects.');
    expect(context).toContain('Abuse Log: No incidents.');
    expect(context).toContain('Strategy: No notes.');
    expect(context).toContain('Roadmap: No tasks.');
  });

  it('should summarize Scott Schedule correctly', () => {
    const logs = [
      {
        id: '1',
        incidentDate: '2023-01-01',
        category: 'Alienation',
        theSay: 'She said X',
        theFact: 'Fact is Y',
        childImpact: 'Crying'
      }
    ];
    window.localStorage.setItem('scottLogs', JSON.stringify(logs));

    const context = getScottContext();
    expect(context).toContain('Scott Schedule (Recent 5):');
    expect(context).toContain('Alienation');
    expect(context).toContain('Claim: "She said X"');
    expect(context).toContain('Fact: "Fact is Y"');
  });

  it('should summarize Business Command correctly', () => {
    const projects = [
      {
        id: '1',
        name: 'Project A',
        value: 1000,
        status: 'Active',
        nextAction: 'Build'
      },
      {
        id: '2',
        name: 'Project B',
        value: 500,
        status: 'Lead',
        nextAction: 'Call'
      }
    ];
    window.localStorage.setItem('bizProjects', JSON.stringify(projects));

    const context = getBusinessContext();
    expect(context).toContain('Total Pipeline Value $1,500');
    expect(context).toContain('Project A (Active): $1000');
    expect(context).toContain('Project B (Lead): $500');
  });

    it('should summarize Custody Math correctly', () => {
    const blocks = [
      {
        scheduledStart: '2023-01-01T10:00:00',
        scheduledEnd: '2023-01-01T12:00:00',
        status: 'Success'
      },
      {
        scheduledStart: '2023-01-02T10:00:00',
        scheduledEnd: '2023-01-02T12:00:00',
        status: 'Denied by Mother'
      }
    ];
    // 2 hours success, 2 hours denied. Total 4. Denial rate 50%.
    window.localStorage.setItem('custodyBlocks', JSON.stringify(blocks));

    const context = getCustodyContext();
    expect(context).toContain('4.0 Total Hours Scheduled');
    expect(context).toContain('2.0 Hours Denied');
    expect(context).toContain('Denial Rate: 50.0%');
  });
});
