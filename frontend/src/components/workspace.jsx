import React, { useState } from 'react';
import { CheckCircle, Trash2, Clock, Plus, History } from 'lucide-react';
import { TaskCard } from './taskCard';

export const Workspace = () => {
  const [transcript, setTranscript] = useState("");
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('all');

const [currentMeetingId, setCurrentMeetingId] = useState(null);
const [history, setHistory] = useState([])
  
  // Manual Add
  const handleAddItem = () => {
    const newItem = {
      id: Date.now(),
      task: "New Task",
      owner: "Assignee",
      dueDate: "",
      addedDate: new Date().toLocaleDateString(),
      status: 'open'
    };
    setItems([newItem, ...items]);
  };

  // Process Transcript
const handleProcess = async () => {
  const lines = transcript.split('\n').filter(l => l.trim() !== "");
  

  const actionItems = lines.map(line => ({
    task: line,
    owner: "Unassigned",
    dueDate: "",
    status: 'open',
    priority: 'Medium'
  }));

  // Save to DB immediately
  const res = await fetch('http://localhost:5000/api/meetings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: "New Sync",
      rawTranscript: transcript,
      actionItems
    })
  });
  
  const savedMeeting = await res.json();
  setItems(savedMeeting.actionItems);
  setCurrentMeetingId(savedMeeting._id);
};



const handleUpdateTask = async (taskId, updates) => {
  const updatedItems = items.map(item => 
    (item._id === taskId || item.id === taskId) ? { ...item, ...updates } : item
  );
  setItems(updatedItems);

  if (currentMeetingId) {
    try {
      await fetch(`http://localhost:5000/api/meetings/${currentMeetingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ actionItems: updatedItems })
      });
    } catch (error) {
      console.error("Failed to sync with DB:", error);
    }
  }
};

const handleDeleteTask = async (taskId) => {
  // 1. Remove from local state
  const filteredItems = items.filter(item => (item._id !== taskId && item.id !== taskId));
  setItems(filteredItems);

  // 2. Sync the filtered list to the DB
  if (currentMeetingId) {
    await fetch(`http://localhost:5000/api/meetings/${currentMeetingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ actionItems: filteredItems })
    });
  }
};

  
console.log(items)
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left: Input */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">1. Paste Transcript</h2>
          <textarea 
            className="w-full h-48 p-4 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none shadow-inner"
            placeholder="e.g. John to update the login page by Friday"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
          />
          <button onClick={handleProcess} className="w-full py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 font-medium transition-colors">
            Extract Tasks
          </button>
        </div>

        {/* Right: List */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">2. Action Items</h2>
            <button onClick={handleAddItem} className="text-sm flex items-center gap-1 text-blue-600 hover:underline">
              <Plus size={16} /> Add Manually
            </button>
          </div>

          <div className="flex gap-2 mb-4">
            {['all', 'open', 'done'].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded text-xs border ${filter === f ? 'bg-slate-200 border-slate-300 font-bold' : 'bg-white border-slate-100 text-slate-500'}`}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            {items
              .filter(i => filter === 'all' || i.status === filter)
              .map(item => (
                <TaskCard 
                  key={item._id} 
                  item={item} 
                  onUpdate={handleUpdateTask} 
                  onDelete={handleDeleteTask} 
                />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};