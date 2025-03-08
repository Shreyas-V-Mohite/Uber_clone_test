const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Customer = require("../models/Customer");
const Restaurant = require("../models/Restaurant");

// 🔹 **Signup Controller** (No major change needed)
exports.signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingCustomer = await Customer.findOne({ where: { email } });
        if (existingCustomer) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newCustomer = await Customer.create({ name, email, password: hashedPassword });

        res.status(201).json({ message: "User registered successfully", user: newCustomer });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// 🔹 **Login Controller (Now Uses JWT)**
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 🔹 Check if user is a customer
        let user = await Customer.findOne({ where: { email } });
        let role = "customer";

        // 🔹 If not found, check if it's a restaurant
        if (!user) {
            user = await Restaurant.findOne({ where: { email } });
            role = "restaurant";
        }

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // 🔹 Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // 🔹 Generate JWT Token
        const token = jwt.sign(
            { id: user.id, email: user.email, role },
            process.env.JWT_SECRET || "supersecretkey",
            { expiresIn: "1h" } // Token expires in 1 hour
        );

        res.status(200).json({
            message: "Login successful",
            token, // 🔹 Now the token is included in response
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// 🔹 **Get Current User (Now Extracts Data from JWT)**
exports.getCurrentUser = (req, res) => {
    try {
        const authHeader = req.header("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const token = authHeader.split(" ")[1]; // Extract token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "supersecretkey");

        res.status(200).json({ user: decoded });
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

// 🔹 **Logout (JWT is Stateless, So We Just Clear Frontend Storage)**
exports.logout = (req, res) => {
    res.status(200).json({ message: "Logout successful (Clear token from frontend storage)" });
};
