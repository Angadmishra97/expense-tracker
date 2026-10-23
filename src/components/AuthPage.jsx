import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AuthPage({ darkMode }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isSignUp) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
    } catch (err) {
      setError(err.message.replace("Firebase: ", ""));
    }
  };

  return (
    <div className={`min-h-screen w-full flex items-center justify-center font-sans p-4 transition-colors duration-300 ${
      darkMode ? 'bg-gray-950 text-white' : 'bg-gray-100 text-black'
    }`}>
      <div className={`w-full max-w-md p-8 rounded-3xl shadow-xl border transition-all ${
        darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-300'
      }`}>
        <div className="text-center mb-6">
          <span className="text-5xl">💰</span>
          <h2 className="text-2xl font-black tracking-tight mt-2">
            {isSignUp ? 'Create FinTrack Account' : 'Welcome Back to FinTrack'}
          </h2>
          <p className="text-xs font-bold text-gray-400 mt-1">
            {isSignUp ? 'Start managing your finances smartly' : 'Login to access your personal dashboard'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-xl text-xs font-bold text-red-500 text-center">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-gray-400 mb-1">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className={`w-full p-3 border rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-black placeholder-gray-400'
              }`}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-gray-400 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={`w-full p-3 border rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-black placeholder-gray-400'
              }`}
              required
            />
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black p-3 rounded-xl text-sm transition shadow-md cursor-pointer mt-2">
            {isSignUp ? 'Sign Up' : 'Log In'}
          </button>
        </form>

        <div className="text-center mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
          <button 
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs font-black text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            {isSignUp ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}