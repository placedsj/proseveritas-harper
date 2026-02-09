
import React from 'react';
import { Gavel, BookOpen, ExternalLink, FileText, Scale, Users } from 'lucide-react';

const LegalSRL: React.FC = () => {
  const resources = [
    {
      title: "Family Law NB (PLEIS-NB)",
      desc: "The primary source for NB family court forms, guides, and FAQs on representing yourself.",
      link: "https://www.familylawnb.ca",
      icon: <FileText className="w-5 h-5 text-blue-500" />
    },
    {
      title: "CJC SRL Handbooks",
      desc: "Canadian Judicial Council's step-by-step guides for preparing timelines, evidence lists, and affidavits.",
      link: "https://cjc-ccm.ca/en/what-we-do/initiatives/representing-yourself-court",
      icon: <BookOpen className="w-5 h-5 text-purple-500" />
    },
    {
      title: "Legal Aid NB",
      desc: "Apply for coverage or find 'Family Advice Lawyer' schedules at the Saint John courthouse.",
      link: "https://www.legalaid-aidejuridique-nb.ca",
      icon: <Scale className="w-5 h-5 text-emerald-500" />
    },
    {
      title: "Domestic Violence Outreach",
      desc: "Free crisis intervention and safety planning in Saint John (NB 211).",
      link: "https://nb.211.ca/record-detail/88431410/",
      icon: <Users className="w-5 h-5 text-red-500" />
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Gavel className="w-6 h-6 text-blue-600" />
            SRL Command: Legal Strategy
          </h2>
          <p className="text-slate-500 text-sm">Self-Represented Litigant (SRL) Resources for New Brunswick.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((res, i) => (
          <a 
            key={i} 
            href={res.link} 
            target="_blank" 
            rel="noreferrer"
            className="bg-white p-6 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 group-hover:bg-slate-100 transition-colors">
                {res.icon}
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />
            </div>
            <h3 className="text-slate-900 font-bold text-lg mb-2">{res.title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{res.desc}</p>
          </a>
        ))}
      </div>

      <div className="bg-white border border-slate-200 p-8 rounded-2xl space-y-6 shadow-sm">
         <h3 className="text-xl font-bold text-slate-900 uppercase tracking-widest flex items-center gap-3">
            <Scale className="w-6 h-6 text-blue-600" /> Battle Prep Checklist
         </h3>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-sm text-slate-700">
            <div className="flex items-start gap-3">
               <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
               <p><span className="font-bold text-slate-900">Court Binder:</span> Orders, filings, police reports, and medical letters organized chronologically.</p>
            </div>
            <div className="flex items-start gap-3">
               <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
               <p><span className="font-bold text-slate-900">The PSR Record:</span> Keep the Dec 16 Pre-Sentence Report handy to prove stability to Family Court.</p>
            </div>
            <div className="flex items-start gap-3">
               <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
               <p><span className="font-bold text-slate-900">Evidence List:</span> Every allegation in the Scott Schedule must map to a specific exhibit.</p>
            </div>
            <div className="flex items-start gap-3">
               <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
               <p><span className="font-bold text-slate-900">Affidavit Drafts:</span> Use the OS to rewrite emotional thoughts into factual court statements.</p>
            </div>
         </div>
      </div>

      <div className="p-4 text-center border-t border-slate-200">
        <p className="text-[10px] text-slate-400 uppercase tracking-widest">Organized. Factual. Calm. Truthful.</p>
      </div>
    </div>
  );
};

export default LegalSRL;
