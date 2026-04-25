import jwt from "jsonwebtoken";
import { createLogger } from "./logger.js";

const logger = createLogger("token");

const createToken = (value) => {
  const token = jwt.sign({ value }, process.env.JWTSECRET, {
    expiresIn: "30m",
  });
  logger.info("JWT created", { userId: value });
  return token;
};

const verifyToken = (value) => {
  const decode = jwt.verify(value, process.env.JWTSECRET);
  logger.info("JWT verified");
  return decode;
};

const generateToken = (userId,res) =>{
  const token = createToken(userId);
  const isProduction = process.env.NODE_ENV === "production";
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  });
  logger.info("JWT cookie set", {
    userId,
    isProduction,
  });
  return token;
}

export { createToken, verifyToken, generateToken };
