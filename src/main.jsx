import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { TransactionProvider } from './context/TransactionContext.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx' // 👈 Import Auth

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <TransactionProvider>
        <App />
      </TransactionProvider>
    </AuthProvider>
  </React.StrictMode>,
)