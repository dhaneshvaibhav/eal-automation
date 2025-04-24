const express = require("express");
require('dotenv').config();
const cors = require("cors");
const mongoose = require("mongoose");

// Load environment variables
const port = process.env.PORT || 3000;
const connection = process.env.MONGODB;
console.log("MongoDB Connection String:", connection);
console.log("type of string", typeof connection);

// Connect to MongoDB with error handling
mongoose.connect(connection)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Initialize app
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'https://eal-automation.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Route Imports
const chatWithAI = require("../server/components/chatbot").chatWithAI;
app.use("/get", require("../server/components/addworker"));
app.use("/add", require("../server/components/home"));

// Chatbot Route
app.post("/chatBot/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;
    if (!userMessage) return res.status(400).json({ error: "Message is required" });

    const botReply = await chatWithAI(userMessage);
    console.log("Bot Reply:", botReply);

    res.json({ reply: botReply });
  } catch (error) {
    console.error("Chatbot Error:", error);
    res.status(500).json({ error: "Chatbot service unavailable" });
  }
});

// Sensor Data Upload Route

// Store latest formatted sensor data
let latestFormattedData = [];

// Modify POST route to store the formatted data
app.post('/upload-sensor-data', (req, res) => {
  const data = req.body;

  console.log("📡 Received sensor data:");
  console.log(data);
  console.log('----------------------');

  if (!data) {
    return res.status(400).json({ error: "No sensor data received." });
  }

  const formattedData = [
    { id: 1, usage: "Obstacle Detection", name: "IR Sensor", key: "ir", value: data.ir || "N/A", gpio: "GPIO 2", signal: "OUT", icon: "📟" },
    { id: 2, usage: "Temperature & Humidity", name: "DHT Sensor", key: "temperature", value: data.temperature || "N/A", gpio: "GPIO 15", signal: "Data", icon: "🌡️" },
    { id: 3, usage: "Humidity", name: "DHT Sensor", key: "humidity", value: data.humidity || "N/A", gpio: "GPIO 15", signal: "Data", icon: "💧" },
    { id: 4, usage: "Motion Tracking (SDA)", name: "MPU6050", key: "ax", value: data.ax || "N/A", gpio: "GPIO 21", signal: "SDA", icon: "🧭" },
    { id: 5, usage: "Motion Tracking (SCL)", name: "MPU6050", key: "ay", value: data.ay || "N/A", gpio: "GPIO 22", signal: "SCL", icon: "🧭" },
    { id: 6, usage: "Pressure Sensor", name: "BMP280", key: "pressure", value: data.pressure || "N/A", gpio: "GPIO 18", signal: "SDA", icon: "🧪" },
    { id: 7, usage: "Altitude", name: "BMP280", key: "altitude", value: data.altitude || "N/A", gpio: "GPIO 19", signal: "SCL", icon: "📏" },
    { id: 8, usage: "Human Presence", name: "PIR Sensor", key: "pir", value: data.pir || "N/A", gpio: "GPIO 27", signal: "OUT", icon: "🚶" },
    { id: 9, usage: "Light Detection", name: "LDR Sensor", key: "ldr", value: data.ldr || "N/A", gpio: "GPIO 34", signal: "A0", icon: "💡" },
    { id: 10, usage: "Gas Detection (Analog)", name: "MQ2 Sensor", key: "mq2Ao", value: data.mq2Ao || "N/A", gpio: "GPIO 35", signal: "A0", icon: "🔥" },
    { id: 11, usage: "Gas Detection (Digital)", name: "MQ2 Sensor", key: "mq2Do", value: data.mq2Do || "N/A", gpio: "GPIO 25", signal: "D0", icon: "🔥" },
  ];

  // 🧠 Save it for the GET route
  latestFormattedData = formattedData;

  res.status(200).json({ message: 'Sensor data received successfully', data: formattedData });
});

// ✅ GET route to return latest formatted sensor data
app.get('/get-sensor-data', (req, res) => {
  if (!latestFormattedData.length) {
    return res.status(404).json({ message: 'No sensor data available yet.' });
  }
  res.status(200).json({ data: latestFormattedData });
});

app.listen(port, () => {
  console.log(`🚀 App is running on port ${port}`);
});
