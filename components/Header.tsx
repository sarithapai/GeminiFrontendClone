import { APP_NAME, SIGN_IN } from "@/utils/strings";
import { useRouter } from "next/navigation";
import React from "react";

interface HeaderProps {
    userName?: string;
}

const Header: React.FC<HeaderProps> = ({ userName }) => {
    const router = useRouter();

    const handleLogin = () => {
        router.push('/signin');
    };

    return (
        <header>
            <div className="px-2 py-3 flex justify-between items-center">
                <div className="text-xl font-bold text-gray-800">
                    {APP_NAME}
                </div>

                <div>
                    {userName ? (
                        <span className="text-gray-700">
                            {userName}
                        </span>
                    ) : (
                        <button
                            onClick={handleLogin}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            {SIGN_IN}
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
