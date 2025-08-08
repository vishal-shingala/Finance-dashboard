import jwt from "jsonwebtoken";
const createToken = (value) => {
  const token = jwt.sign({ value }, process.env.JWTSECRET, {
    expiresIn: "15m",
  });
  return token;
};

const verifyToken = (value) => {
  const decode = jwt.verify(value, process.env.JWTSECRET);
  return decode;
};

export { createToken, verifyToken };
