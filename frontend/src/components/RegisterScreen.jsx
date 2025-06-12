import {Header} from './Header'
import {
  BrowserRouter as Router,
  Routes, Route, Link,
} from 'react-router-dom'
export const RegisterScreen = ({user, handleSubmit, username, password, name, handleUsernameChange, handlePasswordChange, handleNameChange}) => {
    return (
        <div>
            <Header user={user}/> 
                <h1 className="text-2xl text-center text-white ml-auto mr-auto max-w-md mb-10">Register!</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-2xs ml-auto mr-auto max-w-md ">
                    <div className='ml-auto mr-auto max-w-md'>
                        <h2>Enter Your Name: </h2>
                    <input 
                        value={name}
                        type="text"
                        onChange={handleNameChange}
                    className="border p-2"/>
                    </div>
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
                    >Register
                    </button>
                    <Link to="/login" >
                <h3 className="ml-auto mr-auto max-w-md bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:scale-95 transition-transform duration-150 ease-in-out drop-shadow-xl">Go back</h3>
                    </Link>
                </form>
        </div>
    )
}