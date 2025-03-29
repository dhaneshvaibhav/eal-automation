const express=require("express")
require('dotenv').config();
const cors=require("cors")
const port=process.env.port
const connection=process.env.mongodb
const mongoose=require("mongoose")
mongoose.connect(connection).then(()=>console.log("mongodb connected"));
const app=express();
const chatWithAI = require("../server/components/chatbot").chatWithAI; // ✅ Import chatbot function
app.use(express.json());
app.use(cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST' ,'PUT','DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']  // Allow specific headers
}));
app.use("/get",require("../server/components/addworker"))
app.use("/add",require("../server/components/home"))


app.post("/chatBot/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;
        if (!userMessage) return res.status(400).json({ error: "Message is required" });

        const botReply = await chatWithAI(userMessage);
        console.log("Bot Reply:", botReply); // ✅ Debug here

        res.json({ reply: botReply });
    } catch (error) {
        console.error("Chatbot Error:", error);
        res.status(500).json({ error: "Chatbot service unavailable" });
    }
});

app.listen(port,()=>{
    console.log("app is running");
})