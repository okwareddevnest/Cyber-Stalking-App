'use client';

import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import CryptoJS from 'crypto-js';
import { useUser, SignedIn, SignedOut, SignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { UserRole } from '@/types/auth';

interface Message {
  sender: 'user' | 'support';
  content: string;
}

export default function SupportChatPage() {
  const router = useRouter();
  const { user } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [socket, setSocket] = useState<any>(null);

  const encryptionKey = process.env.NEXT_PUBLIC_CHAT_ENCRYPTION_KEY || 'default_key';

  useEffect(() => {
    if (user) {
      const userRole = user.publicMetadata.role as UserRole;
      if (userRole !== 'support_staff' && userRole !== 'admin') {
        router.push('/unauthorized');
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const newSocket = io();
      setSocket(newSocket);

      newSocket.on('message', (encryptedMsg: string) => {
        const decryptedContent = CryptoJS.AES.decrypt(encryptedMsg, encryptionKey).toString(CryptoJS.enc.Utf8);
        const message = JSON.parse(decryptedContent);
        setMessages((prev) => [...prev, message]);
      });

      return () => newSocket.close();
    }
  }, [user]);

  const sendMessage = () => {
    if (input.trim() && socket) {
      const message: Message = {
        sender: 'support',
        content: input.trim(),
      };
      const encryptedContent = CryptoJS.AES.encrypt(JSON.stringify(message), encryptionKey).toString();
      socket.emit('message', encryptedContent);
      setMessages((prev) => [...prev, message]);
      setInput('');
    }
  };

  return (
    <SignedIn>
      <main className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">Support Chat</h1>
        <div className="chat-container">
          <div className="messages mb-4">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                <span className="sender">{msg.sender === 'support' ? 'You' : 'User'}:</span> {msg.content}
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
      </main>
    </SignedIn>
  );
}
