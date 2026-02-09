
import React, { useState } from 'react';
import { Database, Search, FileText, Hash, ShieldAlert, Gavel, Stethoscope, ChevronDown, ChevronUp } from 'lucide-react';

const DiscoveryArchive: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  
  const sections = [
    { 
      title: 'Solicitor-Client Termination (Jan 21)', 
      content: 'Justin Gulliver withdrew as counsel in front of Judge Winchester. Breakdown caused by intentional suppression of scaffolding evidence and failure to declare fitness status. Matter transferred back to Judge Palmer (Acquittal Judge). Documents Ineffective Assistance groundwork.',
      category: 'Legal'
    },
    { 
      title: 'FDSJ-739-24: Case Master Log', 
      content: 'Consolidated record from Aug 2024 to Dec 2025. Key facts: Emma admits hitting Craig (Nov 19), Tony Baker drug purchase text (Oct 6), 129-day access denial verified via email timestamps. Contains 87 exhibits mapped to parenting unfitness.',
      category: 'Evidence'
    },
    { 
      title: 'R v Schulz: Scaffolding Smoking Gun', 
      content: 'Sentencing March 3, 2026. $2,000 in equipment left at site proves lack of intent. Restitution set at $3,200 (credited $800 from Ross self-help seizure). Proving civil dispute vs criminal intent for Judge Palmer.',
      category: 'Criminal'
    },
    { 
      title: 'Medical: The Horizon Audit', 
      content: 'Visit date Sept 10, 2025. Documents 50-minute secure ward detention without physician order. NP Claire Logan triage discrepancy (Wrist vs Dorsal Hand). MRI results confirm C5-C6 degenerative change consistent with work injury.',
      category: 'Health'
    }
  ];

  const filteredSections = sections.filter(s => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="flex justify-between items-center text-left">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Database className="w-6 h-6 text-indigo-600" />
            Discovery Archive
          </h2>
          <p className="text-slate-500 text-sm font-mono">Consolidated Database Index | Active Pro Se Control</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
        <input 
          type="text"
          placeholder="Search exhibits, case notes, or keywords..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full bg-white border border-slate-200 rounded-xl p-3 pl-10 text-slate-900 focus:border-indigo-500 focus:outline-none shadow-sm"
        />
      </div>

      <div className="space-y-3">
        {filteredSections.map((section, i) => {
          const isExpanded = expandedIndex === i;
          return (
            <div key={i} className="bg-white border border-slate-200 rounded-xl overflow-hidden text-left shadow-sm hover:border-indigo-200 transition-all">
              <button 
                onClick={() => setExpandedIndex(isExpanded ? null : i)}
                className="w-full p-4 bg-slate-50 flex items-center justify-between hover:bg-slate-100 transition-all border-b border-transparent hover:border-slate-200"
              >
                <div className="flex items-center gap-3">
                   {section.category === 'Criminal' ? <Gavel className="w-4 h-4 text-blue-500" /> : <FileText className="w-4 h-4 text-indigo-500" />}
                   <span className="text-slate-900 font-bold text-sm tracking-wide uppercase">{section.title}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] text-slate-500 font-mono hidden md:block">{section.category}</span>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>
              </button>
              {isExpanded && (
                <div className="p-5 text-slate-600 text-sm leading-relaxed bg-white animate-fade-in">
                  {section.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DiscoveryArchive;
