
// import React, { useContext, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Signup from "./pages/Signup";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import ProtectedRoute from "./components/ProtectedRoute";
// import { AuthContext } from "./context/AuthContext";

// function LandingPage() {
//     return (
//         <div style={{ textAlign: "center", marginTop: "50px" }}>
//             <h1>Welcome to UberEATS Prototype</h1>
//             <p>Please <a href="/login">Login</a> or <a href="/signup">Sign Up</a> to continue.</p>
//         </div>
//     );
// }

// function App() {
//     const { user } = useContext(AuthContext);
//     const navigate = useNavigate();

//     // Redirect to dashboard when user logs in
//     useEffect(() => {
//         if (user) {
//             navigate("/dashboard");
//         }
//     }, [user, navigate]);

//     return (
//         <Router>
//             <Navbar />
//             <Routes>
//                 <Route path="/" element={!user ? <LandingPage /> : <Dashboard />} />
//                 <Route path="/signup" element={!user ? <Signup /> : <Dashboard />} />
//                 <Route path="/login" element={!user ? <Login /> : <Dashboard />} />
//                 <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
//             </Routes>
//         </Router>
//     );
// }

// export default App;

import React, { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthContext } from "./context/AuthContext";

function LandingPage() {
    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Welcome to UberEATS Prototype</h1>
            <p>Please <a href="/login">Login</a> or <a href="/signup">Sign Up</a> to continue.</p>
        </div>
    );
}

function App() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // Redirect to dashboard when user logs in
    useEffect(() => {
        if (user) {
            navigate("/dashboard");
        }
    }, [user, navigate]);

    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={!user ? <LandingPage /> : <Dashboard />} />
                <Route path="/signup" element={!user ? <Signup /> : <Dashboard />} />
                <Route path="/login" element={!user ? <Login /> : <Dashboard />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            </Routes>
        </>
    );
}

export default App;
