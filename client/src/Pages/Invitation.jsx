import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Heart, Calendar, MapPin } from 'lucide-react';
// import Image from 'next/image';
import '../Styles/Invitation.css';

const Invitation = () => (
  <div className="home-page">
    <header className="hero">
      <h1 className="couple-names">Emily & Michael</h1>
      <p className="wedding-date">August 15, 2024</p>
    </header>

    <Container className="main-content">
      <Row className="justify-content-center">
        <Col md={8} className="text-center">
          <h2 className="section-title">We're Getting Married!</h2>
          <p className="lead">
            Join us in celebrating the beginning of our new life together.
          </p>
        </Col>
      </Row>

      <Row className="event-details justify-content-center mt-5">
        <Col md={4} className="detail-item">
          <Calendar className="icon" />
          <h3>When</h3>
          <p>August 15, 2024</p>
          <p>4:00 PM</p>
        </Col>
        <Col md={4} className="detail-item">
          <MapPin className="icon" />
          <h3>Where</h3>
          <p>Rosewood Gardens</p>
          <p>123 Blossom Street, Springville</p>
        </Col>
      </Row>

      <Row className="justify-content-center mt-5">
        <Col md={6} className="text-center">
          <Button variant="outline-primary" size="lg" className="rsvp-button">
            RSVP
          </Button>
        </Col>
      </Row>

      <Row className="justify-content-center mt-5">
        <Col md={8} className="text-center">
          <h2 className="section-title">Our Story</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.
            Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus
            rhoncus ut eleifend nibh porttitor.
          </p>
        </Col>
      </Row>

      {/* <Row className="photo-gallery justify-content-center mt-5">
        <Col xs={6} md={4} className="mb-4">
          <Image src="/placeholder.svg?height=300&width=300" alt="Couple Photo 1" width={300} height={300} className="img-fluid rounded" />
        </Col>
        <Col xs={6} md={4} className="mb-4">
          <Image src="/placeholder.svg?height=300&width=300" alt="Couple Photo 2" width={300} height={300} className="img-fluid rounded" />
        </Col>
        <Col xs={6} md={4} className="mb-4">
          <Image src="/placeholder.svg?height=300&width=300" alt="Couple Photo 3" width={300} height={300} className="img-fluid rounded" />
        </Col>
      </Row> */}
    </Container>

    <footer className="text-center py-4">
      <p>
        <Heart className="icon heart" /> We can't wait to celebrate with you! <Heart className="icon heart" />
      </p>
    </footer>
  </div>
);

export default Invitation;
