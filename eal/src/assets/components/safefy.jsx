// src/components/Safety.js
import React from "react";
import { Container, Card, ListGroup, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Safety = () => {
  const navigate = useNavigate();

  return (
    <div className="safety-page">
      <header className="bg-danger text-white py-5 text-center">
        <Container>
          <h1 className="display-4">Safety Guidelines</h1>
          <p className="lead">Follow these safety rules to ensure your well-being at work.</p>
        </Container>
      </header>

      <section className="py-5 bg-light">
        <Container>
          <Card className="shadow-lg border-0">
            <Card.Body>
              <Card.Title className="text-center">Important Safety Rules</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>1. Always wear the required Personal Protective Equipment (PPE).</ListGroup.Item>
                <ListGroup.Item>2. Follow all posted safety signs and instructions.</ListGroup.Item>
                <ListGroup.Item>3. Report any equipment malfunction or hazard immediately.</ListGroup.Item>
                <ListGroup.Item>4. Never work alone in a hazardous area.</ListGroup.Item>
                <ListGroup.Item>5. Maintain clear communication with your team at all times.</ListGroup.Item>
                <ListGroup.Item>6. Familiarize yourself with emergency exits and evacuation routes.</ListGroup.Item>
                <ListGroup.Item>7. Avoid consuming alcohol or drugs before or during your shift.</ListGroup.Item>
                <ListGroup.Item>8. In case of emergency, follow the evacuation plan and assemble at the designated area.</ListGroup.Item>
                <ListGroup.Item>9. Keep your work area clean and organized to avoid accidents.</ListGroup.Item>
                <ListGroup.Item>10. Be aware of your surroundings and stay alert to potential hazards.</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Container>
      </section>

      {/* Button to navigate back to the dashboard */}
      <section className="text-center py-4">
        <Button variant="secondary" onClick={() => navigate("/")}>Back to Home</Button>
      </section>
    </div>
  );
};

export default Safety;
