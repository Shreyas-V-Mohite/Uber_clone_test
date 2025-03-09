import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const RestaurantSignup = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        location: "",
        description: "",
        contact_info: "",
        images: "",
        timings: ""
    });

    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5001/api/auth/restaurant-signup", formData);
            console.log("@@")
            setMessage(res.data.message);
            setTimeout(() => navigate("/restaurant-login"), 2000); // Redirect after success
        } catch (err) {
            setMessage(err.response?.data?.message || "Error signing up");
        }
    };

    return (
        <Container fluid className="d-flex align-items-center justify-content-center vh-100"
            style={{
                backgroundImage: "url('/images/food2.jpg')", // Use same homepage background
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <Row className="w-100 justify-content-center">
                <Col md={4}>
                    <Card className="p-4 shadow-lg" style={{ background: "rgba(0, 0, 0, 0.8)", borderRadius: "10px" }}>
                        <h2 className="text-center text-light mb-4">Restaurant Signup</h2>
                        {message && <p className="text-success text-center">{message}</p>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Control type="text" name="name" placeholder="Restaurant Name" onChange={handleChange} required className="form-control" style={{ background: "rgba(255, 255, 255, 0.8)", color: "#000" }} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control type="email" name="email" placeholder="Email" onChange={handleChange} required className="form-control" style={{ background: "rgba(255, 255, 255, 0.8)", color: "#000" }} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} required className="form-control" style={{ background: "rgba(255, 255, 255, 0.8)", color: "#000" }} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control type="text" name="location" placeholder="Location" onChange={handleChange} required className="form-control" style={{ background: "rgba(255, 255, 255, 0.8)", color: "#000" }} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control type="text" name="contact_info" placeholder="Contact Info" onChange={handleChange} required className="form-control" style={{ background: "rgba(255, 255, 255, 0.8)", color: "#000" }} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control as="textarea" name="description" placeholder="Description" onChange={handleChange} required className="form-control" style={{ background: "rgba(255, 255, 255, 0.8)", color: "#000" }} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control type="text" name="images" placeholder="Image URL" onChange={handleChange} required className="form-control" style={{ background: "rgba(255, 255, 255, 0.8)", color: "#000" }} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control type="text" name="timings" placeholder="Opening Hours" onChange={handleChange} required className="form-control" style={{ background: "rgba(255, 255, 255, 0.8)", color: "#000" }} />
                            </Form.Group>
                            <Button type="submit" className="btn btn-success w-100">Sign Up</Button>
                        </Form>
                        <div className="text-center mt-3">
                            <p className="text-light">
                                Already have an account? <a href="/restaurant-login" className="text-warning">Login</a>
                            </p>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default RestaurantSignup;
