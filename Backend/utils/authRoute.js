import { verifyToken } from "./token.js";

const authRoute = (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "Token not available" });
        }

        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(401).json({ message: "Token verification failed" });
        }
        console.log("Token verified");
        
        req.user = decoded.value;
        console.log("User ID:", req.user);
        next(); 
    } catch (error) {
        return res.status(500).json({ message: "Unauthorized", error: error.message });
    }
};
export default authRoute;
