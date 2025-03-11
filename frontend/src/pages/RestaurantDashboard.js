import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Table, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getRestaurantDetails, getOrdersByRestaurant, getDishesByRestaurant, addDish, deleteDish, updateOrderStatus } from "../services/api";
import ImageGallery from "../components/ImageGallery";

const RestaurantDashboard = () => {
    const navigate = useNavigate();
    const [restaurant, setRestaurant] = useState(null);
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]); // ✅ State for filtered orders
    const [dishes, setDishes] = useState([]);
    const [filterStatus, setFilterStatus] = useState("All"); // ✅ State for order status filter

    const [newDish, setNewDish] = useState({ 
        name: "", 
        description: "", 
        price: "", 
        category: "", 
        images: [] 
    });

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
                const ordersData = await getOrdersByRestaurant(restaurantData.id);
                setOrders(ordersData);
                setFilteredOrders(ordersData); // ✅ Initialize filtered orders

                const dishesData = await getDishesByRestaurant(restaurantData.id);
                setDishes(dishesData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const handleAddDish = async (e) => {
        e.preventDefault();
        console.log("restaurant:::", JSON.stringify({ ...newDish, restaurant_id: restaurant.id }));
        const fd = new FormData();
        fd.append("data", JSON.stringify({ ...newDish, restaurant_id: restaurant.id }));
        console.log("newDish", newDish);
        console.log("formData :::::::", fd.get("data"));

        newDish.images.forEach((image) => {
            if (typeof image === "object") {
                 fd.append("images", image);
              }
            console.log(`Appending image:`, image);
        });
    
        console.log("formData ->>>>>>>:", fd.get("images"), fd.get("data"));
        // Debugging: Log the FormData content
        for (let pair of fd.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }
    
        const addedDish = await addDish(fd);
        setDishes([...dishes, addedDish]);
        setNewDish({ name: "", description: "", price: "", category: "", images: [] });
    };

    // ✅ Handle deleting a dish
    const handleDeleteDish = async (dishId) => {
        await deleteDish(dishId);
        setDishes(dishes.filter(dish => dish.id !== dishId));
    };

    // ✅ Handle updating order status
    const handleUpdateOrderStatus = async (orderId, status) => {
        try {
            await updateOrderStatus(orderId, status);
            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order.id === orderId ? { ...order, status } : order
                )
            );
        } catch (error) {
            console.error("Error updating order status:", error);
        }
    };

    const handleFileChange = (e) => {
        setNewDish({ ...newDish, images: [...newDish.images, ...Array.from(e.target.files)] });
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
                    <Button variant="primary" onClick={() => navigate("/restaurant-profile")}>Edit Profile</Button>
                                    </Card>
            )}

            {/* ✅ Filter Dropdown */}
            <Row className="mb-3 align-items-center">
                <Col md={2}>
                    <strong>Filter by Status:</strong>
                </Col>
                <Col md={4}>
                    <Form.Select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="Pending">Pending</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Preparing">Preparing</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                    </Form.Select>
                </Col>
            </Row>


            {/* ✅ Orders Table */}
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
                    {filteredOrders.length > 0 ? (
                        filteredOrders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.Customer.name}</td>
                                <td>
                                    {order.items.map((item, index) => (
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
                                        <option value="Out for Delivery">Out for Delivery</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </Form.Select>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="5" className="text-center">No orders available</td></tr>
                    )}
                </tbody>
            </Table>

            {/* ✅ Dish Management */}
            <h4>Manage Dishes</h4>
            <Row>
                {dishes.map((dish) => (
                    <Col key={dish.id} md={4} className="mb-3">
                        <Card className="p-2">
                            <Card.Img variant="top" src={`http://localhost:9000/images/${dish.image}`} />
                            <Card.Body>
                                <Card.Title>{dish.name}</Card.Title>
                                <Card.Text>{dish.description}</Card.Text>
                                <Card.Text><strong>Price:</strong> ${dish.price}</Card.Text>
                                <ImageGallery images={dish.images ? dish.images.split(",") : []} />
                                <Button variant="danger" onClick={() => handleDeleteDish(dish.id)}>Delete</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* ✅ Add New Dish */}
            <h4>Add a New Dish</h4>
            <Form onSubmit={handleAddDish}>
                <Row>
                    <Col md={3}><Form.Control type="text" placeholder="Dish Name" value={newDish.name} onChange={(e) => setNewDish({ ...newDish, name: e.target.value })} required /></Col>
                    <Col md={3}><Form.Control type="text" placeholder="Description" value={newDish.description} onChange={(e) => setNewDish({ ...newDish, description: e.target.value })} required /></Col>
                    <Col md={2}><Form.Control type="number" placeholder="Price" value={newDish.price} onChange={(e) => setNewDish({ ...newDish, price: e.target.value })} required /></Col>
                    <Col md={2}><Form.Control type="text" placeholder="Category" value={newDish.category} onChange={(e) => setNewDish({ ...newDish, category: e.target.value })} required /></Col>
                    <Col md={2}><Form.Control type="file" name="images" onChange={handleFileChange} multiple /></Col>
                    <Col md={12} className="mt-2"><Button type="submit" variant="success">Add Dish</Button></Col>
                </Row>
            </Form>
        </Container>
    );
};

export default RestaurantDashboard;