"use client";

import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { setActiveChat, setChats } from '@/redux/chatSlice';
import { store } from '@/redux/store';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import ChatComponent from '@/components/ChatComponent';
import { getActiveChatToken, getAllChats } from '@/utils/chatUtils';
import { getAuthInfo } from '@/utils/authUtils';

function InitChatsFromLocalStorage() {
  const dispatch = useDispatch();

  useEffect(() => {
    const chats = getAllChats();
    dispatch(setChats(chats));

    const chatToken = getActiveChatToken();
    if (chatToken) {
      dispatch(setActiveChat(chatToken));
    }
  }, [dispatch]);

  return null;
}

export default function Home() {
  const authInfo = getAuthInfo();

  return (
    <Provider store={store}>
      <InitChatsFromLocalStorage />
      <div className='flex flex-row'>
        <Sidebar />
        <div className='flex flex-col flex-1'>
          <Header userName={authInfo?.phoneNumber || ""} />
          <ChatComponent />
        </div>
      </div>
    </Provider>
  );
}
