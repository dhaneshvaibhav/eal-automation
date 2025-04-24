import { useLocation } from "react-router-dom";

export default function Details() {
  const location = useLocation();
  const worker = location.state?.worker;

  if (!worker) {
    return <p>No worker data found.</p>;
  }

  return (
    <div className="container mt-4 text-white">
      <h3>Worker Details</h3>
      <div className="bg-dark p-3 rounded">
        <p><strong>Name:</strong> {worker.name}</p>
        <p><strong>Email:</strong> {worker.email}</p>
        <p><strong>Phone:</strong> {worker.phone}</p>
        <p><strong>Health Check:</strong> {worker.healthCheck}</p>
        <p><strong>Assignment:</strong> {worker.assignment}</p>
        <p><strong>Hours Worked:</strong> {worker.hoursWorked}</p>
        <strong>Custom Questions:</strong>
        <ul>
          {worker.customQuestions?.map((q, index) => (
            <li key={index}>
              <strong>{q.question}:</strong> {q.answer}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
