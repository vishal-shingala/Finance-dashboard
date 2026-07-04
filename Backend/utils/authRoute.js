import { verifyToken } from "./token.js";
import { createLogger } from "./logger.js";

const logger = createLogger("auth");

const authRoute = (req, res, next) => {
    try {
        const token = req.cookies.jwt || (req.headers.authorization && req.headers.authorization.split(" ")[1]);
        if (!token) {
            logger.warn("Authorization failed: token not available", {
                path: req.originalUrl,
                method: req.method,
            });
            return res.status(401).json({ message: "Token not available" });
        }

        const decoded = verifyToken(token);
        if (!decoded) {
            logger.warn("Authorization failed: token verification failed", {
                path: req.originalUrl,
                method: req.method,
            });
            return res.status(401).json({ message: "Token verification failed" });
        }
        
        req.user = decoded.value;
        logger.info("Token verified", {
            userId: req.user,
            path: req.originalUrl,
            method: req.method,
        });
        next(); 
    } catch (error) {
        logger.error("Authorization middleware error", {
            message: error.message,
            path: req.originalUrl,
            method: req.method,
        });
        return res.status(500).json({ message: "Unauthorized", error: error.message });
    }
};
export default authRoute;
