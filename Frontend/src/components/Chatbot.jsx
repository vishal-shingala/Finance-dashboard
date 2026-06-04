import { useState } from "react";
import { MessageCircle, X } from "lucide-react"; // nice icons
import axios from "axios";
import { API_URL } from "../config";

axios.defaults.baseURL = API_URL.replace(/\/$/, "");
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
      const res = await axios.post("/chatbot", { question: input });
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
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 sm:p-4 rounded-full shadow-lg transition-transform transform hover:scale-110"
      >
        {isOpen ? <X size={20} className="sm:w-6 sm:h-6" /> : <MessageCircle size={20} className="sm:w-6 sm:h-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-16 sm:bottom-20 right-4 sm:right-5 w-72 sm:w-80 h-80 sm:h-96 bg-gray-900 text-white rounded-2xl shadow-lg flex flex-col border border-gray-700">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-3 sm:px-4 py-2 sm:py-3 rounded-t-2xl font-bold text-sm sm:text-base">
            🤖 AI Assistant
          </div>
          <div className="flex-1 overflow-y-auto p-2 sm:p-3 space-y-2 text-xs sm:text-sm">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-2 sm:p-3 rounded-lg max-w-[85%] word-break ${
                  m.from === "user"
                    ? "bg-blue-600 ml-auto"
                    : "bg-gray-700 mr-auto"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>
          <div className="flex border-t border-gray-700 gap-1">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type..."
              className="flex-1 p-2 sm:p-3 bg-gray-800 text-white outline-none text-xs sm:text-sm"
            />
            <button
              onClick={sendMessage}
              className="px-2 sm:px-4 bg-blue-600 hover:bg-blue-700 transition text-xs sm:text-sm font-medium"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
