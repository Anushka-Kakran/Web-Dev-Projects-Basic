import React, { useState, useEffect } from 'react';

export default function ProductForm({ onSubmit, editingProduct, setEditingProduct }) {
  const [formData, setFormData] = useState({
    name: '', price: '', category: '', stock: '', description: ''
  });

  // Sync form with editing product
  useEffect(() => {
    if (editingProduct) setFormData(editingProduct);
  }, [editingProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic Validation
    if (!formData.name || !formData.price || !formData.category) {
      alert("Please fill required fields (Name, Price, Category)");
      return;
    }

    // Submit data
    onSubmit({ ...formData, id: editingProduct?.id || Date.now() });

    // RESET BLANKS: This clears the form fields after clicking Save
    setFormData({ name: '', price: '', category: '', stock: '', description: '' });
    
    // Clear editing state if applicable
    if (editingProduct) setEditingProduct(null);
  };

  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold text-brand-dark mb-4">
        {editingProduct ? 'Edit Product' : 'Add New Product'}
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input 
          className="border border-surface-200 p-3 rounded shadow-sm focus:outline-none focus:border-brand-light" 
          placeholder="Name of Product" 
          value={formData.name} 
          onChange={e => setFormData({...formData, name: e.target.value})} 
        />
        <input 
          type="number"
          className="border border-surface-200 p-3 rounded shadow-sm focus:outline-none focus:border-brand-light" 
          placeholder="Price" 
          value={formData.price} 
          onChange={e => setFormData({...formData, price: e.target.value})} 
        />
        <input 
          className="border border-surface-200 p-3 rounded shadow-sm focus:outline-none focus:border-brand-light" 
          placeholder="Category" 
          value={formData.category} 
          onChange={e => setFormData({...formData, category: e.target.value})} 
        />
        <input 
          type="number"
          className="border border-surface-200 p-3 rounded shadow-sm focus:outline-none focus:border-brand-light" 
          placeholder="Stock" 
          value={formData.stock} 
          onChange={e => setFormData({...formData, stock: e.target.value})} 
        />
        <textarea 
          className="border border-surface-200 p-3 rounded shadow-sm focus:outline-none focus:border-brand-light col-span-full" 
          placeholder="Description" 
          rows="2"
          value={formData.description} 
          onChange={e => setFormData({...formData, description: e.target.value})} 
        />
        <button type="submit" className="bg-brand text-white font-bold py-3 px-6 rounded hover:bg-brand-dark transition-colors w-max">
          {editingProduct ? 'Update Product' : 'Save Product'}
        </button>
      </form>
    </div>
  );
}