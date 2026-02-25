import React, { useEffect, useState } from 'react';
import {
  INITIAL_SCOTT_LOGS,
  INITIAL_EVIDENCE,
  INITIAL_MEDICAL_RECORDS,
  INITIAL_SYSTEM_AUDIT_LOGS,
  INITIAL_TIMELINE_EVENTS,
  INITIAL_COURT_EVENTS
} from './initialData';

export const DataInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initData = () => {
      if (!localStorage.getItem('scottLogs')) {
        localStorage.setItem('scottLogs', JSON.stringify(INITIAL_SCOTT_LOGS));
      }
      if (!localStorage.getItem('evidence')) {
        localStorage.setItem('evidence', JSON.stringify(INITIAL_EVIDENCE));
      }
      if (!localStorage.getItem('medicalRecords')) {
        localStorage.setItem('medicalRecords', JSON.stringify(INITIAL_MEDICAL_RECORDS));
      }
      if (!localStorage.getItem('systemAuditLogs')) {
        localStorage.setItem('systemAuditLogs', JSON.stringify(INITIAL_SYSTEM_AUDIT_LOGS));
      }
      if (!localStorage.getItem('timelineEvents_v2')) {
        localStorage.setItem('timelineEvents_v2', JSON.stringify(INITIAL_TIMELINE_EVENTS));
      }
      if (!localStorage.getItem('courtEvents')) {
        localStorage.setItem('courtEvents', JSON.stringify(INITIAL_COURT_EVENTS));
      }
      setIsReady(true);
    };

    initData();
  }, []);

  if (!isReady) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return <>{children}</>;
};
