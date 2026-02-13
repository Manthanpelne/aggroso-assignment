import { Clock, Trash2 } from "lucide-react";

export const TaskCard = ({ item, onUpdate, onDelete }) => {
  
  const toggleStatus = () => {
    const newStatus = item.status === 'done' ? 'open' : 'done';
    onUpdate(item.id, { status: newStatus });
  };

  return (
    <div className={`group flex items-center justify-between p-4 rounded-lg border transition-all 
      ${item.status === 'done' ? 'bg-slate-50 border-slate-100' : 'bg-white border-slate-200 hover:border-blue-300 shadow-sm'}`}>
      
      <div className="flex items-start gap-3">
        <input 
          type="checkbox" 
          checked={item.status === 'done'}
          onChange={toggleStatus} 
          className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
        />
        <div>
          <p className={`text-sm font-medium ${item.status === 'done' ? 'line-through text-slate-400' : 'text-slate-800'}`}>
            {item.task}
          </p>
          <div className="flex gap-3 mt-1 text-[10px] uppercase font-bold tracking-wider text-slate-400">
            <span>Owner: {item.owner}</span>
          </div>
        </div>
      </div>

      <button 
        onClick={() => onDelete(item.id)}
        className="text-slate-300 hover:text-red-500 transition-colors px-2"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};