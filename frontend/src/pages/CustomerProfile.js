import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";


const Profile = () => {
    const token = localStorage.getItem("jwtToken");
    console.log("Token", token);
    
    
    
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    name: "Bruce Wayne",
    dob: "",
    city: "",
    state: "",
    country: "",
    phone: "",
    email: "",
    profilePicture: null,
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem("jwtToken"); // Retrieve the JWT token from local storage

      try {
        const response = await axios.get(`http://localhost:5001/api/auth/me/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setProfileData((prevData) => ({
            ...prevData,
            email: response.data.user.email,
        }));
        
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };

    fetchProfileData();
  }, [profileData.email]);




  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleFileChange = (e) => {
    setProfileData({ ...profileData, profilePicture: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile Data", profileData);

    axios.put(`http://localhost:5001/api/auth/${profileData.email}`, profileData)
      .then(() => {
        alert("Profile updated successfully!");
      })
      .catch((error) => console.error("Error updating profile", error));
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-4">Profile Information</h3>
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
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control 
              type="date" 
              name="dob" 
              value={profileData.dob} 
              onChange={handleChange} 
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Label>City</Form.Label>
            <Form.Control 
              type="text" 
              name="city" 
              value={profileData.city} 
              onChange={handleChange} 
              placeholder="Enter city" 
            />
          </Col>
          <Col md={6}>
            <Form.Label>State</Form.Label>
            <Form.Control 
              type="text" 
              name="state" 
              value={AuthContext.email} 
              onChange={handleChange} 
              placeholder="Enter state" 
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Label>Country</Form.Label>
            <Form.Select 
              name="country" 
              value={profileData.country} 
              onChange={handleChange}
            >
              <option value="">Select Country</option>
              <option value="USA">United States</option>
              <option value="Canada">Canada</option>
              <option value="UK">United Kingdom</option>
              <option value="India">India</option>
            </Form.Select>
          </Col>
          <Col md={6}>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control 
              type="text" 
              name="phone" 
              value={profileData.phone} 
              onChange={handleChange} 
              placeholder="Enter phone number" 
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={12}>
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

        <Row className="mb-4">
          <Col md={12}>
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control 
              type="file" 
              name="profilePicture" 
              onChange={handleFileChange} 
            />
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

export default Profile;
