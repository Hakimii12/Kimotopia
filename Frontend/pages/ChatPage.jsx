import { useState, useEffect, useRef } from 'react';
import { useContext } from 'react';
import { ContextProvider } from '../ContextApi/ContextApi';

const ChatPage = () => {
  const { dark } = useContext(ContextProvider);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef(null);

  // Simulated initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages([
        { id: 1, text: 'Hello! How are you?', isSent: false, time: '10:00 AM' },
        { id: 2, text: 'I\'m doing great, thanks!', isSent: true, time: '10:01 AM' },
        { id: 3, text: 'Want to grab lunch?', isSent: false, time: '10:02 AM' },
        { id: 4, text: 'Sure, let\'s meet at 12!', isSent: true, time: '10:03 AM' },
      ]);
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Scroll to bottom when messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputText,
        isSent: true,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  const SkeletonLoader = () => (
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex max-w-[70%] animate-pulse">
          <div className={`w-10 h-10 rounded-full mr-3 ${dark ? 'bg-gray-800' : 'bg-gray-200'}`}></div>
          <div className="flex-1 space-y-2">
            <div className={`h-3 rounded w-3/5 ${dark ? 'bg-gray-800' : 'bg-gray-200'}`}></div>
            <div className={`h-3 rounded w-4/5 ${dark ? 'bg-gray-800' : 'bg-gray-200'}`}></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className={`flex flex-col h-[calc(100vh-160px)] sm:h-[calc(100vh-120px)] ${dark ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4">
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isSent ? 'justify-end' : 'justify-start'} mb-4`}
            >
              <div
                className={`max-w-[70%] rounded-2xl p-3 ${
                  message.isSent
                    ? `${dark ? 'bg-blue-600' : 'bg-blue-500'} text-white`
                    : `${dark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`
                }`}
              >
                <p className={dark ? 'text-gray-100' : 'text-gray-800'}>{message.text}</p>
                <span className={`text-xs ${message.isSent ? 'text-blue-100' : (dark ? 'text-gray-400' : 'text-gray-500')} mt-1 block`}>
                  {message.time}
                </span>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Fixed input area */}
      <div className={`sticky bottom-0 ${dark ? 'bg-black' : 'bg-white'} p-4 border-t ${dark ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
            className={`flex-1 px-4 py-2 rounded-full focus:outline-none ${
              dark 
                ? 'bg-gray-800 text-white border border-gray-700 focus:border-blue-500' 
                : 'bg-gray-100 text-gray-800 border border-gray-200 focus:border-blue-500'
            }`}
          />
          <button
            onClick={sendMessage}
            className={`px-6 py-2 rounded-full transition-colors ${
              dark
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;