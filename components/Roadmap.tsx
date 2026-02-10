import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { RoadmapTask } from '../types';
import { Map, Plus, Tag, ArrowRight, CheckCircle2, Clock, PlayCircle } from 'lucide-react';

const initialTasks: RoadmapTask[] = [
  { id: '1', title: 'Find 3 Beta Testers in Fredericton', category: 'growth', status: 'active', dueDate: 'Feb 10' },
  { id: '2', title: 'Prototype Wi-Fi board v2 (ESP32)', category: 'tech', status: 'active', dueDate: 'Feb 15' },
  { id: '3', title: 'Draft "Standard Operating Procedure" for Electrician Handoff', category: 'ops', status: 'backlog' },
  { id: '4', title: 'Legal Review of "ShedCare" Liability Waiver', category: 'legal', status: 'backlog' },
  { id: '5', title: 'Launch Landing Page v1', category: 'growth', status: 'done', dueDate: 'Jan 20' },
];

const getCategoryColor = (cat: RoadmapTask['category']) => {
  switch(cat) {
    case 'tech': return 'text-cyan-400 bg-cyan-900/20 border-cyan-500/30';
    case 'ops': return 'text-amber-400 bg-amber-900/20 border-amber-500/30';
    case 'growth': return 'text-green-400 bg-green-900/20 border-green-500/30';
    case 'legal': return 'text-red-400 bg-red-900/20 border-red-500/30';
  }
};

interface ColumnProps {
  title: string;
  status: RoadmapTask['status'];
  icon: any;
  tasks: RoadmapTask[];
  onMoveTask: (id: string, newStatus: RoadmapTask['status']) => void;
}

const Column = React.memo(({ title, status, icon: Icon, tasks, onMoveTask }: ColumnProps) => (
  <div className="bg-slate-900/50 rounded-lg p-4 flex flex-col h-full border border-slate-800">
    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-800">
      <Icon className="w-5 h-5 text-slate-400" />
      <h3 className="font-bold text-slate-200 uppercase tracking-wide text-sm">{title}</h3>
      <span className="ml-auto bg-slate-800 text-slate-500 text-xs px-2 py-0.5 rounded-full">
        {tasks.length}
      </span>
    </div>

    <div className="space-y-3 flex-1 overflow-y-auto min-h-[200px]">
      {tasks.map(task => (
        <div key={task.id} className="bg-slate-800 p-3 rounded border border-slate-700 hover:border-slate-500 transition-colors group">
          <div className="flex justify-between items-start mb-2">
            <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border ${getCategoryColor(task.category)}`}>
              {task.category}
            </span>
            {task.dueDate && <span className="text-[10px] text-slate-500 font-mono">{task.dueDate}</span>}
          </div>
          <p className="text-sm text-white mb-3">{task.title}</p>

          <div className="flex gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
            {status !== 'backlog' && (
              <button
                onClick={() => onMoveTask(task.id, 'backlog')}
                className="p-1 hover:bg-slate-700 rounded text-slate-400"
                title="Move to Backlog"
              >
                <Clock className="w-3 h-3" />
              </button>
            )}
            {status !== 'active' && (
              <button
                onClick={() => onMoveTask(task.id, 'active')}
                className="p-1 hover:bg-slate-700 rounded text-blue-400"
                title="Move to Active"
              >
                <PlayCircle className="w-3 h-3" />
              </button>
            )}
            {status !== 'done' && (
              <button
                onClick={() => onMoveTask(task.id, 'done')}
                className="p-1 hover:bg-slate-700 rounded text-green-400"
                title="Mark Done"
              >
                <CheckCircle2 className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      ))}
      {tasks.length === 0 && (
        <div className="text-center py-10 text-slate-600 text-xs uppercase tracking-widest">
          Empty
        </div>
      )}
    </div>
  </div>
));

const Roadmap: React.FC = () => {
  const [tasks, setTasks] = useState<RoadmapTask[]>(() => {
    const saved = localStorage.getItem('roadmapTasks');
    return saved ? JSON.parse(saved) : initialTasks;
  });

  const [isAdding, setIsAdding] = useState(false);
  const [newTask, setNewTask] = useState<{ title: string; category: RoadmapTask['category'] }>({
    title: '',
    category: 'growth'
  });

  useEffect(() => {
    localStorage.setItem('roadmapTasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTask.title.trim()) return;
    const task: RoadmapTask = {
      id: Date.now().toString(),
      title: newTask.title,
      category: newTask.category,
      status: 'backlog'
    };
    setTasks([...tasks, task]);
    setNewTask({ title: '', category: 'growth' });
    setIsAdding(false);
  };

  const moveTask = useCallback((id: string, newStatus: RoadmapTask['status']) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
  }, []);

  const tasksByStatus = useMemo(() => {
    const groups: Record<RoadmapTask['status'], RoadmapTask[]> = {
      backlog: [],
      active: [],
      done: []
    };
    tasks.forEach(task => {
      if (groups[task.status]) {
        groups[task.status].push(task);
      }
    });
    return groups;
  }, [tasks]);

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Map className="w-6 h-6 text-slate-300" />
          Execution Roadmap
        </h2>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded flex items-center gap-2 text-sm font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Task
        </button>
      </div>

      {isAdding && (
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 mb-6 animate-fade-in flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block text-slate-400 text-xs mb-1">Task Title</label>
            <input 
              type="text" 
              value={newTask.title}
              onChange={e => setNewTask({...newTask, title: e.target.value})}
              className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-orange-500 focus:outline-none"
              placeholder="e.g. Call Inspector for Code Clarification"
            />
          </div>
          <div className="w-full md:w-48">
            <label className="block text-slate-400 text-xs mb-1">Category</label>
            <select 
              value={newTask.category}
              onChange={e => setNewTask({...newTask, category: e.target.value as any})}
              className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-orange-500 focus:outline-none"
            >
              <option value="growth">Growth</option>
              <option value="tech">Tech</option>
              <option value="ops">Ops</option>
              <option value="legal">Legal</option>
            </select>
          </div>
          <button 
            onClick={addTask}
            disabled={!newTask.title.trim()}
            className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-bold disabled:opacity-50"
          >
            Add to Backlog
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 min-h-0">
        <Column title="Strategy / Backlog" status="backlog" icon={Clock} tasks={tasksByStatus.backlog} onMoveTask={moveTask} />
        <Column title="Active Motion" status="active" icon={PlayCircle} tasks={tasksByStatus.active} onMoveTask={moveTask} />
        <Column title="Shipped / Done" status="done" icon={CheckCircle2} tasks={tasksByStatus.done} onMoveTask={moveTask} />
      </div>
    </div>
  );
};

export default Roadmap;