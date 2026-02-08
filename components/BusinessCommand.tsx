import React, { useState, useEffect } from 'react';
import { BusinessProject } from '../types';
import { Briefcase, HardHat, Zap, Clock, CheckCircle2, Plus, DollarSign, Trash2 } from 'lucide-react';

const initialProjects: BusinessProject[] = [
  { id: '1', name: 'Smith Backyard Studio', type: 'PLACED', status: 'Active', value: 2499, nextAction: 'Install 50A Kit', dueDate: 'Jan 28' },
  { id: '2', name: 'Miller Roof Repair', type: 'ROOFING', status: 'Lead', value: 850, nextAction: 'Send Quote', dueDate: 'Jan 26' },
  { id: '3', name: 'Jones Workshop', type: 'PLACED', status: 'Invoiced', value: 1499, nextAction: 'Await Payment', dueDate: 'Jan 25' },
];

const BusinessCommand: React.FC = () => {
  const [projects, setProjects] = useState<BusinessProject[]>(() => {
    const saved = localStorage.getItem('bizProjects');
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [isAdding, setIsAdding] = useState(false);
  const [newProject, setNewProject] = useState<Partial<BusinessProject>>({
    name: '', type: 'PLACED', status: 'Lead', value: 0, nextAction: ''
  });

  useEffect(() => {
    localStorage.setItem('bizProjects', JSON.stringify(projects));
  }, [projects]);

  const addProject = () => {
    if (!newProject.name) return;
    const proj: BusinessProject = {
      id: Date.now().toString(),
      name: newProject.name!,
      type: newProject.type as any,
      status: newProject.status as any,
      value: newProject.value || 0,
      nextAction: newProject.nextAction || 'Plan',
      dueDate: newProject.dueDate
    };
    setProjects([proj, ...projects]);
    setIsAdding(false);
    setNewProject({ name: '', type: 'PLACED', status: 'Lead', value: 0, nextAction: '' });
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const totalValue = projects.reduce((sum, p) => sum + p.value, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-green-500" />
            Business Command
          </h2>
          <p className="text-slate-400 text-sm">Pipeline Value: <span className="text-green-400 font-mono font-bold">${totalValue.toLocaleString()}</span></p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2 font-bold"
        >
          <Plus className="w-4 h-4" />
          New Job
        </button>
      </div>

      {isAdding && (
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 mb-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input 
              type="text" 
              placeholder="Client / Job Name" 
              value={newProject.name}
              onChange={e => setNewProject({...newProject, name: e.target.value})}
              className="bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-green-500 focus:outline-none"
            />
            <select 
              value={newProject.type}
              onChange={e => setNewProject({...newProject, type: e.target.value as any})}
              className="bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-green-500 focus:outline-none"
            >
              <option value="PLACED">PLACED (Sheds)</option>
              <option value="ROOFING">Paul's Roofing</option>
            </select>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-4">
             <input 
              type="number" 
              placeholder="Value $" 
              value={newProject.value}
              onChange={e => setNewProject({...newProject, value: parseInt(e.target.value)})}
              className="bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-green-500 focus:outline-none"
            />
            <input 
              type="text" 
              placeholder="Next Action" 
              value={newProject.nextAction}
              onChange={e => setNewProject({...newProject, nextAction: e.target.value})}
              className="bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-green-500 focus:outline-none"
            />
            <input 
              type="text" 
              placeholder="Due Date" 
              value={newProject.dueDate || ''}
              onChange={e => setNewProject({...newProject, dueDate: e.target.value})}
              className="bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-green-500 focus:outline-none"
            />
          </div>
          <button 
            onClick={addProject}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-bold"
          >
            Add to Pipeline
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {projects.map(proj => (
          <div key={proj.id} className="bg-slate-800 p-4 rounded-lg border border-slate-700 flex items-center justify-between group hover:border-slate-500 transition-colors">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${proj.type === 'PLACED' ? 'bg-orange-900/20 text-orange-500' : 'bg-blue-900/20 text-blue-500'}`}>
                {proj.type === 'PLACED' ? <Zap className="w-5 h-5" /> : <HardHat className="w-5 h-5" />}
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">{proj.name}</h3>
                <div className="flex gap-2 text-sm mt-1">
                   <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${
                     proj.status === 'Active' ? 'bg-green-900/30 text-green-400' : 
                     proj.status === 'Lead' ? 'bg-slate-700 text-slate-300' : 
                     proj.status === 'Invoiced' ? 'bg-purple-900/30 text-purple-400' : 'text-slate-500'
                   }`}>
                     {proj.status}
                   </span>
                   <span className="text-slate-500 flex items-center gap-1">
                     <Clock className="w-3 h-3" /> Due: {proj.dueDate || 'TBD'}
                   </span>
                </div>
              </div>
            </div>
            
            <div className="text-right flex items-center gap-4">
              <div>
                <p className="text-xl font-bold text-white">${proj.value.toLocaleString()}</p>
                <p className="text-sm text-slate-400">{proj.nextAction}</p>
              </div>
              <button
                onClick={() => deleteProject(proj.id)}
                className="p-2 text-slate-600 hover:text-red-500 hover:bg-red-900/20 rounded transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessCommand;
