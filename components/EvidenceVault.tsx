
import React, { useState, useEffect } from 'react';
import { EvidenceItem } from '../types';
import { FileText, CheckCircle, Printer, Download, Plus, X, Send, Clock, Edit2, Upload, Calendar, Trash2, Archive, CheckSquare, Square, MoreHorizontal } from 'lucide-react';

const initialEvidence: EvidenceItem[] = [
  { id: '1', title: 'Square Invoice 13995', description: '$6,300 total, $4,000 paid Sept 7, 2021. Proves contract.', category: 'criminal', status: 'ready', dateReceived: '2021-09-07' },
  { id: '2', title: 'Facebook Messages (July-Sept 2021)', description: 'Ongoing project comms. Shows no criminal intent.', category: 'criminal', status: 'ready' },
  { id: '3', title: 'RCMP Occurrence Notes', description: 'Initial assessment as "Civil Dispute".', category: 'criminal', status: 'needs_printing' },
  { id: '4', title: 'Pre-Sentence Report (Dec 16)', description: 'Probation approves stability. "Good" rating.', category: 'custody', status: 'ready', dateReceived: '2024-12-16' },
  { id: '5', title: 'Psych Evaluation', description: 'Documents mental state during trial (Oct 2025).', category: 'fitness', status: 'needs_printing' },
  { id: '6', title: 'MRI Results (Jan 25)', description: 'TBI assessment results.', category: 'fitness', status: 'ready', dateReceived: '2025-01-25' },
  { id: '7', title: 'Emma Assault Charge (Dec 2025)', description: 'Saint John Police charge re: Dec 9 incident.', category: 'custody', status: 'needs_requesting' },
  { id: '8', title: 'Bank Audit Scotiabank (2017)', description: 'Needs disclosure request filed by lawyer.', category: 'financial', status: 'needs_requesting' },
];

const EvidenceVault: React.FC = () => {
  const [items, setItems] = useState<EvidenceItem[]>(() => {
    const saved = localStorage.getItem('evidenceItems');
    return saved ? JSON.parse(saved) : initialEvidence;
  });

  const [isAdding, setIsAdding] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [newItem, setNewItem] = useState<{
    title: string;
    description: string;
    category: EvidenceItem['category'];
    status: EvidenceItem['status'];
  }>({
    title: '',
    description: '',
    category: 'criminal',
    status: 'ready'
  });

  useEffect(() => {
    localStorage.setItem('evidenceItems', JSON.stringify(items));
  }, [items]);

  // --- SELECTION LOGIC ---

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === items.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(items.map(i => i.id));
    }
  };

  // --- BULK ACTIONS ---

  const bulkDelete = () => {
    if (confirm(`Are you sure you want to delete ${selectedIds.length} items?`)) {
      setItems(items.filter(i => !selectedIds.includes(i.id)));
      setSelectedIds([]);
    }
  };

  const bulkDownload = () => {
    alert(`Simulating ZIP generation for ${selectedIds.length} files...\n\nIn a real app, this would bundle the attachments into a 'Evidence_Export_Jan25.zip'.`);
    setSelectedIds([]);
  };

  const bulkUpdateStatus = (newStatus: EvidenceItem['status']) => {
    const today = new Date().toLocaleDateString();
    setItems(items.map(i => {
      if (selectedIds.includes(i.id)) {
        const updates: Partial<EvidenceItem> = { status: newStatus };
        if (newStatus === 'requested') updates.dateRequested = today;
        if (newStatus === 'ready' && i.status !== 'ready') updates.dateReceived = today;
        return { ...i, ...updates };
      }
      return i;
    }));
    setSelectedIds([]);
  };

  // --- INDIVIDUAL ACTIONS ---

  const handleAddItem = () => {
    if (!newItem.title || !newItem.description) return;
    
    // Append filename to description if a file was selected
    const finalDescription = file 
      ? `${newItem.description} [Attached: ${file.name}]` 
      : newItem.description;

    const item: EvidenceItem = {
      id: Date.now().toString(),
      title: newItem.title,
      description: finalDescription,
      category: newItem.category,
      status: newItem.status,
      dateReceived: newItem.status === 'ready' ? new Date().toLocaleDateString() : undefined
    };
    
    setItems([item, ...items]);
    setIsAdding(false);
    setFile(null);
    setNewItem({
      title: '',
      description: '',
      category: 'criminal',
      status: 'ready'
    });
  };

  const updateStatus = (id: string, newStatus: EvidenceItem['status']) => {
    setItems(items.map(i => {
      if (i.id === id) {
        const updates: Partial<EvidenceItem> = { status: newStatus };
        const today = new Date().toLocaleDateString();
        
        if (newStatus === 'requested') {
          updates.dateRequested = today;
        }
        if (newStatus === 'ready' && i.status !== 'ready') {
          updates.dateReceived = today;
        }
        return { ...i, ...updates };
      }
      return i;
    }));
  };

  // --- RENDER HELPERS ---

  const getStatusIcon = (status: EvidenceItem['status']) => {
    switch(status) {
      case 'ready': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'needs_printing': return <Printer className="w-5 h-5 text-amber-500" />;
      case 'needs_requesting': return <Download className="w-5 h-5 text-red-500" />;
      case 'requested': return <Clock className="w-5 h-5 text-blue-500" />;
    }
  };

  const getCategoryColor = (cat: EvidenceItem['category']) => {
    switch(cat) {
      case 'criminal': return 'border-red-500/50';
      case 'custody': return 'border-blue-500/50';
      case 'fitness': return 'border-emerald-500/50';
      case 'financial': return 'border-amber-500/50';
    }
  };

  const categories: EvidenceItem['category'][] = ['criminal', 'custody', 'fitness', 'financial'];
  const statuses: EvidenceItem['status'][] = ['ready', 'needs_printing', 'needs_requesting', 'requested'];

  return (
    <div className="relative pb-24">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-slate-300" />
            Evidence Vault
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {items.length} items logged. {items.filter(i => i.status === 'ready').length} ready for court.
          </p>
        </div>
        
        <div className="flex gap-2">
          {items.length > 0 && (
            <button 
              onClick={toggleSelectAll}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-2 rounded flex items-center gap-2 text-sm border border-slate-700 transition-colors"
            >
              {selectedIds.length === items.length ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
              {selectedIds.length === items.length ? "Deselect All" : "Select All"}
            </button>
          )}
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2 text-sm font-semibold transition-colors"
          >
            {isAdding ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {isAdding ? "Cancel" : "Add Item"}
          </button>
        </div>
      </div>

      {isAdding && (
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 mb-6 animate-fade-in">
          <h3 className="text-lg font-semibold text-white mb-4">Upload New Evidence Item</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-slate-400 text-sm mb-1">Document Title</label>
              <input 
                type="text" 
                value={newItem.title}
                onChange={e => setNewItem({...newItem, title: e.target.value})}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-blue-500 focus:outline-none"
                placeholder="e.g., Character Reference - John Doe"
              />
            </div>
            <div>
              <label className="block text-slate-400 text-sm mb-1">Description / Notes</label>
              <input 
                type="text" 
                value={newItem.description}
                onChange={e => setNewItem({...newItem, description: e.target.value})}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-blue-500 focus:outline-none"
                placeholder="Details about what this proves..."
              />
            </div>
            
            <div>
              <label className="block text-slate-400 text-sm mb-1">Attach File (Optional)</label>
              <div className="relative">
                <input 
                  type="file" 
                  onChange={e => setFile(e.target.files?.[0] || null)}
                  className="hidden"
                  id="file-upload"
                />
                <label 
                  htmlFor="file-upload" 
                  className="w-full bg-slate-900 border border-slate-700 border-dashed rounded p-3 flex items-center justify-center gap-2 text-slate-400 cursor-pointer hover:border-blue-500 hover:text-blue-400 transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  {file ? file.name : "Click to select a file"}
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 text-sm mb-1">Category</label>
                <select 
                  value={newItem.category}
                  onChange={e => setNewItem({...newItem, category: e.target.value as any})}
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-blue-500 focus:outline-none"
                >
                  {categories.map(c => <option key={c} value={c}>{c.toUpperCase()}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-slate-400 text-sm mb-1">Current Status</label>
                <select 
                  value={newItem.status}
                  onChange={e => setNewItem({...newItem, status: e.target.value as any})}
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-blue-500 focus:outline-none"
                >
                  {statuses.map(s => <option key={s} value={s}>{s.replace('_', ' ').toUpperCase()}</option>)}
                </select>
              </div>
            </div>
            <button 
              onClick={handleAddItem}
              disabled={!newItem.title || !newItem.description}
              className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2 rounded font-semibold transition-colors mt-2"
            >
              Save to Vault
            </button>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map(item => {
          const isSelected = selectedIds.includes(item.id);
          return (
            <div 
              key={item.id} 
              className={`p-4 rounded-lg border-l-4 relative group flex flex-col h-full transition-all duration-200 ${
                isSelected 
                  ? 'bg-blue-900/20 border-blue-500 border-y border-r' 
                  : `bg-slate-800 border-y border-r border-slate-700/50 ${getCategoryColor(item.category)}`
              }`}
            >
              <div className="flex justify-between items-start mb-2 pl-8">
                {/* Checkbox */}
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleSelect(item.id); }}
                  className="absolute left-3 top-3.5 text-slate-400 hover:text-white transition-colors"
                >
                  {isSelected 
                    ? <CheckSquare className="w-5 h-5 text-blue-400" /> 
                    : <Square className="w-5 h-5" />}
                </button>

                <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">{item.category}</span>
                <div className="flex items-center gap-1 bg-slate-900 px-2 py-1 rounded text-xs">
                  {getStatusIcon(item.status)}
                  <span className={`capitalize ${item.status === 'requested' ? 'text-blue-400' : 'text-slate-300'}`}>
                    {item.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
              
              <h3 className={`text-lg font-medium mb-1 pr-6 pl-8 ${isSelected ? 'text-blue-100' : 'text-white'}`}>{item.title}</h3>
              <p className="text-slate-400 text-sm mb-3 flex-grow pl-8">{item.description}</p>
              
              {/* Dates */}
              {(item.dateRequested || item.dateReceived) && (
                <div className="flex gap-4 mb-3 text-xs text-slate-500 border-t border-slate-700/50 pt-2 ml-8">
                  {item.dateRequested && (
                    <span className="flex items-center gap-1">
                      <Send className="w-3 h-3" /> Req: {item.dateRequested}
                    </span>
                  )}
                  {item.dateReceived && (
                    <span className="flex items-center gap-1 text-green-500/70">
                      <Calendar className="w-3 h-3" /> Rec: {item.dateReceived}
                    </span>
                  )}
                </div>
              )}

              {/* Actions Area */}
              <div className="pt-3 border-t border-slate-700 flex flex-wrap gap-2 mt-auto ml-8">
                {item.status === 'needs_requesting' && (
                  <button 
                    onClick={() => updateStatus(item.id, 'requested')}
                    className="flex-1 bg-blue-900/50 hover:bg-blue-800 text-blue-200 text-xs py-1.5 px-3 rounded border border-blue-800 flex items-center justify-center gap-2 transition-colors"
                  >
                    <Send className="w-3 h-3" />
                    Request Now
                  </button>
                )}
                {item.status === 'requested' && (
                  <button 
                    onClick={() => updateStatus(item.id, 'ready')}
                    className="flex-1 bg-green-900/50 hover:bg-green-800 text-green-200 text-xs py-1.5 px-3 rounded border border-green-800 flex items-center justify-center gap-2 transition-colors"
                  >
                    <CheckCircle className="w-3 h-3" />
                    Mark Received
                  </button>
                )}
                {item.status === 'needs_printing' && (
                  <button 
                    onClick={() => updateStatus(item.id, 'ready')}
                    className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs py-1.5 px-3 rounded border border-slate-600 flex items-center justify-center gap-2 transition-colors"
                  >
                    <Printer className="w-3 h-3" />
                    Mark Printed
                  </button>
                )}
                
                <div className="relative group/edit">
                  <select 
                    value={item.status}
                    onChange={(e) => updateStatus(item.id, e.target.value as any)}
                    className="bg-slate-900 text-xs text-slate-400 border border-slate-700 rounded py-1 pl-2 pr-6 appearance-none hover:border-slate-500 cursor-pointer focus:outline-none"
                  >
                    {statuses.map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                  </select>
                  <div className="absolute right-2 top-1.5 pointer-events-none">
                    <Edit2 className="w-3 h-3 text-slate-500" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* FIXED BULK ACTION BAR */}
      {selectedIds.length > 0 && (
        <div className="fixed bottom-4 left-4 right-4 md:left-28 md:right-8 bg-slate-900 border border-slate-600 rounded-xl shadow-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 z-50 animate-fade-in">
          <div className="flex items-center gap-3">
             <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                {selectedIds.length}
             </div>
             <span className="text-white font-semibold text-sm">Items Selected</span>
          </div>

          <div className="flex flex-wrap gap-2 items-center justify-center">
            <div className="flex items-center bg-slate-800 rounded px-2 border border-slate-700">
               <span className="text-xs text-slate-400 mr-2 uppercase font-bold">Set Status:</span>
               <select 
                 className="bg-transparent text-white text-sm py-1.5 focus:outline-none"
                 onChange={(e) => bulkUpdateStatus(e.target.value as any)}
                 defaultValue=""
               >
                 <option value="" disabled>Choose...</option>
                 <option value="ready">Ready</option>
                 <option value="needs_printing">Needs Printing</option>
                 <option value="needs_requesting">Needs Requesting</option>
                 <option value="requested">Requested</option>
               </select>
            </div>

            <button 
              onClick={bulkDownload}
              className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded flex items-center gap-2 text-sm font-bold transition-colors"
            >
              <Archive className="w-4 h-4" /> Zip Download
            </button>
            
            <button 
              onClick={bulkDelete}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center gap-2 text-sm font-bold transition-colors"
            >
              <Trash2 className="w-4 h-4" /> Delete
            </button>
            
             <button 
              onClick={() => setSelectedIds([])}
              className="text-slate-400 hover:text-white px-3 py-2 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EvidenceVault;
