import {
  BrowserRouter as Router,
  Routes, Route, Link,
} from 'react-router-dom'

import { Header } from './Header';
export const SinglePersonPage = ({ person, books, user, setUser }) => {
    return (
        <div>
        <Header user={user} setUser={setUser}/>
        <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 p-8 text-white">
            <div className="flex flex-col items-center mb-8">
                <img src={person.image} alt={person.name} className="w-32 h-32 object-cover object-center rounded-full mb-4 max-w-md ml-auto mr-auto"  />
                <div className="text-3xl font-bold">{person?.name}</div>
            </div>
            <div>
            <Link to={"/"}>
            <button className="ml-auto mr-auto max-w-md bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:scale-95 transition-transform duration-150 ease-in-out drop-shadow-xl">
                Go back
            </button>
            </Link>
            </div>
            
            <h2 className="text-2xl mb-4 text-center">Recommended Books:</h2>

            {books && books.length > 0 ? (
                <div className="flex overflow-x-auto space-x-6 p-4">
                    {books.map(book => (
                        (book.accepted ? (
                        <div key={book.mongoId || book._id} className="max-w-md ml-auto mr-auto flex-shrink-0 w-48 bg-white text-black rounded-lg shadow-lg p-4 hover:scale-95 transition-transform duration-150 ease-in-out drop-shadow-xl  ">
                            {book.image && <img src={book.image} alt={book.title} className="w-full h-48 object-cover rounded-md mb-2" />}
                            <p className="text-center font-semibold">{book.title}</p>
                        </div>) : (<div>
                            <h1>Vote for books for them to be appeared here!</h1>
                        </div>))
                    ))}
                </div>
            ) : (
                <p className="text-center">No books found.</p>
            )}
        </div>
        </div>
    );
};
