import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Table, Form } from "react-bootstrap";
import { getRestaurantDetails, getOrdersByRestaurant, addDish, deleteDish } from "../services/api";

const RestaurantDashboard = () => {
    const [restaurant, setRestaurant] = useState(null);
    const [orders, setOrders] = useState([]);
    const [dishes, setDishes] = useState([]);
    const [newDish, setNewDish] = useState({ name: "", description: "", price: "", category: "", image: "" });

    // Fetch restaurant details, orders, and dishes
    useEffect(() => {
        const fetchData = async () => {
            try {
                const restaurantData = await getRestaurantDetails();
                setRestaurant(restaurantData);
                console.log("restaurantData.........", restaurantData);
                const ordersData = await getOrdersByRestaurant(restaurantData.restaurant.id);
                setOrders(ordersData);

                setDishes(restaurantData.dishes || []);
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
                                <td>{order.customerName}</td>
                                <td>
                                    {order.items.map((item, index) => (
                                        <div key={index}>
                                            {item.dish_id} - {item.quantity} x ${item.price}
                                        </div>
                                    ))}
                                </td>
                                <td>{order.status}</td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="4" className="text-center">No orders yet</td></tr>
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