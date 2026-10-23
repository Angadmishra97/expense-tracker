# 💰 Expense Tracker App

> A sleek, fast, and user-friendly web application designed to track income, manage daily expenses, and gain better insights into your personal finances.

---

## ✨ Features

* ➕ **Add & Manage Transactions:** Quickly log income and expenses with descriptions, amounts, and dates.
* 🏷️ **Categorization:** Classify spending into custom categories (e.g., Food, Bills, Entertainment, Shopping).
* 📊 **Real-time Balance Dashboard:** Dynamic updates of Total Income, Total Expenses, and Net Balance.
* 🗑️ **Delete & Edit Records:** Easily modify or remove accidental entries.
* 💾 **Persistent Storage:** Saves all transactions locally so data remains safe on page refresh.
* 🌙 **Dark & Light Mode:** Toggle themes for a better visual experience day or night.
* 📈 **Visual Analytics:** Interactive charts to analyze category-wise spending habits.
* 📱 **Fully Responsive UI:** Smooth user experience across Mobile, Tablet, and Desktop screens.
* ⚡ **Fast & Lightweight:** Built using Vite for instant server start and lightning-fast HMR.

---

## 🛠️ Tech Stack & Tools

| Category | Technology / Tool Used |
| :--- | :--- |
| **Frontend Framework** | React.js |
| **Build Tool** | Vite |
| **Language** | JavaScript (ES6+), HTML5, CSS3 |
| **Styling** | CSS Modules / Modern CSS (Flexbox & Grid) |
| **Icons & Charts** | Lucide React / Chart.js (Recharts) |
| **Storage** | Browser LocalStorage |
| **Version Control** | Git & GitHub |
| **Package Manager** | npm |

---

## 📂 Project Structure

```text
expense-tracker/
├── public/                  # Public static assets (favicon, icons)
├── src/
│   ├── assets/              # Static assets (images, SVGs)
│   ├── components/          # Reusable UI components
│   │   ├── Balance.jsx      # Balance summary display
│   │   ├── ExpenseForm.jsx  # Form to add new transactions
│   │   ├── ChartView.jsx    # Visual spending analytics
│   │   └── TransactionList.jsx # History/List of expenses
│   ├── App.jsx              # Main Root Component
│   ├── App.css              # Main App styles
│   └── main.jsx             # React DOM entry point
├── .gitignore               # Files ignored by Git
├── package.json             # Dependencies and scripts
├── README.md                # Project documentation
└── vite.config.js           # Vite configuration
---

## 🚀 Getting Started

Follow these steps to set up and run the project locally on your system.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Angadmishra97/expense-tracker.git](https://github.com/Angadmishra97/expense-tracker.git)