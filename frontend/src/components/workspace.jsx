import React, { useState } from 'react';
import { CheckCircle, Trash2, Clock, Plus, History } from 'lucide-react';
import { TaskCard } from './taskCard';

export const Workspace = () => {
  const [transcript, setTranscript] = useState("");
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('all');
  

  // mock
  const handleProcess = () => {
    const lines = transcript.split('\n').filter(l => l.trim() !== "");
    const newTasks = lines.map((line, index) => ({
      id: Date.now() + index,
      task: line.replace(/^- /, ""),
      owner: "Unassigned",
      status: 'open',
      priority: 'Medium'
    }));
    setItems([...items, ...newTasks]);
  };

  const handleUpdateTask = (id, updates) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, ...updates } : item
      )
    );
  };

  const handleDeleteTask = (id) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      {/* Sidebar - Last 5 History */}
      <aside className="w-64 bg-slate-900 text-white p-6 hidden md:block">
        <div className="flex items-center gap-2 mb-8">
          <History className="w-5 h-5 text-blue-400" />
          <h2 className="font-bold text-lg">History</h2>
        </div>
        <ul className="space-y-4 text-sm text-slate-400">
          <li className="hover:text-white cursor-pointer truncate">Project Sync - Feb 10</li>
          <li className="hover:text-white cursor-pointer truncate">Product Roadmap Review</li>
          <li className="hover:text-white cursor-pointer truncate">Weekly Standup</li>
        </ul>
      </aside>

      {/* Main Workspace */}
      <main className="flex-1 overflow-y-auto p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight">Meeting Workspace</h1>
          <p className="text-slate-500">Paste your transcript to generate actionable tasks.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <section className="space-y-4">
            <textarea
              className="w-full h-64 p-4 rounded-xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              placeholder="Paste transcript here... e.g. Sarah to finish the UI by Friday."
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
            />
            <button 
              onClick={handleProcess}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all shadow-lg shadow-blue-200"
            >
              Generate Action Items
            </button>
          </section>

          {/* Action Items List */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg">Action Items</h3>
              <div className="flex gap-2">
                {['all', 'open', 'done'].map((f) => (
                  <button 
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1 rounded-full text-xs capitalize ${filter === f ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {items
              .filter(i => filter === 'all' || i.status === filter)
                .map(item => (
                <TaskCard 
                key={item.id} 
                item={item} 
                onUpdate={handleUpdateTask} 
                onDelete={handleDeleteTask}
              />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};