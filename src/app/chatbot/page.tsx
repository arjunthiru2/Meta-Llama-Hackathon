"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function ChatbotPage() {
  const [messages, setMessages] = useState<{ user: boolean; text: string }[]>([]);
  const [inputValue, setInputValue] = useState("");

  // Ref to scroll the chat history to the bottom
  const chatRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user's message
    const userMessage = { user: true, text: inputValue.trim() };
    setMessages((prev) => [...prev, userMessage]);

    // Clear input field
    const messageToSend = inputValue.trim();
    setInputValue("");

    // Add a placeholder bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { user: false, text: "This is a placeholder response from TGPAI." },
      ]);
    }, 1000);
  };

  // Scroll to the bottom of the chat history whenever messages change
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gradient-to-b from-blue-100 to-white p-8">
      {/* Chat Header */}
      <header className="text-center mb-6">
        <h1 className="text-4xl md:text-6xl font-bold text-gradient">TGP AI</h1>
      </header>

      {/* Chat Container */}
      <div className="flex flex-col w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Chat Messages Area */}
        <div
          ref={chatRef}
          className="flex-1 p-4 bg-blue-50 overflow-y-auto max-h-[400px]"
        >
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.user ? "justify-end" : "justify-start"
                } mb-4`}
              >
                <div
                  className={`p-3 rounded-lg max-w-xs ${
                    message.user
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">
              Say something to start the conversation...
            </p>
          )}
        </div>

        {/* Input Field */}
        <form
          onSubmit={handleSendMessage}
          className="p-3 border-t flex items-center bg-white"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            type="submit"
            className="ml-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg"
          >
            Send
          </button>
        </form>
      </div>

      {/* Back to Calculator */}
      <footer className="mt-8">
        <Link href="/">
          <button className="text-blue-600 underline hover:text-blue-700">
            Back to Calculator
          </button>
        </Link>
      </footer>
    </div>
  );
}