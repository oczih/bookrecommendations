import { Link } from 'react-router-dom';
import { UserCircle } from 'lucide-react';

export const Header = ({ user, setUser, setMessage }) => {
    return (
        <div className="rounded-sm min-h-[10vh] bg-white/[var(--bg-opacity)] [--bg-opacity:50%] mb-8 flex flex-col md:flex-row justify-between items-center p-4 gap-4 md:gap-0">
            {user && (
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex items-center gap-2 bg-green-100 text-green-800 font-semibold px-4 py-2 rounded-full drop-shadow-sm">
                        <UserCircle className="w-5 h-5" />
                        {user.username} logged in
                    </div>
                    <button
                        onClick={() => {
                            window.localStorage.removeItem('loggedBookappUser');
                            setUser(null);
                            setMessage("Successfully logged out!")
                        }}
                        className="flex items-center gap-2 bg-red-100 text-red-800 font-semibold px-4 py-2 rounded-full hover:scale-95 transition-transform duration-150 ease-in-out drop-shadow-md"
                    >
                        Log Out
                    </button>
                </div>
            )}

            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
                <Link to="/" className="hover:scale-95 transition-transform duration-150 ease-in-out drop-shadow-md">
                    <h3 className="text-xl md:text-2xl font-bold text-white">Home</h3>
                </Link>
                <Link to={user ? "/suggestaperson" : "/login"} className="hover:scale-95 transition-transform duration-150 ease-in-out drop-shadow-md">
                    <h3 className="text-xl md:text-2xl font-bold text-white">Suggest A Creator/Book</h3>
                </Link>
                {user && (
                    <Link to="/vote" className="hover:scale-95 transition-transform duration-150 ease-in-out drop-shadow-md">
                        <h3 className="text-xl md:text-2xl font-bold text-white">Vote Here</h3>
                    </Link>
                )}
                <Link to="/login" className="hover:scale-95 transition-transform duration-150 ease-in-out drop-shadow-md">
                    <h3 className="text-xl md:text-2xl font-bold text-white">{user ? "My Profile" : "Login"}</h3>
                </Link>
            </div>
        </div>
    );
};
