import React from 'react';
import { ProductTier } from '../types';
import { Package, ShieldCheck, Wifi, Zap } from 'lucide-react';

const products: ProductTier[] = [
  {
    id: '1',
    name: 'Hobbyist',
    amps: 20,
    price: 899,
    features: ['20A Supply', '2 Internal Outlets', 'Basic Breaker Box', 'Standard Install Kit'],
    isRecurring: false
  },
  {
    id: '2',
    name: 'Workshop',
    amps: 30,
    price: 1499,
    features: ['30A Supply', '4 Internal Outlets', 'Pro Breaker Box', 'Heavy Duty Install Kit', 'Smart Monitoring Capable'],
    isRecurring: false
  },
  {
    id: '3',
    name: 'Studio',
    amps: 50,
    price: 2499,
    features: ['50A Supply', '6 Internal Outlets', 'Sub-panel Upgrade', 'Climate Control Ready', 'Wi-Fi Monitoring Included'],
    isRecurring: false
  }
];

const ProductLab: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Package className="w-6 h-6 text-slate-300" />
          Product Lab
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(p => (
          <div key={p.id} className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-orange-500/50 transition-colors group">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{p.name}</h3>
                  <div className="flex items-center gap-1 text-orange-500 font-mono text-sm mt-1">
                    <Zap className="w-4 h-4" />
                    {p.amps} AMPS
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-white">${p.price}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {p.features.map((f, i) => (
                  <li key={i} className="text-slate-400 text-sm flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-slate-600 rounded-full mt-1.5" />
                    {f}
                  </li>
                ))}
              </ul>

              <button className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg font-semibold text-sm transition-colors">
                Edit Specs
              </button>
            </div>
            <div className="bg-slate-900/50 p-3 border-t border-slate-800 flex justify-between items-center">
              <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Inventory</span>
              <span className="text-xs text-green-500 font-mono">12 UNITS READY</span>
            </div>
          </div>
        ))}
      </div>

      {/* ShedCare Section */}
      <div className="bg-blue-900/10 border border-blue-500/20 rounded-xl p-6 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-blue-100 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-blue-400" />
              ShedCare
            </h3>
            <p className="text-blue-200/60 text-sm mt-2 max-w-lg">
              Recurring revenue engine. $19/month/user. Includes active monitoring, quarterly safety reports, and priority dispatch for trips.
            </p>
          </div>
          <div className="flex items-center gap-4 bg-slate-900/50 p-4 rounded-lg border border-blue-500/10">
            <div className="text-center">
              <p className="text-xs text-blue-400 uppercase font-bold">Subscribers</p>
              <p className="text-2xl font-bold text-white">18</p>
            </div>
            <div className="w-px h-8 bg-slate-700" />
            <div className="text-center">
              <p className="text-xs text-blue-400 uppercase font-bold">MRR</p>
              <p className="text-2xl font-bold text-white">$342</p>
            </div>
          </div>
        </div>
        
        {/* Background decorative icon */}
        <Wifi className="absolute -right-6 -bottom-6 w-48 h-48 text-blue-500/5 rotate-12" />
      </div>
    </div>
  );
};

export default ProductLab;