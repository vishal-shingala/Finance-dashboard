import { generateToken } from "../utils/token.js";
import User from "../model/user.model.js";
import asynchandler from "../utils/asynchandler.js";

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const validPassword = await user.comparePassword(password);
    if (!validPassword) {
      return res.status(401).json({ message: "Incorrect Password" });
    }

    const token = generateToken(user._id, res);
    if (!token) {
      return res.status(500).json({ message: "Internal Server Error" });
    }

    const userDetail = await User.findOne({ email }).select("-password");

    return res
      .status(200)
      .json({ message: "LoggedIn Successfully", userDetail });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const checkAuthUser = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "User is authenticated",
    user: req.user,
  });
};

const registerYear = asynchandler(async (req, res) => {
  const userId = req.user;
  const year = await User.findById(userId).select("createdAt");
  res.status(200).json({ year: year.createdAt.getFullYear()-1 });
});

export { loginUser, checkAuthUser, registerYear };
