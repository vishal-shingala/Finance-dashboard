import { useState } from "react";
import { MessageCircle, X } from "lucide-react"; // nice icons
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    try {
      // Call backend API
      const res = await axios.post("/api/v1/chatbot", { question: input });
      const botMsg = { from: "bot", text: res.data.answer };

      setMessages((prev) => [...prev, userMsg, botMsg]);
    } catch (err) {
      const errorMsg = { from: "bot", text: "⚠️ Error connecting to server." };
      setMessages((prev) => [...prev, userMsg, errorMsg]);
    }

    setInput("");
  };

  return (
    <div>
      {/* Floating Button */}
      <button
        onClick={toggleChat}
        className=" bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-5 w-80 h-96 bg-gray-900 text-white rounded-2xl shadow-lg flex flex-col">
          <div className="bg-gray-800 px-4 py-2 rounded-t-2xl font-bold">
            🤖 AI Assistant
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[80%] ${
                  m.from === "user"
                    ? "bg-blue-600 ml-auto"
                    : "bg-gray-700 mr-auto"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>
          <div className="flex border-t border-gray-700">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 p-2 bg-gray-800 text-white outline-none"
            />
            <button
              onClick={sendMessage}
              className="px-4 bg-blue-600 hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
