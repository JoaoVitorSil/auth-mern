import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ success: false, message: "Token not provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded) {
            return res.status(401).json({ success: false, message: "Token invalid" });
        }
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log("Error in verification ", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
}