import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form, Alert } from "react-bootstrap";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../services/api"; // Import API function
import AddressSearch from "../components/AddressesSearch";

const Cart = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [orderSuccess, setOrderSuccess] = useState(false); // Success message state
    const [loading, setLoading] = useState(false); // Loading state for button
    const [error, setError] = useState(null); // Error state for better debugging
    const deliveryFee = 2.99;

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, []);

    const increaseQuantity = (restaurantId, dishId) => {
        setCart(cart.map(order =>
            order.restaurantId === restaurantId
                ? {
                    ...order,
                    items: order.items.map(item =>
                        item.dish_id === dishId ? { ...item, quantity: item.quantity + 1 } : item
                    )
                }
                : order
        ));
    };

    const decreaseQuantity = (restaurantId, dishId) => {
        setCart(cart.map(order =>
            order.restaurantId === restaurantId
                ? {
                    ...order,
                    items: order.items.map(item =>
                        item.dish_id === dishId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
                    )
                }
                : order
        ));
    };

    const handlePlaceOrder = async (restaurantId) => {
        setLoading(true);
        setError(null);

        const order = cart.find(order => order.restaurantId === restaurantId);
        const total = order.items.reduce((acc, item) => acc + item.price * item.quantity, 0) + deliveryFee;

        const orderData = {
            restaurant_id: restaurantId,
            items: order.items.map(item => ({
                dish_id: item.dish_id,
                quantity: item.quantity,
                price: item.price
            })),
            total_price: total
        };

        try {
            await placeOrder(orderData);
            setOrderSuccess(true);

            // Remove the order from the cart
            const updatedCart = cart.filter(order => order.restaurantId !== restaurantId);
            setCart(updatedCart);
            localStorage.setItem("cart", JSON.stringify(updatedCart));

            // Redirect after success
            setTimeout(() => {
                setOrderSuccess(false);
                navigate("/dashboard");
            }, 2000);
        } catch (error) {
            setError("Failed to place order. Please try again.");
            console.error("Order placement error:", error);
        }

        setLoading(false);
    };

    return (
        <Container className="mt-5">
            <h2>Your Cart</h2>

            {/* Order Success Message */}
            {orderSuccess && <Alert variant="success">Order placed successfully! Redirecting...</Alert>}

            {/* Order Failure Message */}
            {error && <Alert variant="danger">{error}</Alert>}

            {cart.map(order => (
                <div key={order.restaurantId}>
                    <h3>{order.restaurantName}</h3>
                    <Row>
                        <Col md={8}>
                            {order.items.map((item) => (
                                <Card key={item.dish_id} className="mb-3 p-3 shadow-sm">
                                    <Row className="align-items-center">
                                        <Col md={6}>
                                            <h5>{item.name}</h5>
                                            <p>Quantity: {item.quantity}</p>
                                        </Col>
                                        <Col md={3}>
                                            <h5>${(item.price * item.quantity).toFixed(2)}</h5>
                                        </Col>
                                        <Col md={3} className="d-flex">
                                            <Button variant="outline-secondary" size="sm" onClick={() => decreaseQuantity(order.restaurantId, item.dish_id)}>
                                                <FaMinus />
                                            </Button>
                                            <span className="mx-2">{item.quantity}</span>
                                            <Button variant="outline-secondary" size="sm" onClick={() => increaseQuantity(order.restaurantId, item.dish_id)}>
                                                <FaPlus />
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card>
                            ))}
                        </Col>

                        <Col md={4}>
                            <Card className="p-3 shadow-sm">
                                <h4>Order Summary</h4>
                                <p><strong>Subtotal:</strong> ${(order.items.reduce((acc, item) => acc + item.price * item.quantity, 0)).toFixed(2)}</p>
                                <p><strong>Delivery Fee:</strong> ${deliveryFee.toFixed(2)}</p>
                                <h5><strong>Total:</strong> ${(order.items.reduce((acc, item) => acc + item.price * item.quantity, 0) + deliveryFee).toFixed(2)}</h5>
{/* 
                                <Form.Group className="mb-2">
                                    <Form.Control type="text" placeholder="Enter delivery address" />
                                </Form.Group> */}
                                <h6>Enter Delivery address here</h6>

                                <AddressSearch/>

                                <Form.Group className="mb-3">
                                    <Form.Check type="checkbox" label="Pick up instead of delivery" />
                                </Form.Group>

                                <Button variant="success" className="w-100 mb-2" onClick={() => handlePlaceOrder(order.restaurantId)} disabled={loading}>
                                    {loading ? "Placing Order..." : "PLACE ORDER"}
                                </Button>
                            </Card>
                        </Col>
                    </Row>
                </div>
            ))}

            <Button variant="dark" className="w-100 mt-3" onClick={() => navigate("/dashboard")}>
                Back to Dashboard
            </Button>
        </Container>
    );
};

export default Cart;
