import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Table, Form } from "react-bootstrap";
import { getRestaurantDetails, getOrdersByRestaurant, getDishesByRestaurant, addDish, deleteDish, updateOrderStatus } from "../services/api";

const RestaurantDashboard = () => {
    const [restaurant, setRestaurant] = useState(null);
    const [orders, setOrders] = useState([]);
    const [dishes, setDishes] = useState([]);
    const [newDish, setNewDish] = useState({ name: "", description: "", price: "", category: "", image: "" });

    // Fetch restaurant details, orders, and dishes
    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedRestaurant = JSON.parse(localStorage.getItem("restaurant"));
                if (!storedRestaurant || !storedRestaurant.id) {
                    throw new Error("Restaurant ID not found in local storage");
                }
                const restaurantData = await getRestaurantDetails(storedRestaurant.id);
                setRestaurant(restaurantData);
                console.log("restaurantData.........", restaurantData);
                const ordersData = await getOrdersByRestaurant(restaurantData.id);
                console.log("ordersData.........", ordersData);
                setOrders(ordersData);

                const dishesData = await getDishesByRestaurant(restaurantData.id);
                setDishes(dishesData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    // Handle adding a dish
    const handleAddDish = async (e) => {
        e.preventDefault();
        const addedDish = await addDish({ ...newDish, restaurant_id: restaurant.id });
        setDishes([...dishes, addedDish]);
        setNewDish({ name: "", description: "", price: "", category: "", image: "" });
    };

    // Handle deleting a dish
    const handleDeleteDish = async (dishId) => {
        await deleteDish(dishId);
        setDishes(dishes.filter(dish => dish.id !== dishId));
    };

    // Handle updating order status
    const handleUpdateOrderStatus = async (orderId, status) => {
        console.log("orderId in handleUpdateOrderStatus", orderId);
        console.log("status in handleUpdateOrderStatus", status);
        
        try {
            // Call API to update order status
            await updateOrderStatus(orderId, status);
    
            // Update state immediately without waiting for re-fetch
            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order.id === orderId ? { ...order, status } : order // Directly update status in UI
                )
            );
    
            console.log("Order status updated successfully.");
        } catch (error) {
            console.error("Error updating order status:", error);
        }
    };

    return (
        <Container className="mt-4">
            <h2>Restaurant Dashboard</h2>

            {/* Restaurant Details */}
            {restaurant && (
                <Card className="p-3 mb-4">
                    <h4>{restaurant.name}</h4>
                    <p><strong>Location:</strong> {restaurant.location}</p>
                    <p><strong>Description:</strong> {restaurant.description}</p>
                </Card>
            )}

            {/* Orders Table */}
            <h4>Orders</h4>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Items</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.Customer.name}</td> {/* Updated to display customer name */}
                                <td>
                                    {order.items && order.items.map((item, index) => (
                                        <div key={index}>
                                            {item.dish_id} - {item.quantity} x ${item.price}
                                        </div>
                                    ))}
                                </td>
                                <td>
                                    <Form.Select
                                        value={order.status}
                                        onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Accepted">Accepted</option>
                                        <option value="Preparing">Preparing</option>
                                        <option value="Out for Delivery">Ready</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </Form.Select>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="5" className="text-center">No orders yet</td></tr>
                    )}
                </tbody>
            </Table>

            {/* Dish Management */}
            <h4>Manage Dishes</h4>
            <Row>
                {dishes.map((dish) => (
                    <Col key={dish.id} md={4} className="mb-3">
                        <Card className="p-2">
                            <Card.Img variant="top" src={dish.image} />
                            <Card.Body>
                                <Card.Title>{dish.name}</Card.Title>
                                <Card.Text>{dish.description}</Card.Text>
                                <Card.Text><strong>Price:</strong> ${dish.price}</Card.Text>
                                <Button variant="danger" onClick={() => handleDeleteDish(dish.id)}>Delete</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Add New Dish */}
            <h4>Add a New Dish</h4>
            <Form onSubmit={handleAddDish}>
                <Row>
                    <Col md={3}><Form.Control type="text" placeholder="Dish Name" value={newDish.name} onChange={(e) => setNewDish({ ...newDish, name: e.target.value })} required /></Col>
                    <Col md={3}><Form.Control type="text" placeholder="Description" value={newDish.description} onChange={(e) => setNewDish({ ...newDish, description: e.target.value })} required /></Col>
                    <Col md={2}><Form.Control type="number" placeholder="Price" value={newDish.price} onChange={(e) => setNewDish({ ...newDish, price: e.target.value })} required /></Col>
                    <Col md={2}><Form.Control type="text" placeholder="Category" value={newDish.category} onChange={(e) => setNewDish({ ...newDish, category: e.target.value })} required /></Col>
                    <Col md={2}><Form.Control type="text" placeholder="Image URL" value={newDish.image} onChange={(e) => setNewDish({ ...newDish, image: e.target.value })} required /></Col>
                    <Col md={12} className="mt-2"><Button type="submit" variant="success">Add Dish</Button></Col>
                </Row>
            </Form>
        </Container>
    );
};

export default RestaurantDashboard;