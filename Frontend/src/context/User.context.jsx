import { createContext, useEffect, useState } from "react";
import AddTransactionForm from "../components/AddTransactionForm";
import { useMutation } from "@tanstack/react-query";
import { useMutations } from "../hooks/Mutations";
import axios from "axios";
import { API_URL } from "../config";
import toast from "react-hot-toast";

axios.defaults.baseURL = API_URL.replace(/\/$/, "");
axios.defaults.withCredentials = true;

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [incomeDetail, setIncomeDetail] = useState([]);
  const [expenseDetail, setExpenseDetail] = useState([]);
  const [currUser, setCurrUser] = useState(null);
  const [openAddTransactionForm, setOpenAddTransactionForm] = useState(false);
  const [selectMonth, setSelectMonth] = useState(new Date().getMonth() + 1);
  const [selectYear, setSelectYear] = useState(new Date().getFullYear());
  const [categoryExpense, setCategoryExpense] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [logOut, setLogOut] = useState(false);
  const [registerYear, setRegisterYear] = useState(new Date().getFullYear());

  // Chek user is logged in or not
  const checkAuth = async () => {
    try {
      const { data } = await axios.get("/check-auth");
      if (data.success) {
        setCurrUser(data.user);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Collecting Data of Uesr

  const [totalExpense, lastTransactions, categoryTotalExpense] = useMutations([
    {
      mutationFn: async () => {
        const res = await axios.post("/income-expense", {
          month: selectMonth,
          year: selectYear,
        });
        return res.data;
      },
    },
    {
      mutationFn: async () => {
        const res = await axios.post("/last-transactions", {
          month: selectMonth,
          year: selectYear,
        });
        return res.data;
      },
    },
    {
      mutationFn: async () => {
        const res = await axios.post("/category-expense", {
          month: selectMonth,
          year: selectYear,
        });
        return res.data;
      },
    },
  ]);

  const runMutation = async () => {
    await Promise.all([
      totalExpense.mutateAsync(),
      lastTransactions.mutateAsync(),
      categoryTotalExpense.mutateAsync(),
    ]);
  };

  // If User is Logged in, Run mutation

  useEffect(() => {
    if (!currUser) return;

    runMutation();
    console.log("Mutation run");
  }, [currUser, selectMonth, selectYear]);

  // Total Expense
  useEffect(() => {
    if (totalExpense.data) {
      console.log(totalExpense.data);
      setIncome(totalExpense.data.data.total[0]?.income || 0);
      setExpense(totalExpense.data.data.total[0]?.expense || 0);
      const tempIncome = new Array(31).fill(0);
      const tempExpense = new Array(31).fill(0);
      totalExpense.data.data?.totalDetail.map((obj) => {
        const date = new Date(obj._id).getDate() - 1;
        tempExpense[date] = obj?.expenseDetail || 0;
        tempIncome[date] = obj?.incomeDetail || 0;
      });
      setIncomeDetail(tempIncome.slice(0, 31));
      setExpenseDetail(tempExpense.slice(0, 31));
    }
  }, [totalExpense.data]);

  // Transaction History
  useEffect(() => {
    if (lastTransactions.data) {
      setTransactions(lastTransactions.data.data);
    }
  }, [lastTransactions.data]);

  // Category-wise Expense
  useEffect(() => {
    if (categoryTotalExpense.data) {
      setCategoryExpense(categoryTotalExpense.data.data);
    }
  }, [categoryTotalExpense.data]);

  // Run checkAuth Funtion
  useEffect(() => {
    checkAuth();
  }, []);

  // Logout Function
  useEffect(() => {
    if (logOut) {
      const logOutPage = async () => {
        try {
          await logOut();
          setCurrUser(null);
          toast.success("Logged out successfully");
        } catch (err) {
          toast.error(err.response?.data?.message || err.message);
        }
      };
      logOutPage();
    }
  }, [logOut]);

  const funRegisterYear = async () => {
    const res = await axios.get("/register-year");
    if (res.data) {
      console.log(res.data);
      setRegisterYear(Number(res.data.year));
    }
  };
  // User Register Year
  useEffect(() => {
    if (!currUser) return;
    funRegisterYear();    
  }, [currUser]);

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
    selectYear,
    setSelectYear,
    categoryExpense,
    transactions,
    setLogOut,
    registerYear
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
