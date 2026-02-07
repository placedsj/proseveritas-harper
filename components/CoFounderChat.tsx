import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { getCoFounderResponse } from '../services/geminiService';
import { getAppContext } from '../services/contextService';
import { MessageSquare, Send, Cpu } from 'lucide-react';

const CoFounderChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      id: '0', 
      sender: 'cofounder', 
      mode: 'MOTION',
      content: 'I am online. We have a lot to build today. What is the priority?', 
      timestamp: Date.now() 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      content: input,
      timestamp: Date.now()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const appContext = getAppContext();
    const chatHistory = `Latest user messages: ${messages.slice(-3).map(m => m.content).join(' | ')}`;
    const fullContext = `${appContext}\n\nCHAT HISTORY:\n${chatHistory}`;

    const responseText = await getCoFounderResponse(userMsg.content, fullContext);

    // Extract mode from response if present (e.g., "MOTION: ...")
    const modeRegex = /^(MOTION|COUNSEL|CALM|FIRE|ORGANIZE|AUTOMATE|CHECK):/;
    const match = responseText.match(modeRegex);
    const mode = match ? match[1] as any : undefined;
    const cleanContent = match ? responseText.replace(modeRegex, '').trim() : responseText;

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      sender: 'cofounder',
      mode,
      content: cleanContent,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, aiMsg]);
    setLoading(false);
  };

  const getModeColor = (mode?: string) => {
    switch(mode) {
      case 'MOTION': return 'text-green-400 border-green-500/30 bg-green-950/30';
      case 'FIRE': return 'text-orange-500 border-orange-500/30 bg-orange-950/30';
      case 'CALM': return 'text-blue-400 border-blue-500/30 bg-blue-950/30';
      case 'COUNSEL': return 'text-purple-400 border-purple-500/30 bg-purple-950/30';
      default: return 'text-slate-400 border-slate-500/30 bg-slate-800';
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
      <div className="bg-slate-800 p-4 border-b border-slate-700 flex items-center gap-3">
        <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center">
          <Cpu className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-white">Co-Founder</h3>
          <p className="text-xs text-orange-400">Always Online</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-lg p-4 ${
              msg.sender === 'user' 
                ? 'bg-blue-600 text-white' 
                : 'bg-slate-800 border border-slate-700'
            }`}>
              {msg.mode && (
                <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border mb-2 inline-block ${getModeColor(msg.mode)}`}>
                  {msg.mode}
                </span>
              )}
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 p-4 rounded-lg flex gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce delay-75" />
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce delay-150" />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-slate-800 border-t border-slate-700 flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && sendMessage()}
          placeholder="Ask for direction, copy review, or next moves..."
          className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-orange-500 focus:outline-none"
        />
        <button 
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          className="bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-lg transition-colors disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CoFounderChat;