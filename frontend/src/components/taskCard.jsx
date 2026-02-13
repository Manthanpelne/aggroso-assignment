import React, { useState } from 'react';
import { CheckCircle, Trash2, Clock, Edit2, Save, X, User } from 'lucide-react';

export const TaskCard = ({ item, onUpdate, onDelete }) => {

    const priorityColors = {
  High: 'bg-red-500',
  Medium: 'bg-amber-500',
  Low: 'bg-emerald-500'
};


  return (
    <div className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg hover:border-slate-300 transition-all group">
      {/* Checkbox */}
      <input 
        type="checkbox" 
        checked={item.status === 'done'}
        onChange={() => onUpdate(item._id, { status: item.status === 'done' ? 'open' : 'done' })}
        className="h-5 w-5 rounded border-slate-300 text-blue-600 cursor-pointer flex-shrink-0"
      />

      {/* Editable Content Area */}
      <div className="flex flex-1 gap-2 flex-wrap items-center">
        
        {/* Task Input with "Edit" Indicator */}
        <div className="relative flex-1 min-w-[200px]">
          <input
            className={`w-full px-2 py-1 rounded outline-none text-sm transition-colors
              ${item.status === 'done' ? 'line-through text-slate-400' : 'text-slate-800'}
              bg-slate-50 hover:bg-slate-100 focus:bg-white focus:ring-1 focus:ring-blue-200 border border-transparent focus:border-blue-400`}
            value={item.task}
            onChange={(e) => onUpdate(item._id, { task: e.target.value })}
            placeholder="What needs to be done?"
          />
        </div>
        
        {/* Owner Input with User Icon cue */}
        <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-md border border-transparent hover:border-slate-200">
          <span className="text-slate-400"><User size={12} /></span>
          <input
            className="w-20 outline-none text-[11px] font-bold uppercase text-blue-600 bg-transparent"
            value={item.owner}
            placeholder="OWNER"
            onChange={(e) => onUpdate(item._id, { owner: e.target.value })}
          />
        </div>

        {/* Date Input */}
        <input
          type="date"
          className="text-[11px] text-slate-500 outline-none bg-transparent hover:text-blue-600 cursor-pointer"
          value={item.dueDate || ""}
          onChange={(e) => onUpdate(item._id, { dueDate: e.target.value })}
        />
      </div>

      {/* Delete Button - Only visible on row hover */}
      <button 
        onClick={() => onDelete(item._id)}
        className="text-slate-300 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100 p-1"
        title="Delete task"
      >
        <Trash2 size={16} />
      </button>

      <div className="flex items-center gap-2">
  <div className={`w-2 h-2 rounded-full ${priorityColors[item.priority] || 'bg-slate-300'}`} />
  <select 
    value={item.priority}
    onChange={(e) => onUpdate(item._id, { priority: e.target.value })}
    className="text-[10px] font-bold uppercase bg-transparent outline-none cursor-pointer"
  >
    <option value="High">High</option>
    <option value="Medium">Medium</option>
    <option value="Low">Low</option>
  </select>
</div>
    </div>
    
  );
};