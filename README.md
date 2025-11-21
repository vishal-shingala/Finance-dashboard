# Finance Dashboard

A full-stack finance dashboard application for tracking income, expenses, and visualizing financial data. Built with **React** (frontend) and **Node.js/Express/MongoDB** (backend), featuring authentication, transaction management, and AI-powered chatbot analytics.

---

## 📚 Table of Contents

- [🔄 Application Flow](#application-flow)
- [🚀 Getting Started](#getting-started)
- [🗂️ Project Structure](#project-structure)
- [🔐 Authentication Flow](#authentication-flow)
- [💸 Transaction Flow](#transaction-flow)
- [📊 Dashboard & Data Visualization](#dashboard--data-visualization)
- [🤖 AI Chatbot Integration](#ai-chatbot-integration)
- [🛠️ Tech Stack](#tech-stack)
- [📦 API Endpoints](#api-endpoints)
- [👨‍💻 Development Scripts](#development-scripts)
- [📄 License](#license)

---

## 🔄 [Application Flow](#application-flow)

1. **User Registration/Login**  
   ⬇️  
2. **JWT Authentication & Session**  
   ⬇️  
3. **Dashboard Display**  
   ⬇️  
4. **Add/View Transactions**  
   ⬇️  
5. **Data Visualization (Charts, History, Calendar)**  
   ⬇️  
6. **AI Chatbot for Analytics**  

---

## 🚀 [Getting Started](#getting-started)

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB instance (local or Atlas)

### 1. Clone the Repository

```sh
git clone <your-repo-url>
cd Finance-dashboard
```

### 2. Setup Backend

```sh
cd Backend
npm install
# Create a .env file with MONGODB_URI, JWTSECRET, PORT, etc.
npm run dev
```

### 3. Setup Frontend

```sh
cd ../Frontend
npm install
npm run dev
```

- Frontend: http://localhost:5173  
- Backend: http://localhost:3000

---

## 🗂️ [Project Structure](#project-structure)

```
Finance-dashboard/
│
├── Backend/
│   ├── controllers/      # Express route controllers
│   ├── model/            # Mongoose models
│   ├── routes/           # API route definitions
│   ├── utils/            # Utility functions (auth, token, etc.)
│   ├── config/           # DB & LLM config
│   └── index.js          # Express app entry
│
├── Frontend/
│   ├── src/
│   │   ├── components/   # React UI components
│   │   ├── context/      # React Context for global state
│   │   ├── hooks/        # Custom React hooks
│   │   ├── pages/        # Page-level components
│   │   ├── parts/        # UI parts (cards, formatters)
│   │   └── Routes/       # React Router setup
│   └── index.html        # App root
│
└── README.md             # This file
```

---

## 🔐 [Authentication Flow](#authentication-flow)

- **Register:**  
  - User submits name, email, password via `/api/v1/register`.
  - Backend creates user, hashes password, issues JWT (cookie).
- **Login:**  
  - User submits email, password via `/api/v1/login`.
  - Backend verifies credentials, issues JWT (cookie).
- **Session:**  
  - JWT stored as HTTP-only cookie.
  - Protected routes use middleware ([`authRoute`](Backend/utils/authRoute.js)) to verify JWT.

---

## 💸 [Transaction Flow](#transaction-flow)

- **Add Transaction:**  
  - User opens modal, submits amount, type, category, date.
  - POST `/api/v1/transaction` (protected).
  - Transaction saved to MongoDB with userId.
- **Fetch Transactions:**  
  - Dashboard fetches income/expense summary, last transactions, and category-wise data via:
    - `/api/v1/income-expense`
    - `/api/v1/last-transactions`
    - `/api/v1/category-expense`

---

## 📊 [Dashboard & Data Visualization](#dashboard--data-visualization)

- **Charts:**  
  - Line chart: Income/Expense over days ([`ChartDashboard`](Frontend/src/components/Chart.Dashboard.jsx))
  - Pie chart: Income vs Expense ([`PiechartDashboard`](Frontend/src/components/Piechart.Dashboard.jsx))
  - Bar chart: Category-wise expenses ([`BarChartDashboard`](Frontend/src/components/Barchar.Dashboard.jsx))
- **Calendar:**  
  - Month selector to filter data ([`CalendarDashboard`](Frontend/src/components/Calendar.Dashboard.jsx))
- **History:**  
  - Recent transactions ([`History`](Frontend/src/components/History.jsx))

---

## 🤖 [AI Chatbot Integration](#ai-chatbot-integration)

- **Chatbot UI:**  
  - Floating chat window ([`Chatbot`](Frontend/src/components/Chatbot.jsx))
- **Backend Agent:**  
  - POST `/api/v1/chatbot` (protected)
  - Uses LLM (Groq/OpenAI) to interpret user questions, generate MongoDB aggregation pipelines, and return results.
  - See [`Agent`](Backend/controllers/agent.controller.js)

---

## 🛠️ [Tech Stack](#tech-stack)

- **Frontend:** React, Vite, TailwindCSS, Chart.js, React Query, React Router
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, LangChain, Groq LLM
- **Other:** ESLint, PostCSS, dotenv, bcrypt

---

## 📦 [API Endpoints](#api-endpoints)

| Method | Endpoint                | Description                       |
|--------|-------------------------|-----------------------------------|
| POST   | `/api/v1/register`      | Register new user                 |
| POST   | `/api/v1/login`         | Login user                        |
| POST   | `/api/v1/logout`        | Logout user                       |
| POST   | `/api/v1/transaction`   | Add a transaction                 |
| POST   | `/api/v1/income-expense`| Get income/expense summary        |
| POST   | `/api/v1/last-transactions` | Get last 5 transactions      |
| POST   | `/api/v1/category-expense`  | Get category-wise expenses   |
| GET    | `/api/v1/check-auth`    | Check user authentication         |
| POST   | `/api/v1/chatbot`       | AI chatbot analytics              |

---

## 👨‍💻 [Development Scripts](#development-scripts)

**Backend:**
```sh
cd Backend
npm run dev
```

**Frontend:**
```sh
cd Frontend
npm run dev
```

---

## 📄 [License](#license)

MIT License. See [LICENSE](LICENSE) for details.

---

**Happy Coding! 🚀**