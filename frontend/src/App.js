import React, { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Favourite  from "./pages/Favourites";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import { AuthContext } from "./context/AuthContext";
import { useLocation } from "react-router-dom";
import RestaurantSignup from "./pages/RestaurantSignup";
import RestaurantLogin from "./pages/RestaurantLogin";
import RestaurantDashboard from "./pages/RestaurantDashboard";

function LandingPage() {
    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Welcome to UberEATS Prototype</h1>
            <p>Please <a href="/login">Login</a> or <a href="/signup">Sign Up</a> to continue.</p>
        </div>
    );
}

function App() {
    const { user, restaurant } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation(); // ✅ Get the current path
    // Redirect to dashboard when user logs in
    useEffect(() => {

    const allowedRoutes = ["/cart", "/restaurants/:id", "/dashboard", "/favourite", "/restaurant-dashboard"]; // ✅ Expandable list

    const isAllowed = allowedRoutes.some((route) => 
        location.pathname.startsWith(route.replace(":id", "")) // ✅ Handle dynamic routes
    );

    // if(restaurant && !isAllowed && !user) {
    //     navigate("/restaurant-dashboard");
    // }
    if (user && !restaurant && !isAllowed) {
        console.log("user", user);
        console.log("restaurant", restaurant);
        console.log("isAllowed", isAllowed);
        
        
        
        navigate("/dashboard");
    }
    }, [user, navigate, restaurant, location.pathname]);

    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={!user ? <Home /> : <Dashboard />} />
                <Route path="/signup" element={!user ? <Signup /> : <Dashboard />} />
                <Route path="/login" element={!user ? <Login /> : <Dashboard />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/restaurants/:id" element={<Menu />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/favourite" element={<Favourite />} />
                <Route path="/restaurant-signup" element={!user ? <RestaurantSignup />: <Dashboard />} />
                <Route path="/restaurant-login" element={<RestaurantLogin />} />
                <Route path="/restaurant-dashboard" element={<ProtectedRoute><RestaurantDashboard /></ProtectedRoute>} />

            </Routes>
            <Footer />
        </>
    );
}

export default App;
