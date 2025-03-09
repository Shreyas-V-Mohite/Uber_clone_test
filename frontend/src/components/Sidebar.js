import React, { useState, useContext } from "react";
import { Offcanvas, Button, ListGroup } from "react-bootstrap";
import { FaBars, FaHeart, FaUser, FaShoppingBag, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
const Sidebar = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { logout } = useContext(AuthContext);
  return (
    <>
      {/* Button to open sidebar */}
      <Button variant="light" className="me-2" onClick={handleShow}>
        <FaBars size={24} />
      </Button>

      {/* Offcanvas Sidebar */}
      <Offcanvas show={show} onHide={handleClose} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Uber Eats</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* Navigation Buttons */}
          <ListGroup variant="flush">
            <ListGroup.Item action onClick={() => navigate("/orders")}>
              <FaShoppingBag className="me-2" /> Orders
            </ListGroup.Item>
            <ListGroup.Item action onClick={() => navigate("/favourite")}>
              <FaHeart className="me-2" /> Favorites
            </ListGroup.Item>
            <ListGroup.Item action onClick={() => navigate("/customer-profile")}>
              <FaUser className="me-2" /> Profile
            </ListGroup.Item>
          </ListGroup>

          <hr />

          {/* Additional Links
          <ListGroup variant="flush">
            <ListGroup.Item action> Create a business account </ListGroup.Item>
            <ListGroup.Item action> Add your restaurant 2 </ListGroup.Item>
            <ListGroup.Item action> Sign up to deliver </ListGroup.Item>
          </ListGroup> */}

          <hr />

          {/* Sign Out */}
          <ListGroup.Item action className="text-danger" onClick={logout}>
            <FaSignOutAlt className="me-2" /> Sign out
          </ListGroup.Item>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Sidebar;
