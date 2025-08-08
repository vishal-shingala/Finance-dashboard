import { Router } from "express";  
import authRoute from "../utils/authRoute";
const route = Router();

route.post('/register',authRoute, register);