import { Link } from 'react-router-dom';
import { UserCircle } from 'lucide-react'; // Optional: icon for a nice touch

export const Header = ({ user }) => {
    return (
        <div className="rounded-sm min-h-[10vh] bg-white/[var(--bg-opacity)] [--bg-opacity:50%] mb-8 flex justify-between items-center p-4">
            {user && (
                <div className="flex items-center gap-2 bg-green-100 text-green-800 font-semibold px-4 py-2 rounded-full drop-shadow-sm">
                    <UserCircle className="w-5 h-5" />
                    {user.username} logged in
                </div>
            )}
            <div className="flex gap-8 ml-auto items-center">
                <Link to="/" className="hover:scale-95 transition-transform duration-150 ease-in-out drop-shadow-md">
                    <h3 className="text-2xl font-bold text-white">Home</h3>
                </Link>
                <Link to={user ? "/suggestaperson" : "/login"} className="hover:scale-95 transition-transform duration-150 ease-in-out drop-shadow-md">
                    <h3 className="text-2xl font-bold text-white">Suggest A Person</h3>
                </Link>
                <Link to="/login" className="hover:scale-95 transition-transform duration-150 ease-in-out drop-shadow-md">
                    <h3 className="text-2xl font-bold text-white">{user ? ("My Profile") : ("Login")}</h3>
                </Link>
            </div>
        </div>
    );
};
