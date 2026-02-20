
import React, { useState, useEffect } from 'react';
import { MedicalRecord } from '../types';
import { Stethoscope, Plus, FileText, Calendar, Edit2, Download, CheckCircle, AlertTriangle, X, Save, Eye, EyeOff } from 'lucide-react';

const escapeBackticksForTemplateLiteral = (text: string) => text.replace(/`/g, '\\`');

const initialRecords: MedicalRecord[] = [
  {
    id: '1',
    title: '[Regional Hospital] Medical Fax - [Patient Name] Drug Test',
    source: '[Regional Hospital]',
    dateOfRecord: '2025-01-10',
    ocrText: `Medical Review Officer's Report - Confidential. Revised on January 10, 2025. Donor Name: [Patient Name]. Reason for Test: Reasonable Suspicion. Results: Negative Dilute.`,
    status: 'needs_review',
    dateAdded: '2025-01-25',
  },
  {
    id: '2',
    title: '[Regional Hospital] Medical Records - [Subject Name] Emergency Visit (35 Pages)',
    source: '[Regional Hospital]',
    dateOfRecord: '2025-09-10',
    ocrText: `===============================================================================\nOCR EXTRACTION: scan0007.pdf\nProcessed: 2026-02-01\nTotal Pages: 35\n================================================================================\n[Health Network] Order Summary. PPRN: [Redacted]. ADM Date: 10-Sep-2025 12:06. Visit Reason: Laceration Puncture. Documeted 50-minute secure ward detention without physician order. MRI indications: Fall from 30ft 5 years ago. Result: Early degenerative changes C5-C6. No significant canal stenosis. NP [Medical Professional] attending.`,
    status: 'needs_review',
    dateAdded: '2025-01-25',
  },
];

const MedicalRecords: React.FC = () => {
  const [records, setRecords] = useState<MedicalRecord[]>(() => {
    const saved = localStorage.getItem('medicalRecords');
    return saved ? JSON.parse(saved) : initialRecords;
  });

  const [isAdding, setIsAdding] = useState(false);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  
  const [newRecord, setNewRecord] = useState<Partial<MedicalRecord>>({
    title: '', source: '', dateOfRecord: new Date().toISOString().split('T')[0], ocrText: '', status: 'needs_review'
  });

  useEffect(() => {
    localStorage.setItem('medicalRecords', JSON.stringify(records));
  }, [records]);

  const toggleExpand = (id: string) => {
    const next = new Set(expandedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpandedIds(next);
  };

  const handleAddRecord = () => {
    if (!newRecord.title || !newRecord.ocrText) return;
    const record: MedicalRecord = {
      id: Date.now().toString(),
      title: newRecord.title,
      source: newRecord.source || 'Unknown',
      dateOfRecord: newRecord.dateOfRecord || '',
      ocrText: newRecord.ocrText,
      status: newRecord.status || 'needs_review',
      dateAdded: new Date().toISOString().split('T')[0],
    };
    setRecords([record, ...records]);
    setIsAdding(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Stethoscope className="w-6 h-6 text-blue-600" />
          Evidence Archive
        </h2>
        <button onClick={() => setIsAdding(!isAdding)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2 font-semibold transition-all shadow-md active:scale-95">
          <Plus className="w-4 h-4" /> {isAdding ? "Cancel" : "Add Record"}
        </button>
      </div>

      <div className="space-y-4">
        {records.map(record => (
          <div key={record.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm transition-all hover:border-blue-200">
            <div className="flex justify-between items-start mb-4">
              <div className="flex flex-col text-left">
                <h3 className="text-lg font-bold text-slate-900">{record.title}</h3>
                <p className="text-slate-500 text-xs mt-1 flex items-center gap-2">
                  <Calendar className="w-3 h-3" /> {record.dateOfRecord} | {record.source}
                </p>
              </div>
              <div className="flex gap-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${record.status === 'reviewed' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-amber-50 text-amber-600 border border-amber-100'}`}>
                  {record.status}
                </span>
                <button onClick={() => toggleExpand(record.id)} className="text-blue-600 hover:text-blue-800 p-1">
                  {expandedIds.has(record.id) ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className={`bg-slate-50 p-4 rounded-lg border border-slate-100 font-mono text-xs text-slate-700 transition-all ${expandedIds.has(record.id) ? 'max-h-[800px] overflow-y-auto' : 'max-h-24 overflow-hidden relative'}`}>
               <pre className="whitespace-pre-wrap">{record.ocrText}</pre>
               {!expandedIds.has(record.id) && (
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none flex items-end justify-center pb-2">
                    <span className="text-[10px] text-slate-500 font-bold bg-white px-2 py-0.5 rounded border border-slate-200 shadow-sm">Preview Mode</span>
                 </div>
               )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between">
               <button onClick={() => toggleExpand(record.id)} className="text-xs text-blue-600 hover:underline">
                  {expandedIds.has(record.id) ? "Collapse View" : "View Full Forensic Text"}
               </button>
               <button className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1">
                  <Download className="w-3 h-3" /> Download Text
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { MedicalRecords };
