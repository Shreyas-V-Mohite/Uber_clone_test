import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Stores logged-in Customer
    const [restaurant, setRestaurant] = useState(null); // Stores logged-in Restaurant

    // Function to get the JWT token from local storage
    const getToken = () => {
        const token = localStorage.getItem("jwtToken");
        console.log("In Authcontext getToken", token);
        return token;
    };

    // Set up axios instance with default headers
    const axiosInstance = axios.create({
        baseURL: "http://localhost:5001/api",
        headers: {
            "Content-Type": "application/json",
        },
    });

    // Add a request interceptor to include the JWT token in the headers
    axiosInstance.interceptors.request.use(
        (config) => {
            const token = getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // ✅ Check if customer or restaurant is logged in on app load
    useEffect(() => {
        const token = getToken();
        if (token) {
            axiosInstance.get("/auth/me")
                .then((res) => {
                    console.log("User from authcontext 1", res.data.user);
                    setUser(res.data.user);
                })
                .catch(() => setUser(null));

            axiosInstance.get("/restaurants/me")
                .then((res) => {
                    console.log("Restaurant from authcontext 1", res.data.restaurant);
                    setRestaurant(res.data.restaurant);
                    console.log("Restaurant from authcontext 2", restaurant);
                })
                .catch((err) => {
                    console.log("Error fetching restaurant details:", err);
                    setRestaurant(null);
                });
        }
    }, []);

    // ✅ Login Function (Handles both Customers & Restaurants)
    const login = (data, token, isRestaurant = false) => {
        localStorage.setItem("jwtToken", token); // Store the JWT token in local storage
        if (isRestaurant) {
            console.log("In Authcontext restaurants", data);
            setRestaurant(data);
            localStorage.setItem("restaurant", JSON.stringify(data));
        } else {
            console.log("In Authcontext user", data);
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
            console.log("In Authcontext getToken------", localStorage.getItem("jwtToken"));
        }
    };

    // ✅ Logout Function (Handles both Customers & Restaurants)
    const logout = async () => {
        await axiosInstance.post("/auth/logout");
        setUser(null);
        setRestaurant(null);
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("user");
        localStorage.removeItem("restaurant");
    };

    return (
        <AuthContext.Provider value={{ user, restaurant, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
