import React from 'react';

export default function ProductTable({ items, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded border border-surface-200 overflow-hidden shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead className="bg-surface-50">
          <tr className="text-brand-dark font-bold border-b border-surface-200">
            <th className="p-4 w-1/4">Name</th>
            <th className="p-4 w-1/4">Price</th>
            <th className="p-4 w-1/4">Stock</th>
            <th className="p-4 w-1/4">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-100">
          {items.map(p => (
            <tr key={p.id} className="hover:bg-gray-50 transition-colors">
              <td className="p-4 text-slate-800 font-medium">{p.name}</td>
              <td className="p-4 text-brand-light font-bold">${p.price}</td>
              <td className="p-4 text-slate-600">{p.stock || '0'}</td>
              <td className="p-4 flex gap-4">
                <button onClick={() => onEdit(p)} className="text-brand font-bold underline hover:text-brand-dark">Edit</button>
                <button onClick={() => onDelete(p.id)} className="text-red-500 font-bold hover:underline">Remove</button>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan="4" className="p-10 text-center text-slate-400">No products available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}