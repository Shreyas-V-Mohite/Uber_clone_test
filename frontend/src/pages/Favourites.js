import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { getFavoriteRestaurants } from "../services/api";
import RestaurantCard from "../components/RestaurantCard";

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

    // ✅ Handle toggle favorite to remove from favorites
    const toggleFavorite = (restaurantId) => {
        setFavorites((prevFavorites) =>
            prevFavorites.filter((restaurant) => restaurant.id !== restaurantId)
        );
    };

    return (
        <Container>
            <h2 className="mt-4 fw-bold">Your Favourite Restaurants ❤️</h2>
            <Row className="g-4">
                {favorites.length > 0 ? (
                    favorites.map((restaurant) => (
                        <RestaurantCard 
                            key={restaurant.id}
                            restaurant={restaurant}
                            toggleFavorite={toggleFavorite}
                        />
                    ))
                ) : (
                    <p className="text-center">No favorite restaurants yet!</p>
                )}
            </Row>
        </Container>
    );
};

export default Favourite;
