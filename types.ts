export type ViewState = 'dashboard' | 'products' | 'monitor' | 'roadmap' | 'strategy' | 'cofounder';

export interface DailyMove {
  id: string;
  text: string;
  impact: 'high' | 'med' | 'low';
  completed: boolean;
}

export interface BusinessMetric {
  oneTimeRevenue: number;
  mrr: number; // Monthly Recurring Revenue (ShedCare)
  activeInstalls: number;
  churnRate: number;
}

export interface ProductTier {
  id: string;
  name: string; // Hobbyist, Workshop, Studio
  amps: 20 | 30 | 50;
  price: number;
  features: string[];
  isRecurring: boolean;
}

export interface MonitorNode {
  id: string;
  location: string;
  loadPercentage: number;
  temperature: number; // Celsius
  status: 'online' | 'offline' | 'warning';
  lastSeen: string;
}

export interface StrategyNote {
  id: string;
  category: 'copy' | 'rules' | 'partners' | 'product';
  content: string;
  lastUpdated: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'cofounder';
  mode?: 'MOTION' | 'COUNSEL' | 'CALM' | 'FIRE' | 'ORGANIZE' | 'AUTOMATE' | 'CHECK';
  content: string;
  timestamp: number;
}

export interface RoadmapTask {
  id: string;
  title: string;
  category: 'tech' | 'ops' | 'growth' | 'legal';
  status: 'backlog' | 'active' | 'done';
  dueDate?: string;
}

// Legacy types (kept for compatibility during transition)
export interface DailyChecklist {
  sleep: boolean;
  mental: boolean;
  food: boolean;
  readReality: boolean;
  oneTask: boolean;
  noContact: boolean;
  progressMade: boolean;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  type: 'prep' | 'deadline' | 'court';
  completed: boolean;
}

export interface EvidenceItem {
  id: string;
  title: string;
  description: string;
  category: 'criminal' | 'custody' | 'fitness' | 'financial';
  status: 'ready' | 'needs_printing' | 'needs_requesting' | 'requested';
  dateReceived?: string;
  dateRequested?: string;
}

export interface SpiralEntry {
  id: string;
  timestamp: number;
  content: string;
  aiResponse?: string;
}