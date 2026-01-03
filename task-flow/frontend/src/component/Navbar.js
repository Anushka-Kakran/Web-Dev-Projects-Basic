import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-surface shadow-sm border-b p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-primary">TaskFlow</Link>
      <div className="flex items-center gap-4">
        {token ? (
          <button 
            onClick={handleLogout} 
            className="bg-danger text-white px-5 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="text-gray-600 hover:text-primary">Login</Link>
            <Link to="/register" className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary-dark transition-all">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;