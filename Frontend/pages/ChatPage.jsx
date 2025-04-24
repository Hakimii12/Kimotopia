import React, { useState, useEffect, useRef, useContext } from 'react';
import { ContextProvider } from '../ContextApi/ContextApi';

const ChatPage = () => {
    const { dark } = useContext(ContextProvider);
    const [messages, setMessages] = useState([
        { 
            text: "Hello there!", 
            sender: "johndoe", 
            timestamp: new Date().toISOString(), 
            fromUser: false 
        },
        { 
            text: "Hi! How are you?", 
            sender: "me", 
            timestamp: new Date().toISOString(), 
            fromUser: true 
        },
        { 
            text: "Welcome to our chat platform!", 
            sender: "alice", 
            timestamp: new Date().toISOString(), 
            fromUser: false 
        },
    ]);
    const [newMessage, setNewMessage] = useState('');
    const [username, setUsername] = useState('');
    const messagesEndRef = useRef(null);

    const mockConversations = [
        { 
            username: 'johndoe', 
            online: true, 
            lastMessage: "Hello there!", 
            unread: 0 
        },
        { 
            username: 'alice', 
            online: true, 
            lastMessage: "Welcome to our chat platform!", 
            unread: 2 
        },
        { 
            username: 'bob', 
            online: false, 
            lastMessage: "See you tomorrow!", 
            unread: 0 
        },
    ];

    const sendMessage = () => {
        if (newMessage.trim()) {
            const message = {
                text: newMessage,
                sender: username,
                timestamp: new Date().toISOString(),
                fromUser: true
            };
            setMessages(prev => [...prev, message]);
            
            // Add mock reply
            const mockReply = {
                text: "This is a mock reply",
                sender: "responder",
                timestamp: new Date().toISOString(),
                fromUser: false
            };
            setTimeout(() => {
                setMessages(prev => [...prev, mockReply]);
            }, 1000);
            
            setNewMessage('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className={`flex h-screen ${dark ? 'bg-gray-900' : 'bg-gray-100'}`}>
            {/* Left Sidebar */}
            <div className={`w-1/4 border-r ${dark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className={`p-4 border-b ${dark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <h3 className={`text-xl font-semibold ${dark ? 'text-white' : 'text-gray-800'}`}>Chat App</h3>
                    <div className="mt-4">
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                                dark 
                                    ? 'bg-gray-700 text-white focus:ring-blue-400' 
                                    : 'border focus:ring-blue-500'
                            }`}
                        />
                    </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-2">
                    <h4 className={`text-sm font-medium ${dark ? 'text-gray-400' : 'text-gray-500'} mb-2`}>
                        Conversations
                    </h4>
                    {mockConversations.map((user, index) => (
                        <div 
                            key={index} 
                            className={`flex items-center p-2 rounded-lg cursor-pointer ${
                                dark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                            }`}
                        >
                            <div className={`h-2 w-2 rounded-full mr-2 ${user.online ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                            <div className="flex-1">
                                <p className={dark ? 'text-gray-200' : 'text-gray-700'}>{user.username}</p>
                                <p className={`text-xs ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {user.lastMessage}
                                </p>
                            </div>
                            {user.unread > 0 && (
                                <div className={`ml-2 px-2 py-1 rounded-full text-xs ${
                                    dark ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
                                }`}>
                                    {user.unread}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
                {/* Messages Container */}
                <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${dark ? 'bg-gray-900' : ''}`}>
                    {messages.map((msg, index) => (
                        <div 
                            key={index}
                            className={`flex ${msg.fromUser ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-md p-3 rounded-lg ${
                                msg.fromUser 
                                    ? `${dark ? 'bg-blue-600' : 'bg-blue-500'} text-white`
                                    : `${dark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`
                            }`}
                            >
                                {!msg.fromUser && (
                                    <div className={`text-xs font-medium ${dark ? 'text-gray-300' : 'text-gray-600'} mb-1`}>
                                        {msg.sender}
                                    </div>
                                )}
                                <p className="break-words">{msg.text}</p>
                                <div className={`text-xs mt-1 ${
                                    msg.fromUser 
                                        ? (dark ? 'text-blue-200' : 'text-blue-100')
                                        : (dark ? 'text-gray-400' : 'text-gray-500')
                                }`}>
                                    {new Date(msg.timestamp).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className={`border-t p-4 ${dark ? 'border-gray-700 bg-gray-800' : 'border-gray-200'}`}>
                    <div className="flex gap-2">
                        <textarea
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type a message..."
                            rows="1"
                            className={`flex-1 resize-none rounded-lg p-3 focus:outline-none focus:ring-2 ${
                                dark 
                                    ? 'bg-gray-700 text-white focus:ring-blue-400' 
                                    : 'border focus:ring-blue-500'
                            }`}
                            disabled={!username}
                        />
                        <button
                            onClick={sendMessage}
                            className={`px-6 py-2 rounded-lg transition-colors ${
                                dark
                                    ? 'bg-blue-600 hover:bg-blue-700'
                                    : 'bg-blue-500 hover:bg-blue-600'
                            } text-white disabled:opacity-50 disabled:cursor-not-allowed`}
                            disabled={!username}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;