// API request handlers
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5001/api";

export const signup = async (userData) => {
    return axios.post(`${API_URL}/auth/signup`, userData);
};

export const login = async (credentials) => {
    return axios.post(`${API_URL}/auth/login`, credentials);
};

export const getRestaurants = async () => {
    return axios.get(`${API_URL}/restaurants`);
};
