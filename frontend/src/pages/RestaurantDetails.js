import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { getRestaurantDetails } from "../services/api";

const RestaurantDetails = () => {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);

    useEffect(() => {
        const fetchRestaurantDetails = async () => {
            try {
                const data = await getRestaurantDetails(id);
                console.log("Restaurant details data:", data); // Add this line to log the response data
                setRestaurant(data);
            } catch (error) {
                console.error("Error fetching restaurant details:", error);
            }
        };
        fetchRestaurantDetails();
    }, [id]);

    if (!restaurant) {
        return <p>Loading...</p>;
    }

    return (
        <Container className="mt-4">
            <Row>
                <Col md={8}>
                    <Card className="mb-4">
                        <Card.Img variant="top" src={restaurant.image} />
                        <Card.Body>
                            <Card.Title>{restaurant.name}</Card.Title>
                            <Card.Text>{restaurant.description}</Card.Text>
                            <Card.Text><strong>Cuisine:</strong> {restaurant.cuisine}</Card.Text>
                            <Card.Text><strong>Rating:</strong> ⭐ {restaurant.rating}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <h4>Menu</h4>
                    {restaurant.menu && restaurant.menu.length > 0 ? (
                        restaurant.menu.map((item, index) => (
                            <Card key={index} className="mb-3">
                                <Card.Body>
                                    <Card.Title>{item.name}</Card.Title>
                                    <Card.Text>{item.description}</Card.Text>
                                    <Card.Text><strong>Price:</strong> ${item.price}</Card.Text>
                                </Card.Body>
                            </Card>
                        ))
                    ) : (
                        <p>No menu items available.</p>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default RestaurantDetails;