
import React from 'react';
import { MessageSquare, AlertOctagon, UserCheck } from 'lucide-react';

const CourtPrep: React.FC = () => {
  return (
    <div className="space-y-8 max-w-3xl mx-auto text-left">
      {/* Sentencing Script */}
      <section className="bg-slate-800 p-6 rounded-lg border border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <MessageSquare className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl font-bold text-white">Sentencing Script (March 3)</h2>
        </div>
        <div className="bg-slate-900 p-4 rounded text-slate-200 italic font-serif leading-relaxed space-y-4">
          <p>"Your Honour, I acknowledge I was found guilty of theft under $5,000. I accept that conviction. I was found not guilty of fraud."</p>
          <p>"I was not in a fit state to stand trial when this matter proceeded. I had not seen my daughter in 125 days, I was sleep-deprived and in crisis about a custody hearing happening one week after trial. The Pre-Sentence Report reflects who I am now—stable, aware, committed to making this right."</p>
          <p>"Any custody time I serve before the March 30 custody hearing means I lose contact with my daughter and cannot demonstrate the stability that the family court needs to see. Restitution is possible if I remain employed and functional."</p>
          <p>"I ask for probation or a conditional sentence that allows me to stay in the community, provide for Harper, and continue fighting for custody the right way. Thank you."</p>
        </div>
      </section>

      {/* Custody Argument */}
      <section className="bg-slate-800 p-6 rounded-lg border border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <UserCheck className="w-6 h-6 text-green-400" />
          <h2 className="text-xl font-bold text-white">Custody Argument (March 30)</h2>
        </div>
        <ul className="space-y-3 text-slate-300">
          <li className="flex gap-2">
            <span className="font-bold text-white">1. The Goal:</span> Back-to-back shared parenting agreement.
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-white">2. Fit Parent:</span> PSR (Dec 16) confirms stability and parenting capacity.
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-white">3. Context:</span> Criminal conviction was a deposit dispute (Theft Under), not violence.
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-white">4. Medical Fitness:</span> MRI and Psych eval show I am fit now.
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-white">5. Child Safety:</span> Emma charged with assault (Dec 9).
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-white">6. Best Interests:</span> Harper needs her father. Only the truth and God's will.
          </li>
        </ul>
      </section>

      {/* The NO List */}
      <section className="bg-red-900/10 p-6 rounded-lg border border-red-900/50">
        <div className="flex items-center gap-3 mb-4">
          <AlertOctagon className="w-6 h-6 text-red-500" />
          <h2 className="text-xl font-bold text-red-100">ABSOLUTELY DO NOT</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-red-950/30 p-3 rounded text-red-200 text-sm">Do NOT trash-talk Emma or in-laws.</div>
          <div className="bg-red-950/30 p-3 rounded text-red-200 text-sm">Do NOT mention J-Tornado / Sean Boyd theories.</div>
          <div className="bg-red-950/30 p-3 rounded text-red-200 text-sm">Do NOT get emotional or angry.</div>
          <div className="bg-red-950/30 p-3 rounded text-red-200 text-sm">Do NOT argue about the criminal trial fairness.</div>
        </div>
      </section>
    </div>
  );
};

export default CourtPrep;
