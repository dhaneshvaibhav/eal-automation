import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function Details() {
  const [workers, setWorkers] = useState([]); // ✅ Initialize as an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const phone = location.state?.phone; // ✅ Get phone number from state

  useEffect(() => {
    if (!phone) {
      setError("No phone number provided");
      setLoading(false);
      return;
    }
    fetchWorkers();
  }, [phone]);

  const fetchWorkers = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/add?phone=${phone}`);
      
      if (response.data) {
        setWorkers(Array.isArray(response.data) ? response.data : [response.data]); // ✅ Ensure it's an array
      } else {
        setWorkers([]);
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching workers:", error);
      setError("Failed to fetch worker details");
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Worker List</h3>

      {loading ? (
        <p>Loading workers...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : workers.length === 0 ? (
        <p>No workers found.</p>
      ) : (
        <ul className="list-group">
          {workers.map((worker) => (
            <li key={worker._id} className="list-group-item bg-dark text-white">
              <strong>Name:</strong> {worker.name} <br />
              <strong>Email:</strong> {worker.email} <br />
              <strong>Phone:</strong> {worker.phone} <br />
              <strong>Health Check:</strong> {worker.healthCheck} <br />
              <strong>Assignment:</strong> {worker.assignment} <br />
              <strong>Hours Worked:</strong> {worker.hoursWorked} <br />
              <strong>Custom Questions:</strong>
              <ul>
                {worker.customQuestions?.map((q, index) => (
                  <li key={index}>
                    <strong>{q.question}:</strong> {q.answer}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
