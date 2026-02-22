import { ScottLogEntry, ProcessedEvidenceItem, MedicalRecord, SystemAuditLog } from '../types';

export const INITIAL_SCOTT_LOGS: ScottLogEntry[] = [
  {
    id: 'photo-1',
    incidentDate: '2025-12-25T13:01:00',
    category: 'Denial of Parenting Time',
    theSay: "Merry Christmas we've been very busy. I have said Merry Christmas from you and you can celebrate with her Sunday.",
    theFact: "Direct denial of Christmas Day access despite multiple previous requests. 'Busy' is not a legal basis for withholding a child. Exhibit A-14.",
    childImpact: 'N/A',
    exhibitRef: 'Screenshot_20251225.png',
    statuteTag: 'Best Interests / Relationship Continuity'
  },
  {
    id: 'photo-2',
    incidentDate: '2025-10-21T17:04:00',
    category: 'Alienation',
    theSay: "Unless it's about parental or custodial agreements she would be breaking the no contact order.",
    theFact: "Jane RYAN (maternal grandmother) fabricating existence of a 'no contact order' to prevent Craig from communicating with the mother regarding Harper. Victim Services confirms NO NCO exists.",
    childImpact: 'N/A',
    exhibitRef: 'Screenshot_20251021.png',
    statuteTag: 'Parental Alienation / Public Mischief'
  }
];

const RAW_EVIDENCE: Omit<ProcessedEvidenceItem, 'wScore' | 'verified'>[] = [
  { file: "2025-01-08(1).png", date: "Jan 08 2025", sender: "UNKNOWN", rec: "UNKNOWN", text: "Thanks [Name]. Touch base later if you don’t mind to check in with her. you and [Name] are doing a great job...", cat: "NON_COMPLIANCE", prio: 8, hash: "a3f5d8c2e1b9f4d7e6c5b8a1d2e3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0w1x2" },
  { file: "IMG_3841.PNG", date: "Dec 09 2024", sender: "[Subject Name]", rec: "Court", text: "Final Statement | am not requesting additional parenting time—I am only seeking due process. | have personally witnessed [Name] using methamphetamine inside the home where [Child Name] resides.", cat: "CRIMINAL_CONDUCT", prio: 10, hash: "e9d1d8c2e1b9f4d7e6c5b8a1d2e3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0w1x2" },
  { file: "IMG_3618.PNG", date: "Jan 10 2025", sender: "Lab", rec: "Department", text: "MRO Report - Specimen N11381257. Results: Negative Dilute. Creatinine levels low. Omitted from official Social Dev report.", cat: "ENDANGERMENT", prio: 9, hash: "z8v4d8c2e1b9f4d7e6c5b8a1d2e3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0w1x2" }
];

export const INITIAL_EVIDENCE: ProcessedEvidenceItem[] = RAW_EVIDENCE.map(r => ({
  ...r,
  wScore: (r.prio || 5) * 2,
  verified: false
}));

export const INITIAL_MEDICAL_RECORDS: MedicalRecord[] = [
  {
    id: '1',
    title: '[Regional Hospital] Medical Fax - [Patient Name] Drug Test',
    source: '[Regional Hospital]',
    dateOfRecord: '2025-01-10',
    ocrText: `Medical Review Officer's Report - Confidential. Revised on January 10, 2025. Donor Name: [Patient Name]. Reason for Test: Reasonable Suspicion. Results: Negative Dilute.`,
    status: 'needs_review',
    dateAdded: '2025-01-25',
    pageCount: 1,
  },
  {
    id: '2',
    title: '[Regional Hospital] Medical Records - [Subject Name] Emergency Visit (35 Pages)',
    source: '[Regional Hospital]',
    dateOfRecord: '2025-09-10',
    ocrText: `===============================================================================\nOCR EXTRACTION: scan0007.pdf\nProcessed: 2026-02-01\nTotal Pages: 35\n================================================================================\n[Health Network] Order Summary. PPRN: [Redacted]. ADM Date: 10-Sep-2025 12:06. Visit Reason: Laceration Puncture. Documented 50-minute secure ward detention without physician order. MRI indications: Fall from 30ft 5 years ago. Result: Early degenerative changes C5-C6. No significant canal stenosis. NP [Medical Professional] attending.`,
    status: 'needs_review',
    dateAdded: '2025-01-25',
    pageCount: 35,
  },
];

export const INITIAL_SYSTEM_AUDIT_LOGS: SystemAuditLog[] = [
  { id: '1', date: '2026-02-07', action: 'Horizon Privacy Audit', status: 'Active', note: 'Kelly Chase confirming permission to review Sept 10 records. Investigating "Trade" (MRI for Psych Eval) and Secure Ward detention protocol.' },
  { id: '2', date: '2026-01-23', action: 'Order Gap Identification', status: 'Critical', note: 'Documentation found: Admitted to secure ward (Room 47) at 16:30. "Mental Health Consult" order not placed until 17:18. Illegal detention for 48 minutes.' },
  { id: '3', date: '2026-01-23', action: 'Triage Discrepancy', status: 'Flagged', note: 'Diagnosis code (S6190) lists "wrist and hand" while triage notes confirm "left dorsal hand". Code used to trigger mental health risk profiling?' },
  { id: '4', date: '2026-01-15', action: 'Victim Status Audit', status: 'Verified', note: 'SJPF confirmed File 25-2390069 as domestic incident. PSR omission confirmed as willful suppression by Goldsworthy.' },
];
