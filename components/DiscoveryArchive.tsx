
import React, { useState } from 'react';
import { Database, Search, FileText, Hash, ShieldAlert, Gavel, Stethoscope } from 'lucide-react';

const DiscoveryArchive: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const sections = [
    { 
      title: 'Solicitor-Client Relationship Termination', 
      content: 'Jan 21, 2026: Justin Gulliver withdrew as counsel in front of Judge Winchester. Breakdown caused by intentional suppression of scaffolding evidence and failure to declare fitness status. Matter transferred back to Judge Palmer (Acquittal Judge).',
      category: 'Criminal'
    },
    { 
      title: 'FDSJ-739-24: Case Record Consolidation', 
      content: 'Master log from Aug 2024 to Dec 2025. Key facts: Emma admits hitting Craig (Nov 19), Tony Baker drug purchase text (Oct 6), 129-day access denial ("You will not see Harper until October" email). Contains 87 exhibits mapped to parenting unfitness and systematic gatekeeping.',
      category: 'Family'
    },
    { 
      title: 'Criminal: R v Schulz (Theft Under $5,000)', 
      content: 'Sentencing March 3, 2026. Factual clarification submitted Jan 14, 2026. Scaffolding "Smoking Gun": $2,000 in equipment left at site proves lack of intent. Restitution set at $3,200 (credited $800 from Ross self-help seizure). Requesting 2-year probation to maintain family stability.',
      category: 'Criminal'
    },
    { 
      title: 'Medical: SJRH Emergency Records (36 Pages)', 
      content: 'Visit date Sept 10, 2025. MRI Brain/Cervical Spine Oct 2, 2025. Records confirmed "Do Not Collect" directive investigation. Triage code S6190 discrepancy. Documents 50-minute secure ward detention without physician order.',
      category: 'Health'
    },
    { 
      title: 'NBASW Complaint: Jacqueline Gallant', 
      content: 'Filed Sept 8, 2025. Alleging conflict of interest (friendship with Nick Ryan), premature case closure (Feb 2025), and acceptance of suspicious "Negative Dilute" drug tests without retesting. Documents systemic bias and file closure prior to legal escalation.',
      category: 'Professional'
    },
    { 
      title: 'Constitutional: Back-to-Back Accord', 
      content: 'Submitted Jan 24, 2026. Establishes the "Harper Baseline": verified safety via "The Exhibit Generator". Includes the "Jane Block" (6-month cooling off period for grandmother) and "Sunrise Clause" for transition to 50/50 shared parenting by March 2028.',
      category: 'Legal Strategy'
    }
  ];

  const filteredSections = sections.filter(s => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2 text-left">
            <Database className="w-6 h-6 text-indigo-400" />
            Discovery Archive: FDSJ-739-24
          </h2>
          <p className="text-slate-400 text-sm text-left font-mono">Consolidated Database: 139 Files | 273,820 Data Points</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
        <input 
          type="text"
          placeholder="Search by keyword, exhibit number, or category..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 pl-10 text-white focus:border-indigo-500 focus:outline-none"
        />
      </div>

      <div className="space-y-4">
        {filteredSections.map((section, i) => (
          <div key={i} className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden group text-left">
            <div className="p-4 bg-slate-900/50 border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                 {section.category === 'Criminal' ? <Gavel className="w-4 h-4 text-blue-400" /> : 
                  section.category === 'Health' ? <Stethoscope className="w-4 h-4 text-emerald-400" /> :
                  <FileText className="w-4 h-4 text-indigo-400" />}
                 <h3 className="text-white font-bold text-sm uppercase tracking-wider">{section.title}</h3>
              </div>
              <span className="text-[10px] bg-slate-950 text-slate-500 px-2 py-1 rounded border border-slate-700 font-mono">{section.category}</span>
            </div>
            <div className="p-5 text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-sans">
              {section.content}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 bg-indigo-900/10 border border-indigo-500/30 rounded-2xl text-left">
             <h4 className="text-indigo-100 font-bold mb-2 flex items-center gap-2"><ShieldAlert className="w-4 h-4" /> Discovery Protocol</h4>
             <p className="text-xs text-indigo-200/70">Gulliver withdrawal documented as "Ineffective Assistance" groundwork for appeal if Palmer's sentencing deviates from conditional discharge.</p>
          </div>
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-center flex flex-col justify-center">
             <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Archive Status</p>
             <p className="text-green-500 font-mono text-xs mt-1">PRO SE OVERRIDE ACTIVE | Palmer Context Integrated</p>
          </div>
      </div>
    </div>
  );
};

export default DiscoveryArchive;
