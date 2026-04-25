import User from "../model/user.model.js";
import asynchandler from "../utils/asynchandler.js";
import { generateToken } from "../utils/token.js";
import { createLogger } from "../utils/logger.js";

const logger = createLogger("register");

const register = asynchandler(async (req, res) => {

  const { username, email, password } = req.body;
  logger.info("Registration request received", { email, username });

  if (!username || !email || !password) {
    logger.warn("Registration failed: missing credentials", { email });
    return res.status(300).json({ message: "All Credentials are required." });
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    logger.warn("Registration failed: user already exists", { email });
    return res.status(400).json({ message: "User already exists." });
  }

  const user = await User.create({ username, email, password });

  const token = generateToken(user._id,res);
  if(!token){
    logger.error("Registration failed: token generation failed", { userId: user._id });
    return res.status(500).json({ message: "Token generation failed." });
  }

  const userDetail = await User.findOne({ email }).select("-password");
  

  logger.info("User registered successfully", { userId: user._id, email });
  res.status(201).json({ message: "User registered successfully.", userDetail });
});

export default register;
