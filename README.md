# 💰 Finance Dashboard – AI-Enhanced Personal Finance Manager

A **full-stack personal finance dashboard** that helps users track income and expenses, visualize spending patterns, and gain **AI-powered insights** through natural language queries.

This project demonstrates **production-style full-stack development**, secure authentication, real database usage, and **LLM-powered financial analytics**.

---

## 🚀 Features

### 🔐 Authentication
- User registration, login, and logout
- Secure JWT-based authentication using HTTP-only cookies
- Middleware-protected routes for user-specific data

### 💸 Expense & Income Management
- Add, edit, and delete financial transactions
- Categorize income and expenses
- Persistent data storage with MongoDB

### 📊 Financial Dashboard
- Interactive charts and summaries
- Monthly income vs expense overview
- Category-wise expense analysis
- Recent transaction history

### 🤖 AI-Powered Chatbot
- Ask natural language questions about your finances
- AI interprets queries and analyzes transaction data
- Returns summarized insights instead of raw data
- Built as a foundation for advanced AI analytics

---

## 🧠 Why This Project (AI Era)

Most finance dashboards stop at **charts and numbers**.  
This project introduces **AI-driven interaction**, allowing users to *ask questions* like:

- “Where did I spend the most this month?”
- “Show my food expenses in the last 30 days”

The system translates these questions into **database-level analytics**, making financial data more accessible and intelligent.

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Chart.js
- React Query
- React Router

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt

### AI / Analytics
- LangChain
- Groq / OpenAI-compatible LLM
- AI agent for query interpretation

---

## 🏗️ Project Structure
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

## 🔐 Authentication Flow

- **Register**
  - Endpoint: `/api/v1/register`
  - Password is hashed before storing
  - JWT issued and stored as HTTP-only cookie

- **Login**
  - Endpoint: `/api/v1/login`
  - Credentials validated and JWT reissued

- **Session Validation**
  - JWT verified via middleware (`authRoute`)
  - Protected APIs require valid session

---

## 💸 Transaction Flow

- **Add Transaction**
  - Endpoint: `/api/v1/transaction` (protected)
  - Stores amount, type, category, date, and userId

- **Fetch Analytics**
  - `/api/v1/income-expense` – summary totals
  - `/api/v1/last-transactions` – recent activity
  - `/api/v1/category-expense` – category breakdown

---

## 📊 Dashboard & Data Visualization

- **Line Chart**
  - Daily income vs expense trends  
  - Component: `Chart.Dashboard.jsx`

- **Pie Chart**
  - Income vs expense ratio  
  - Component: `Piechart.Dashboard.jsx`

- **Bar Chart**
  - Category-wise expenses  
  - Component: `Barchar.Dashboard.jsx`

- **Calendar Filter**
  - Month-based filtering  
  - Component: `Calendar.Dashboard.jsx`

---

## 🤖 AI Chatbot Integration

- **Frontend**
  - Floating chatbot UI  
  - Component: `Chatbot.jsx`

- **Backend**
  - Endpoint: `/api/v1/chatbot` (protected)
  - Uses LLM to:
    - Understand user intent
    - Generate MongoDB aggregation pipelines
    - Execute queries securely
    - Return human-readable insights

- **Core Logic**
  - Controller: `agent.controller.js`

---

## 📦 API Endpoints

| Method | Endpoint                     | Description                    |
|------|------------------------------|--------------------------------|
| POST | `/api/v1/register`           | Register new user              |
| POST | `/api/v1/login`              | Login user                     |
| POST | `/api/v1/logout`             | Logout user                    |
| POST | `/api/v1/transaction`        | Add transaction                |
| POST | `/api/v1/income-expense`     | Income vs expense summary      |
| POST | `/api/v1/last-transactions`  | Fetch recent transactions      |
| POST | `/api/v1/category-expense`   | Category-wise expense data     |
| GET  | `/api/v1/check-auth`         | Auth status check              |
| POST | `/api/v1/chatbot`            | AI-powered financial analytics |

---

## 👨‍💻 Development Scripts

### Backend
```
cd Backend
npm install
npm run dev
```

### Frontend
```
cd Frontend
npm install
npm run dev
```

⭐ If you find this project useful, consider starring the repository!

Happy Coding! 🚀
