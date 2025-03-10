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

// ✅ Toggle Favorite
export const toggleFavoriteRestaurant = async (restaurantId, isFavorite) => {
    try {
        const token = localStorage.getItem("jwtToken"); // ✅ Retrieve JWT from local storage
        if (!token) throw new Error("JWT token missing");

        const response = await axios.post(
            `${API_URL}/favorites/toggle`,
            { restaurantId, isFavorite },
            {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true, // ✅ Ensure cookies are included
            }
        );

        return response.data;
    } catch (error) {
        console.error("Failed to toggle favorite:", error);
        throw error;
    }
};


export const getFavoriteRestaurants = async () => {
    try {
        const token = localStorage.getItem("jwtToken"); // ✅ Retrieve JWT from localStorage
        console.log("Token being used:", token);
        
        if (!token) throw new Error("JWT token missing");

        // ✅ Pass token in the headers
        const response = await axios.get(`${API_URL}/favorites`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching favorite restaurants:", error);
        throw error;
    }
};




// **Fetch Restaurants**
// export const getRestaurants = async () => {
//     try {
//         const response = await axios.get(`${API_URL}/restaurants`);
//         return response.data;
//     } catch (error) {
//         console.warn("@Backend not available, using placeholder data.");
//         return [
//             { id: 1, name: "Mcdonalds", cuisine: "Fast Food", rating: 4.5, image: "/images/burger.jpg" },
//             { id: 2, name: "Annapoorna", cuisine: "Indian Cuisine", rating: 3.8, image: "/images/biryani.jpg" },
//             { id: 3, name: "Urban Momo", cuisine: "Nepali Cuisine", rating: 4.2, image: "/images/momos.jpg" },
//             { id: 4, name: "Chipotle Mexican Grill", cuisine: "Mexican, Fast Food", rating: 4.7, image: "/images/chipotle.jpg" }
//         ];
//     }
// };

export const getRestaurants = async () => {
    try {
        const response = await axios.get(`${API_URL}/restaurants`, {withCredentials: true});
        const favorites = await getFavoriteRestaurants(); // ✅ Get favorites
        const favoriteIds = new Set(favorites.map(fav => fav.id));
        return response.data.map(restaurant => ({
            ...restaurant,
            isFavorite: favoriteIds.has(restaurant.id)
        }));
    } catch (error) {
        console.warn("Failed to load restaurants.");
        throw error;
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
        const response = await axios.get(`${API_URL}/restaurants/${id}`,{withCredentials: true});
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
        const token = localStorage.getItem("jwtToken"); // Retrieve JWT from local storage
        const response = await axios.post(`${API_URL}/orders`, orderData, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error placing order:", error);
        throw error;
    }
};

// **Get Customer Orders**
export const getCustomerOrders = async () => {
    try {
        const token = localStorage.getItem("jwtToken"); // Retrieve JWT from local storage
        const response = await axios.get(`${API_URL}/orders/customer`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching customer orders:", error);
        throw error;
    }
};

// **Cancel Order**
export const cancelOrder = async (orderId) => {
    try {
        const token = localStorage.getItem("jwtToken"); // Retrieve JWT from local storage
        const response = await axios.put(`${API_URL}/orders/cancel/${orderId}`, {}, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error canceling order:", error);
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
export const getRestaurantDetails = async (id) => {
    try {
        console.log("id in getRestaurantDetails in  api.js", id);
        const token = localStorage.getItem("jwtToken"); // Retrieve JWT from local storage
        console.log("token after retrieval", token);
        const response = await axios.get(`${API_URL}/restaurants/${id}`, {
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
// // **Add a New Dish**
// export const addDish = async (dishData) => {
//     try {
//         const response = await axios.post(`${API_URL}/dishes`, dishData);
//         return response.data;
//     } catch (error) {
//         console.error("Error adding dish:", error);
//         throw error;
//     }
// };

// // **Delete a Dish**
// export const deleteDish = async (dishId) => {
//     try {
//         await axios.delete(`${API_URL}/dishes/${dishId}`);
//     } catch (error) {
//         console.error("Error deleting dish:", error);
//     }
// };

// **Add a New Dish**
export const addDish = async (dishData) => {
    try {
        const token = localStorage.getItem("jwtToken"); // Retrieve JWT from local storage
        const response = await axios.post(`${API_URL}/dishes`, dishData, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error adding dish:", error);
        throw error;
    }
};

// **Delete a Dish**
export const deleteDish = async (dishId) => {
    try {
        const token = localStorage.getItem("jwtToken"); // Retrieve JWT from local storage
        await axios.delete(`${API_URL}/dishes/${dishId}`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });
    } catch (error) {
        console.error("Error deleting dish:", error);
    }
};

// **Get Dishes by Restaurant**
export const getDishesByRestaurant = async (restaurantId) => {
    try {
        const token = localStorage.getItem("jwtToken"); // Retrieve JWT from local storage
        const response = await axios.get(`${API_URL}/dishes/${restaurantId}`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching dishes:", error);
        throw error;
    }
};

// **Get Dish by ID**
export const getDishById = async (dishId) => {
    console.log("dishId in getDishById", dishId);
    try {
        const token = localStorage.getItem("jwtToken"); // Retrieve JWT from local storage
        const response = await axios.get(`${API_URL}/dishes/dish/${dishId}`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching dish details:", error);
        throw error;
    }
};