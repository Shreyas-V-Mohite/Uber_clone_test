import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { getRestaurantDetails, getDishesByRestaurant } from "../services/api";

const RestaurantDetails = () => {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [dishes, setDishes] = useState([]);

    useEffect(() => {
        const fetchRestaurantDetails = async () => {
            try {
                const restaurantData = await getRestaurantDetails(id);
                setRestaurant(restaurantData);
                const dishesData = await getDishesByRestaurant(id);
                setDishes(dishesData);
            } catch (error) {
                console.error("Error fetching restaurant details:", error);
            }
        };
        fetchRestaurantDetails();
    }, [id]);

    const addToCart = (dish) => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const restaurantOrder = cart.find(order => order.restaurantId === restaurant.id);

        if (restaurantOrder) {
            const existingDish = restaurantOrder.items.find(item => item.dish_id === dish.id);
            if (existingDish) {
                existingDish.quantity += 1;
            } else {
                restaurantOrder.items.push({ ...dish, dish_id: dish.id, quantity: 1 });
            }
        } else {
            cart.push({
                restaurantId: restaurant.id,
                restaurantName: restaurant.name,
                items: [{ ...dish, dish_id: dish.id, quantity: 1 }]
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
    };

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
                    {dishes.length > 0 ? (
                        dishes.map((dish, index) => (
                            <Card key={index} className="mb-3">
                                <Card.Body>
                                    <Card.Title>{dish.name}</Card.Title>
                                    <Card.Text>{dish.description}</Card.Text>
                                    <Card.Text><strong>Price:</strong> ${dish.price}</Card.Text>
                                    <Button variant="primary" onClick={() => addToCart(dish)}>Add to Cart</Button>
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