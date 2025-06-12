

export const Notification = ({ message, color }) => {
    if (!message) {
        return null;
    }
    return (
        <div
            className={`ml-auto mr-auto max-w-md bg-${color}-500 text-white font-bold py-2 px-4 rounded hover:scale-95 transition-transform duration-150 ease-in-out drop-shadow-xl`}
        >
            {message}
        </div>
    );
}