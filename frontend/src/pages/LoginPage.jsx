import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { authAPI } from '../utils/api';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.login(email, password);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      onLogin(response.data.user);
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-cover bg-center" style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1589939705066-5470d1dae3a0?w=800)',
        backgroundSize: 'cover'
      }}>
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center px-8">
          <h2 className="text-4xl font-bold text-white mb-4">Welcome back to Ghana Logistics</h2>
          <p className="text-xl text-gray-200">
            Moving the heart of African commerce. Professional shipping and logistics solutions across Ghana and beyond.
          </p>
          <div className="mt-8 space-y-3">
            <p className="text-white flex items-center gap-2">✓ Real-time GPS Tracking</p>
            <p className="text-white flex items-center gap-2">✓ Customs Clearance Support</p>
            <p className="text-white flex items-center gap-2">✓ Competitive Freight Rates</p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-white">
        <div className="max-w-md w-full">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">⬥</span>
            </div>
            <span className="font-bold text-lg text-gray-900">Ghana Logistics</span>
          </Link>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">Login to your account</h1>
          <p className="text-gray-600 mb-8">Welcome back! Please enter your details.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email or Phone Number</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email or phone number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                <span className="text-gray-600 text-sm">Remember me</span>
              </label>
              <Link to="/" className="text-orange-500 font-semibold text-sm hover:text-orange-600">
                Forgot Password?
              </Link>
            </div>

            {error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded">{error}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or continue with</span>
              </div>
            </div>

            <button
              type="button"
              className="w-full border-2 border-gray-300 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2"
            >
              🔍 Sign in with Google
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 font-semibold hover:text-blue-800">
              Sign up for free
            </Link>
          </p>

          <p className="mt-4 text-center text-gray-500 text-xs">
            Need help? Contact our 24/7 support team
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;