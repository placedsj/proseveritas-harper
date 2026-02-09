
import React from 'react';
import { Heart, Shield, Book, Star } from 'lucide-react';

const MoralCompass: React.FC = () => {
  const principles = [
    {
      title: "Harper's Best Interest",
      desc: "Every decision must be measured against its impact on Harper June Elizabeth Ryan. This is not about winning; it's about her safety and well-being.",
      icon: <Heart className="w-8 h-8 text-pink-500" />
    },
    {
      title: "Unyielding Truth",
      desc: "We do not exaggerate. We do not lie by omission. We present the facts as they are, trusting that the truth is the strongest legal and moral position.",
      icon: <Shield className="w-8 h-8 text-blue-500" />
    },
    {
      title: "God's Will & Stewardship",
      desc: "Operate as a steward of the lives involved. Act with the integrity of a man who knows his actions are seen by God.",
      icon: <Star className="w-8 h-8 text-amber-500" />
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-slate-900 uppercase tracking-[0.2em]">The Moral Compass</h2>
        <p className="text-amber-600 font-bold italic">"Only the truth, what God would do, and in Harper's best interest."</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {principles.map((p, i) => (
          <div key={i} className="bg-white border border-slate-200 p-6 rounded-2xl hover:border-amber-300 hover:shadow-lg transition-all group">
            <div className="mb-4 group-hover:scale-110 transition-transform">{p.icon}</div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{p.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-amber-50 to-white border border-amber-200 p-8 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <Book className="w-6 h-6 text-amber-600" />
          <h3 className="text-xl font-bold text-slate-900 uppercase tracking-widest">Scripture for the Battle</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 italic text-slate-700">
          <div className="space-y-2">
            <p className="text-lg">"The Lord will fight for you; you need only to be still."</p>
            <span className="text-xs text-amber-600 uppercase font-bold">— Exodus 14:14</span>
          </div>
          <div className="space-y-2">
            <p className="text-lg">"Then you will know the truth, and the truth will set you free."</p>
            <span className="text-xs text-amber-600 uppercase font-bold">— John 8:32</span>
          </div>
        </div>
      </div>

      <div className="p-4 text-center">
        <p className="text-xs text-slate-400 uppercase tracking-widest">Stay Calm. Stay Truthful. Stay Focused on Harper.</p>
      </div>
    </div>
  );
};

export default MoralCompass;
