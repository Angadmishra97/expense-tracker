import React, { useState, useEffect } from 'react';
import { useTransactions } from '../hooks/useTransactions';

export default function TransactionForm({ darkMode }) {
  const { addTransaction, transactionToEdit, updateTransaction, setTransactionToEdit } = useTransactions();
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [txType, setTxType] = useState(''); 
  
  // 🎯 By default Date State 
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (transactionToEdit) {
      setText(transactionToEdit.text);
      setAmount(Math.abs(transactionToEdit.amount).toString());
      setCategory(transactionToEdit.category);
      setTxType(transactionToEdit.amount >= 0 ? 'income' : 'expense');
      setDate(transactionToEdit.date || new Date().toISOString().split('T')[0]);
    } else {
      setText('');
      setAmount('');
      setCategory('Food');
      setTxType(''); 
      setDate(new Date().toISOString().split('T')[0]);
    }
  }, [transactionToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!txType) {
      alert("First select Transaction Type!");
      return;
    }

    const baseAmount = Math.abs(parseFloat(amount));
    const finalAmount = txType === 'income' ? baseAmount : -baseAmount;

    if (transactionToEdit) {
      updateTransaction({
        ...transactionToEdit,
        text,
        amount: finalAmount,
        category,
        type: txType,
        date // 🎯 Date updating
      });
    } else {
      addTransaction({
        id: Date.now(),
        text,
        amount: finalAmount,
        category,
        type: txType,
        date // 🎯 Date saving
      });
    }
    setText('');
    setAmount('');
    setTxType(''); 
    setDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <div className={`p-6 rounded-2xl shadow-md border transition-all duration-300 ${
      darkMode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-300 text-black'
    }`}>
      <h3 className="text-lg font-black mb-4 flex items-center gap-2">
        {transactionToEdit ? '📝 Edit Record' : '📥 New Entry'}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-gray-400 mb-1">Transaction Type</label>
          <select
            value={txType}
            onChange={(e) => setTxType(e.target.value)}
            className={`w-full p-2.5 border rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none ${
              darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'
            }`}
            required
          >
            <option value="" disabled>❓ Select Transaction Type</option>
            <option value="expense">💸 Expense</option>
            <option value="income">💰 Income</option>
          </select>
        </div>

        {/* 🎯 Date Input Field */}
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-gray-400 mb-1">Date</label>
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)}
            className={`w-full p-2.5 border rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none ${
              darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'
            }`}
            required
          />
        </div>

        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-gray-400 mb-1">Description</label>
          <input 
            type="text" 
            value={text} 
            onChange={(e) => setText(e.target.value)}
            placeholder="e.g., Uber Ride, Pizza" 
            className={`w-full p-2.5 border rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none ${
              darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-black placeholder-gray-400'
            }`}
            required
          />
        </div>

        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-gray-400 mb-1">Amount (₹)</label>
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g., 500" 
            min="0"
            className={`w-full p-2.5 border rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none ${
              darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-black placeholder-gray-400'
            }`}
            required
          />
        </div>

        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-gray-400 mb-1">Category</label>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className={`w-full p-2.5 border rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none ${
              darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'
            }`}
          >
            <option value="Food">Food & Drinks</option>
            <option value="Salary">Salary</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Bills">Bills & Rent</option>
            <option value="Shopping">Shopping</option>
          </select>
        </div>

        <div className="flex gap-2 pt-2">
          <button className={`w-full text-white font-black p-3 rounded-xl text-sm transition shadow-sm cursor-pointer ${
            transactionToEdit ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-600 hover:bg-blue-700'
          }`}>
            {transactionToEdit ? 'Update Record' : 'Save Transaction'}
          </button>
          {transactionToEdit && (
            <button 
              type="button"
              onClick={() => setTransactionToEdit(null)}
              className={`font-black p-3 rounded-xl text-sm transition ${
                darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}