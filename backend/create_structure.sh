#!/bin/bash

# Define the main project directory
# PROJECT_DIR="backend"

# Create main project directory
# mkdir -p $PROJECT_DIR
# cd $PROJECT_DIR || exit

# Create subdirectories
# node_modules directory is not created as it will be installed via npm
mkdir -p config controllers middleware models routes swagger uploads

# Create files with comments

# Config directory
echo "// Database connection setup" > config/db.js

# Controllers
echo "// User authentication logic" > controllers/authController.js
echo "// Customer-related actions" > controllers/customerController.js
echo "// Restaurant-related actions" > controllers/restaurantController.js
echo "// Dish management" > controllers/dishController.js
echo "// Order processing" > controllers/orderController.js

# Middleware
echo "// Authentication & authorization checks" > middleware/authMiddleware.js

# Models
echo "// Customer schema/model" > models/Customer.js
echo "// Restaurant schema/model" > models/Restaurant.js
echo "// Dish schema/model" > models/Dish.js
echo "// Order schema/model" > models/Order.js

# Routes
echo "// Routes for login/signup" > routes/authRoutes.js
echo "// Customer profile, favorites" > routes/customerRoutes.js
echo "// Restaurant CRUD operations" > routes/restaurantRoutes.js
echo "// Dish management" > routes/dishRoutes.js
echo "// Order placement & tracking" > routes/orderRoutes.js

# Swagger
echo "{}" > swagger/swagger.json  # Empty JSON file for Swagger documentation

# Root files
touch uploads/.gitkeep  # Keeps uploads directory tracked
touch .env  # Environment variables file
# touch package.json  # Placeholder for dependencies
echo "// Main entry point" > server.js

# Output success message
echo "Backend folder structure created successfully."
