// Middleware to protect routes using session
// exports.protectRoute = (req, res, next) => {
//     if (!req.session.user) {
//         return res.status(401).json({ message: "Unauthorized access" });
//     }
//     next();
// };
const jwt = require("jsonwebtoken");

exports.protectRoute = (req, res, next) => {
    const authHeader = req.headers.authorization;

    console.log("Authorization Header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authorization header missing or invalid" });
    }

    const token = authHeader.split(" ")[1];

    try {
        // ✅ Decode token and attach user details to request
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "supersecretkey");
        console.log("Decoded Token:", decoded);

        req.user = decoded; // ✅ Attach user info to request object
        next(); // ✅ Proceed to next middleware/controller
    } catch (error) {
        console.error("Invalid token:", error);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};



// Middleware to verify JWT token
exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization; // Check for 'Authorization' header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1]; // Extract token without "Bearer"
    console.log("Token received:", token); // Debugging line

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "supersecretkey"); // Ensure JWT_SECRET matches
        console.log("Token decoded:", decoded); // Debugging line
        req.user = decoded; // Store user details in request for further use
        next();
    } catch (error) {
        console.error("Token verification failed:", error); // Debugging line
        return res.status(400).json({ message: "Invalid token." });
    }
};
