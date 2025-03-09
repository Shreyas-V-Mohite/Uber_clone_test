import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

const RestaurantLogin = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("$handle submit", formData);
            const res = await axios.post("http://localhost:5001/api/auth/restaurant-login", formData, { withCredentials: true });
            const { token, restaurant } = res.data;
            console.log("token on login", token);
            localStorage.setItem("jwtToken", token); // Store the JWT token in local storage
            login(restaurant, token, true); // Pass the token and isRestaurant = true to the login function
            navigate("/restaurant-dashboard"); // Redirect to restaurant dashboard
            console.log("login successful");
        } catch (err) {
            setMessage(err.response?.data?.message || "Error logging in");
        }
    };

    return (
        <Container fluid className="d-flex align-items-center justify-content-center vh-100"
            style={{
                backgroundImage: "url('/images/food2.jpg')", // Match homepage background
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <Row className="w-100 justify-content-center">
                <Col md={4}>
                    <Card className="p-4 shadow-lg" style={{ background: "rgba(0, 0, 0, 0.8)", borderRadius: "10px" }}>
                        <h2 className="text-center text-light mb-4">Restaurant Login</h2>
                        {message && <p className="text-danger text-center">{message}</p>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Restaurant Email"
                                    onChange={handleChange}
                                    required
                                    className="form-control"
                                    style={{ background: "rgba(255, 255, 255, 0.8)", color: "#000" }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={handleChange}
                                    required
                                    className="form-control"
                                    style={{ background: "rgba(255, 255, 255, 0.8)", color: "#000" }}
                                />
                            </Form.Group>
                            <Button type="submit" className="btn btn-success w-100">Login</Button>
                        </Form>
                        <div className="text-center mt-3">
                            <p className="text-light">
                                Don't have an account? <a href="/restaurant-signup" className="text-warning">Sign Up</a>
                            </p>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default RestaurantLogin;
