import { ScottLogEntry, ParentingBlock, BusinessProject, AbuseLogEntry, StrategyNote, RoadmapTask } from '../types';

// Helper to safely get data from localStorage
const getFromStorage = <T>(key: string): T[] => {
  if (typeof window === 'undefined') return [];
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : [];
  } catch (e) {
    console.error(`Error parsing ${key} from localStorage`, e);
    return [];
  }
};

export const getScottContext = (): string => {
  const logs = getFromStorage<ScottLogEntry>('scottLogs');
  if (logs.length === 0) return "Scott Schedule: No entries logged.";

  const recent = logs.slice(0, 5).map(l =>
    `- ${l.incidentDate}: ${l.category} (Impact: ${l.childImpact}) - Claim: "${l.theSay}" vs Fact: "${l.theFact}"`
  ).join('\n');

  return `Scott Schedule (Recent 5):\n${recent}`;
};

export const getCustodyContext = (): string => {
  const blocks = getFromStorage<ParentingBlock>('custodyBlocks');
  if (blocks.length === 0) return "Custody Math: No blocks logged.";

  const totalHours = blocks.reduce((acc, b) => {
      const diff = new Date(b.scheduledEnd).getTime() - new Date(b.scheduledStart).getTime();
      return acc + (diff / (1000 * 60 * 60));
  }, 0);

  const deniedHours = blocks
    .filter(b => b.status === 'Denied by Mother')
    .reduce((acc, b) => {
        const diff = new Date(b.scheduledEnd).getTime() - new Date(b.scheduledStart).getTime();
        return acc + (diff / (1000 * 60 * 60));
    }, 0);

  const denialRate = totalHours > 0 ? ((deniedHours / totalHours) * 100).toFixed(1) : "0.0";

  return `Custody Math: ${totalHours.toFixed(1)} Total Hours Scheduled. ${deniedHours.toFixed(1)} Hours Denied. Denial Rate: ${denialRate}%.`;
};

export const getBusinessContext = (): string => {
  const projects = getFromStorage<BusinessProject>('bizProjects');
  if (projects.length === 0) return "Business: No active projects.";

  const totalValue = projects.reduce((acc, p) => acc + p.value, 0);
  const active = projects.filter(p => p.status !== 'Invoiced' && p.status !== 'Paid');

  const activeList = active.map(p => `- ${p.name} (${p.status}): $${p.value} - Next: ${p.nextAction}`).join('\n');

  return `Business Command: Total Pipeline Value $${totalValue.toLocaleString()}. Active Projects:\n${activeList}`;
};

export const getAbuseContext = (): string => {
  const logs = getFromStorage<AbuseLogEntry>('abuseLogs');
  if (logs.length === 0) return "Abuse Log: No incidents.";

  const recent = logs.slice(0, 3).map(l =>
    `- ${l.timestamp} (${l.type}): Severity ${l.severity}. ${l.description.substring(0, 50)}...`
  ).join('\n');

  return `Abuse Log (Last 3):\n${recent}`;
};

export const getStrategyContext = (): string => {
    const notes = getFromStorage<StrategyNote>('strategyNotes');
    if (notes.length === 0) return "Strategy: No notes.";

    return `Strategy Notes:\n${notes.map(n => `- [${n.category.toUpperCase()}]: ${n.content.substring(0, 100)}...`).join('\n')}`;
};

export const getRoadmapContext = (): string => {
    const tasks = getFromStorage<RoadmapTask>('roadmapTasks');
    if (tasks.length === 0) return "Roadmap: No tasks.";

    const active = tasks.filter(t => t.status === 'active').map(t => `- ${t.title} (${t.category})`).join('\n');
    return `Roadmap Active Motion:\n${active || "None"}`;
};

export const getSystemContext = (): string => {
  return [
    getScottContext(),
    getCustodyContext(),
    getBusinessContext(),
    getAbuseContext(),
    getStrategyContext(),
    getRoadmapContext()
  ].join('\n\n');
};
