import React from 'react';

export default function ProductGrid({ items, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map(p => (
        <div key={p.id} className="bg-white p-6 rounded-2xl border border-surface-200 shadow-sm hover:shadow-lg transition-all relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-brand group-hover:bg-brand-light"></div>
          <div className="flex justify-between items-start mb-4 pl-2">
            <div>
              <h3 className="font-black text-xl text-brand-dark tracking-tight">{p.name}</h3>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">{p.category}</p>
            </div>
            <span className="text-2xl font-black text-brand-light">${p.price}</span>
          </div>
          <p className="text-sm text-slate-500 mb-6 pl-2 h-10 overflow-hidden line-clamp-2">{p.description || 'No description provided.'}</p>
          <div className="flex border-t border-surface-100 pt-4 gap-2">
            <button onClick={() => onEdit(p)} className="flex-[2] bg-brand text-white font-bold py-2 rounded-xl text-sm hover:bg-brand-dark transition-all">Edit</button>
            <button onClick={() => onDelete(p.id)} className="flex-1 border border-surface-200 text-slate-400 font-bold py-2 rounded-xl text-sm hover:bg-red-50 hover:text-red-600">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}