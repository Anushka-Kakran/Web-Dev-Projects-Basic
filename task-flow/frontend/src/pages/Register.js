import React, { useState } from 'react';
import API from '../api';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';


const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/auth/register', formData);
      alert(res.data.msg || "Registration successful!");
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.msg || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-surface p-10 rounded-2xl shadow-xl border border-gray-100">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Create Account</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input 
          type="text" 
          placeholder="Full Name" 
          className="w-full p-3 bg-background border rounded-xl focus:ring-2 focus:ring-success outline-none" 
          onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
          required 
        />
        <input 
          type="email" 
          placeholder="Email Address" 
          className="w-full p-3 bg-background border rounded-xl focus:ring-2 focus:ring-success outline-none" 
          onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
          required 
        />
        
        {/* Password Container */}
        <div className="relative">
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="Password" 
            className="w-full p-3 bg-background border rounded-xl focus:ring-2 focus:ring-success outline-none" 
            onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
            required 
          />
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
          className={`w-full bg-success text-white py-3 rounded-xl font-bold transition-all ${loading ? 'opacity-50' : ''}`}
        >
          {loading ? 'Creating...' : 'Sign Up'}
        </button>
      </form>
      <div className="mt-6 text-center text-gray-600 text-sm">
        Already have an account? <Link to="/login" className="text-success font-bold">Sign In</Link>
      </div>
    </div>
  );
};

export default Register;