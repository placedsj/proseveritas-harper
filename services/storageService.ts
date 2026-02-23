import {
  ProcessedEvidenceItem, MedicalRecord, ScottLogEntry, AbuseLogEntry,
  TimelineEvent, CourtEvent, DailyMove, SystemAuditLog, BusinessProject,
  RoadmapTask, StrategyNote, ProductTier
} from '../types';

export const StorageService = {
  getItem: <T>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error parsing localStorage item for key "${key}":`, error);
      return defaultValue;
    }
  },

  setItem: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage item for key "${key}":`, error);
    }
  },

  // Specific Data Accessors
  getEvidence: () => StorageService.getItem<ProcessedEvidenceItem[]>('evidence', []),
  getMedicalRecords: () => StorageService.getItem<MedicalRecord[]>('medicalRecords', []),
  getScottLogs: () => StorageService.getItem<ScottLogEntry[]>('scottLogs', []),
  getAbuseLogs: () => StorageService.getItem<AbuseLogEntry[]>('abuseLogs', []),
  getTimelineEvents: () => StorageService.getItem<TimelineEvent[]>('timelineEvents', []),
  getCourtEvents: () => StorageService.getItem<CourtEvent[]>('courtEvents', []),
  getDailyMoves: () => StorageService.getItem<DailyMove[]>('dailyMoves', []),
  getSystemAuditLogs: () => StorageService.getItem<SystemAuditLog[]>('systemAuditLogs', []),
  getBusinessProjects: () => StorageService.getItem<BusinessProject[]>('businessProjects', []),
  getRoadmapTasks: () => StorageService.getItem<RoadmapTask[]>('roadmapTasks', []),
  getStrategyNotes: () => StorageService.getItem<StrategyNote[]>('strategyNotes', []),
  getProductTiers: () => StorageService.getItem<ProductTier[]>('productTiers', []),
};
