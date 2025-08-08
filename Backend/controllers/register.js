import User from "../model/user.model.js";

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
  res.status(201).json({ message: "User registered successfully.", user });
});

export default register;