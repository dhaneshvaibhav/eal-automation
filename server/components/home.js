const express = require("express");
const router = express.Router();
const Worker = require("../components/user");
require('dotenv').config(); // Load .env file

const twilioClient = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

// GET worker by phone number (used as login)
router.post("/", async (req, res) => {
  try {
    let { phone } = req.body;
    console.log("Searching for phone:", phone);

    if (!phone) {
      return res.status(400).json({ error: "Phone number is required" });
    }

    if (!phone.startsWith("+91")) {
      phone = `+91${phone}`;
    }

    console.log("Formatted phone:", phone);

    const worker = await Worker.findOne({ phone: phone });

    console.log("Worker found:", worker);

    if (!worker) {
      return res.status(404).json({ error: "Worker not found in DB" });
    }

    // ✅ Send login confirmation SMS
    await twilioClient.messages.create({
      body: `👋 Hello ${worker.name || "User"}, you have successfully logged in. and check your details and assignment work`,
      from: process.env.TWILIO_PHONE,
      to: phone
    });

    console.log(`✅ SMS sent to ${phone}`);

    res.status(200).json({worker});
  } catch (error) {
    console.error("❌ Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
