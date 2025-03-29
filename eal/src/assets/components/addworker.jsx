import { useState, useEffect } from "react";
import axios from "axios";
import backgroundImage from "../components/workers-with-coal-at-open-pit.webp"; // Background image

export default function AddWorkerPage() {
  const [worker, setWorker] = useState({
    name: "",
    phone: "",
    email: "",
    healthCheck: "",
    assignment: "",
    hoursWorked: "",
    customQuestions: [],
  });

  const [message, setMessage] = useState(null); // Success/Error message
  const [chatVisible, setChatVisible] = useState(false);
  const [messages, setMessages] = useState([{ sender: "bot", text: "Hello! How can I help you?" }]);
  const [userMessage, setUserMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setWorker((prevWorker) => ({ ...prevWorker, [name]: value }));
  };

  const handleCustomQuestionChange = (index, field, value) => {
    const updatedQuestions = [...worker.customQuestions];
    updatedQuestions[index][field] = value;
    setWorker((prevWorker) => ({ ...prevWorker, customQuestions: updatedQuestions }));
  };

  const handleAddWorker = async () => {
    let formattedPhone = worker.phone.trim();
    if (!formattedPhone.startsWith("+")) {
      formattedPhone = `+91${formattedPhone}`;
    }

    try {
      const response = await axios.post("http://localhost:3000/get", { ...worker, phone: formattedPhone });

      if (response.status === 201) {
        setMessage(response.data.message);
        setWorker({ name: "", phone: "", email: "", healthCheck: "", assignment: "", hoursWorked: "", customQuestions: [] });
      }
    } catch (error) {
      console.error("Error adding worker:", error);
      setMessage(error.response?.data?.error || "Failed to add worker");
    }
  };

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;
    const newMessages = [...messages, { sender: "user", text: userMessage }];
    setMessages(newMessages);
    setUserMessage("");

    try {
      const response = await axios.post("http://localhost:3000/chatBot/chat", { message: userMessage });
      setMessages([...newMessages, { sender: "bot", text: response.data.reply }]);
    } catch (error) {
      setMessages([...newMessages, { sender: "bot", text: "Sorry, I couldn't process your request." }]);
    }
  };

  const addCustomQuestion = () => {
    setWorker((prevWorker) => ({ ...prevWorker, customQuestions: [...prevWorker.customQuestions, { question: "", answer: "" }] }));
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
        display: "flex",
        justifyContent: "space-between", // Moves chatbot to left & form to right
        alignItems: "center",
        padding: "0 5vw", // Spacing on both sides
      }}
    >
      {/* Chatbot Button */}
      <button onClick={() => setChatVisible(!chatVisible)} className="btn btn-primary position-fixed bottom-0 start-0 m-3 rounded-circle" style={{ zIndex: 1050 }}>
        💬
      </button>

      {/* Chatbot Window (Ensuring Visibility) */}
      {chatVisible && (
        <div className="card p-3 bg-dark text-white position-fixed bottom-5 start-0 m-3 shadow" style={{ width: "320px", zIndex: 1050 }}>
          <h6 className="text-center">Chatbot</h6>
          <div className="chat-box mb-3" style={{ height: "200px", overflowY: "auto" }}>
            {messages.map((msg, index) => (
              <div key={index} className={`text-${msg.sender === "user" ? "end" : "start"} my-1`}>
                <span className={`badge bg-${msg.sender === "user" ? "primary" : "secondary"} p-2`}>{msg.text}</span>
              </div>
            ))}
          </div>
          <div className="d-flex">
            <input type="text" value={userMessage} onChange={(e) => setUserMessage(e.target.value)} className="form-control" placeholder="Type a message..." />
            <button onClick={handleSendMessage} className="btn btn-primary ms-2">➤</button>
          </div>
        </div>
      )}

      {/* Input Form (Moved to Right) */}
      <div className="container" style={{ marginLeft: "auto" }}> {/* Moves form to right */}
        <div className="card p-4 bg-dark text-white shadow-lg" style={{ maxWidth: "450px" }}>
          <h2 className="text-center mb-3">Add Worker</h2>

          <input type="text" name="name" value={worker.name} onChange={handleInputChange} className="form-control mb-3" placeholder="Full Name" />
          <input type="text" name="phone" value={worker.phone} onChange={handleInputChange} className="form-control mb-3" placeholder="Phone Number (+91 auto)" />
          <input type="email" name="email" value={worker.email} onChange={handleInputChange} className="form-control mb-3" placeholder="Email" />
          <input type="date" name="healthCheck" value={worker.healthCheck} onChange={handleInputChange} className="form-control mb-3" />
          <input type="text" name="assignment" value={worker.assignment} onChange={handleInputChange} className="form-control mb-3" placeholder="Assignment Details" />
          <input type="number" name="hoursWorked" value={worker.hoursWorked} onChange={handleInputChange} className="form-control mb-3" placeholder="Hours Worked" />

          {worker.customQuestions.map((q, index) => (
            <div key={index} className="mb-3">
              <input type="text" placeholder="Question" className="form-control mb-2" value={q.question} onChange={(e) => handleCustomQuestionChange(index, "question", e.target.value)} />
              <input type="text" placeholder="Answer" className="form-control" value={q.answer} onChange={(e) => handleCustomQuestionChange(index, "answer", e.target.value)} />
            </div>
          ))}

          <button onClick={addCustomQuestion} className="btn btn-warning w-100 mb-2">➕ Add Question</button>
          <button onClick={handleAddWorker} className="btn btn-success w-100">✅ Submit Worker</button>
          {message && <p className="text-center mt-3 text-success">{message}</p>}
        </div>
      </div>
    </div>
  );
}
