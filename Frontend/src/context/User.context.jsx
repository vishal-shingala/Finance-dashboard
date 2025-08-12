import { createContext, useEffect, useState } from "react";
import AddTransactionForm from "../components/AddTransactionForm";
 const UserContext = createContext();
 const UserContextProvider = ({ children }) => {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [incomeDetail, setIncomeDetail] = useState([]);
  const [expenseDetail, setExpenseDetail] = useState([]);
  const [currUser, setCurrUser] = useState(null);
  const [openAddTransactionForm, setOpenAddTransactionForm] = useState(false);
  const [selectMonth, setSelectMonth] = useState(new Date().getMonth());
  const [categoryExpense, setCategoryExpense] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [category, setCategory] = useState([])

  const value = {
    income,
    expense,
    incomeDetail,
    expenseDetail,
    currUser,
    openAddTransactionForm,
    setOpenAddTransactionForm,
    selectMonth,
    setSelectMonth,
    categoryExpense,
    transactions,
    category
  };


  return <UserContext.Provider value={value}>
    {children}
    {openAddTransactionForm && (
      <AddTransactionForm 
        isOpen={openAddTransactionForm} 
        onClose={() => setOpenAddTransactionForm(false)} 
      />
    )}
    </UserContext.Provider>;
};

export {UserContext, UserContextProvider}
