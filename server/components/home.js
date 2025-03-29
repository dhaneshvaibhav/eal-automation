const express = require("express");
const router = express.Router();
const Worker = require("../components/user"); // ✅ Ensure the correct path for your Mongoose model

// GET worker by phone number
router.get("/", async (req, res) => {
  try {
    let { phone } = req.query;
    console.log("Searching for phone:", phone); // Log input

    if (!phone) {
      return res.status(400).json({ error: "Phone number is required" });
    }

    // Ensure phone number is stored with +91
    if (!phone.startsWith("+91")) {
      phone = `+91${phone}`;
    }
    
    console.log("Formatted phone:", phone); // Log formatted phone

    const worker = await Worker.findOne({ phone: phone }); // Search with the correct format

    console.log("Worker found:", worker); // Log the result

    if (!worker) {
      return res.status(404).json({ error: "Worker not found in DB" });
    }

    res.status(200).json(worker);
  } catch (error) {
    console.error("Error fetching worker:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;
