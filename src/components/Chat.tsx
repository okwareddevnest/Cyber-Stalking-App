'use client';

import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import CryptoJS from 'crypto-js';

interface Message {
  sender: 'user' | 'support';
  content: string;
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [socket, setSocket] = useState<any>(null);

  const encryptionKey = process.env.NEXT_PUBLIC_CHAT_ENCRYPTION_KEY || 'default_key';

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);

    newSocket.on('message', (encryptedMsg: string) => {
      const decryptedContent = CryptoJS.AES.decrypt(encryptedMsg, encryptionKey).toString(CryptoJS.enc.Utf8);
      const message = JSON.parse(decryptedContent);
      setMessages((prev) => [...prev, message]);
    });

    return () => newSocket.close();
  }, []);

  const sendMessage = () => {
    if (input.trim() && socket) {
      const message: Message = {
        sender: 'user',
        content: input.trim(),
      };
      const encryptedContent = CryptoJS.AES.encrypt(JSON.stringify(message), encryptionKey).toString();
      socket.emit('message', encryptedContent);
      setMessages((prev) => [...prev, message]);
      setInput('');
    }
  };

  return (
    <div className="chat-container">
      <div className="messages mb-4">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <span className="sender">{msg.sender === 'user' ? 'You' : 'Support'}:</span> {msg.content}
          </div>
        ))}
      </div>
      <div className="input-group flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="border p-2 flex-grow"
        />
        <button onClick={sendMessage} className="bg-blue-600 text-white px-4 ml-2">
          Send
        </button>
      </div>
    </div>
  );
}
