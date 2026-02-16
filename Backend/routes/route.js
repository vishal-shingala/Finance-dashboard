import { Router } from "express";
import authRoute from "../utils/authRoute.js";
import logoutUser from "../controllers/logoutUser.controller.js";
import {loginUser, checkAuthUser, registerYear} from "../controllers/loginUser.controller.js";
import register from "../controllers/register.controller.js";
import transaction from "../controllers/transaction.controller.js";
import showIncomeExpense from "../controllers/incomeExpense.controller.js";
import lastTransaction from "../controllers/lastTransaction.controller.js";
import { categoryExpense, getAllCategories } from "../controllers/categoryExpense.controller.js";
// import chatBot from "../controllers/chatbot.controller.js";
import Agent from "../controllers/agent.controller.js";      
import getFilteredTransactions from "../controllers/filteredTransactions.controller.js";
const route = Router(); 

route.post("/register", register);
route.post("/login", loginUser);
route.post("/logout", authRoute, logoutUser);
route.post("/transaction", authRoute, transaction);
route.post("/income-expense", authRoute, showIncomeExpense);
route.post("/last-transactions", authRoute, lastTransaction);
route.post("/category-expense", authRoute, categoryExpense);
route.get("/categories", authRoute, getAllCategories);
route.get("/check-auth", authRoute, checkAuthUser);
route.get("/register-year", authRoute, registerYear);
route.post("/chatbot", authRoute, Agent);
route.post("/filtered-transactions", authRoute, getFilteredTransactions);

export default route;
