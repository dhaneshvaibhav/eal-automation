import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";

const Emergency = () => {
  const [sensorReadings, setSensorReadings] = useState([]);
  const [hasSentAlert, setHasSentAlert] = useState(false); // 🆕 Alert sent flag

  const defaultSensorData = [
    { id: 1, usage: "Obstacle Detection", name: "IR Sensor", key: "ir", gpio: "GPIO 2", signal: "OUT", icon: "📟" },
    { id: 2, usage: "Temperature", name: "DHT Sensor", key: "temperature", gpio: "GPIO 15", signal: "Data", icon: "🌡️", threshold: 40 },
    { id: 3, usage: "Humidity", name: "DHT Sensor", key: "humidity", gpio: "GPIO 15", signal: "Data", icon: "💧", threshold: 80 },
    { id: 4, usage: "Motion Tracking (x)", name: "MPU6050", key: "ax", gpio: "GPIO 21", signal: "SDA", icon: "🧭" },
    { id: 5, usage: "Motion Tracking (y)", name: "MPU6050", key: "ay", gpio: "GPIO 22", signal: "SCL", icon: "🧭" },
    { id: 6, usage: "Motion Tracking (z)", name: "MPU6050", key: "az", gpio: "GPIO 23", signal: "INT", icon: "🧭" },
    { id: 6, usage: "Pressure Sensor", name: "BMP280", key: "pressure", gpio: "GPIO 18", signal: "SDA", icon: "🧪", threshold: 1015 },
    { id: 7, usage: "Altitude", name: "BMP280", key: "altitude", gpio: "GPIO 19", signal: "SCL", icon: "📏" },
    { id: 8, usage: "Human Presence", name: "PIR Sensor", key: "pir", gpio: "GPIO 27", signal: "OUT", icon: "🚶" },
    { id: 9, usage: "Light Detection", name: "LDR Sensor", key: "ldr", gpio: "GPIO 34", signal: "A0", icon: "💡" },
    { id: 10, usage: "Gas Detection (Analog)", name: "MQ2 Sensor", key: "mq2Ao", gpio: "GPIO 35", signal: "A0", icon: "🔥", threshold: 2000 },
    { id: 11, usage: "Gas Detection (Digital)", name: "MQ2 Sensor", key: "mq2Do", gpio: "GPIO 25", signal: "D0", icon: "🔥" },
  ];

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const res = await axios.get("https://eal-automation-backend.onrender.com/get-sensor-data");
        const fetchedData = res.data?.data || [];

        const updatedSensorData = defaultSensorData.map(sensor => {
          const matched = fetchedData.find(item => item.key === sensor.key);
          const rawValue = matched?.value ?? "N/A";
          const numericValue = parseFloat(rawValue);
          const isSafe = sensor.threshold ? numericValue <= sensor.threshold : true;

          return {
            ...sensor,
            value: rawValue,
            status: isNaN(numericValue) ? null : isSafe ? "safe" : "danger"
          };
        });

        setSensorReadings(updatedSensorData);

        // 🚨 Alert logic
        const dangerCount = updatedSensorData.filter(s => s.status === "danger").length;
        if (dangerCount >= 3 && !hasSentAlert) {
          await axios.post("https://eal-automation-backend.onrender.com/send-alert", {
            message: `🚨 Alert! ${dangerCount} sensors are in danger state in the mining area. Immediate attention required!`,
          });
          setHasSentAlert(true);
        }

        // Reset alert if danger subsides
        if (dangerCount < 3 && hasSentAlert) {
          setHasSentAlert(false);
        }

      } catch (error) {
        console.error("Error fetching sensor data:", error);
        setSensorReadings(defaultSensorData);
      }
    };

    fetchSensorData();
    const interval = setInterval(fetchSensorData, 5000);
    return () => clearInterval(interval);
  }, [hasSentAlert]);

  return (
    <Container className="py-5">
      <style>{`
        .blink-red {
          animation: blink-red 1s infinite;
          border: 2px solid red !important;
        }

        .blink-green {
          animation: blink-green 1s infinite;
          border: 2px solid green !important;
        }

        @keyframes blink-red {
          0% { background-color: #ffe5e5; }
          50% { background-color: transparent; }
          100% { background-color: #ffe5e5; }
        }

        @keyframes blink-green {
          0% { background-color: #e0ffe0; }
          50% { background-color: transparent; }
          100% { background-color: #e0ffe0; }
        }
      `}</style>

      <h2 className="text-center mb-4">🚨 Emergency Sensor Readings</h2>
      <Row>
        {sensorReadings.map((sensor) => (
          <Col md={4} sm={6} xs={12} key={sensor.id} className="mb-4">
            <Card className={`shadow-sm h-100 ${sensor.status === "danger" ? "blink-red" : sensor.status === "safe" ? "blink-green" : ""}`}>
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
