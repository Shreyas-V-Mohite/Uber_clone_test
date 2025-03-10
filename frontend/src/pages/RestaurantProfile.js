import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ImageGallery from "../components/ImageGallery";

const RestaurantProfile = () => {
  const token = localStorage.getItem("jwtToken");
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    location: "",
    description: "",
    contact_info: "",
    timings: "",
    images: [],
    id : "",
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/restaurants/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setProfileData((prevData) => ({
          ...prevData,
          ...response.data.restaurant,
          images: response.data.restaurant.images ? response.data.restaurant.images.split(",") : [],
        }));
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleFileChange = (e) => {
    setProfileData({ ...profileData, images: [...profileData.images, ...Array.from(e.target.files)] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("data", JSON.stringify(profileData));
    profileData.images.forEach((image) => {
      if (typeof image === "object") {
        formData.append("images", image);
      }
    });

    try {
      await axios.put(`http://localhost:5001/api/restaurants/update/${profileData.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-4">Restaurant Profile Information</h3>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleChange}
              required
            />
          </Col>
          <Col md={6}>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
              required
              disabled
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={profileData.location}
              onChange={handleChange}
              placeholder="Enter location"
            />
          </Col>
          <Col md={6}>
            <Form.Label>Contact Info</Form.Label>
            <Form.Control
              type="text"
              name="contact_info"
              value={profileData.contact_info}
              onChange={handleChange}
              placeholder="Enter contact info"
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={12}>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={profileData.description}
              onChange={handleChange}
              placeholder="Enter description"
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={12}>
            <Form.Label>Timings</Form.Label>
            <Form.Control
              type="text"
              name="timings"
              value={profileData.timings}
              onChange={handleChange}
              placeholder="Enter timings"
            />
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={12}>
            <Form.Label>Images</Form.Label>
            <Form.Control
              type="file"
              name="images"
              onChange={handleFileChange}
              multiple
            />
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={12}>
            <ImageGallery images={profileData.images} />
          </Col>
        </Row>

        <Row>
          <Col>
            <Button type="submit" variant="success" className="me-2">Update Profile</Button>
            <Button variant="secondary" onClick={() => navigate("/dashboard")}>Go to Dashboard</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default RestaurantProfile;