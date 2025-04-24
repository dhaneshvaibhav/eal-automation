import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../components/1520043416793.webp";

export default function Getdetails() {
  const navigate = useNavigate();
  const [worker, setWorker] = useState({ name: "", phone: "" });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setWorker({ ...worker, [name]: value });
  };

  const handleGetDetails = async () => {
    if (!worker.phone.trim()) {
      alert("Please enter a phone number.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/add", {
        phone: worker.phone,
      });

      if (response.data.worker) {
        alert("Worker found! Redirecting to details page.");
        navigate("/details", { state: { worker: response.data.worker } });
      } else {
        alert("Worker not found!");
      }
    } catch (error) {
      console.error("Error fetching worker details:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          height: "100vh",
          width: "100vw",
          position: "absolute",
          top: 0,
          left: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(30, 30, 30, 0.9)",
            width: "400px",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
            color: "white",
          }}
        >
          <h3>Worker Details</h3>
          <div>
            <input
              type="text"
              name="name"
              value={worker.name}
              onChange={handleInputChange}
              placeholder="Enter Worker's Name"
              style={{
                backgroundColor: "#444",
                color: "white",
                border: "1px solid #555",
                padding: "8px",
                width: "100%",
                borderRadius: "5px",
                marginBottom: "10px",
              }}
            />
            <input
              type="text"
              name="phone"
              value={worker.phone}
              onChange={handleInputChange}
              placeholder="Enter Mobile Number"
              style={{
                backgroundColor: "#444",
                color: "white",
                border: "1px solid #555",
                padding: "8px",
                width: "100%",
                borderRadius: "5px",
                marginBottom: "10px",
              }}
            />
            <button
              onClick={handleGetDetails}
              style={{
                backgroundColor: "#007bff",
                color: "white",
                padding: "10px",
                width: "100%",
                borderRadius: "5px",
                fontWeight: "bold",
                border: "none",
              }}
            >
              Get Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
