const mongoose = require("mongoose");

const WorkerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  healthCheck: { type: Date },
  assignment: { type: String },
  hoursWorked: { type: Number },
  customQuestions: [{ question: String, answer: String }]
});

const Worker = mongoose.model("Worker", WorkerSchema);
module.exports = Worker;
