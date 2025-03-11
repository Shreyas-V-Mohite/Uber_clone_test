import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { getRestaurantDetails, getDishesByRestaurant } from "../services/api";

const RestaurantDetails = () => {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [dishes, setDishes] = useState([]);
    console.log('restaurant in restaurantDetails page', restaurant);
    console.log('dishes in restaurantDetails page', dishes);

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

    const restaurantImagesArray = restaurant.images ? restaurant.images.split(",") : [];
    const restaurantLastImage = restaurantImagesArray.length > 0 ? restaurantImagesArray[restaurantImagesArray.length - 1] : null;

    return (
        <Container className="mt-4">
            <Row>
                <Col md={8}>
                    <Card className="mb-4">
                        {restaurantLastImage && (
                            <Card.Img
                                variant="top"
                                src={`http://localhost:9000/images/${restaurantLastImage}`}
                                className="rounded-top"
                                style={{ height: "350px", objectFit: "cover" }}
                            />
                        )}
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
                        dishes.map((dish, index) => {
                            console.log('dish in restaurantDetails page', dish, index);
                            const imagesArray = dish.images ? dish.images.split(",") : [];
                            console.log('imagesArray in restaurantDetails page', imagesArray);
                            const lastImage = imagesArray.length > 0 ? imagesArray[imagesArray.length - 1] : null;
                            return (
                                <Card key={index} className="mb-3">
                                    {lastImage && (
                                        <Card.Img
                                            variant="top"
                                            src={`http://localhost:9000/images/${lastImage}`}
                                            className="rounded-top"
                                            style={{ height: "200px", objectFit: "cover" }}
                                        />
                                    )}
                                    <Card.Body>
                                        <Card.Title>{dish.name}</Card.Title>
                                        <Card.Text>{dish.description}</Card.Text>
                                        <Card.Text><strong>Price:</strong> ${dish.price}</Card.Text>
                                        <Button variant="primary" onClick={() => addToCart(dish)}>Add to Cart</Button>
                                    </Card.Body>
                                </Card>
                            );
                        })
                    ) : (
                        <p>No menu items available.</p>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default RestaurantDetails;