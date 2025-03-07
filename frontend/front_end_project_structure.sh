#!/bin/bash

# Define the main project directory
# PROJECT_DIR="frontend"

# Create main project directory
# mkdir -p $PROJECT_DIR
# cd $PROJECT_DIR || exit

# Create subdirectories
# node_modules directory is not created as it will be installed via npm
# public directory is not created as it will be generated
# uploads directory is not created as it will be generated
mkdir -p src/assets src/components src/pages src/services

# Create files with comments

# Components
echo "// Navigation bar component" > src/components/Navbar.js
echo "// Footer component" > src/components/Footer.js

# Pages
echo "// Homepage layout and logic" > src/pages/Home.js
echo "// Signup page UI and form handling" > src/pages/Signup.js
echo "// Login page UI and authentication" > src/pages/Login.js
echo "// Customer profile page" > src/pages/CustomerProfile.js
echo "// Restaurant dashboard" > src/pages/RestaurantDashboard.js
echo "// Dish listing page" > src/pages/Menu.js
echo "// Shopping cart page" > src/pages/Cart.js
echo "// Favorites list page" > src/pages/Favourites.js

# Services
echo "// API request handlers" > src/services/api.js

# Root application files
# echo "// Main application component" > src/App.js
# echo "// Entry point of the application" > src/index.js

# Project configuration files
touch .env  # Environment variables file
# echo "{}" > package.json  # Placeholder for dependencies

# Output success message
echo "Frontend folder structure created successfully."
