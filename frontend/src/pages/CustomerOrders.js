import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import { getCustomerOrders, cancelOrder, getDishById } from "../services/api";

const CustomerOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getCustomerOrders();
                console.log("data.........", data);
                const ordersWithDishNames = await Promise.all(data.map(async (order) => {
                    const itemsWithNames = await Promise.all(order.items.map(async (item) => {
                        console.log("item.........", item.dish_id);
                        const dish = await getDishById(item.dish_id);
                        return { ...item, name: dish.name};
                    }));
                    return { ...order, items: itemsWithNames };
                }));
                setOrders(ordersWithDishNames);
                console.log("data.........", ordersWithDishNames);
            } catch (error) {
                setError("Error fetching orders. Please try again.");
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const handleCancelOrder = async (orderId) => {
        try {
            await cancelOrder(orderId);
            setOrders(orders.map(order => 
                order.id === orderId ? { ...order, status: "Cancelled" } : order
            ));
            setSuccessMessage("Order canceled successfully.");
        } catch (error) {
            setError("Error canceling order. Please try again.");
            console.error("Error canceling order:", error);
        }
    };

    return (
        <Container className="mt-5">
            <h2>Your Orders</h2>

            {error && <Alert variant="danger">{error}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}

            {loading ? (
                <p>Loading orders...</p>
            ) : (
                <Row>
                    {orders.map(order => (
                        <Col key={order.id} md={6} lg={4} className="mb-4">
                            <Card className="p-3 shadow-sm">
                                <Card.Body>
                                    <Card.Title>Order #{order.id}</Card.Title>
                                    <Card.Text><strong>Restaurant:</strong> {order.Restaurant.name}</Card.Text>
                                    <Card.Text><strong>Status:</strong> {order.status}</Card.Text>
                                    <Card.Text><strong>Total Price:</strong> ${order.total_price.toFixed(2)}</Card.Text>
                                    <Card.Text><strong>Items:</strong></Card.Text>
                                    <ul>
                                        {order.items.map((item, index) => (
                                            <li key={index}>{item.quantity} x {item.name} (${item.price.toFixed(2)})</li>
                                        ))}
                                    </ul>
                                    {["Pending", "Accepted", "Preparing"].includes(order.status) && (
                                        <Button variant="danger" onClick={() => handleCancelOrder(order.id)}>Cancel Order</Button>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default CustomerOrders;