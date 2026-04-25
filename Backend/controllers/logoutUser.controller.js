import { createLogger } from "../utils/logger.js";

const logger = createLogger("logout");

const logoutUser = (req, res) => {
  try {
    logger.info("Logout request received", { userId: req.user });
    const isProduction = process.env.NODE_ENV === "production";
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: isProduction ? "none" : "lax",
      secure: isProduction,
    });
    logger.info("Logout successful", { userId: req.user });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    logger.error("Logout handler error", { message: error.message, userId: req.user });
    return res.status(500).json({ message: "Internal Server Error" });
  }
  
};

export default logoutUser;
