import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog } from "@/components/ui/dialog";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Toast, Toaster, useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";

// Types
interface Message {
  role: "user" | "model";
  text: string;
  timestamp: number;
}

// Local storage key
const LOCAL_STORAGE_KEY = "ddriverChatHistory";

// System prompt for DDRiVER
const SYSTEM_PROMPT = `
You are DDRiVER, an elite, highly specialized expert and guide focused on Disaster Risk Reduction and Management (DRRM), Climate Change Adaptation, Public Service Continuity, and Anticipatory Actions.
Your knowledge base is authoritative, integrating key global and Philippine national frameworks.
Provide clear, structured, and actionable advice. Cite relevant frameworks or policies when guiding.
Maintain a professional, proactive, and supportive tone.
`;

// Gemini API endpoint
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${
  import.meta.env.VITE_GEMINI_API_KEY
}`;

export const DDRiVERWidget: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Load chat history from localStorage
  useEffect(() => {
    const history = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (history) {
      setMessages(JSON.parse(history));
    }
  }, []);

  // Save chat history
  const saveHistory = (history: Message[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(history));
  };

  // Send message to Gemini API
  const sendMessage = async (text: string) => {
    const userMessage: Message = {
      role: "user",
      text,
      timestamp: Date.now(),
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    saveHistory(newHistory);
    setLoading(true);

    try {
      const payload = {
        contents: newHistory.map((msg) => ({
          role: msg.role,
          parts: [{ text: msg.text }],
        })),
        systemInstruction: {
          parts: [{ text: SYSTEM_PROMPT }],
        },
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      const aiText =
        result?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn’t generate a response.";

      const aiMessage: Message = {
        role: "model",
        text: aiText,
        timestamp: Date.now(),
      };

      const updatedHistory = [...newHistory, aiMessage];
      setMessages(updatedHistory);
      saveHistory(updatedHistory);
    } catch (error) {
      console.error("Gemini API error:", error);
      toast({
        title: "Error",
        description: "Failed to connect to DDRiVER AI. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input.trim());
    setInput("");
  };

  return (
    <Card className="p-4 bg-gray-900 text-white max-w-lg mx-auto shadow-lg">
      <h2 className="text-xl font-bold mb-4">DDRiVER AI Guide</h2>

      {/* Chat history */}
      <div className="space-y-3 max-h-96 overflow-y-auto mb-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`rounded-lg p-2 max-w-xs ${
                msg.role === "user"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-700 text-gray-200"
              }`}
            >
              {msg.text}
              <div className="text-xs mt-1 opacity-70">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <Skeleton className="w-20 h-6" />
          </div>
        )}
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask DDRiVER..."
          className="flex-grow"
        />
        <Button type="submit" disabled={loading}>
          Send
        </Button>
      </form>

      {/* Toast notifications */}
      <Toaster />
    </Card>
  );
};

export default DDRiVERWidget;
