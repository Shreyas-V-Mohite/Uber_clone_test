import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { FaHeart, FaRegHeart } from "react-icons/fa";

const RestaurantCard = ({ restaurant, toggleFavorite }) => {
  const imagesArray = restaurant.images ? restaurant.images.split(",") : [];
  const lastImage = imagesArray.length > 0 ? imagesArray[imagesArray.length - 1] : null;
  console.log('lastimage',lastImage)
  return (
    <Col key={restaurant.id} xs={12} sm={6} md={4} lg={3}>
      <Link to={`/restaurants/${restaurant.id}`} className="text-decoration-none">
        <Card className="shadow-sm border-0 position-relative" style={{ height: "350px" }}>
          {/* Favorite Icon */}
          <div 
            className="position-absolute top-0 end-0 p-2"
            style={{ cursor: "pointer", zIndex: 2 }}
            onClick={(e) => {
              e.preventDefault(); // Prevent redirect on click
              toggleFavorite(restaurant.id);
            }}
          >
          </div>
          
          {/* Restaurant Image */}
          <Card.Img
            variant="top"
            src={`http://localhost:9000/images/${lastImage}`}
            className="rounded-top"
            style={{ height: "270px", objectFit: "cover" }}
          />
          
          
          <Card.Body className="text-center">
            <Card.Title className="fw-bold">{restaurant.name}</Card.Title>
            <Card.Text className="text-muted small">{restaurant.cuisine}</Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
};

export default RestaurantCard;
