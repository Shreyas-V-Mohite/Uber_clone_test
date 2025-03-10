// API request handlers
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5001/api";

// Customer Authentication
export const signup = async (userData) => {
    return axios.post(`${API_URL}/auth/signup`, userData);
};

export const login = async (credentials) => {
    return axios.post(`${API_URL}/auth/login`, credentials);
};

// **Toggle Favorite Restaurant**
export const toggleFavoriteRestaurant = async (restaurantId, isFavorite) => {
    try {
        const response = await axios.post(`${API_URL}/favorites/toggle`, { restaurantId, isFavorite });
        return response.data;
    } catch (error) {
        console.warn("Backend not available for favorite toggle, using local state.");
        return { success: true };
    }
};

// **Fetch Restaurants**
export const getRestaurants = async () => {
    try {
        const response = await axios.get(`${API_URL}/restaurants`);
        return response.data;
    } catch (error) {
        console.warn("@Backend not available, using placeholder data.");
        return [
            { id: 1, name: "Mcdonalds", cuisine: "Fast Food", rating: 4.5, image: "/images/burger.jpg" },
            { id: 2, name: "Annapoorna", cuisine: "Indian Cuisine", rating: 3.8, image: "/images/biryani.jpg" },
            { id: 3, name: "Urban Momo", cuisine: "Nepali Cuisine", rating: 4.2, image: "/images/momos.jpg" },
            { id: 4, name: "Chipotle Mexican Grill", cuisine: "Mexican, Fast Food", rating: 4.7, image: "/images/chipotle.jpg" }
        ];
    }
};


// ✅ Get all restaurants (Make sure to include authentication headers) gpt version
// export const getRestaurants = async () => {
//     try {
//         const token = localStorage.getItem("token");  // Retrieve JWT from local storage
//         const response = await axios.get(`${API_URL}/restaurants`, {
//             headers: { Authorization: `Bearer ${token}` },
//             withCredentials: true, // Important for session cookies
//         });
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching restaurants:", error);
//         throw error;
//     }
// };

// ✅ Get logged-in restaurant details gpt version
// export const getRestaurantDetails = async () => {
//     try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(`${API_URL}/restaurants/me`, {
//             headers: { Authorization: `Bearer ${token}` },
//             withCredentials: true,
//         });
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching restaurant details:", error);
//         throw error;
//     }
// };


// **Fetch Restaurant Details (Customer Side)**
export const getRestaurantInfo = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/restaurants/${id}`);
        return response.data;
    } catch (error) {
        console.warn(`#Backend not available for restaurant ${id}, using placeholder data.`);
        return {
            id,
            name: `Restaurant ${id}`,
            cuisine: "Sample Cuisine",
            rating: 4.5,
            image: "https://via.placeholder.com/600",
            menu: [
                { id: 1, name: "Mcdonalds", price: 5.99, image: "/images/burger.jpg" },
                { id: 2, name: "Annapoorna", price: 7.99, image: "/images/biryani.jpg" },
                { id: 3, name: "Urban Momo", price: 9.99, image: "/images/momos.jpg" },
                { id: 4, name: "Chipotle Mexican", price: 9.99, image: "/images/chipotle.jpg" },
            ]
        };
    }
};

// **Place an Order**
export const placeOrder = async (orderData) => {
    try {
        console.log("Placing order:", orderData);
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

//-----------------------------------
// Restaurant Authentication
export const signupRestaurant = async (restaurantData) => {
    return axios.post(`${API_URL}/auth/restaurant-signup`, restaurantData);
};

export const loginRestaurant = async (credentials) => {
    return axios.post(`${API_URL}/auth/restaurant-login`, credentials);
};

// // **Get Logged-in Restaurant Details**
// export const getRestaurantDetails = async () => {
//     try {
//         const response = await axios.get(`${API_URL}/restaurants/me`, { withCredentials: true });
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching restaurant details:", error);
//         throw error;
//     }
// };
// **Get Logged-in Restaurant Details**
export const getRestaurantDetails = async () => {
    try {
        const token = localStorage.getItem("jwtToken"); // Retrieve JWT from local storage
        console.log("token after retrival", token);
        const response = await axios.get(`${API_URL}/restaurants/me`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching restaurant details:", error);
        throw error;
    }
};

// **Get Orders for the Logged-in Restaurant**
// export const getOrdersByRestaurant = async (restaurantId) => {
//     try {
//         const response = await axios.get(`${API_URL}/orders/restaurant/${restaurantId}`);
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching orders:", error);
//         return [];
//     }
// };
export const getOrdersByRestaurant = async (restaurantId) => {
    try {
        console.log("restaurantId in getOrdersByRest", restaurantId);
        const token = localStorage.getItem("jwtToken"); // Retrieve JWT from local storage
        const response = await axios.get(`${API_URL}/orders/restaurant/${restaurantId}`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });
        console.log("response in getOrdersByRest", response);
        return response.data;
    } catch (error) {
        console.error("Error fetching orders:", error);
        return [];
    }
};
// -----------------------------------
// Restaurant Dasboard

// **Update Order Status**
// export const updateOrderStatus = async (orderId, status) => {
//     try {
//         const token = localStorage.getItem("jwtToken"); // Retrieve JWT from local storage
//         const response = await axios.put(`${API_URL}/orders/${orderId}/status`, { status }, {
//             headers: { Authorization: `Bearer ${token}` },
//             withCredentials: true,
//         });
//         return response.data;
//     } catch (error) {
//         console.error("Error updating order status:", error);
//         throw error;
//     }
// };

export const updateOrderStatus = async (orderId, status) => {
    try {
        const token = localStorage.getItem("jwtToken"); // Retrieve JWT from local storage
        const response = await axios.put(`${API_URL}/orders/status/${orderId}`, { status }, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });
        console.log("response in updateOrderStatus", response);
        return response.data;
    } catch (error) {
        console.error("Error updating order status:", error);
        throw error;
    }
};
// **Add a New Dish**
export const addDish = async (dishData) => {
    try {
        const response = await axios.post(`${API_URL}/dishes`, dishData);
        return response.data;
    } catch (error) {
        console.error("Error adding dish:", error);
        throw error;
    }
};

// **Delete a Dish**
export const deleteDish = async (dishId) => {
    try {
        await axios.delete(`${API_URL}/dishes/${dishId}`);
    } catch (error) {
        console.error("Error deleting dish:", error);
    }
};