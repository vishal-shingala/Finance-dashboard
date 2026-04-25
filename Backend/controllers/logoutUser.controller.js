const logoutUser = (req, res) => {
  try {
    const isProduction = process.env.NODE_ENV === "production";
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: isProduction ? "none" : "lax",
      secure: isProduction,
    });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
  
};

export default logoutUser;
