import { useEffect, useState } from 'react';
import bookService from './services/books';
import peopleService from './services/people';
import {
  BrowserRouter as Router,
  Routes, Route, Link,
  useMatch
} from 'react-router-dom'
import { SinglePersonPage } from './components/SinglePersonPage';
import { Header } from './components/Header'
import { SuggestAPerson } from './components/SuggestAPerson'
import { LoginScreen } from './components/LoginScreen';
import { Notification } from './components/Notifications';
import loginService from './services/login'
import { RegisterScreen } from './components/RegisterScreen';
const App = () => {
  const [books, setBooks] = useState([]);
  const [people, setPeople] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('')
  const [color, setColor] = useState('')
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null)
  const [name, setName] = useState('')
  const [passwordHash, setPasswordHash] = useState('')
  const [suggestedBooks, setSuggestedBooks] = useState([])
  const [suggestedPeople, setSuggestedpeople] = useState([])
  const handleUsernameChange = event => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = event => {
    setPassword(event.target.value)
  }
  const handlePasswordHashChange = event => {
    setPasswordHash(event.target.value)
  }
  const handleLogin = async (event) => {
  event.preventDefault();
  try {
    const response = await loginService.login({ username, password })
    const user = { ...response, id: response.id } // ✅ Map _id to id
    console.log(user)
    window.localStorage.setItem('loggedBookappUser', JSON.stringify(user))
    bookService.setToken(user.token)
    peopleService.setToken(user.token)
    setUser(user)
    setColor("green")
    setMessage(`Logged in person: ${username}`)
    setUsername('')
    setPassword('')
  } catch (error) {
    setMessage('Wrong username or password')
  }
}
  const handleNameChange = event => {
    setName(event.target.value)
  }
  const handleRegister = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.register({name, username, password})
      window.localStorage.setItem('loggedBookappUser', JSON.stringify(user))
      bookService.setToken(user.token)
      peopleService.setToken(user.token)
      setUser(user)
      setColor("green")
      setMessage(`Registered person: ${username}`)
      console.log(`Registered person: ${name}`);
      setName('')
      setUsername('')
      setPassword('')
    } catch (error) {
      setMessage("Couldn't register this user")
    }
  }
  const submitNewObject = async (values) => {
  try {
    if (Object.prototype.hasOwnProperty.call(values, 'name')) {
      // It's a Person
      const person = await peopleService.createPerson(values);
      setPeople(people.concat(person));
      setColor("green")
      setMessage(`Person added: ${person.name}`)
      console.log('Person added:', person);
    } else if (Object.prototype.hasOwnProperty.call(values, 'title')) {
      const book = await bookService.createBook(values);
      setColor("green")
      setMessage(`Book added: ${book.title}`)
      console.log('Book added:', book);
    } else {
      console.error('Unknown object type submitted.');
    }
  } catch (error) {
    setColor("red");
    const errorMessage = error.response?.data || error.message;
    setMessage(errorMessage);
    console.error('Error:', error);
  }
};
  useEffect(() => {
    bookService.getAll().then(setBooks);
  }, []);

  useEffect(() => {
    peopleService.getAll().then(setPeople);
  }, []);
useEffect(() => {
  if (message) {
    const timer = setTimeout(() => {
      setMessage('');
    }, 5000);
    return () => clearTimeout(timer);
  }
}, [message]);
  useEffect(() => {
  console.log('Suggested Books:', suggestedBooks);
}, [suggestedBooks]);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBookappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      // ✅ Ensure the ID is available
      if (!user.id && user._id) {
        user.id = user._id
      }
      setUser(user)
      bookService.setToken(user.token)
      peopleService.setToken(user.token)
    }
  }, []);
    console.log(user)
    useEffect(() => {
    const fetchSuggestedBooks = async () => {
        if (user && user.id) { // ✅ make sure user and ID exist
            try {
                const data = await loginService.get(user.id);
                console.log(data)
                setSuggestedBooks(data.suggestedBooks || []);
            } catch (error) {
                console.error('Failed to fetch suggested books: ', error);
            }
        }
    };

    fetchSuggestedBooks();
}, [user]);
  useEffect(() => {
    const fetchSuggestedPeople = async () => {
      if(user & user.id){
        try{
          const data = await loginService.get(user.id)
          console.log(data)
          setSuggestedpeople(data.suggestedPeople || [])
        }catch (error){
          console.error('Failed to fetch suggested books: ', error)
        }
      }

    }
    fetchSuggestedPeople();
  }, [user])

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 p-8">
      <Routes>
        <Route path="/" element={
          <>
            <Header user={user}/>
            <Notification message={message} color={color}/>
            <div className="rounded-sm min-h-[10vh] bg-white/[var(--bg-opacity)] [--bg-opacity:50%] mb-8">
              <div className="p-10">
                <h1 className="text-3xl text-center text-black">
                  Find books recommended by your favorite creator!
                </h1>
              </div>
            </div>
            {people ? (<div className="max-w-4xl mx-auto grid gap-8 grid-cols-1 md:grid-cols-2">
              {people.map(person => (
                <Link to={`/people/${person.mongoId}`} key={person.id}>
                  <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                    <img src={person.image} alt={person.name} className="rounded-full w-30 h-30 object-cover object-center max-w-md ml-auto mr-auto" />      
                    <h2 className="text-xl font-bold tracking-tight text-gray-900">{person.name}</h2>
                  </div>
                </Link>
              ))}
            </div>) : (<div>
            <h2 className="text-2xl text-center text-white">No people available</h2>
          </div>)}
          </>
        } />
        <Route path="/people/:id" element={<SinglePersonWrapper people={people} books={books} />} />
        <Route path={"/suggestaperson"} element={<SuggestAPerson onSubmit={submitNewObject} people={people} user={user}/>}/>
        <Route path="/login" element={
        <LoginScreen
          user={user}
          handleLogin={handleLogin} 
          suggestedBooks={suggestedBooks}
          suggestedPeople={suggestedPeople}
          password={password} 
          username={username} 
          handleUsernameChange={handleUsernameChange} 
          handlePasswordChange={handlePasswordChange} 
          message={message} 
          color={color} 
          />
          } />
        <Route path="/register" element={<RegisterScreen handleSubmit={handleRegister} name={name}
         handleNameChange={handleNameChange} username={username}
        password={password} handlePasswordChange={handlePasswordChange} handleUsernameChange={handleUsernameChange} message={message} color={color} 
        user={user}
        />}/>
      </Routes>
    </div>
  );
};

const SinglePersonWrapper = ({ people, books }) => {
  const match = useMatch('/people/:id');
  const personId = match?.params?.id;
  const person = people.find(p => p.mongoId === personId) || null;

  // ✅ Filter the books to only the recommended ones
  const recommendedBooks = books.filter(book => person?.recommendedBooks.includes(book._id));
  console.log(recommendedBooks)
  return <SinglePersonPage person={person} books={recommendedBooks} />;
};

export default App;
