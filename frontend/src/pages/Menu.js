// Dish listing page
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { getRestaurantDetails } from "../services/api"; // API placeholder
import { FaStar, FaShoppingCart } from "react-icons/fa";

const Menu = () => {
    const { id } = useParams(); // Get restaurant ID from URL
    const [restaurant, setRestaurant] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getRestaurantDetails(id);
            setRestaurant(data);
        };
        fetchData();
    }, [id]);

    if (!restaurant) return <p className="text-center mt-5">Loading restaurant details...</p>;

    return (
        <Container className="mt-4">
            {/* Restaurant Details */}
            <Row className="mb-4">
                <Col md={6}>
                    <img src={restaurant.image} alt={restaurant.name} className="img-fluid rounded" />
                </Col>
                <Col md={6}>
                    <h2>{restaurant.name}</h2>
                    <p><strong>Cuisine:</strong> {restaurant.cuisine}</p>
                    <p><FaStar className="text-warning" /> {restaurant.rating}</p>
                </Col>
            </Row>

            {/* Menu Section */}
            <h3>Menu</h3>
            <Row>
                {restaurant.menu.map((dish) => (
                    <Col key={dish.id} xs={12} md={4} className="mb-4">
                        <Card className="h-100 shadow-sm">
                            <Card.Img variant="top" src={dish.image} />
                            <Card.Body>
                                <Card.Title>{dish.name}</Card.Title>
                                <Card.Text>${dish.price.toFixed(2)}</Card.Text>
                                <Button variant="success">
                                    <FaShoppingCart className="me-2" /> Add to Cart
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Menu;
