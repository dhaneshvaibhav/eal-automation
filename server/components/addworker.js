const express = require("express");
const router = express.Router();
const Worker = require("../components/user");
require('dotenv').config();
const twilio = require('twilio');

const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

// Add Worker API
router.post("/", async (req, res) => {
  try {
    const { name, phone, email, healthCheck, assignment, hoursWorked, customQuestions } = req.body;

    // Check if worker already exists
    const existingWorker = await Worker.findOne({ email });
    if (existingWorker) {
      return res.status(400).json({ error: "Worker with this email already exists!" });
    }

    // Ensure phone number is in E.164 format (adds +91 if missing)
    const formattedPhone = phone.startsWith("+") ? phone : `+91${phone}`;

    // Create new worker
    const newWorker = new Worker({ name, phone: formattedPhone, email, healthCheck, assignment, hoursWorked, customQuestions });
    await newWorker.save();

    // ✅ Send Welcome SMS using Twilio
    const messageBody = `Hello ${name}, welcome to the team! You have been successfully added. Your assignment: ${assignment}.`;

    try {
      const twilioResponse = await client.messages.create({
        body: messageBody,
        from: process.env.TWILIO_PHONE, // Twilio number
        to: formattedPhone // Worker’s phone number
      });

      console.log(`SMS sent successfully: ${twilioResponse.sid}`);
      res.status(201).json({ message: "Worker added successfully and SMS sent!", worker: newWorker });
    } catch (twilioError) {
      console.error("Twilio Error:", twilioError);
      res.status(201).json({ message: "Worker added, but SMS failed!", worker: newWorker, twilioError });
    }

  } catch (error) {
    console.error("Error adding worker:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
