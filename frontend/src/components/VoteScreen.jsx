import { useEffect, useState } from "react";
import { Header } from "./Header";
import peopleService from '../services/people';
import bookService from '../services/books';
import { Notification } from "./Notifications";
import {
    BrowserRouter as Router,
    Routes, Route, Link,
  } from 'react-router-dom'

export const VoteScreen = ({ user, setUser }) => {
  const [people, setPeople] = useState([]);
  const [books, setBooks] = useState([]) 
  const [message, setMessage] = useState('') 
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);
  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const data = await peopleService.getAll();
        setPeople(data);
      } catch (error) {
        console.error("Failed to fetch people:", error);
      }
    };

    fetchPeople();
  }, []);
  useEffect(() => {
    const fetchBooks = async () => {
        try {
            const data = await bookService.getAll();
            setBooks(data)
        }catch(error){
            console.error('Failed to fetch books', error)
        }
    }
    fetchBooks();
  }, [])
  const handlePersonLike = async (id) => {
    const person = people.find(p => p.mongoId === id);
    if (!person) return;

    const updatedPerson = { ...person, likes: person.likes + 1 };

    try {
      const response = await peopleService.update(id, updatedPerson);
      setPeople(prev =>
        prev.map(p => (p.mongoId === id ? response : p))
      );
      setMessage(`You voted for ${updatedPerson.name}!`)
    } catch (err) {
      console.error("Error updating likes:", err);
    }
  };
  const handleBookLike = async (id) => {
    const book = books.find(b => b._id === id)
    if(!book) return;

    const updatedBook = {...book, likes: book.likes + 1}
    console.log("book id", book._id);
    try {
        const response = await bookService.update(id, updatedBook)
        setBooks(prev => 
            prev.map(b => (b._id === id ? { ...response, _id: id } : b))
        );
        setMessage(`You voted for ${updatedBook.title}!`)
    }catch(err) {
        console.error("Error updating like for book", err)
    }
  }
  return (
    <div>
      <Header user={user} setUser={setUser} setMessage={setMessage} />
      <Notification message={message}/>
      <div className="flex justify-center mt-8 mb-10">
                    <Link to={"/"} className="btn btn-outline w-md max-w-md">
                        Go Back
                    </Link>
                </div>
      <div className="ml-auto mr-auto max-w-md">
        <h1 className="text-2xl font-bold text-white">
          Vote here for your favorite book or person to be featured!
        </h1>
      </div>
      <div className="flex flex-row justify-between gap-8 mt-10">
  <ul className="w-1/2 list-none bg-base-200 p-6 rounded-lg shadow-lg">
    {people
      .sort((a, b) => b.likes - a.likes)
      .map(p => (
        !p.accepted &&
        <li key={p.mongoId} className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
          <img src={p.image} alt={p.title} className="w-30 h-30 object-cover rounded" />
          <span className="text-lg">{p.name} ({p.likes})</span>
          </div>
          <button
            onClick={() => handlePersonLike(p.mongoId)}
            className="btn btn-primary btn-sm hover:scale-95 ease-in-out"
          >
            Like
          </button>
        </li>
      ))}
  </ul>
  <ul className="w-1/2 list-none bg-base-200 p-6 rounded-lg shadow-lg">
    {books
      .sort((a, b) => b.likes - a.likes)
      .map(b => (
        !b.accepted && 
        <li key={b._id} className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={b.image} alt={b.title} className="w-30 h-30 object-cover rounded" />
            <span className="text-lg">{b.title} ({b.likes})</span>
          </div>
          <button
            onClick={() => handleBookLike(b._id)}
            className="btn btn-primary btn-sm hover:scale-95 ease-in-out"
          >
            Like
          </button>
        </li>
      ))}
  </ul>
</div>
    </div>
  );
};
