const bcrypt = require("bcryptjs");
const Customer = require("../models/Customer");

// Signup Controller
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

// Login Controller
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const customer = await Customer.findOne({ where: { email } });
        if (!customer) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, customer.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        req.session.user = { id: customer.id, name: customer.name, email: customer.email };
        res.status(200).json({ message: "Login successful", user: req.session.user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Logout Controller
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Error logging out" });
        }
        res.status(200).json({ message: "Logout successful" });
    });
};

// Get Current User
exports.getCurrentUser = (req, res) => {
    if (req.session.user) {
        res.json({ user: req.session.user });
    } else {
        res.status(401).json({ message: "Not logged in" });
    }
};
