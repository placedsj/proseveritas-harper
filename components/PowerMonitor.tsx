import React from 'react';
import { MonitorNode } from '../types';
import { Wifi, Activity, Thermometer, AlertTriangle, CheckCircle } from 'lucide-react';

const nodes: MonitorNode[] = [
  { id: '1', location: 'Smith Residence (Studio)', loadPercentage: 42, temperature: 24, status: 'online', lastSeen: 'Just now' },
  { id: '2', location: 'Miller Workshop', loadPercentage: 85, temperature: 36, status: 'warning', lastSeen: '2m ago' },
  { id: '3', location: 'Jones Hobbyist', loadPercentage: 12, temperature: 18, status: 'online', lastSeen: 'Just now' },
  { id: '4', location: 'Demo Unit 1', loadPercentage: 0, temperature: 20, status: 'offline', lastSeen: '4h ago' },
  { id: '5', location: 'Brown Backyard Office', loadPercentage: 65, temperature: 28, status: 'online', lastSeen: 'Just now' },
];

const PowerMonitor: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Activity className="w-6 h-6 text-orange-500" />
          Live Power Monitor
        </h2>
        <div className="flex gap-2">
          <span className="flex items-center gap-1 text-xs text-green-400 bg-green-900/20 px-2 py-1 rounded border border-green-900/50">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            System Normal
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {nodes.map(node => (
          <div key={node.id} className="bg-slate-800 p-4 rounded-lg border border-slate-700 flex flex-col md:flex-row items-center gap-6">
            
            {/* Status Icon */}
            <div className={`p-3 rounded-full ${
              node.status === 'online' ? 'bg-green-900/20 text-green-500' :
              node.status === 'warning' ? 'bg-orange-900/20 text-orange-500' :
              'bg-red-900/20 text-red-500'
            }`}>
              <Wifi className="w-6 h-6" />
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-bold text-white">{node.location}</h3>
              <p className="text-xs text-slate-500">Last Seen: {node.lastSeen}</p>
            </div>

            {/* Metrics */}
            <div className="flex gap-8 w-full md:w-auto justify-center">
              <div className="text-center w-24">
                <div className="flex items-center justify-center gap-1 text-slate-400 text-xs uppercase font-bold mb-1">
                  <Activity className="w-3 h-3" /> Load
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2 mb-1">
                  <div 
                    className={`h-2 rounded-full ${node.loadPercentage > 80 ? 'bg-orange-500' : 'bg-blue-500'}`} 
                    style={{ width: `${node.loadPercentage}%` }}
                  />
                </div>
                <span className="text-white font-mono font-bold">{node.loadPercentage}%</span>
              </div>

              <div className="text-center w-24">
                <div className="flex items-center justify-center gap-1 text-slate-400 text-xs uppercase font-bold mb-1">
                  <Thermometer className="w-3 h-3" /> Temp
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2 mb-1">
                  <div 
                    className={`h-2 rounded-full ${node.temperature > 35 ? 'bg-red-500' : 'bg-green-500'}`} 
                    style={{ width: `${Math.min((node.temperature / 50) * 100, 100)}%` }}
                  />
                </div>
                <span className={`font-mono font-bold ${node.temperature > 35 ? 'text-red-400' : 'text-white'}`}>
                  {node.temperature}°C
                </span>
              </div>
            </div>

            {/* Status Badge */}
            <div className="w-24 text-right hidden md:block">
               {node.status === 'warning' ? (
                 <span className="text-orange-500 text-xs font-bold border border-orange-500/50 px-2 py-1 rounded flex items-center gap-1 justify-center">
                   <AlertTriangle className="w-3 h-3" /> Check
                 </span>
               ) : node.status === 'online' ? (
                 <span className="text-green-500 text-xs font-bold border border-green-500/50 px-2 py-1 rounded flex items-center gap-1 justify-center">
                   <CheckCircle className="w-3 h-3" /> OK
                 </span>
               ) : (
                 <span className="text-red-500 text-xs font-bold border border-red-500/50 px-2 py-1 rounded flex items-center gap-1 justify-center">
                   Offline
                 </span>
               )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PowerMonitor;