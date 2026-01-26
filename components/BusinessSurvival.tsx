import React, { useState, useEffect } from 'react';
import { BusinessTask } from '../types';
import { Briefcase, Plus, DollarSign, CheckSquare, Square, Trash2 } from 'lucide-react';

const BusinessSurvival: React.FC = () => {
  const [tasks, setTasks] = useState<BusinessTask[]>(() => {
    const saved = localStorage.getItem('bizTasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [newTask, setNewTask] = useState<Partial<BusinessTask>>({
    clientOrTask: '',
    dueDate: '',
    dollarValue: 0
  });

  useEffect(() => {
    localStorage.setItem('bizTasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAdd = () => {
    if (!newTask.clientOrTask) return;
    const task: BusinessTask = {
      id: Date.now().toString(),
      clientOrTask: newTask.clientOrTask,
      dueDate: newTask.dueDate || '',
      dollarValue: newTask.dollarValue || 0,
      completed: false
    };
    setTasks([...tasks, task]);
    setNewTask({ clientOrTask: '', dueDate: '', dollarValue: 0 });
  };

  const toggleComplete = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deletetask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const totalValue = tasks.filter(t => !t.completed).reduce((sum, t) => sum + t.dollarValue, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-green-500" />
            Business Survival
          </h2>
          <p className="text-slate-400 text-sm">Potential Revenue: <span className="text-green-400 font-mono font-bold">${totalValue.toLocaleString()}</span></p>
        </div>
      </div>

      <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 flex gap-2 items-end">
        <div className="flex-1">
          <label className="text-xs text-slate-500 uppercase font-bold">Client / Task</label>
          <input 
            type="text" 
            value={newTask.clientOrTask}
            onChange={e => setNewTask({...newTask, clientOrTask: e.target.value})}
            className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-green-500 focus:outline-none"
            placeholder="e.g. Roofing Lead - Miller"
          />
        </div>
        <div className="w-32">
          <label className="text-xs text-slate-500 uppercase font-bold">Value ($)</label>
          <input 
            type="number" 
            value={newTask.dollarValue}
            onChange={e => setNewTask({...newTask, dollarValue: parseFloat(e.target.value)})}
            className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-green-500 focus:outline-none"
          />
        </div>
        <div className="w-40">
          <label className="text-xs text-slate-500 uppercase font-bold">Due Date</label>
          <input 
            type="date" 
            value={newTask.dueDate}
            onChange={e => setNewTask({...newTask, dueDate: e.target.value})}
            className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-green-500 focus:outline-none"
          />
        </div>
        <button 
          onClick={handleAdd}
          className="bg-green-600 hover:bg-green-700 text-white p-2 rounded"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      <div className="space-y-2">
        {tasks.map(task => (
          <div key={task.id} className={`flex items-center justify-between p-4 rounded-lg border ${task.completed ? 'bg-slate-900 border-slate-800 opacity-50' : 'bg-slate-800 border-slate-700'}`}>
            <div className="flex items-center gap-4">
              <button onClick={() => toggleComplete(task.id)} className="text-slate-400 hover:text-green-500">
                {task.completed ? <CheckSquare className="w-6 h-6 text-green-500" /> : <Square className="w-6 h-6" />}
              </button>
              <div>
                <p className={`font-bold ${task.completed ? 'line-through text-slate-500' : 'text-white'}`}>{task.clientOrTask}</p>
                <p className="text-xs text-slate-500">Due: {task.dueDate || 'ASAP'}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono text-green-400 font-bold">${task.dollarValue.toLocaleString()}</span>
              <button onClick={() => deletetask(task.id)} className="text-slate-600 hover:text-red-500">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessSurvival;
