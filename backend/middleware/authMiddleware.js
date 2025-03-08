const jwt = require('jsonwebtoken');

// Middleware to protect routes using session
exports.protectRoute = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Unauthorized access" });
    }
    next();
};

// // Middleware to verify JWT token
// exports.verifyToken = (req, res, next) => {
//     const token = req.header('Authorization');
//     if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         res.status(400).json({ message: 'Invalid token.' });
//     }
// };

// const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization; // Check for 'Authorization' header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1]; // Extract token without "Bearer"

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure JWT_SECRET matches
        req.user = decoded; // Store user details in request for further use
        next();
    } catch (error) {
        return res.status(400).json({ message: "Invalid token." });
    }
};
