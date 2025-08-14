import { Router } from "express";
import authRoute from "../utils/authRoute.js";
import loginUser from "../controllers/loginUser.controller.js";
import logoutUser from "../controllers/logoutUser.controller.js";
import register from "../controllers/register.js";
import transaction from "../controllers/transaction.controller.js";
import showIncomeExpense from "../controllers/incomeExpense.controller.js";
import lastTransaction from "../controllers/lastTransaction.controller.js";
import categoryExpense from "../controllers/categoryExpense.controller.js";
const route = Router();

route.post("/register", register);
route.post("/login", loginUser);
route.post("/logout", authRoute, logoutUser);
route.post("/transaction", authRoute, transaction);
route.get("/income-expense", authRoute, showIncomeExpense);
route.get("/last-transactions", authRoute, lastTransaction);
route.get("/category-expense", authRoute, categoryExpense);

export default route;
