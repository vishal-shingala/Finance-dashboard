import { Router } from "express";
import authRoute from "../utils/authRoute.js";
import loginUser from "../controllers/loginUser.controller.js";
import logoutUser from "../controllers/logoutUser.controller.js";
const route = Router();

route.post("/register", register);
route.post("/login", loginUser);
route.post("/logout", authRoute, logoutUser);
route.post("/transaction", authRoute, transaction);

export default route;
