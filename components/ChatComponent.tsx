import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Message } from '@/model/MessageType';
import { addMessage, startNewChat } from '@/redux/chatSlice';
import { RootState } from '@/redux/store';
import { getActiveChatToken, getChatDataForToken, storeChatDataForToken } from '@/utils/chatUtils';
import { HOME_TITLE, HOME_TITLE2, LOADING_CHAT } from '@/utils/strings';

export interface ChatHandle {
  startNewChat: () => void;
}

const ChatComponent = () => {
  const currentChatToken = useSelector((state: RootState) => state.chat.activeChatToken);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const dispatch = useDispatch();
  const lastAiTimer = useRef<NodeJS.Timeout | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isAiTyping]);


  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !currentChatToken || isAiTyping) return;

    setIsAiTyping(true);

    const userMsg = { sender: 'user', text: inputMessage } as Message;
    setMessages([...messages, userMsg]);
    dispatch(addMessage({ token: currentChatToken, message: userMsg }));
    setInputMessage('');

    const geminiText = `AI: Mock reply to "${inputMessage}"`;

    let index = 0;
    const interval = 30;
    setIsAiTyping(true);

    setMessages(prev => [...prev, { sender: 'ai', text: '' }]);
    dispatch(addMessage({
      token: currentChatToken,
      message: { sender: 'ai', text: '' }
    }));

    const timer = setInterval(() => {
      if (index < geminiText.length) {
        const next = geminiText[index++];

        setMessages(prev => {
          const last = prev[prev.length - 1];
          const updated = { ...last, text: last.text + next };

          dispatch(addMessage({ token: currentChatToken, message: updated }));
          return [...prev.slice(0, -1), updated];
        });
      } else {
        clearInterval(timer);
        setIsAiTyping(false);
      }
    }, interval);
  };

  if (!currentChatToken) {
    return <div className='items-center'>{LOADING_CHAT}</div>;
  }

  return (
    <div className="flex flex-col w-full max-w-[600px] mx-auto h-screen sm:h-[90vh] bg-white p-2 sm:p-4">
      <div className="flex-1 overflow-y-auto mb-2 sm:mb-4" style={{ minHeight: 0 }}>
        {messages.length === 0 ? (
          <p className="text-center text-gray-900 text-2xl">
            <span style={{ display: 'block' }}>{HOME_TITLE}</span>
            <span style={{ display: 'block' }}>{HOME_TITLE2}</span>
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
        <div ref={messagesEndRef} />
      </div>
      {isAiTyping && (
        <div className="flex justify-start mb-2">
          <div className="typing-indicator p-2 bg-gray-200 rounded">
            Gemini is typing...
          </div>
        </div>
      )}
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