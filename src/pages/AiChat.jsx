import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { GoogleGenerativeAI } from "@google/generative-ai";

// 🔑 Replace with your own Gemini API key
// const genAI = new GoogleGenerativeAI("AIzaSyAaThT8YUlsM_Zz23xKQ4CIkNivp6EMkvc");

export default function AiChat() {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! I'm your AI assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" });
      const result = await model.generateContent(input);
      const reply = result.response.text();

      setMessages((prev) => [...prev, { sender: "ai", text: reply }]);
    } catch (error) {
      console.error("AI error:", error);
      setMessages((prev) => [...prev, { sender: "ai", text: "Sorry, something went wrong." }]);
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col bg-gray-100">
        <div className="p-4 bg-yellow-400 text-lg font-semibold shadow-md">
          Chat with AI 🤖 ( we are not saving your chats! )
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-20 p-2 rounded-lg max-w-lg ${
                msg.sender === "user"
                  ? "bg-yellow-300 ml-auto"
                  : "bg-white mr-auto"
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
            </div>
          ))}
          {loading && <p className="text-gray-500 italic">AI is thinking...</p>}
        </div>

        <form onSubmit={sendMessage} className="p-4 bg-white shadow-md flex fixed bottom-0 w-full">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border rounded-lg px-3 py-2 mr-2"
            placeholder="Ask anything..."
          />
          <button
            type="submit"
            className="bg-yellow-400 px-4 py-2 rounded-lg font-semibold"
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
}
