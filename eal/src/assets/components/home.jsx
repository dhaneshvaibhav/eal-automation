import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../components/1520043416793.webp"; // Import your background image

export default function Home() {
  const navigate = useNavigate();
  const [worker, setWorker] = useState({ name: "", phone: "" });
  const [chatVisible, setChatVisible] = useState(false);
  const [messages, setMessages] = useState([{ sender: "bot", text: "Hello! How can I help you?" }]);
  const [userMessage, setUserMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setWorker({ ...worker, [name]: value });
  };

  const handleGetDetails = () => {
    if (!worker.phone.trim()) {
      alert("Please enter a phone number.");
      return;
    }
    navigate("/details", { state: { phone: worker.phone } });
  };

  
  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;
    const newMessages = [...messages, { sender: "user", text: userMessage }];
    setMessages(newMessages);
    setUserMessage("");

    try {
      const response = await axios.post("http://localhost:3000/chatBot/chat", { message: userMessage });

      console.log("Response:", response.data); // Debugging step

      setMessages([...newMessages, { sender: "bot", text: response.data.reply }]); // Fixed 'reply' instead of 'result'
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages([...newMessages, { sender: "bot", text: "Sorry, I couldn't process your request." }]);
    }
};


  return (
    <div style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100vh",
      width: "100vw",
      position: "fixed",
      top: 0,
      left: 0
    }}>
      <div style={{
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        height: "100vh",
        width: "100vw",
        position: "absolute",
        top: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <div style={{
          backgroundColor: "rgba(30, 30, 30, 0.9)",
          width: "400px",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
          textAlign: "center",
          color: "white"
        }}>
          <h3>Worker Details</h3>

          <div className="mb-3">
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
                borderRadius: "5px"
              }}
            />
          </div>
          <div className="mb-3">
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
                borderRadius: "5px"
              }}
            />
          </div>
          <button onClick={handleGetDetails} style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "10px",
            width: "100%",
            borderRadius: "5px",
            fontWeight: "bold",
            border: "none"
          }}>
            Get Details
          </button>
        </div>
      </div>

      {/* Chatbot Button */}
      <button onClick={() => setChatVisible(!chatVisible)} style={{
        position: "fixed",
        bottom: "20px",
        left: "20px",
        backgroundColor: "#007bff",
        color: "white",
        padding: "10px 15px",
        borderRadius: "50%",
        fontSize: "16px",
        border: "none",
        cursor: "pointer"
      }}>
        💬
      </button>

      {/* Chatbot Window */}
      {chatVisible && (
        <div style={{
          position: "fixed",
          bottom: "80px",
          left: "20px",
          width: "300px",
          backgroundColor: "#333",
          color: "white",
          padding: "10px",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.3)"
        }}>
          <div style={{ height: "200px", overflowY: "auto" }}>
            {messages.map((msg, index) => (
              <div key={index} style={{ textAlign: msg.sender === "user" ? "right" : "left", margin: "5px 0" }}>
                <span style={{
                  backgroundColor: msg.sender === "user" ? "#007bff" : "#555",
                  padding: "5px 10px",
                  borderRadius: "10px",
                  display: "inline-block"
                }}>
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", marginTop: "10px" }}>
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Type a message..."
              style={{ flex: 1, padding: "5px", borderRadius: "5px", border: "none" }}
            />
            <button onClick={handleSendMessage} style={{
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              padding: "5px 10px",
              marginLeft: "5px",
              borderRadius: "5px",
              cursor: "pointer"
            }}>
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
