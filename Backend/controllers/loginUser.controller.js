import { generateToken } from "../utils/token.js";
import User from "../model/user.model.js";
import asynchandler from "../utils/asynchandler.js";
import { createLogger } from "../utils/logger.js";

const logger = createLogger("login");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    logger.info("Login request received", { email });

    if (!email || !password) {
      logger.warn("Login failed: missing credentials", { email });
      return res
        .status(400)
        .json({ message: "Email and Password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      logger.warn("Login failed: user not found", { email });
      return res.status(404).json({ message: "User not found" });
    }

    const validPassword = await user.comparePassword(password);
    if (!validPassword) {
      logger.warn("Login failed: invalid password", { email });
      return res.status(401).json({ message: "Incorrect Password" });
    }

    const token = generateToken(user._id, res);
    if (!token) {
      logger.error("Login failed: token generation error", { userId: user._id });
      return res.status(500).json({ message: "Internal Server Error" });
    }

    const userDetail = await User.findOne({ email }).select("-password");

    logger.info("Login successful", { userId: user._id, email });
    return res
      .status(200)
      .json({ message: "LoggedIn Successfully", userDetail, token });
  } catch (error) {
    logger.error("Login handler error", { message: error.message });
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const checkAuthUser = (req, res) => {
  logger.info("Auth check passed", { userId: req.user });
  return res.status(200).json({
    success: true,
    message: "User is authenticated",
    user: req.user,
  });
};

const registerYear = asynchandler(async (req, res) => {
  const userId = req.user;
  logger.info("Register year request received", { userId });
  const year = await User.findById(userId).select("createdAt");
  logger.info("User registration date fetched", { userId, createdAt: year });
  const registerYear = year.createdAt.getFullYear();
  logger.info("Register year fetched", { userId, year: registerYear });
  res.status(200).json({ year: registerYear });
});

export { loginUser, checkAuthUser, registerYear };
