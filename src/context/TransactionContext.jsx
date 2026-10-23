import React, { createContext, useState, useEffect } from 'react';

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem('transactions');
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });
  
  const [transactionToEdit, setTransactionToEdit] = useState(null);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  // 📥 Add transaction and sort by date
  const addTransaction = (transaction) => {
    setTransactions((prev) => {
      const updated = [transaction, ...prev];
      return updated.sort((a, b) => new Date(b.date) - new Date(a.date));
    });
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  // 📝 Update and re-sort
  const updateTransaction = (updatedTx) => {
    setTransactions((prev) => {
      const updated = prev.map((tx) => (tx.id === updatedTx.id ? updatedTx : tx));
      return updated.sort((a, b) => new Date(b.date) - new Date(a.date));
    });
    setTransactionToEdit(null);
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        transactionToEdit,
        setTransactionToEdit,
        addTransaction,
        deleteTransaction,
        updateTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};