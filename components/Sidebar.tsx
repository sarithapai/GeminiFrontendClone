import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setActiveChat, startNewChat } from "@/redux/chatSlice";
import { getAuthInfo } from "@/utils/authUtils";
import { START_NEW_CHAT, CHAT_PLACEHOLDER, SIGN_IN } from "@/utils/strings";
import Button from "./commonViews/Button";
import { useRouter } from "next/navigation";

export default function Sidebar() {
    const dispatch = useDispatch();
    const router = useRouter();

    const chats = useSelector((state: RootState) => state.chat.chats);
    const [open, setOpen] = useState(false);

    const authInfo = getAuthInfo();

    const onSelectChat = (token: string) => {
        dispatch(setActiveChat(token));
    }

    const handleLogin = () => {
        router.push('/signin');
    };

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
                        <Button
                            onClick={() => {
                                dispatch(startNewChat());
                            }}
                            title={START_NEW_CHAT}

                        />
                    )}

                    <h2 className="text-xl font-bold mb-4">Recent</h2>
                    {authInfo ? <ul>

                        {[...chats].reverse().map(({ token, messages }) => (
                            <li key={token}>
                                <button
                                    className="w-full text-left p-2 hover:bg-gray-200"
                                    onClick={() => {
                                        onSelectChat?.(token);
                                    }}
                                >
                                    {messages.length > 0 ? messages[0].text.slice(0, 30) : CHAT_PLACEHOLDER}
                                </button>
                            </li>
                        ))}
                    </ul> : <div className="bg-white border border-gray-300 rounded-lg p-4 text-center shadow-sm mt-4">
                        <p className="mb-3 text-gray-700 font-medium">
                            Sign in to start saving your chats
                            Once you're signed in, you can access your recent chats here.

                        </p>
                        <Button
                            onClick={handleLogin}
                            title={SIGN_IN}
                        />

                    </div>}
                </div>
            </div>
        </div>
    );
}