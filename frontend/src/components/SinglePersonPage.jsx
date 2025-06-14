import {
  BrowserRouter as Router,
  Routes, Route, Link,
} from 'react-router-dom'
import { Notification } from './Notifications';
import { Header } from './Header';
export const SinglePersonPage = ({ person, books, user, setUser, message, setMessage}) => {

    return (
        <div>
        <Header user={user} setUser={setUser} setMessage={setMessage}/>
        <Notification message={message}/>
        <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 p-8 text-white">
            <div className="flex flex-col items-center mb-8">
                <img src={person.image} alt={person.name} className="w-32 h-32 object-cover object-center rounded-full mb-4 max-w-md ml-auto mr-auto"  />
                <div className="text-3xl font-bold">{person?.name}</div>
            </div>
            
            <h2 className="text-2xl mb-4 text-center">Recommended Books:</h2>

           {books && books.length > 0 ? (
                (() => {
                    const acceptedBooks = books.filter(book => book.accepted);
                    if (acceptedBooks.length > 0) {
                        return (
                            <div className="flex overflow-x-auto space-x-6 p-4">
                                {acceptedBooks.map(book => (
                                    <div key={book.mongoId || book._id} className="max-w-md ml-auto mr-auto flex-shrink-0 w-48 bg-white text-black rounded-lg shadow-lg p-4 hover:scale-95 transition-transform duration-150 ease-in-out drop-shadow-xl">
                                        {book.image && <img src={book.image} alt={book.title} className="w-full h-48 object-cover rounded-md mb-2" />}
                                        <p className="text-center font-semibold">{book.title}</p>
                                    </div>
                                ))}
                            </div>
                        );
                    } else {
                        return <h1 className="text-center">Vote for books for them to appear here!</h1>;
                    }
                })()
            ) : (
                <p className="text-center">No books found.</p>
            )}
                <div className="flex justify-center mt-8">
                    <Link 
                        to={"/"} 
                        className="btn btn-outline w-full max-w-xs mx-auto px-4 py-3 text-center hover:scale-95 transition-transform duration-150 ease-in-out"
                        >
                        Go Back
                        </Link>
                </div>
        </div>
        </div>
    );
};
