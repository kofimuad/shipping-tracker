import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { authAPI } from '../utils/api';

function RegisterPage({ onLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'customer'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.register(formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      onLogin(response.data.user);
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Hero */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 flex-col justify-center px-8 text-white">
        <h2 className="text-4xl font-bold mb-4">Join Ghana Logistics</h2>
        <p className="text-xl text-blue-100 mb-8">
          Your Gateway to Seamless Global Logistics. Start shipping across borders with the ease and reliability your business deserves.
        </p>
        <div className="space-y-3">
          <p className="text-blue-100 flex items-center gap-2">✓ Real-time GPS Tracking</p>
          <p className="text-blue-100 flex items-center gap-2">✓ Customs Clearance Support</p>
          <p className="text-blue-100 flex items-center gap-2">✓ Competitive Freight Rates</p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-white overflow-y-auto">
        <div className="max-w-md w-full">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">⬥</span>
            </div>
            <span className="font-bold text-lg text-gray-900">Ghana Logistics</span>
          </Link>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h1>
          <p className="text-gray-600 mb-8">Fill in your details to get started with Ghana Logistics.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label-base">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="input-base"
                required
              />
            </div>

            <div>
              <label className="label-base">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="input-base"
                required
              />
            </div>

            <div>
              <label className="label-base">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="20 123 4567"
                className="input-base"
              />
            </div>

            <div>
              <label className="label-base">Account Type</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="input-base"
              >
                <option value="customer">Individual</option>
                <option value="corporate">Corporate</option>
              </select>
            </div>

            <div>
              <label className="label-base">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="input-base"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <p className="text-gray-500 text-xs mt-1">Must be at least 8 characters with a symbol.</p>
            </div>

            {error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded">{error}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 mt-6"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="mt-4 text-center text-gray-600 text-sm">
            By signing up, you agree to Ghana Logistics{' '}
            <Link to="/" className="text-blue-600 hover:underline">Terms of Service</Link> and{' '}
            <Link to="/" className="text-blue-600 hover:underline">Privacy Policy</Link>
          </p>

          <p className="mt-4 text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 font-semibold hover:text-blue-800">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;