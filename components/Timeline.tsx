import React, { useState, useEffect } from 'react';
import { TimelineEvent } from '../types';
import { Clock, Calendar, Volume2, Plus, X, Trash2, CheckSquare, Square, AlertTriangle } from 'lucide-react';
import { speak } from '../services/audioService';

interface TimelineProps {
  audioEnabled: boolean;
}

const initialEvents: TimelineEvent[] = [
  { id: '1', date: 'Jan 25', title: 'Review PSR. Email lawyer regarding Scotiabank disclosure.', type: 'prep', completed: false },
  { id: '2', date: 'Jan 27', title: 'Draft mitigation statement for sentencing.', type: 'prep', completed: false },
  { id: '3', date: 'Jan 30', title: 'Collect/Print Evidence: Invoice, FB messages, MRI, Psych Eval.', type: 'deadline', completed: false },
  { id: '4', date: 'Feb 1', title: 'Final Sentencing Prep. Pack bag. Review statement.', type: 'prep', completed: false },
  { id: '5', date: 'Feb 3', title: 'SENTENCING HEARING', type: 'court', completed: false },
  { id: '6', date: 'TBD', title: 'Custody Prep: "Back-to-Back" Parenting Plan.', type: 'prep', completed: false },
  { id: '7', date: 'TBD', title: 'CUSTODY HEARING', type: 'court', completed: false },
];

const Timeline: React.FC<TimelineProps> = ({ audioEnabled }) => {
  const [events, setEvents] = useState<TimelineEvent[]>(() => {
    const saved = localStorage.getItem('timelineEvents');
    return saved ? JSON.parse(saved) : initialEvents;
  });

  const [isAdding, setIsAdding] = useState(false);
  const [newEvent, setNewEvent] = useState<{
    date: string;
    title: string;
    type: TimelineEvent['type'];
  }>({
    date: '',
    title: '',
    type: 'prep'
  });

  useEffect(() => {
    localStorage.setItem('timelineEvents', JSON.stringify(events));
  }, [events]);

  const handleSpeak = (event: TimelineEvent) => {
    const text = `Event on ${event.date}. ${event.title}. Type: ${event.type}.`;
    speak(text);
  };

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date) return;
    
    const event: TimelineEvent = {
      id: Date.now().toString(),
      date: newEvent.date,
      title: newEvent.title,
      type: newEvent.type,
      completed: false
    };

    // Add to the end of the list
    setEvents([...events, event]);
    setNewEvent({ date: '', title: '', type: 'prep' });
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const toggleComplete = (id: string) => {
    setEvents(events.map(e => e.id === id ? { ...e, completed: !e.completed } : e));
  };

  const getTypeStyles = (type: TimelineEvent['type'], completed: boolean) => {
    if (completed) return 'bg-slate-900 border-slate-800 text-slate-600';
    switch (type) {
      case 'court': return 'bg-red-900/20 border-red-500/50 text-white';
      case 'deadline': return 'bg-amber-900/20 border-amber-500/50 text-white';
      default: return 'bg-slate-800 border-slate-700 text-slate-200';
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Calendar className="w-6 h-6 text-blue-500" />
          Battle Timeline
        </h2>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded flex items-center gap-2 text-sm font-semibold transition-colors"
        >
          {isAdding ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {isAdding ? "Cancel" : "Add Event"}
        </button>
      </div>

      {isAdding && (
        <div className="bg-slate-800 p-5 rounded-lg border border-slate-700 mb-8 animate-fade-in shadow-xl">
          <h3 className="text-lg font-semibold text-white mb-4">Add New Event</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-slate-400 text-xs uppercase font-bold mb-1">Date</label>
              <input 
                type="text" 
                value={newEvent.date}
                onChange={e => setNewEvent({...newEvent, date: e.target.value})}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-blue-500 focus:outline-none"
                placeholder="e.g. Feb 14"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-slate-400 text-xs uppercase font-bold mb-1">Event Title</label>
              <input 
                type="text" 
                value={newEvent.title}
                onChange={e => setNewEvent({...newEvent, title: e.target.value})}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-blue-500 focus:outline-none"
                placeholder="Describe the task or hearing..."
              />
            </div>
            <div>
              <label className="block text-slate-400 text-xs uppercase font-bold mb-1">Type</label>
              <select 
                value={newEvent.type}
                onChange={e => setNewEvent({...newEvent, type: e.target.value as any})}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="prep">Prep / Task</option>
                <option value="deadline">Deadline</option>
                <option value="court">Court Date</option>
              </select>
            </div>
          </div>
          <button 
            onClick={handleAddEvent}
            disabled={!newEvent.title || !newEvent.date}
            className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2 rounded font-semibold transition-colors"
          >
            Add to Timeline
          </button>
        </div>
      )}
      
      <div className="space-y-0 relative border-l-2 border-slate-700 ml-3 pb-12">
        {events.map((event, idx) => (
          <div key={event.id} className={`ml-8 mb-6 relative group transition-all duration-300 ${event.completed ? 'opacity-60' : 'opacity-100'}`}>
            {/* Dot */}
            <div className={`absolute -left-[43px] top-6 w-6 h-6 rounded-full border-2 flex items-center justify-center z-10 bg-slate-900 ${
              event.completed ? 'border-slate-600 text-slate-600' :
              event.type === 'court' ? 'border-red-500 text-red-500' : 
              event.type === 'deadline' ? 'border-amber-500 text-amber-500' :
              'border-slate-500 text-slate-500'
            }`}>
              {event.completed ? <CheckSquare className="w-3 h-3" /> : <div className="w-2 h-2 rounded-full bg-current" />}
            </div>

            <div className={`relative p-5 rounded-lg border transition-all ${getTypeStyles(event.type, event.completed)}`}>
              <div className="flex justify-between items-start mb-2 pr-12">
                <span className={`text-sm font-bold uppercase tracking-wider ${event.completed ? 'text-slate-500 line-through' : ''}`}>
                  {event.date}
                </span>
                <span className={`text-[10px] uppercase border px-1.5 py-0.5 rounded ${event.completed ? 'border-slate-700 text-slate-600' : 'border-current opacity-70'}`}>
                  {event.type}
                </span>
              </div>
              
              <h3 className={`text-lg font-medium mb-1 ${event.completed ? 'text-slate-500 line-through decoration-slate-600' : ''}`}>
                {event.title}
              </h3>

              {/* Controls */}
              <div className="absolute top-4 right-3 flex flex-col gap-2">
                <button 
                  onClick={() => toggleComplete(event.id)}
                  className={`p-1.5 rounded hover:bg-black/20 ${event.completed ? 'text-green-500' : 'text-slate-400 hover:text-green-400'}`}
                  title={event.completed ? "Mark Incomplete" : "Mark Complete"}
                >
                  {event.completed ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                </button>
                
                {audioEnabled && !event.completed && (
                  <button 
                    onClick={() => handleSpeak(event)}
                    className="p-1.5 rounded hover:bg-black/20 text-slate-400 hover:text-blue-400"
                    title="Read Event"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                )}
                
                <button 
                  onClick={() => handleDelete(event.id)}
                  className="p-1.5 rounded hover:bg-black/20 text-slate-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Delete Event"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {events.length === 0 && (
          <div className="ml-8 p-8 border border-dashed border-slate-700 rounded-lg text-center text-slate-500">
            <p>No events scheduled. Add a task or court date to begin.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Timeline;