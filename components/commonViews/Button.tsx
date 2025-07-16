type ButtonProps = {
    onClick?: () => void;
    title: string;
    type?: "button" | "submit" | "reset";
}

export default function Button({ onClick, title, type = "button" }: ButtonProps) {
    return (
        <button
            type={type}
            className="w-full p-2 bg-blue-500 text-white rounded mb-4"
            onClick={onClick}
        >
            {title}
        </button>
    )
}