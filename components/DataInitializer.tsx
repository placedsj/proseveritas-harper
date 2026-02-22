import React, { useEffect } from 'react';
import { INITIAL_SCOTT_LOGS, INITIAL_EVIDENCE, INITIAL_MEDICAL_RECORDS, INITIAL_SYSTEM_AUDIT_LOGS } from './initialData';

const DataInitializer: React.FC = () => {
  useEffect(() => {
    // Check and populate Scott Logs
    if (!localStorage.getItem('scottLogs')) {
      localStorage.setItem('scottLogs', JSON.stringify(INITIAL_SCOTT_LOGS));
    }

    // Check and populate Evidence
    if (!localStorage.getItem('evidence')) {
      localStorage.setItem('evidence', JSON.stringify(INITIAL_EVIDENCE));
    }

    // Check and populate Medical Records
    if (!localStorage.getItem('medicalRecords')) {
      localStorage.setItem('medicalRecords', JSON.stringify(INITIAL_MEDICAL_RECORDS));
    }

    // Check and populate System Audit Logs
    if (!localStorage.getItem('systemAuditLogs')) {
      localStorage.setItem('systemAuditLogs', JSON.stringify(INITIAL_SYSTEM_AUDIT_LOGS));
    }
  }, []);

  return null;
};

export default DataInitializer;
