// src/components/Home.js
import React from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
    const [chatVisible, setChatVisible] = useState(false);
  const [messages, setMessages] = useState([{ sender: "bot", text: "Hello! How can I help you?" }]);
  const [userMessage, setUserMessage] = useState("");
  const navigate = useNavigate();

  
    const handleSendMessage = async () => {
      if (!userMessage.trim()) return;
      const newMessages = [...messages, { sender: "user", text: userMessage }];
      setMessages(newMessages);
      setUserMessage("");
  
      try {
        const response = await axios.post("http://localhost:3000/chatBot/chat", { message: userMessage });
  
        console.log("Response:", response.data); // Debugging step
  
        setMessages([...newMessages, { sender: "bot", text: response.data.reply }]); // Fixed 'reply' instead of 'result'
      } catch (error) {
        console.error("Error sending message:", error);
        setMessages([...newMessages, { sender: "bot", text: "Sorry, I couldn't process your request." }]);
      }
  };
  return (
    <div className="home-page">
      <header
        className="bg-dark text-white text-center"
        style={{ paddingTop: "6rem", paddingBottom: "3rem" }}
      >
        <Container>
          <h1 className="display-4">Mining Worker Portal</h1>
          <p className="lead">
            Tools to support health, schedule, and safety in the mines.
          </p>
          <Button variant="primary" onClick={() => navigate("/details")}>
            Go to getdetails sections
          </Button>
        </Container>
      </header>

      <section className="py-5 bg-light">
        <Container>
          <Row className="justify-content-center">
            <Col md={4} className="mb-4">
              <Card
                className="shadow-lg border-0"
                onClick={() => navigate("/appointments")}
                style={{ cursor: "pointer", padding: "20px", height: "100%" }}
              >
                <Card.Body className="text-center">
                  <Card.Title style={{ fontSize: "1.5rem" }}>
                    🩺 Doctor Appointment
                  </Card.Title>
                  <Card.Text>
                    Book and manage medical appointments for health checkups and emergencies.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4} className="mb-4">
              <Card
                className="shadow-lg border-0"
                onClick={() => navigate("/calendar")}
                style={{ cursor: "pointer", padding: "20px", height: "100%" }}
              >
                <Card.Body className="text-center">
                  <Card.Title style={{ fontSize: "1.5rem" }}>
                    📅 Calendar
                  </Card.Title>
                  <Card.Text>
                    View your shift schedule, meeting reminders, and special event alerts.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4} className="mb-4">
              <Card
                className="shadow-lg border-0"
                onClick={() => navigate("/safety")}
                style={{ cursor: "pointer", padding: "20px", height: "100%" }}
              >
                <Card.Body className="text-center">
                  <Card.Title style={{ fontSize: "1.5rem" }}>
                    🦺 Safety & Security
                  </Card.Title>
                  <Card.Text>
                    Stay updated with safety protocols, evacuation plans, and hazard alerts.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4} className="mb-4">
              <Card
                className="shadow-lg border-0"
                onClick={() => navigate("/emergency")}
                style={{ cursor: "pointer", padding: "20px", height: "100%", backgroundColor: "#fff3cd" }}
              >
                <Card.Body className="text-center">
                  <Card.Title style={{ fontSize: "1.5rem" }}>
                    🚨 Emergency Alerts
                  </Card.Title>
                  <Card.Text>
                    Check live sensor data and real-time emergency conditions in the mines.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      <button onClick={() => setChatVisible(!chatVisible)} style={{
        position: "fixed",
        bottom: "20px",
        left: "20px",
        backgroundColor: "#007bff",
        color: "white",
        padding: "10px 15px",
        borderRadius: "50%",
        fontSize: "16px",
        border: "none",
        cursor: "pointer"
      }}>
        💬
      </button>

      {/* Chatbot Window */}
      {chatVisible && (
        <div style={{
          position: "fixed",
          bottom: "80px",
          left: "20px",
          width: "300px",
          backgroundColor: "#333",
          color: "white",
          padding: "10px",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.3)"
        }}>
          <div style={{ height: "200px", overflowY: "auto" }}>
            {messages.map((msg, index) => (
              <div key={index} style={{ textAlign: msg.sender === "user" ? "right" : "left", margin: "5px 0" }}>
                <span style={{
                  backgroundColor: msg.sender === "user" ? "#007bff" : "#555",
                  padding: "5px 10px",
                  borderRadius: "10px",
                  display: "inline-block"
                }}>
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", marginTop: "10px" }}>
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Type a message..."
              style={{ flex: 1, padding: "5px", borderRadius: "5px", border: "none" }}
            />
            <button onClick={handleSendMessage} style={{
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              padding: "5px 10px",
              marginLeft: "5px",
              borderRadius: "5px",
              cursor: "pointer"
            }}>
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
