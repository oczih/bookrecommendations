import { Header } from './Header';
import { Notification } from './Notifications';
import { Link } from 'react-router-dom';

export const LoginScreen = ({
  user,
  handleLogin,
  suggestedBooks,
  suggestedPeople,
  password,
  username,
  handleUsernameChange,
  handlePasswordChange,
  message,
  setMessage,
  setUser
}) => {
  return (
    <div>
      <Header user={user} setMessage={setMessage} setUser={setUser} />
      <Notification message={message} />

      {user ? (
        <div className="flex flex-col items-center text-white">
          <h1 className="text-3xl mb-8">Hello {user.username}</h1>

          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-center">Your Suggested Books:</h2>
            {suggestedBooks && suggestedBooks.length > 0 ? (
              <div className="flex flex-wrap justify-center gap-4">
                {suggestedBooks.map(book => (
                  <div key={book.mongoId || book._id} className="card w-48 bg-white text-black shadow-xl hover:scale-95 transition-transform duration-150 ease-in-out">
                    <figure>
                      <img src={book.image} alt={book.title} className="h-48 object-cover rounded-t-lg" />
                    </figure>
                    <div className="card-body p-4">
                      <h3 className="text-center font-semibold">{book.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <h2 className="text-center mb-10">You haven't added any books!</h2>
            )}
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-center">Your Suggested People:</h2>
            {suggestedPeople && suggestedPeople.length > 0 ? (
              <div className="flex flex-wrap justify-center gap-4">
                {suggestedPeople.map(person => (
                  <div key={person.mongoId || person._id} className="card w-48 bg-white text-black shadow-xl hover:scale-95 transition-transform duration-150 ease-in-out">
                    <figure>
                      <img src={person.image} alt={person.name} className="h-48 object-cover rounded-t-lg" />
                    </figure>
                    <div className="card-body p-4">
                      <h3 className="text-center font-semibold">{person.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <h2 className="text-center mb-10">You haven't added any people!</h2>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center mt-10">
          <h1 className="text-3xl text-white mb-8">Login</h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-6 w-full max-w-sm">
            <div>
              <label className="block mb-2 text-white">Username</label>
              <input
                value={username}
                onChange={handleUsernameChange}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-white">Password</label>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                className="input input-bordered w-full"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full hover:scale-95 transition-transform duration-150 ease-in-out"
            >
              Login
            </button>
          </form>
          <Link to="/register" className="btn btn-outline mt-6">
            Register
          </Link>
        </div>
      )}
    </div>
  );
};
