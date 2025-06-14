import {Header} from './Header'
import {
  BrowserRouter as Router,
  Routes, Route, Link,
} from 'react-router-dom'
import { Notification } from './Notifications'
export const RegisterScreen = ({message,user, handleSubmit, username, password, name, handleUsernameChange, handlePasswordChange, handleNameChange, setMessage}) => {
    return (
        <div>
            <Header user={user} setMessage={setMessage}/> 
            <Notification message={message}/>
            <div className="flex flex-col items-center mt-10">
                <h1 className="text-3xl text-white mb-8">Register</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-sm">
                    <div className='ml-auto mr-auto max-w-md'>
                        <label className="block mb-2 text-white">Enter Your Name: </label>
                    <input 
                        value={name}
                        type="text"
                        onChange={handleNameChange}
                    className="input input-bordered w-full"/>
                    </div>
                    <div className='ml-auto mr-auto max-w-md'>
                        <h2>Enter Username:</h2>
                        <input 
                        value={username}
                        onChange={handleUsernameChange}
                    className="input input-bordered w-full"/>
                    </div>
                    <div className='ml-auto mr-auto max-w-md'>
                        <h2>Enter Password:</h2>
                    <input 
                        value={password}
                        type="password"
                        onChange={handlePasswordChange}
                    className="input input-bordered w-full"/>
                    </div>
                    <button type="submit" className="btn btn-primary w-full hover:scale-95 transition-transform duration-150 ease-in-out"
                    >Register
                    </button>
                    
                </form>
                <Link to="/login" className="btn btn-outline mt-6">
                            Go Back
                        </Link>
                </div>
        </div>
    )
}