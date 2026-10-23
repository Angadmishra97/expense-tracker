import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function AnalyticsCharts({ transactions, darkMode }) {
  
  // 1. Data Processing for Pie Chart (Category Wise)
  const categoryDataMap = {};
  transactions.forEach(tx => {
    const amt = Math.abs(tx.amount);
    if (categoryDataMap[tx.category]) {
      categoryDataMap[tx.category] += amt;
    } else {
      categoryDataMap[tx.category] = amt;
    }
  });

  const pieData = Object.keys(categoryDataMap).map(cat => ({
    name: cat,
    value: categoryDataMap[cat]
  }));

  // 2. Data Processing for Bar Chart (Income vs Expense)
  let totalIncome = 0;
  let totalExpense = 0;
  transactions.forEach(tx => {
    if (tx.amount > 0) totalIncome += tx.amount;
    else totalExpense += Math.abs(tx.amount);
  });

  const barData = [
    { name: 'Financial Overview', Income: totalIncome, Expense: totalExpense }
  ];

  // Premium Dashboard Colors
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  if (transactions.length === 0) {
    return (
      <div className={`p-6 rounded-2xl border text-center font-medium text-sm ${
        darkMode ? 'bg-gray-900 border-gray-800 text-gray-400' : 'bg-white border-gray-200 text-gray-500'
      }`}>
        📊 No transaction data available for analytics yet. Add some items!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-10">
      
      {/* Chart 1: Category Distribution */}
      <div className={`p-6 rounded-2xl shadow-sm border transition-all ${
        darkMode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-200 text-black'
      }`}>
        <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">📁 Category Breakdown</h4>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: darkMode ? '#1f2937' : '#ffffff', 
                  borderColor: darkMode ? '#374151' : '#e5e7eb',
                  color: darkMode ? '#ffffff' : '#000000',
                  borderRadius: '12px'
                }} 
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Income vs Expense Scale */}
      <div className={`p-6 rounded-2xl shadow-sm border transition-all ${
        darkMode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-200 text-black'
      }`}>
        <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">⚖️ Income vs Expense Split</h4>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <XAxis dataKey="name" stroke={darkMode ? '#9ca3af' : '#4b5563'} fontSize={12} />
              <YAxis stroke={darkMode ? '#9ca3af' : '#4b5563'} fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: darkMode ? '#1f2937' : '#ffffff', 
                  borderColor: darkMode ? '#374151' : '#e5e7eb',
                  color: darkMode ? '#ffffff' : '#000000',
                  borderRadius: '12px'
                }}
              />
              <Legend />
              <Bar dataKey="Income" fill="#10b981" radius={[8, 8, 0, 0]} />
              <Bar dataKey="Expense" fill="#ef4444" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}