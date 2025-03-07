import React from "react";
import { Container, Row, Col, Card, Button, Navbar, Form, FormControl } from "react-bootstrap";
import { FaSearch, FaHeart, FaShoppingCart } from "react-icons/fa";

// Sample Data (Replace with API Data)
const restaurants = [
  { id: 1, name: "Mcdonalds", cuisine: "American, Fast Food", rating: 4.5, image: "https://via.placeholder.com/200" },
  { id: 2, name: "Annapoorna", cuisine: "Authentic Indian Cuisine", rating: 3.8, image: "https://via.placeholder.com/200" },
  { id: 3, name: "Urban Momo", cuisine: "Nepali Cuisine", rating: 4.2, image: "https://via.placeholder.com/200" },
  { id: 4, name: "Chipotle Mexican Grill", cuisine: "Mexican, Fast Food", rating: 4.7, image: "https://via.placeholder.com/200" }
];

const categories = [
  { name: "Burger", icon: "🍔" },
  { name: "Caribbean", icon: "🌴" },
  { name: "Drinks", icon: "🥤" },
  { name: "Fast Food", icon: "🍟" },
  { name: "Grocery", icon: "🛒" },
  { name: "Dessert", icon: "🍰" },
  { name: "Japanese", icon: "🍜" },
  { name: "Italian", icon: "🍝" },
  { name: "Box Catering", icon: "📦" },
  { name: "Seafood", icon: "🦐" },
  { name: "Sushi", icon: "🍣" },
  { name: "Alcohol", icon: "🍷" },
  { name: "Wings", icon: "🍗" }
];

const Dashboard = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar bg="light" expand="lg" className="px-4 shadow-sm">
        <Navbar.Brand href="#">Uber Eats</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form className="d-flex mx-auto">
            <FormControl type="search" placeholder="Search Uber Eats" className="me-2" />
            <Button variant="outline-success"><FaSearch /></Button>
          </Form>
          <Button variant="outline-dark" className="ms-2">
            <FaShoppingCart />
          </Button>
        </Navbar.Collapse>
      </Navbar>

      {/* Categories */}
      <Container className="mt-4">
        <Row className="text-center">
          {categories.map((category, index) => (
            <Col key={index} xs={4} md={2} className="mb-3">
              <div className="category-icon">
                <span className="fs-3">{category.icon}</span>
                <p className="small">{category.name}</p>
              </div>
            </Col>
          ))}
        </Row>

        {/* Sorting Buttons */}
        <div className="d-flex justify-content-center my-3">
          <Button variant="outline-secondary" className="me-2">Rating: Low to High</Button>
          <Button variant="outline-secondary" className="me-2">Rating: High to Low</Button>
          <Button variant="outline-secondary">Reset</Button>
        </div>

        {/* Featured Restaurants */}
        <h4 className="mb-3">Featured on Uber Eats</h4>
        <Row>
          {restaurants.map((restaurant) => (
            <Col key={restaurant.id} xs={12} md={3} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Img variant="top" src={restaurant.image} />
                <Card.Body>
                  <Card.Title className="d-flex justify-content-between">
                    {restaurant.name}
                    <FaHeart className="text-danger" />
                  </Card.Title>
                  <Card.Text>{restaurant.cuisine}</Card.Text>
                  <Card.Text><strong>⭐ {restaurant.rating}</strong></Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
