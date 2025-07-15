import { generateChatToken } from '@/utils/chatUtils';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Message = {
  sender: 'user' | 'ai';
  text: string;
};

export interface ChatState {
  chats: { token: string; messages: Message[] }[];
  activeChatToken: string | null;
}

const initialState: ChatState = {
  chats: [],
  activeChatToken: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    startNewChat(state: ChatState) {
      const newToken = generateChatToken();
      state.chats.push({ token: newToken, messages: [] });
      state.activeChatToken = newToken;
    },
    setActiveChat(state: ChatState, action: PayloadAction<string>) {
      state.activeChatToken = action.payload;
    },
    addMessage(state: ChatState, action: PayloadAction<{ token: string; message: Message }>) {
      const chat = state.chats.find(c => c.token === action.payload.token);
      if (chat) chat.messages.push(action.payload.message);
    },
    setChats(state: ChatState, action: PayloadAction<ChatState['chats']>) {
      state.chats = action.payload;
    },
  }
});

export const { setActiveChat, addMessage, setChats, startNewChat } = chatSlice.actions;
export default chatSlice.reducer;