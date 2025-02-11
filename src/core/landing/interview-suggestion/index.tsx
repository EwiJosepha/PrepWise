
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import Image from "next/image";
import interviewPic from '@/assets/images/prep-pre.jpg'

export default function InteractiveDemo() {
  const [messages, setMessages] = useState([
    { text: "Ask me any interview question!", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const sampleQuestions = [
    "Tell me about yourself.",
    "What are your strengths and weaknesses?",
    "Why should we hire you?",
  ];

  const getAIResponse = (question: string) => {
    const responses: { [key: string]: string } = {
      "Tell me about yourself.": "I'm an AI coach! Tell me about your background, skills, and experience relevant to the job.",
      "What are your strengths and weaknesses?": "A great answer includes self-awareness. Mention strengths relevant to the job and a weakness you’re improving.",
      "Why should we hire you?": "Highlight your skills, experience, and what makes you unique. Show how you add value to the company!",
    };
    return responses[question] || "Great question! Try structuring your answer with the STAR method.";
  };

  const sendMessage = (question: string) => {
    if (!question.trim()) return;

    setMessages((prev) => [...prev, { text: question, sender: "user" }]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: getAIResponse(question), sender: "bot" },
      ]);
    }, 1000);

    setInput("");
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-6xl mx-auto p-6 pt-20">
    <div className="w-full md:w-1/2">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">🎙️ Try a Live AI Chat!</h2>
      <div className="h-64 overflow-y-auto border border-gray-700 rounded-lg p-4 space-y-2">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: msg.sender === "user" ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={`p-3 rounded-lg ${msg.sender === "user" ? "bg-blue-500 text-right ml-auto text-white" : "bg-gray-800 text-white"} max-w-[80%]`}
          >
            {msg.text}
          </motion.div>
        ))}
      </div>
      <div className="mt-4 space-y-2">
        <p className="text-sm text-gray-400">Try these questions:</p>
        <div className="flex flex-wrap gap-2">
          {sampleQuestions.map((question, index) => (
            <button key={index} onClick={() => sendMessage(question)} className="text-sm bg-gray-700 text-white px-3 py-1 rounded-lg hover:bg-gray-600">
              {question}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center border border-gray-700 rounded-lg p-2">
        <input
          type="text"
          placeholder="Type an interview question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow bg-transparent outline-none text-white placeholder-gray-400"
        />
        <button onClick={() => sendMessage(input)} className="text-white hover:text-blue-300">
          <Send size={20} />
        </button>
      </div>
    </div>
  
    <div className="w-full md:w-1/2 flex justify-center">
      <div className="relative w-[400px] h-[400px]">
        <Image
          src={interviewPic}
          alt="Interview preparation"
          layout="fill"
          objectFit="cover"
          className="rounded-lg shadow-lg"
        />
      </div>
    </div>
  </div>
  
  );
}
