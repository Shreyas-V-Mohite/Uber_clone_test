import React, { useState } from "react";
import { Modal, Image, Row, Col } from "react-bootstrap";

const ImageGallery = ({ images }) => {
  const [show, setShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (image) => {
    setSelectedImage(image);
    setShow(true);
  };

  return (
    <>
      <Row>
        {images.map((image, index) => (
          <Col key={index} md={4} className="mb-3">
            <Image
              src={`http://localhost:9000/images/${image}`}
              thumbnail
              onClick={() => handleShow(image)}
              style={{ cursor: "pointer" }}
            />
          </Col>
        ))}
      </Row>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body>
          <Image src={`http://localhost:9000/images/${selectedImage}`} fluid />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ImageGallery;