import React, { useState } from 'react';
import ProductForm from './components/ProductForm';
import ProductTable from './components/ProductTable';
import ProductGrid from './components/ProductGrid';
import useDebounce from './hooks/useDebounce';

export default function App() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewMode, setViewMode] = useState('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const debouncedSearch = useDebounce(searchTerm, 500);
  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(debouncedSearch.toLowerCase()));

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleDelete = (id) => {
    if (window.confirm("Delete this item?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleAddOrUpdate = (p) => {
    if (editingProduct) {
      setProducts(products.map(old => old.id === p.id ? p : old));
    } else {
      setProducts([...products, p]);
    }
  };

  return (
    <div className="min-h-screen bg-surface-50 p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-black text-brand-dark uppercase tracking-tighter">Pro-Track</h1>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Inventory Dashboard</p>
        </header>

        <ProductForm 
          onSubmit={handleAddOrUpdate} 
          editingProduct={editingProduct} 
          setEditingProduct={setEditingProduct} 
        />

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row justify-between mb-8 gap-4 items-center">
          <input 
            type="text" 
            placeholder="Search products..." 
            className="border border-surface-200 p-3 rounded-xl w-full md:w-80 bg-white focus:ring-2 focus:ring-brand-light outline-none shadow-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex bg-surface-200 p-1.5 rounded-xl">
            <button onClick={() => setViewMode('table')} className={`px-6 py-2 rounded-lg text-sm font-bold ${viewMode === 'table' ? 'bg-white text-brand shadow-md' : 'text-slate-500'}`}>Table</button>
            <button onClick={() => setViewMode('grid')} className={`px-6 py-2 rounded-lg text-sm font-bold ${viewMode === 'grid' ? 'bg-white text-brand shadow-md' : 'text-slate-500'}`}>Grid</button>
          </div>
        </div>

        {/* Conditional Component Rendering */}
        {viewMode === 'table' ? (
          <ProductTable items={currentItems} onEdit={setEditingProduct} onDelete={handleDelete} />
        ) : (
          <ProductGrid items={currentItems} onEdit={setEditingProduct} onDelete={handleDelete} />
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-12 gap-3">
          {Array.from({ length: totalPages }, (_, i) => (
            <button 
              key={i+1} 
              onClick={() => setCurrentPage(i+1)}
              className={`w-12 h-12 rounded-2xl font-black text-sm border-2 ${currentPage === i+1 ? 'bg-brand text-white border-brand shadow-lg' : 'bg-white text-slate-300 border-surface-100'}`}
            >
              {i+1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}