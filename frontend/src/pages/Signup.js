import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5001/api/auth/signup", formData);
            setMessage(res.data.message);
            setTimeout(() => navigate("/login"), 2000); // Redirect to login after successful signup
        } catch (err) {
            setMessage(err.response?.data?.message || "Error signing up");
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
                        <h2 className="text-center text-light mb-4">Sign Up</h2>
                        {message && <p className="text-success text-center">{message}</p>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    onChange={handleChange}
                                    required
                                    className="form-control"
                                    style={{ background: "rgba(255, 255, 255, 0.8)", color: "#000" }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Email"
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
                            <Button type="submit" className="btn btn-success w-100">Sign Up</Button>
                        </Form>
                        <div className="text-center mt-3">
                            <p className="text-light">
                                Already have an account? <a href="/login" className="text-warning">Login</a>
                            </p>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Signup;
