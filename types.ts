
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

export interface ChatMessage {
  id: string;
  sender: 'user' | 'cofounder';
  mode?: 'MOTION' | 'COUNSEL' | 'CALM' | 'FIRE' | 'ORGANIZE' | 'AUTOMATE' | 'CHECK';
  content: string;
  timestamp: number;
}

// Daily Ritual
export interface DailyChecklist {
  sleep: boolean;
  mental: boolean;
  food: boolean;
  readReality: boolean;
  oneTask: boolean;
  noContact: boolean;
  progressMade: boolean;
}

// Timeline
export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  type: 'prep' | 'deadline' | 'court';
  completed: boolean;
}

// Evidence Vault
export interface EvidenceItem {
  id: string;
  title: string;
  description: string;
  category: 'criminal' | 'custody' | 'fitness' | 'financial';
  status: 'ready' | 'needs_printing' | 'needs_requesting' | 'requested';
  dateReceived?: string;
  dateRequested?: string;
}

// Spiral Journal
export interface SpiralEntry {
  id: string;
  timestamp: number;
  content: string;
  aiResponse?: string;
}

// Global Search
export interface DailyMove {
  id: string;
  text: string;
  completed: boolean;
}

// Abuse Log & Heatmap
export type IncidentType = 'Harassment' | 'Alienation' | 'Denied Access' | 'False Police Report' | 'Safety Risk' | 'Financial';

export interface AbuseLogEntry {
  id: string;
  timestamp: string;
  type: IncidentType;
  description: string;
  severity: number;
  childReaction: string;
  witnesses?: string;
  policeReportNumber?: string;
  evidencePhoto?: string;
  businessCorrelation?: string;
}

// Court Timeline
export type CaseName = 'Criminal Defense' | 'Family Law';
export type CourtStatus = 'Pending' | 'Done';

export interface CourtEvent {
  id: string;
  date: string;
  caseName: CaseName;
  judgeName: string;
  requiredAction: string;
  status: CourtStatus;
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
  pageCount?: number;
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

// Module: Business Survival
export interface BusinessTask {
  id: string;
  clientOrTask: string;
  dueDate: string;
  dollarValue: number;
  completed: boolean;
}

// Module: System Audit
export interface SystemAuditLog {
  id: string;
  date: string;
  action: string;
  status: 'Active' | 'Critical' | 'Flagged' | 'Verified';
  note: string;
}
