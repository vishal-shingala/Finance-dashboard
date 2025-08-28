import { Router } from "express";
import authRoute from "../utils/authRoute.js";
import logoutUser from "../controllers/logoutUser.controller.js";
import {loginUser, checkAuthUser} from "../controllers/loginUser.controller.js";
import register from "../controllers/register.controller.js";
import transaction from "../controllers/transaction.controller.js";
import showIncomeExpense from "../controllers/incomeExpense.controller.js";
import lastTransaction from "../controllers/lastTransaction.controller.js";
import categoryExpense from "../controllers/categoryExpense.controller.js";
const route = Router();

route.post("/register", register);
route.post("/login", loginUser);
route.post("/logout", authRoute, logoutUser);
route.post("/transaction", authRoute, transaction);
route.post("/income-expense", authRoute, showIncomeExpense);
route.post("/last-transactions", authRoute, lastTransaction);
route.post("/category-expense", authRoute, categoryExpense);
route.get("/check-auth", authRoute, checkAuthUser);


export default route;
