'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Send, Settings, Menu, Search, MoreVertical, Bot, User, Sparkles, Moon, Sun } from 'lucide-react';
import { Droplet } from 'lucide-react';

const FullScreenChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Namaste! What do you need Rainfall recharge or Ground water replenish rate or anything else I can help you with that?",
      timestamp: new Date(Date.now() - 300000)
    },

  ]);

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  const simulateTyping = async (responseText) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1200 + Math.random() * 800));

    setMessages(prev => [...prev, {
      id: Date.now(),
      type: 'bot',
      content: responseText,
      timestamp: new Date()
    }]);
    setIsTyping(false);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot response
    const responses = [
      "Engineers at work! Updated version will fetch you data soon"
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    await simulateTyping(randomResponse);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const TypingIndicator = () => (
    <div className={`flex justify-start mb-6 animate-in slide-in-from-bottom-2 duration-300`}>
      <div className="flex items-end space-x-3 max-w-xs lg:max-w-2xl">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
          <Bot size={18} className="text-white" />
        </div>
        <div className="flex flex-col">
          <div className={`p-4 rounded-2xl rounded-bl-md shadow-sm border ${isDarkMode
            ? 'bg-gray-800 border-gray-700 text-white'
            : 'bg-white border-gray-100 text-gray-800'
            }`}>
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="text-sm text-gray-500">AI is thinking...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const MessageBubble = ({ message }) => (
    <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-6 animate-in slide-in-from-bottom-2 duration-300`}>
      <div className={`flex items-end space-x-3 max-w-xs lg:max-w-2xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${message.type === 'user'
          ? 'bg-gradient-to-br from-emerald-500 to-teal-600'
          : 'bg-gradient-to-br from-blue-500 to-purple-600'
          }`}>
          {message.type === 'user' ?
            <User size={18} className="text-white" /> :
            <Bot size={18} className="text-white" />
          }
        </div>
        <div className="flex flex-col">
          <div className={`p-4 rounded-2xl shadow-sm border ${message.type === 'user'
            ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-br-md border-emerald-200'
            : isDarkMode
              ? 'bg-gray-800 border-gray-700 text-white rounded-bl-md'
              : 'bg-white text-gray-800 rounded-bl-md border-gray-100'
            }`}>
            <p className="text-sm leading-relaxed">{message.content}</p>
          </div>
          <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-2 px-1 ${message.type === 'user' ? 'text-right' : ''}`}>
            {formatTime(message.timestamp)}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`h-screen w-full flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'} transition-all duration-300`}>
      {/* Header */}
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-md border-b px-6 py-4 flex items-center justify-between relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-emerald-500/5"></div>
        <div className="relative flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Droplet size={24} className="text-white" />
          </div>
          <div>
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              JAL SUCHAK
            </h1>

          </div>
        </div>

        <div className="relative flex items-center space-x-3">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-3 rounded-xl transition-all duration-200 ${isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
              }`}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-3 rounded-xl transition-all duration-200 ${isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
              }`}
          >
            <Settings size={20} />
          </button>
          <button className={`p-3 rounded-xl transition-all duration-200 ${isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
            }`}>
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className={`${isDarkMode ? 'bg-gray-800/90 border-gray-700' : 'bg-white/90 border-gray-200'} backdrop-blur-md border-t px-6 py-6`}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end space-x-4">
            <div className={`flex-1 min-h-[56px] max-h-40 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} rounded-2xl border focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-200 relative overflow-hidden`}>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 focus-within:opacity-100 transition-opacity duration-200"></div>
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here... (Press Enter to send)"
                className={`w-full p-4 bg-transparent resize-none outline-none ${isDarkMode ? 'text-white placeholder-gray-400' : 'text-gray-800 placeholder-gray-500'
                  } max-h-40 relative z-10`}
                rows={1}
                style={{
                  minHeight: '56px',
                  height: 'auto'
                }}
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = Math.min(e.target.scrollHeight, 160) + 'px';
                }}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white rounded-2xl flex items-center justify-center transition-all duration-200 hover:shadow-lg hover:scale-105 disabled:shadow-none disabled:scale-100 shadow-lg"
            >
              <Send size={20} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FullScreenChatbot;