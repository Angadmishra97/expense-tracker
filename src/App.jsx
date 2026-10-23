import React, { useState, useEffect } from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import { useTransactions } from './hooks/useTransactions';
import AnalyticsCharts from './components/AnalyticsCharts';
import AuthPage from './components/AuthPage'; 
import { useAuth } from './context/AuthContext'; 

export default function App() {
  const { transactions } = useTransactions();
  const { user, logout } = useAuth(); 
  
  const [activeTab, setActiveTab] = useState('overview'); 

  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true' ? true : false;
  });

  const [budgetLimit, setBudgetLimit] = useState(() => {
    const savedBudget = localStorage.getItem('budgetLimit');
    return savedBudget ? parseFloat(savedBudget) : 20000;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('budgetLimit', budgetLimit);
  }, [budgetLimit]);

  // Financial Summary Engine
  const amounts = transactions.map(tx => tx.amount);
  const totalBalance = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
  const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

  const expenseNum = parseFloat(expense);
  const isBudgetExceeded = expenseNum > budgetLimit;
  const isBudgetWarning = expenseNum >= budgetLimit * 0.8 && expenseNum <= budgetLimit;

  if (!user) {
    return <AuthPage darkMode={darkMode} />;
  }

  return (
    <div className={`min-h-screen flex flex-col md:flex-row font-sans text-xs sm:text-sm transition-colors duration-300 ${
      darkMode ? 'bg-gray-950 text-white' : 'bg-gray-100 text-black'
    }`}>
      
      {/* 🧭 Panel 1: Premium Compact Sidebar */}
      <aside className={`w-full md:w-56 p-4 flex flex-col justify-between border-b md:border-b-0 md:border-r ${
        darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <div>
          {/* Logo Branding */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl">📊</span>
            <div>
              <h2 className="text-base font-black tracking-tight">FinTrack Pro</h2>
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Dashboard</span>
            </div>
          </div>

          {/* Navigation Anchors (Reduced Padding & Text Size) */}
          <nav className="space-y-1">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`w-full p-2 px-3 rounded-lg text-left font-bold flex items-center gap-2 transition-all ${
                activeTab === 'overview' 
                  ? 'bg-blue-600 text-white' 
                  : (darkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600')
              }`}
            >
              🏠 Overview
            </button>
            <button 
              onClick={() => setActiveTab('ledger')}
              className={`w-full p-2 px-3 rounded-lg text-left font-bold flex items-center gap-2 transition-all ${
                activeTab === 'ledger' 
                  ? 'bg-blue-600 text-white' 
                  : (darkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600')
              }`}
            >
              🧾 Ledger Sheets
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`w-full p-2 px-3 rounded-lg text-left font-bold flex items-center gap-2 transition-all ${
                activeTab === 'settings' 
                  ? 'bg-blue-600 text-white' 
                  : (darkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600')
              }`}
            >
              ⚙️ Settings
            </button>
          </nav>
        </div>

        {/* User Info & Logout Button */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
          <div className="text-[11px]">
            <p className="text-gray-400 font-bold uppercase tracking-wider text-[9px]">User</p>
            <p className="font-bold truncate text-blue-500">{user.email}</p>
          </div>
          <button 
            onClick={() => { if (window.confirm("Bhai, logout karna hai?")) logout(); }}
            className="w-full p-2 text-center text-xs font-bold rounded-lg bg-rose-600/10 hover:bg-rose-600 text-rose-500 hover:text-white transition-all cursor-pointer block"
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* 🏙️ Panel 2: Main Operational Viewport (Compact padding & elements) */}
      <main className="flex-1 p-4 md:p-6 overflow-y-auto max-w-5xl w-full mx-auto">
        
        {/* Dynamic Global Header Bar */}
        <header className="flex justify-between items-center mb-5 pb-3 border-b dark:border-gray-800 border-gray-200">
          <div>
            <h1 className="text-lg md:text-xl font-black capitalize tracking-tight">
              {activeTab} Workspace
            </h1>
          </div>
          
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`p-1.5 px-3 text-xs font-bold rounded-lg shadow-sm cursor-pointer transition-all ${
              darkMode ? 'bg-amber-400 text-gray-950 hover:bg-amber-300' : 'bg-black text-white hover:bg-gray-900'
            }`}
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </header>

        {/* 🚨 Budget Alert Banners */}
        {isBudgetWarning && activeTab === 'overview' && (
          <div className="mb-4 p-3 bg-orange-500/10 border border-orange-500 rounded-xl flex items-center gap-2 text-orange-600 dark:text-orange-400">
            <span className="text-base">⚠️</span>
            <p className="text-xs font-bold">Budget Warning: 80% limit touched.</p>
          </div>
        )}
        {isBudgetExceeded && activeTab === 'overview' && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-xl flex items-center gap-2 text-red-600 dark:text-red-400">
            <span className="text-base">🚨</span>
            <p className="text-xs font-bold">Critical: Budget limit exceeded completely.</p>
          </div>
        )}

        {/* 🔀 DYNAMIC INTERFACE ROUTER BLOCK */}
        
        {/* TAB 1: OVERVIEW HUB */}
        {activeTab === 'overview' && (
          <div className="space-y-5">
            {/* Summary Counters (Smaller Cards & Text) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className={`p-4 rounded-xl shadow-sm border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-300'}`}>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">Net Balance</span>
                <h2 className={`text-xl font-black ${totalBalance >= 0 ? (darkMode ? 'text-white' : 'text-black') : 'text-rose-600'}`}>₹{totalBalance}</h2>
              </div>
              <div className={`p-4 rounded-xl shadow-sm border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-300'}`}>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">Total Income</span>
                <h2 className="text-xl font-black text-emerald-500">+₹{income}</h2>
              </div>
              <div className={`p-4 rounded-xl shadow-sm border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-300'}`}>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">Total Expenses</span>
                <h2 className="text-xl font-black text-rose-500">-₹{expense}</h2>
              </div>
            </div>

            {/* Visual Analytics */}
            <div className="p-2 rounded-xl border dark:border-gray-800 border-gray-300">
              <AnalyticsCharts transactions={transactions} darkMode={darkMode} />
            </div>

            {/* Form Segment */}
            <div className="max-w-md">
              <TransactionForm darkMode={darkMode} />
            </div>
          </div>
        )}

        {/* TAB 2: LEDGER SHEETS TABLE */}
        {activeTab === 'ledger' && (
          <div className="w-full">
            <TransactionList darkMode={darkMode} />
          </div>
        )}

        {/* TAB 3: SYSTEM SETTINGS */}
        {activeTab === 'settings' && (
          <div className={`p-4 rounded-xl border max-w-md shadow-sm ${
            darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-300'
          }`}>
            <h3 className="text-sm font-black mb-3">⚙️ System Rules</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Monthly Expense Cap (₹)</label>
                <input 
                  type="number"
                  value={budgetLimit}
                  onChange={(e) => setBudgetLimit(parseFloat(e.target.value) || 0)}
                  className={`w-full p-2 border rounded-lg text-xs font-bold focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                    darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'
                  }`}
                />
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}