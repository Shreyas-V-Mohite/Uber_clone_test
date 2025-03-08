import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Navbar, Form, FormControl } from "react-bootstrap";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { getRestaurants } from "../services/api";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom"; // Import Link for navigation

// ✅ Categories for Filtering
const categories = [
  { name: "Burger", icon: "🍔" }, { name: "Caribbean", icon: "🌴" }, { name: "Drinks", icon: "🥤" },
  { name: "Fast Food", icon: "🍟" }, { name: "Grocery", icon: "🛒" }, { name: "Dessert", icon: "🍰" },
  { name: "Japanese", icon: "🍜" }, { name: "Italian", icon: "🍝" }, { name: "Box Catering", icon: "📦" },
  { name: "Seafood", icon: "🦐" }, { name: "Sushi", icon: "🍣" }, { name: "Alcohol", icon: "🍷" },
  { name: "Wings", icon: "🍗" }
];

const Dashboard = () => {
  const [restaurants, setRestaurants] = useState([]);

  // ✅ Fetch Restaurants on Component Mount
  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching Restaurants..."); // Debug Log
      const data = await getRestaurants();
      if (data.length === 0) {
        console.warn("No restaurants received from API!");
      }
      setRestaurants(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <TopNavbar />
      <Container className="mt-4">
        <CategorySwiper />
        <SortingButtons />
        <FeaturedRestaurants restaurants={restaurants} />
      </Container>
    </>
  );
};

// ✅ Extracted Navbar Component
const TopNavbar = () => (
  <Navbar bg="light" expand="lg" className="px-4 shadow-sm">
    <Sidebar /> {/* Sidebar Button */}
    <Navbar.Brand href="#">Uber Eats</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Form className="d-flex mx-auto">
        <FormControl type="search" placeholder="Search Uber Eats" className="me-2" />
        <Button variant="outline-success"><FaSearch /></Button>
      </Form>
      <Button variant="outline-dark" className="ms-2">
        <Link to="/cart" className="text-decoration-none text-dark">
          <FaShoppingCart />
        </Link>
      </Button>
    </Navbar.Collapse>
  </Navbar>
);

// ✅ Extracted Category Swiper Component
const CategorySwiper = () => (
  <Swiper modules={[Navigation]} navigation spaceBetween={10} slidesPerView={5} className="category-swiper">
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

// ✅ Extracted Sorting Buttons Component
const SortingButtons = () => (
  <div className="d-flex justify-content-center my-3">
    <Button variant="outline-secondary" className="me-2">Rating: Low to High</Button>
    <Button variant="outline-secondary" className="me-2">Rating: High to Low</Button>
    <Button variant="outline-secondary">Reset</Button>
  </div>
);

// ✅ Extracted Featured Restaurants Component
const FeaturedRestaurants = ({ restaurants }) => (
  <>
    <h4 className="mb-3">Featured on Uber Eats</h4>
    <Row>
      {restaurants.length > 0 ? (
        restaurants.map((restaurant) => (
          <Col key={restaurant.id} xs={12} md={3} className="mb-4">
            <Link to={`/restaurants/${restaurant.id}`} className="text-decoration-none text-dark">
              <Card className="h-100 shadow-sm">
                <Card.Img variant="top" src={restaurant.image} />
                <Card.Body>
                  <Card.Title>{restaurant.name}</Card.Title>
                  <Card.Text>{restaurant.cuisine}</Card.Text>
                  <Card.Text><strong>⭐ {restaurant.rating}</strong></Card.Text>
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
