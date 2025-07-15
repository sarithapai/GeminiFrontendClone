import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Message } from '@/model/MessageType';
import { addMessage, startNewChat } from '@/redux/chatSlice';
import { RootState } from '@/redux/store';
import { getActiveChatToken, getChatDataForToken, storeChatDataForToken } from '@/utils/chatUtils';

export interface ChatHandle {
  startNewChat: () => void;
}

const ChatComponent = () => {
  const currentChatToken = useSelector((state: RootState) => state.chat.activeChatToken);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const dispatch = useDispatch();
  const lastAiTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!getActiveChatToken()) {
      dispatch(startNewChat());
    }
  }, []);

  useEffect(() => {
    if (currentChatToken) {
      const storedMessages = getChatDataForToken(currentChatToken);
      if (storedMessages) {
        setMessages(storedMessages);
      } else {
        setMessages([]);
      }
    }
    return () => {
      if (lastAiTimer.current) {
        clearTimeout(lastAiTimer.current);
      }
    };
  }, [currentChatToken]);

  useEffect(() => {
    if (currentChatToken && messages.length > 0) {
      storeChatDataForToken(currentChatToken, messages);
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !currentChatToken) return;

    const userMsg: Message = { sender: 'user', text: inputMessage };
    setMessages([...messages, userMsg]);
    dispatch(addMessage({ token: currentChatToken, message: userMsg }));

    const geminiResponseText = `AI: This is a mock response for "${inputMessage}"`;
    const aiMsg: Message = { sender: 'ai', text: geminiResponseText };
    lastAiTimer.current = setTimeout(() => {
      setMessages(prev => [...prev, aiMsg]);
      dispatch(addMessage({ token: currentChatToken, message: aiMsg }));
    }, 1500);

    setInputMessage('');
  };


  if (!currentChatToken) {
    return <div className='items-center'>Loading Chat...</div>;
  }

  return (
    <div className="flex flex-col w-full max-w-[600px] mx-auto h-screen sm:h-[90vh] bg-white p-2 sm:p-4">
      <div className="flex-1 overflow-y-auto mb-2 sm:mb-4" style={{ minHeight: 0 }}>
        {messages.length === 0 ? (
          <p className="text-center text-gray-900 text-2xl">Meet Gemini Clone, <br />your personal AI assistant
          </p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <span
                className={`inline-block px-4 py-2 rounded-2xl max-w-[80vw] sm:max-w-[70%] break-words
                  ${msg.sender === 'user' ? 'bg-green-100 text-right' : 'bg-gray-200 text-left'}`}
              >
                {msg.text}
              </span>
            </div>
          ))
        )}
      </div>
      <form
        className="flex flex-col sm:flex-row gap-2 border-t border-gray-200 pt-2"
        onSubmit={e => { e.preventDefault(); handleSendMessage(); }}
      >
        <input
          type="text"
          value={inputMessage}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setInputMessage(e.target.value)}
          className="flex-grow px-4 py-2 border border-gray-300 rounded sm:rounded-l focus:outline-none focus:border-blue-500 text-sm sm:text-base"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded sm:rounded-r hover:bg-green-600 text-sm sm:text-base"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatComponent;