// API request handlers
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5001/api";

// User Authentication
export const signup = async (userData) => {
    return axios.post(`${API_URL}/auth/signup`, userData);
};

export const login = async (credentials) => {
    return axios.post(`${API_URL}/auth/login`, credentials);
};

// Fetch Restaurants (Use Placeholder Data Until Backend is Ready)
export const getRestaurants = async () => {
    try {
        const response = await axios.get(`${API_URL}/restaurants`);
        return response.data;
    } catch (error) {
        console.warn("Backend not available, using placeholder data.");
        return [
            { id: 1, name: "Mcdonalds", cuisine: "Fast Food", rating: 4.5, image: "https://via.placeholder.com/200" },
            { id: 2, name: "Annapoorna", cuisine: "Indian Cuisine", rating: 3.8, image: "https://via.placeholder.com/200" },
            { id: 3, name: "Urban Momo", cuisine: "Nepali Cuisine", rating: 4.2, image: "https://via.placeholder.com/200" },
            { id: 4, name: "Chipotle Mexican Grill", cuisine: "Mexican, Fast Food", rating: 4.7, image: "https://via.placeholder.com/200" }
        ];
    }
};

// Fetch Restaurant Details & Menu (Use Placeholder Data Until Backend is Ready)
export const getRestaurantDetails = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/restaurants/${id}`);
        return response.data;
    } catch (error) {
        console.warn(`Backend not available for restaurant ${id}, using placeholder data.`);
        return {
            id,
            name: `Restaurant ${id}`,
            cuisine: "Sample Cuisine",
            rating: 4.5,
            image: "https://via.placeholder.com/600",
            menu: [
                { id: 1, name: "Burger", price: 5.99, image: "https://via.placeholder.com/150" },
                { id: 2, name: "Pasta", price: 7.99, image: "https://via.placeholder.com/150" },
                { id: 3, name: "Pizza", price: 9.99, image: "https://via.placeholder.com/150" }
            ]
        };
    }
};

export const placeOrder = async (orderData) => {
    try {
      console.log("Placing order:", orderData); // Debugging
  
      // Simulating API request delay
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() < 0.9) {
            resolve("Order placed successfully!");
          } else {
            reject("Order failed! Try again.");
          }
        }, 1000);
      });
    } catch (error) {
      console.error("Error placing order:", error);
      throw error;
    }
  };
  