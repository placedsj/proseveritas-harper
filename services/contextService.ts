import { ScottLogEntry, AbuseLogEntry, ParentingBlock, BusinessProject, StrategyNote, RoadmapTask } from '../types';

export const getAppContext = (): string => {
  // Helpers to safe parse
  const get = <T>(key: string): T[] => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : [];
    } catch (e) {
      return [];
    }
  };

  const scottLogs = get<ScottLogEntry>('scottLogs');
  const abuseLogs = get<AbuseLogEntry>('abuseLogs');
  const custodyBlocks = get<ParentingBlock>('custodyBlocks');
  const bizProjects = get<BusinessProject>('bizProjects');
  const strategyNotes = get<StrategyNote>('strategyNotes');
  const roadmapTasks = get<RoadmapTask>('roadmapTasks');

  // summarize
  const now = new Date();

  // 1. Immediate Threats / Abuse
  const recentAbuse = abuseLogs
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 3)
    .map(l => `- ${new Date(l.timestamp).toLocaleDateString()}: ${l.type} (Severity ${l.severity}) - ${l.description.slice(0, 50)}...`)
    .join('\n');

  // 2. Custody Status
  const recentBlocks = custodyBlocks
     .sort((a, b) => new Date(b.scheduledStart).getTime() - new Date(a.scheduledStart).getTime())
     .slice(0, 3);

  const denialRate = custodyBlocks.length > 0
    ? (custodyBlocks.filter(b => b.status === 'Denied by Mother').length / custodyBlocks.length * 100).toFixed(0)
    : '0';

  // 3. Business
  const activeProjects = bizProjects.filter(p => p.status === 'Active' || p.status === 'Lead');
  const pipelineValue = activeProjects.reduce((sum, p) => sum + p.value, 0);
  const activeTasks = roadmapTasks.filter(t => t.status === 'active').map(t => `- ${t.title} (${t.dueDate || 'No Date'})`).join('\n');

  // 4. Strategy
  const strategyHighlights = strategyNotes.map(n => `- ${n.category.toUpperCase()}: ${n.content.slice(0, 50)}...`).join('\n');

  return `
    **CRITICAL CONTEXT:**
    - Recent Abuse Incidents:
    ${recentAbuse || 'None'}

    - Custody Stats: ${denialRate}% Denial Rate.
    - Recent Blocks: ${recentBlocks.map(b => `${new Date(b.scheduledStart).toLocaleDateString()} (${b.status})`).join(', ')}.

    **BUSINESS OPS:**
    - Pipeline Value: $${pipelineValue}
    - Active Projects: ${activeProjects.length}
    - Active Roadmap Tasks:
    ${activeTasks || 'None'}

    **STRATEGY NOTES:**
    ${strategyHighlights || 'None'}
  `;
};
