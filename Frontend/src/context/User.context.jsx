import { createContext, useEffect, useState } from "react";
import AddTransactionForm from "../components/AddTransactionForm";
import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

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

  

  const checkAuth = async () => {
    try {
      const { data } = await axios.get("/api/v1/check-auth");
      if (data.success) {
        setCurrUser(data.user);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const result = useQueries({
    queries: [
      {
        queryKey: ["total"],
        queryFn: async () => {
          const res = await axios.get("/api/v1/income-expense");
          return res.data;
        },
        enabled: !!currUser,
      },
      {
        queryKey: ["transactions"],
        queryFn: async () => {
          const res = await axios.get("/api/v1/last-transactions");
          return res.data;
        },
        enabled: !!currUser,
      },
      {
        queryKey: ["category"],
        queryFn: async () => {
          const res = await axios.get("/api/v1/category-expense");
          return res.data;
        },
        enabled: !!currUser,
      },
    ],
  });

  const [totalExpense, lastTransactions, categoryTotalExpense] = result;

  useEffect(() => {
    if (totalExpense.data) {
      console.log(totalExpense.data);
      setIncome(totalExpense.data.data.total[0].income || 0);
      setExpense(totalExpense.data.data.total[0].expense || 0);
      const tempIncome = new Array(30).fill(0);
      const tempExpense = new Array(30).fill(0);
      totalExpense.data.data?.totalDetail.map((obj) => {
        tempIncome[13]=(obj.incomeDetail);
        tempExpense[12  ] = (obj.expenseDetail);
      })
      setIncomeDetail(tempIncome);
      setExpenseDetail(tempExpense);
    }
  }, [totalExpense.isLoading, totalExpense.isError, totalExpense.data]);

  useEffect(()=>{
    if(lastTransactions.data){
      setTransactions(lastTransactions.data.data);
    }
  },[lastTransactions.isLoading, lastTransactions.isError, lastTransactions.data])

  useEffect(()=>{
    if(categoryTotalExpense.data){
      setCategoryExpense(categoryTotalExpense.data.data)
    }
  },[categoryTotalExpense.isLoading, categoryTotalExpense.isError, categoryTotalExpense.data])
  useEffect(() => {
    checkAuth();
  }, []);

  const value = {
    income,
    expense,
    incomeDetail,
    expenseDetail,
    currUser,
    setCurrUser,
    openAddTransactionForm,
    setOpenAddTransactionForm,
    selectMonth,
    setSelectMonth,
    categoryExpense,
    transactions,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
      {openAddTransactionForm && (
        <AddTransactionForm
          isOpen={openAddTransactionForm}
          onClose={() => setOpenAddTransactionForm(false)}
        />
      )}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
