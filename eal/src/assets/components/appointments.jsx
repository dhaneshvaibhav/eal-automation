// src/components/Appointment.js
import React, { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Appointment = () => {
  const navigate = useNavigate();

  // State to manage the appointment form data and errors
  const [appointmentData, setAppointmentData] = useState({
    name: "",
    date: "",
    time: "",
    description: ""
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setAppointmentData({
      ...appointmentData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple form validation
    if (!appointmentData.name || !appointmentData.date || !appointmentData.time) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      // Send appointment data to backend
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        throw new Error("Failed to create appointment.");
      }

      const result = await response.json();

      setSuccess(true);
      setError(null);
      setAppointmentData({
        name: "",
        date: "",
        time: "",
        description: "",
      });
    } catch (error) {
      setError(error.message);
      setSuccess(false);
    }
  };

  return (
    <div className="appointment-page">
      <header className="bg-primary text-white py-5 text-center">
        <Container>
          <h1 className="display-4">Book a Doctor Appointment</h1>
          <p className="lead">Choose a convenient date and time for your appointment.</p>
        </Container>
      </header>

      <section className="py-5 bg-light">
        <Container>
          <Card className="shadow-lg border-0">
            <Card.Body>
              <h3 className="text-center mb-4">Appointment Form</h3>

              {/* Display error or success message */}
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">Appointment booked successfully!</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={appointmentData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="date" className="mt-3">
                  <Form.Label>Appointment Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={appointmentData.date}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="time" className="mt-3">
                  <Form.Label>Appointment Time</Form.Label>
                  <Form.Control
                    type="time"
                    name="time"
                    value={appointmentData.time}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="description" className="mt-3">
                  <Form.Label>Reason for Appointment</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={appointmentData.description}
                    onChange={handleChange}
                    placeholder="Provide a brief description of your issue"
                  />
                </Form.Group>

                <div className="text-center mt-4">
                  <Button variant="primary" type="submit">Book Appointment</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </section>

      <section className="text-center py-4">
        <Button variant="secondary" onClick={() => navigate("/")}>Back to Home</Button>
      </section>
    </div>
  );
};

export default Appointment;
