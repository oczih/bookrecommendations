import { useState } from 'react';
import {Header} from './Header'
import {
  BrowserRouter as Router,
  Routes, Route, Link,
} from 'react-router-dom'
import { Notification } from './Notifications';

export const LoginScreen = ({user, handleLogin, suggestedBooks, suggestedPeople, password, username, handleUsernameChange, handlePasswordChange, message, color}) => {
    return (
        <div>
            <Header user={user}/> 
            <Notification message={message} color={color}/>
            {user ? (
                <div>
                    <h1 className="text-2xl text-center text-white ml-auto mr-auto max-w-md mb-10">Hello {user.username}</h1>
                    
                    {suggestedBooks ? (
                        
                        suggestedBooks.map(book => (
                        <div key={book.mongoId || book._id} className="max-w-md ml-auto mr-auto flex-shrink-0 w-48 bg-white text-black rounded-lg shadow-lg p-4 hover:scale-95 transition-transform duration-150 ease-in-out drop-shadow-xl  ">
                            <img src={book.image} alt={book.title} className="w-full h-48 object-cover rounded-md mb-2" />
                            <p className="text-center font-semibold">{book.title}</p>
                        </div>
                    ))) : (
                        <div>
                            <h2 className="text-2xl text-center text-white ml-auto mr-auto max-w-md mb-10">You haven't added any books!</h2>
                        </div>
                    )}
                    {suggestedPeople ? (
                        suggestedPeople.map(person => (
                        <div key={person.mongoId || person._id} className="max-w-md ml-auto mr-auto flex-shrink-0 w-48 bg-white text-black rounded-lg shadow-lg p-4 hover:scale-95 transition-transform duration-150 ease-in-out drop-shadow-xl  ">
                            <img src={person.image} alt={person.name} className="w-full h-48 object-cover rounded-md mb-2" />
                            <p className="text-center font-semibold">{person.name}</p>
                        </div>
                    ))
                    ) : (
                        <div>
                            <h2 className="text-2xl text-center text-white ml-auto mr-auto max-w-md mb-10">You haven't added any people!</h2>
                        </div>
                    )}
                </div>
            ) :(<div><h1 className="text-2xl text-center text-white ml-auto mr-auto max-w-md mb-10">Login!</h1>
            <form onSubmit={handleLogin} className="flex flex-col gap-4 max-w-2xs ml-auto mr-auto max-w-md ">
                <div className='ml-auto mr-auto max-w-md'>
                    <h2>Enter Username:</h2>
                    <input 
                    value={username}
                    onChange={handleUsernameChange}
                className="border p-2"/>
                </div>
                <div className='ml-auto mr-auto max-w-md'>
                    <h2>Enter Password:</h2>
                <input 
                    value={password}
                    type="password"
                    onChange={handlePasswordChange}
                className="border p-2"/>
                </div>
                <button type="submit" className="ml-auto mr-auto max-w-md bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:scale-95 transition-transform duration-150 ease-in-out drop-shadow-xl"
                >Login
                </button>
            </form></div>)}
            <Link to="/register" >
                <h3 className="ml-auto mr-auto max-w-md bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:scale-95 transition-transform duration-150 ease-in-out drop-shadow-xl">Register</h3>
            </Link>
        </div>
    )
}