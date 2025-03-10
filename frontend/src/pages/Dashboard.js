import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Navbar, Form, FormControl } from "react-bootstrap";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom"; // Import Link for navigation
import { getRestaurants, toggleFavoriteRestaurant } from "../services/api";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import AddressSearch from "../components/AddressesSearch";


const categories = [
 { name: "Burger", icon: "🍔" }, { name: "Caribbean", icon: "🌴" }, { name: "Drinks", icon: "🥤" },
 { name: "Fast Food", icon: "🍟" }, { name: "Grocery", icon: "🛒" }, { name: "Dessert", icon: "🍰" },
 { name: "Japanese", icon: "🍜" }, { name: "Italian", icon: "🍝" },
 { name: "Seafood", icon: "🦐" }, { name: "Sushi", icon: "🍣" }, { name: "Alcohol", icon: "🍷" },
 { name: "Wings", icon: "🍗" }
];


const Dashboard = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [sortOrder, setSortOrder] = useState(null); // ✅ State to manage sorting

  // ✅ Fetch Restaurants on Component Mount
  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching Restaurants...");
      const data = await getRestaurants();
      if (data.length === 0) {
        console.warn("No restaurants received from API!");
      }
      setRestaurants(data);
    };
    fetchData();
  }, []);

  // ✅ Handle Sorting Logic
  const handleSort = (order) => {
    console.log(`Sorting by rating: ${order}`);
    setSortOrder(order);

    const sortedRestaurants = [...restaurants].sort((a, b) => {
      if (order === "asc") {
        return a.rating - b.rating;
      } else if (order === "desc") {
        return b.rating - a.rating;
      }
      return 0;
    });

    setRestaurants(sortedRestaurants);
  };

  const toggleFavorite = async (restaurantId) => {
    setRestaurants((prevRestaurants) =>
      prevRestaurants.map((restaurant) =>
        restaurant.id === restaurantId
          ? { ...restaurant, isFavorite: !restaurant.isFavorite }
          : restaurant
      )
    );

    try {
      await toggleFavoriteRestaurant(restaurantId);
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  };

  return (
    <>
      <TopNavbar />
      <Container className="mt-4">
        <CategorySwiper />
        <SortingButtons handleSort={handleSort} />
        <FeaturedRestaurants restaurants={restaurants} toggleFavorite={toggleFavorite} />
      </Container>
    </>
  );
};

// ✅ Navbar Component
const TopNavbar = () => (
  <Navbar bg="light" expand="lg" className="px-4 shadow-sm">
    <Sidebar />
    <Navbar.Brand href="#">Uber Eats</Navbar.Brand>
    <AddressSearch />
    <Form className="d-flex mx-auto">
      <FormControl type="search" placeholder="Search Uber Eats" className="me-2" />
      <Button variant="outline-success"><FaSearch /></Button>
    </Form>
    <Button variant="outline-dark" className="ms-2">
      <Link to="/cart" className="text-decoration-none text-dark">
        <FaShoppingCart />
      </Link>
    </Button>
  </Navbar>
);

// ✅ Category Swiper
const CategorySwiper = () => (
  <Swiper modules={[Navigation]} navigation spaceBetween={10} slidesPerView={10} className="category-swiper">
    {categories.map((category, index) => (
      <SwiperSlide key={index}>
        <div className="category-card">
          <span className="fs-3">{category.icon}</span>
          <p className="small">{category.name}</p>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
);

// ✅ Sorting Buttons Component
const SortingButtons = ({ handleSort }) => (
  <div className="d-flex justify-content-center my-3">
    <Button variant="outline-secondary" className="me-2" onClick={() => handleSort("asc")}>
      Rating: Low to High
    </Button>
    <Button variant="outline-secondary" className="me-2" onClick={() => handleSort("desc")}>
      Rating: High to Low
    </Button>
    <Button variant="outline-secondary" onClick={() => handleSort(null)}>
      Reset
    </Button>
  </div>
);

const FeaturedRestaurants = ({ restaurants, toggleFavorite }) => (
  <>
    <h4 className="mb-4 fw-bold">Featured on Uber Eats</h4>
    <Row className="g-4">
      {restaurants.length > 0 ? (
        restaurants.map((restaurant) => (
          <Col key={restaurant.id} xs={12} sm={6} md={4} lg={3}>
            <Link to={`/restaurants/${restaurant.id}`} className="text-decoration-none">
              <Card className="shadow-sm border-0 position-relative" style={{ height: "350px" }}>
                {/* Favorite Icon */}
                <div 
                  className="position-absolute top-0 end-0 p-2"
                  style={{ cursor: "pointer", zIndex: 2 }}
                  onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(restaurant.id);
                  }}
                >
                  {restaurant.isFavorite ? (
                    <FaHeart size={22} color="red" />
                  ) : (
                    <FaRegHeart size={22} color="black" className="opacity-75" />
                  )}
                </div>
                {/* Restaurant Image */}
                <Card.Img
                  variant="top"
                  src={restaurant.image}
                  className="rounded-top"
                  style={{ height: "270px", objectFit: "cover" }}
                />
                {/* Rating */}
                <div className="position-absolute bottom-0 end-0 m-2 bg-white text-dark px-2 py-1 rounded-pill fw-bold shadow-sm">
                  ⭐ {restaurant.rating}
                </div>
                {/* Restaurant Details */}
                <Card.Body className="text-center">
                  <Card.Title className="fw-bold">{restaurant.name}</Card.Title>
                  <Card.Text className="text-muted small">{restaurant.cuisine}</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))
      ) : (
        <p className="text-center">Loading restaurants...</p>
      )}
    </Row>
  </>
);

export default Dashboard;

