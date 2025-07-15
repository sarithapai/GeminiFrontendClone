import { Message } from "@/model/MessageType";
import { v4 as uuidv4 } from 'uuid';
import { ACTIVE_TOKEN_KEY } from "./constants";

export const storeChatDataForToken = (token: string, chatData: Message[]): void => {
    try {
        localStorage.setItem(token, JSON.stringify(chatData));
    } catch (error) {
        console.error("Error storing chat in local storage:", error);
    }
};

export const getChatDataForToken = (token: string): Message[] | null => {
    try {
        const chatData = localStorage.getItem(token);
        return chatData ? JSON.parse(chatData) as Message[] : null;
    } catch (error) {
        console.error("Error retrieving chat from local storage:", error);
        return null;
    }
};

export const getAllChats = () => {
    const chats: { token: string; messages: any[] }[] = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key !== ACTIVE_TOKEN_KEY && key !== "auth") {
            try {
                const messages = JSON.parse(localStorage.getItem(key) || "[]");
                chats.push({ token: key, messages });
            } catch { }
        }
    }
    return chats;
}

export const getActiveChatToken = (): string | null => {
    return localStorage.getItem(ACTIVE_TOKEN_KEY);
}

export const setActiveChatToken = (token:string) => {
    localStorage.setItem(ACTIVE_TOKEN_KEY, token);
}

export const generateChatToken = (): string => {
    return uuidv4();
};

