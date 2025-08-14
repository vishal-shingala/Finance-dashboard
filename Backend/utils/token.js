import jwt from "jsonwebtoken";
const createToken = (value) => {
  const token = jwt.sign({ value }, process.env.JWTSECRET, {
    expiresIn: "30m",
  });
  return token;
};

const verifyToken = (value) => {
  const decode = jwt.verify(value, process.env.JWTSECRET);
  return decode;
};

const generateToken = (userId,res) =>{
  const token = createToken(userId);
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });
  return token;
}

export { createToken, verifyToken, generateToken };
