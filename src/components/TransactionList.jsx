import React, { useState } from 'react';
import { useTransactions } from '../hooks/useTransactions';

export default function TransactionList({ darkMode }) {
  const { transactions, deleteTransaction, setTransactionToEdit } = useTransactions();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // 🎯 Date Range States
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Enhanced Filter Logic with Date Checking
  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch = tx.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || tx.category === selectedCategory;
    
    // Date Filtering Condition
    let matchesDate = true;
    if (startDate && tx.date) {
      matchesDate = matchesDate && tx.date >= startDate;
    }
    if (endDate && tx.date) {
      matchesDate = matchesDate && tx.date <= endDate;
    }

    return matchesSearch && matchesCategory && matchesDate;
  });

  const exportToCSV = () => {
    if (filteredTransactions.length === 0) {
      alert("Bhai, khali ledger ko export nahi kar sakte!");
      return;
    }
    const headers = ["Date,Description,Category,Amount (₹)\n"];
    const rows = filteredTransactions.map(tx => {
      const cleanDesc = tx.text.replace(/,/g, " "); 
      return `${tx.date || 'N/A'},${cleanDesc},${tx.category},${tx.amount}`;
    });

    const csvContent = "data:text/csv;charset=utf-8," + headers + rows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Filtered_Ledger_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Clear filters helper
  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setStartDate('');
    setEndDate('');
  };

  return (
    <div className={`p-6 rounded-2xl shadow-md border transition-all duration-300 w-full ${
      darkMode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-300 text-black'
    }`}>
      
      <div className="flex justify-between items-center mb-5 gap-2">
        <h3 className="text-lg font-black flex items-center gap-2">
          📊 Transaction Ledger
        </h3>
        
        <div className="flex gap-2">
          {(startDate || endDate || searchTerm || selectedCategory !== 'All') && (
            <button
              onClick={handleClearFilters}
              className="p-2 px-3 text-xs font-bold rounded-xl border border-gray-300 dark:border-gray-700 text-gray-500 hover:text-red-500 transition-all cursor-pointer"
            >
              🧹 Clear
            </button>
          )}
          <button
            onClick={exportToCSV}
            className={`p-2 px-3.5 text-xs font-black rounded-xl shadow-sm transition-all cursor-pointer ${
              darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-black hover:bg-gray-900 text-white'
            }`}
          >
            📥 Export CSV
          </button>
        </div>
      </div>

      {/* 🔍 Controls Row 1: Search & Category */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-4 w-full">
        <div className="w-full sm:flex-1">
          <input 
            type="text"
            placeholder="🔍 Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full p-2.5 px-4 border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all ${
              darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-black placeholder-gray-400'
            }`}
          />
        </div>

        <div className="w-full sm:w-48">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={`w-full p-2.5 px-3 border rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all ${
              darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'
            }`}
          >
            <option value="All">📁 All Categories</option>
            <option value="Food">Food & Drinks</option>
            <option value="Salary">Salary</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Bills">Bills & Rent</option>
            <option value="Shopping">Shopping</option>
          </select>
        </div>
      </div>

      {/* 📅 Controls Row 2: Date Range Filter */}
      <div className="grid grid-cols-2 gap-3 mb-6 bg-gray-50 dark:bg-gray-850 p-3 rounded-xl border border-gray-200 dark:border-gray-800">
        <div>
          <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">From Date</label>
          <input 
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className={`w-full p-1.5 px-2.5 border rounded-lg text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'
            }`}
          />
        </div>
        <div>
          <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">To Date</label>
          <input 
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className={`w-full p-1.5 px-2.5 border rounded-lg text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'
            }`}
          />
        </div>
      </div>

      {/* 🧾 Spreadsheet Table */}
      <div className={`overflow-x-auto rounded-xl border ${darkMode ? 'border-gray-800' : 'border-gray-300'}`}>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className={`text-xs font-black uppercase tracking-wider border-b ${
              darkMode ? 'bg-gray-800/60 border-gray-700 text-gray-400' : 'bg-gray-100 border-gray-300 text-gray-600'
            }`}>
              <th className="p-3.5 pl-4">Date</th>
              <th className="p-3.5">Description</th>
              <th className="p-3.5">Category</th>
              <th className="p-3.5 text-right">Amount</th>
              <th className="p-3.5 text-center">Actions</th>
            </tr>
          </thead>
          
          <tbody className={`divide-y text-sm ${darkMode ? 'divide-gray-800' : 'divide-gray-300'}`}>
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-400 font-bold">
                  No matching transactions in this date range.
                </td>
              </tr>
            ) : (
              filteredTransactions.map((tx) => (
                <tr key={tx.id} className={`transition-colors ${darkMode ? 'hover:bg-gray-800/40' : 'hover:bg-gray-50'}`}>
                  <td className="p-3.5 pl-4 text-xs font-bold text-gray-400">{tx.date || '—'}</td>
                  <td className="p-3.5 font-black">{tx.text}</td>
                  <td className="p-3.5">
                    <span className={`text-xs font-black px-2.5 py-1 rounded-lg ${
                      darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {tx.category}
                    </span>
                  </td>
                  <td className={`p-3.5 text-right font-black ${tx.amount >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {tx.amount >= 0 ? '+' : '-'}₹{Math.abs(tx.amount)}
                  </td>
                  <td className="p-3.5 text-center">
                    <div className="flex justify-center items-center gap-3">
                      <button 
                        onClick={() => setTransactionToEdit(tx)}
                        className="text-gray-400 hover:text-blue-500 cursor-pointer text-base"
                      >
                        ✏️
                      </button>
                                            <button 
                        onClick={() => {
                          const confirmDelete = window.confirm(`Are you sure you want to delete the "${tx.text}" transaction?`);
                          if (confirmDelete) {
                            deleteTransaction(tx.id);
                          }
                        }}
                        className="text-gray-400 hover:text-red-500 cursor-pointer text-base transition-colors"
                        title="Delete Record"
                      >
                        ✕
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}