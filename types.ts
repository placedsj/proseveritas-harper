
export type ViewState = 'dashboard' | 'scott-schedule' | 'custody-math' | 'business' | 'products' | 'strategy' | 'roadmap' | 'power-monitor' | 'medical-records' | 'processor' | 'moral-compass' | 'parenting-plan' | 'education-build' | 'health-rehab' | 'harper-log' | 'legal-srl' | 'gov-benefits' | 'build-plan' | 'discovery-archive' | 'system-audit';

// Module 1: Scott Schedule
export type ScottCategory = 'Denial of Parenting Time' | 'Alienation' | 'Unjustified Police Contact' | 'Failure to Consult' | 'Health/Safety Risk';
export type ChildImpact = 'Crying' | 'Silent' | 'Regressive' | 'N/A';

export interface ScottLogEntry {
  id: string;
  incidentDate: string; // ISO DateTime
  category: ScottCategory;
  theSay: string; // "She said..."
  theFact: string; // "The truth is..."
  childImpact: ChildImpact;
  exhibitRef: string; // Link/Filename
  statuteTag: string; // Legal clause
}

// Module: Harper Log (Positive Evidence)
export interface HarperLogEntry {
  id: string;
  timestamp: string;
  activity: string;
  mood: 'Happy' | 'Tired' | 'Fussy' | 'Calm';
  feedingNotes?: string;
  milestones?: string;
}

// Module: Education Build
export type CAECSubject = 'Math' | 'Reading' | 'Writing' | 'Social Studies' | 'Science';
export interface CAECProgress {
  subject: CAECSubject;
  status: 'Not Started' | 'In Prep' | 'Ready to Write' | 'Passed';
  score?: number;
}

// Module: Health & Rehab
export interface HealthStatus {
  id: string;
  condition: string; // "ADHD", "C5-C6 Spine", "Mental Health"
  status: string; // "Monitoring", "In Physio", "Medicated"
  nextStep: string;
  lastReview: string;
}

// Module: Gov Benefits
export interface GovBenefit {
  id: string;
  agency: 'Social Development' | 'WorkingNB' | 'WorkSafeNB' | 'CRA' | 'Service Canada';
  program: string;
  status: 'Not Applied' | 'Pending' | 'Active' | 'Rejected';
  nextAction: string;
}

// Module 2: Alimentor Clone
export type CustodyStatus = 'Success' | 'Denied by Mother' | 'Forfeited by Father';

export interface ParentingBlock {
  id: string;
  scheduledStart: string; // ISO DateTime
  scheduledEnd: string; // ISO DateTime
  status: CustodyStatus;
  hoursLost: number; // Auto-calc
}

// Global Search
export interface DailyMove {
  id: string;
  text: string;
  completed: boolean;
}

// Medical Records
export interface MedicalRecord {
  id: string;
  title: string;
  source: string; // e.g., "SJRH", "Doctor's Office"
  dateOfRecord: string; // ISO date of the document itself
  ocrText: string;
  status: 'reviewed' | 'needs_review' | 'flagged';
  dateAdded: string; // When it was added to the vault
}

// Evidence Processor Item
export interface ProcessedEvidenceItem {
  file: string;
  date: string;
  sender: string;
  rec: string;
  text: string;
  cat: string;
  prio: number;
  hash: string;
  wScore: number;
  verified: boolean;
}

// Module: Product Lab
export interface ProductTier {
  id: string;
  name: string;
  amps: number;
  price: number;
  features: string[];
  isRecurring: boolean;
}

// Module: Power Monitor
export interface MonitorNode {
  id: string;
  location: string;
  loadPercentage: number;
  temperature: number;
  status: 'online' | 'warning' | 'offline';
  lastSeen: string;
}

// Module: Strategy Room
export interface StrategyNote {
  id: string;
  category: 'copy' | 'rules' | 'partners';
  content: string;
  lastUpdated: number;
}

// Module: Roadmap
export interface RoadmapTask {
  id: string;
  title: string;
  category: 'growth' | 'tech' | 'ops' | 'legal';
  status: 'backlog' | 'active' | 'done';
  dueDate?: string;
}

// Module: Business Command
export interface BusinessProject {
  id: string;
  name: string;
  type: 'PLACED' | 'ROOFING';
  status: 'Active' | 'Lead' | 'Invoiced' | 'Done';
  value: number;
  nextAction: string;
  dueDate?: string;
}
