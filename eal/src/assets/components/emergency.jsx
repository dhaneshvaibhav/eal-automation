import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";

const Emergency = () => {
  const [sensorReadings, setSensorReadings] = useState([]);

  const defaultSensorData = [
    { id: 1, usage: "Obstacle Detection", name: "IR Sensor", key: "ir", gpio: "GPIO 2", signal: "OUT", icon: "📟" },
    { id: 2, usage: "Temperature & Humidity", name: "DHT Sensor", key: "temperature", gpio: "GPIO 15", signal: "Data", icon: "🌡️" },
    { id: 3, usage: "Humidity", name: "DHT Sensor", key: "humidity", gpio: "GPIO 15", signal: "Data", icon: "💧" },
    { id: 4, usage: "Motion Tracking (SDA)", name: "MPU6050", key: "ax", gpio: "GPIO 21", signal: "SDA", icon: "🧭" },
    { id: 5, usage: "Motion Tracking (SCL)", name: "MPU6050", key: "ay", gpio: "GPIO 22", signal: "SCL", icon: "🧭" },
    { id: 6, usage: "Pressure Sensor", name: "BMP280", key: "pressure", gpio: "GPIO 18", signal: "SDA", icon: "🧪" },
    { id: 7, usage: "Altitude", name: "BMP280", key: "altitude", gpio: "GPIO 19", signal: "SCL", icon: "📏" },
    { id: 8, usage: "Human Presence", name: "PIR Sensor", key: "pir", gpio: "GPIO 27", signal: "OUT", icon: "🚶" },
    { id: 9, usage: "Light Detection", name: "LDR Sensor", key: "ldr", gpio: "GPIO 34", signal: "A0", icon: "💡" },
    { id: 10, usage: "Gas Detection (Analog)", name: "MQ2 Sensor", key: "mq2Ao", gpio: "GPIO 35", signal: "A0", icon: "🔥" },
    { id: 11, usage: "Gas Detection (Digital)", name: "MQ2 Sensor", key: "mq2Do", gpio: "GPIO 25", signal: "D0", icon: "🔥" },
  ];

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const res = await axios.get("https://eal-automation-backend.onrender.com/upload-sensor-data"); // Adjust to actual backend route
        const fetchedData = res.data;

        const updatedSensorData = defaultSensorData.map(sensor => ({
          ...sensor,
          value: fetchedData[sensor.key] ?? "N/A"
        }));

        setSensorReadings(updatedSensorData);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
        setSensorReadings(defaultSensorData); // fallback
      }
    };

    fetchSensorData();

    const interval = setInterval(fetchSensorData, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">🚨 Emergency Sensor Readings</h2>
      <Row>
        {sensorReadings.map((sensor) => (
          <Col md={4} sm={6} xs={12} key={sensor.id} className="mb-4">
            <Card className="shadow-sm h-100 border border-danger">
              <Card.Body className="text-center">
                <Card.Title className="mb-2" style={{ fontSize: "1.25rem" }}>
                  {sensor.icon} {sensor.usage} <br />
                  <span className="text-muted" style={{ fontSize: "0.9rem" }}>
                    ({sensor.name})
                  </span>
                </Card.Title>
                <Card.Text><strong>GPIO:</strong> {sensor.gpio}</Card.Text>
                <Card.Text><strong>Signal:</strong> {sensor.signal}</Card.Text>
                <Card.Text><strong>Reading:</strong> {sensor.value}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Emergency;
