import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react'; // Import icons

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false); // Toggle state
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.msg || 'Invalid Credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-surface p-10 rounded-2xl shadow-xl border border-gray-100">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Welcome Back</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full p-3 bg-background border rounded-xl focus:ring-2 focus:ring-success outline-none" 
          onChange={(e) => setFormData({...formData, email: e.target.value})} 
          required 
        />
        
        {/* Password Container */}
        <div className="relative">
          <input 
            type={showPassword ? "text" : "password"} // Dynamic type
            placeholder="Password" 
            className="w-full p-3 bg-background border rounded-xl focus:ring-2 focus:ring-success outline-none" 
            onChange={(e) => setFormData({...formData, password: e.target.value})} 
            required 
          />
          {/* Toggle Button */}
          <button 
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-400 hover:text-success"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button 
          disabled={loading}
          className={`w-full bg-success text-white py-3 rounded-xl font-bold hover:opacity-90 transition-all ${loading ? 'opacity-50' : ''}`}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};

export default Login;