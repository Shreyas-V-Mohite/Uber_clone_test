require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(
    session({
        secret: process.env.SESSION_SECRET || "supersecretkey",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false },
    })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/restaurants", restaurantRoutes);

// Sync database models
sequelize.sync()
    .then(() => console.log("Database & tables synchronized"))
    .catch(err => console.error("Error syncing database:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
