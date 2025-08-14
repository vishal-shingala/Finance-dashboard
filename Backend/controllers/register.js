import User from "../model/user.model.js";
import asynchandler from "../utils/asynchandler.js";
import { generateToken } from "../utils/token.js";

const register = asynchandler(async (req, res) => {

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(300).json({ message: "All Credentials are required." });
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists." });
  }

  const user = await User.create({ username, email, password });

  const token = generateToken(user._id,res);
  if(!token){
    return res.status(500).json({ message: "Token generation failed." });
  }

  const userDetail = await User.findOne({ email }).select("-password");

  res.status(201).json({ message: "User registered successfully.", userDetail });
});

export default register;
