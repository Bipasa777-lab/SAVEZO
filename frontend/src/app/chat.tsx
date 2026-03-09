"use client";
import { useState, useEffect } from "react";
import { SendHorizonal } from "lucide-react";
import chatService from "../services/chatService";
import authService from "../services/authService";

interface Message {
  id?: string;
  sender: "user" | "bot";
  text: string;
  timestamp?: Date;
}

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [sessionId, setSessionId] = useState<string | null>(null);

    useEffect(() => {
        // Initialize chat session
        const existingSessionId = chatService.getSessionId();
        if (existingSessionId) {
            setSessionId(existingSessionId);
            loadChatHistory(existingSessionId);
        } else {
            const newSessionId = chatService.generateSessionId();
            setSessionId(newSessionId);
            chatService.setSessionId(newSessionId);
        }
    }, []);

    const loadChatHistory = async (sessionId: string) => {
        try {
            const history = await chatService.getHistory(sessionId);
            setMessages(history.map(msg => ({
                id: msg.id,
                sender: msg.sender || 'user',
                text: msg.message,
                timestamp: msg.timestamp
            })));
        } catch (error) {
            console.error('Error loading chat history:', error);
        }
    };

    const handleSend = async () => {
        if (!input.trim() || !sessionId) return;
        
        const newMessage: Message = { 
            sender: "user", 
            text: input,
            timestamp: new Date()
        };
        
        setMessages((prev) => [...prev, newMessage]);
        setInput("");
        setLoading(true);

        try {
            const response = await chatService.sendMessage(input, sessionId);
            
            if (response.success && response.data) {
                const botMessage: Message = {
                    sender: "bot",
                    text: response.data.message || response.message || "I'm here to help!",
                    timestamp: new Date()
                };
                setMessages((prev) => [...prev, botMessage]);
            } else {
                throw new Error(response.message || 'Failed to get response');
            }
        } catch (error) {
            console.error('Chat error:', error);
            const errorMessage: Message = {
                sender: "bot",
                text: "⚠️ Sorry, I'm having trouble connecting right now. Please try again.",
                timestamp: new Date()
            };
            setMessages((prev) => [...prev, errorMessage]);
        }

        setLoading(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const isAuthenticated = authService.isAuthenticated();

    if (!isAuthenticated) {
        return (
            <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white p-4">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Please Login</h1>
                    <p className="text-gray-600 mb-4">You need to be logged in to use the chat feature.</p>
                    <a 
                        href="/auth/login" 
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                        Go to Login
                    </a>
                </div>
            </main>
        );
    }

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white p-4">
            <div className="w-full max-w-4xl h-[600px] bg-white rounded-lg shadow-lg flex flex-col">
                {/* Header */}
                <div className="bg-blue-500 text-white p-4 rounded-t-lg">
                    <h1 className="text-xl font-semibold">WellnessAI CareBot</h1>
                    <p className="text-sm opacity-90">Your AI health assistant</p>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.length === 0 ? (
                        <div className="text-center text-gray-500 mt-8">
                            <p>👋 Hi! I'm your AI health assistant. How can I help you today?</p>
                        </div>
                    ) : (
                        messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                        message.sender === 'user'
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-100 text-gray-800'
                                    }`}
                                >
                                    <p className="text-sm">{message.text}</p>
                                    {message.timestamp && (
                                        <p className={`text-xs mt-1 ${
                                            message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                                        }`}>
                                            {new Date(message.timestamp).toLocaleTimeString()}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                    {loading && (
                        <div className="flex justify-start">
                            <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
                                <p className="text-sm">Typing...</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="p-4 border-t bg-gray-50 rounded-b-lg">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message..."
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={loading}
                        />
                        <button
                            onClick={handleSend}
                            disabled={loading || !input.trim()}
                            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                        >
                            <SendHorizonal size={16} />
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
