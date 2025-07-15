import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setActiveChat, startNewChat } from "@/redux/chatSlice";
import { getAuthInfo } from "@/utils/authUtils";
import { START_NEW_CHAT , CHAT_PLACEHOLDER} from "@/utils/strings";

export default function Sidebar() {
    const dispatch = useDispatch();
    const chats = useSelector((state: RootState) => state.chat.chats);
    const [open, setOpen] = useState(false);

    const authInfo = getAuthInfo();

    const onSelectChat = (token: string) => {
        dispatch(setActiveChat(token));
    }

    return (
        <div className="bg-gray-200">
            <button
                className="py-4 px-6 focus:outline-none"
                onClick={() => setOpen(!open)}
                aria-label={open ? "Close sidebar" : "Open sidebar"}
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    {open ? (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    ) : (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    )}
                </svg>
            </button>

            <div
                className={`h-full transition-all duration-300 ${open ? "w-64" : "w-0 overflow-hidden"}`}
            >
                <div className="p-4">
                    {open && (
                        <button
                            className="w-full p-2 bg-blue-500 text-white rounded mb-4"
                            onClick={() => {
                                dispatch(startNewChat());
                            }}
                        >
                            {START_NEW_CHAT}
                        </button>
                    )}

                    {authInfo && <> <h2 className="text-xl font-bold mb-4">Recent</h2>
                        <ul>

                            {[...chats].reverse().map(({ token, messages }) => (
                                <li key={token}>
                                    <button
                                        className="w-full text-left p-2 hover:bg-gray-200"
                                        onClick={() => {
                                            onSelectChat?.(token);
                                        }}
                                    >
                                        {messages.length > 0 ? messages[0].text.slice(0, 30) : {CHAT_PLACEHOLDER}}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </>}
                </div>
            </div>
        </div>
    );
}