const authRoute = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Token not available" });
        }

        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(401).json({ message: "Token verification failed" });
        }

        req.user = decoded;
        next(); 
    } catch (error) {
        return res.status(500).json({ message: "Unauthorized", error: error.message });
    }
};
export default authRoute;
