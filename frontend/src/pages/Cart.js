import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form, Alert } from "react-bootstrap";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../services/api"; // Import API function

const Cart = () => {
  const navigate = useNavigate();

  // Mock cart items
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Plate", price: 12.0, quantity: 1 }
  ]);

  const [orderSuccess, setOrderSuccess] = useState(false); // Success message state
  const [loading, setLoading] = useState(false); // Loading state for button
  const [error, setError] = useState(null); // Error state for better debugging
  const deliveryFee = 2.99;

  // Increase item quantity
  const increaseQuantity = (id) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  // Decrease item quantity
  const decreaseQuantity = (id) => {
    setCartItems(cartItems.map(item => 
      item.id === id && item.quantity > 1 ? { ...item, quantity:item.quantity - 1 } : item
    ));
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal + deliveryFee;

  // Handle order placement
  const handlePlaceOrder = async () => {
    setLoading(true);
    setError(null);

    try {
      await placeOrder({ cartItems, total });
      setOrderSuccess(true);
      
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

      <Row>
        {/* Cart Items */}
        <Col md={8}>
          {cartItems.map((item) => (
            <Card key={item.id} className="mb-3 p-3 shadow-sm">
              <Row className="align-items-center">
                <Col md={6}>
                  <h5>{item.name}</h5>
                  <p>Quantity: {item.quantity}</p>
                </Col>
                <Col md={3}>
                  <h5>${(item.price * item.quantity).toFixed(2)}</h5>
                </Col>
                <Col md={3} className="d-flex">
                  <Button variant="outline-secondary" size="sm" onClick={() => decreaseQuantity(item.id)}>
                    <FaMinus />
                  </Button>
                  <span className="mx-2">{item.quantity}</span>
                  <Button variant="outline-secondary" size="sm" onClick={() => increaseQuantity(item.id)}>
                    <FaPlus />
                  </Button>
                </Col>
              </Row>
            </Card>
          ))}
        </Col>

        {/* Order Summary */}
        <Col md={4}>
          <Card className="p-3 shadow-sm">
            <h4>Order Summary</h4>
            <p><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
            <p><strong>Delivery Fee:</strong> ${deliveryFee.toFixed(2)}</p>
            <h5><strong>Total:</strong> ${total.toFixed(2)}</h5>
            
            {/* Delivery Address */}
            <Form.Group className="mb-2">
              <Form.Control type="text" placeholder="Enter delivery address" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check type="checkbox" label="Pick up instead of delivery" />
            </Form.Group>

            {/* Buttons */}
            <Button variant="success" className="w-100 mb-2" onClick={handlePlaceOrder} disabled={loading}>
              {loading ? "Placing Order..." : "PLACE ORDER"}
            </Button>
            <Button variant="dark" className="w-100" onClick={() => navigate("/dashboard")}>
              Back to Dashboard
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
