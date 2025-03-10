import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { getFavoriteRestaurants } from "../services/api";
import { Link } from "react-router-dom";

const Favourite = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const data = await getFavoriteRestaurants();
                setFavorites(data);
            } catch (error) {
                console.error("Failed to fetch favorite restaurants:", error);
            }
        };

        fetchFavorites();
    }, []);

    return (
        <Container>
            <h2 className="mt-4">Your Favourite Restaurants ❤️</h2>
            <Row>
                {favorites.length > 0 ? (
                    favorites.map((restaurant) => (
                        <Col key={restaurant.id} xs={12} sm={6} md={4} lg={3}>
                            <Link to={`/restaurants/${restaurant.id}`} className="text-decoration-none">
                                <Card className="shadow-sm">
                                    <Card.Img variant="top" src={restaurant.image} />
                                    <Card.Body>
                                        <Card.Title>{restaurant.name}</Card.Title>
                                        <Card.Text>{restaurant.cuisine}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                    ))
                ) : (
                    <p>No favorite restaurants yet!</p>
                )}
            </Row>
        </Container>
    );
};

export default Favourite;
