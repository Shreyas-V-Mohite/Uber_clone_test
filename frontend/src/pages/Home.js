import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaUser, FaUtensils, FaSignInAlt } from "react-icons/fa";

const Home = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div 
            className="container-fluid d-flex vh-100 p-0 position-relative" 
            style={{
                backgroundImage: "url('/images/food2.jpg')", // Use your actual image path
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            {/* Sidebar Menu */}
            <div className={`sidebar bg-dark text-light p-4 ${isSidebarOpen ? "open" : ""}`} 
                style={{
                    width: isSidebarOpen ? "270px" : "0",
                    overflowX: "hidden",
                    transition: "width 0.3s ease-in-out",
                    position: "absolute",
                    height: "100%",
                    zIndex: 1000,
                    backgroundColor: "rgb(15, 23, 42)", // Dark theme for consistency
                }}>
                {isSidebarOpen && (
                    <>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h4 className="fw-bold text-light ms-auto">Uber <span className="text-success">Eats</span></h4>
                            
                        </div>
                        <ul className="list-unstyled">
                            <li className="mb-3">
                                <Link to="/signup" className="btn btn-success w-100">Sign Up</Link>
                            </li>
                            <li className="mb-3">
                                <Link to="/login" className="btn btn-outline-light w-100">Log In</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="#" className="text-light d-flex align-items-center">
                                    <FaUser className="me-2" /> Create a business account
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="#" className="text-light d-flex align-items-center">
                                    <FaUtensils className="me-2" /> Add your restaurant
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/restaurant-login" className="text-light d-flex align-items-center">
                                    <FaSignInAlt className="me-2" /> Restaurant Login
                                </Link>
                            </li>
                        </ul>
                        <div className="mt-auto">
                            <p className="small text-light">There’s more to love in the app.</p>
                            <button className="btn btn-outline-light btn-sm me-2">iPhone</button>
                            <button className="btn btn-outline-light btn-sm">Android</button>
                        </div>
                    </>
                )}
            </div>

            {/* Sidebar Toggle Button */}
            <button
                className="btn btn-dark position-absolute top-2 start-2 m-3"
                style={{ zIndex: 1100 }}
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>

            {/* Main Content - Centered on Image */}
            <div className="d-flex flex-grow-1 align-items-center justify-content-end text-end pe-5">
                <div>
                    <h1 className="display-3 fw-bold text-light">
                        Order <span className="text-success">delivery</span> near you
                    </h1>
                    <div className="mt-4 d-flex">
                        <input
                            type="text"
                            placeholder="Enter delivery address"
                            className="form-control w-50 me-2"
                            style={{ maxWidth: "300px", background: "rgba(255, 255, 255, 0.8)" }}
                        />
                        <button className="btn btn-light me-2">Deliver now</button>
                        <button className="btn btn-light">Search here</button>
                    </div>
                    <p className="mt-3">
                        <Link to="/login" className="text-warning fw-bold">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Home;
