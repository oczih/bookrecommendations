import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes, Route, Link,
} from 'react-router-dom'
import {Header} from './Header'
import {Select, FormControl, InputLabel, MenuItem} from '@mui/material'
export const SuggestAPerson = ({ onSubmit, people, user }) => {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [socialMedia, setSocialmedia] = useState([{ platform: '', link: '' }]);
    const [books, setBooks] = useState([])
    const [newBook, setNewBook] = useState('');
    const [object, addObject] = useState('Book');
    const [person, setPerson] = useState('')
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const [year, setYear] = useState('')
    const [author, setAuthor] = useState('')
    const [bookImage, setBookImage] = useState('')
    const handleAddBook = () => {
        if (newBook.trim() === '') return; // Prevent adding empty strings
        setBooks([...books, newBook.trim()]);
        setNewBook('');
    };
    const handleDeleteBook = (index) => {
        const updatedBooks = books.filter((_, i) => i !== index);
        setBooks(updatedBooks);
    };

    const handleSocialMediaChange = (index, field, value) => {
        const updatedSocialmedia = [...socialMedia];
        updatedSocialmedia[index][field] = value;
        setSocialmedia(updatedSocialmedia);
    };

    const addSocialMedia = () => {
        setSocialmedia([...socialMedia, { platform: '', link: '' }]);
        console.log(socialMedia)
    };

    const handleSubmit = (event) => {
    event.preventDefault();
    if(object === "Person"){onSubmit({
        name,
        image,
        socialMedia,
        user,
        recommendedBooks: books,
    });
    setName('')
    setImage('')
    setSocialmedia([{ platform: '', link: '' }])
    setBooks([])
    setNewBook('');}
    else {
        onSubmit({
            author,
            year,
            description,
            title,
            recommendedBy: person ? [person] : [],
            user,
            image: bookImage
        });
        setAuthor('')
        setYear('')
        setDescription('')
        setTitle('')
        setPerson('')
        setBookImage('')
    }

    };
    const deleteSocialMedia = () => {
    if (socialMedia.length > 1) {
        const updatedsocialMedia = [...socialMedia];
        updatedsocialMedia.pop();
        setSocialmedia(updatedsocialMedia);
    }
        };
    const handleChange = (event) => {
        addObject(event.target.value)
    }
    const handlePersonChange = (event) => {
        setPerson(event.target.value)
    }
    return (
        <div>
            <Header user={user}/> 
            <div className="rounded-sm min-h-[10vh] bg-white/[var(--bg-opacity)] [--bg-opacity:50%] mb-8">
              <div className="p-10">
                <h1 className="text-3xl text-center text-black">
                  Add your favorite creator or a book they recommend!
                </h1>
              </div>
            </div>
            <Link to={"/"}>
            <button className="ml-auto mr-auto max-w-md bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:scale-95 transition-transform duration-150 ease-in-out drop-shadow-xl">
                Go back
            </button>
            </Link>
            <div className="mb-5 ml-auto mr-auto max-w-md">
            <FormControl fullWidth className="ml-auto mr-auto max-w-md text-white mb-10">
            <InputLabel id="demo-simple-select-label">Object</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={object}
                label="Object"
                onChange={handleChange}
            >
                <MenuItem value={"Book"}>Book</MenuItem>
                <MenuItem value={"Person"}>Person</MenuItem>
            </Select>
            </FormControl>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-2xs ml-auto mr-auto max-w-md ">
            {object === "Person" ? (
                <div>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="border p-2"
                /><br/>
                <input
                    type="url"
                    placeholder="Image URL"
                    value={image}
                    onChange={(event) => setImage(event.target.value)}
                    className="border p-2 mt-5"
                />
                <ul className="list-disc pl-5 ">
                    {books.map((book, index) => (
                        <li key={index} className="flex justify-between items-center">
                            {book}
                            <button
                                type="button"
                                onClick={() => handleDeleteBook(index)}
                                className="bg-red-500 text-white px-2 py-1 rounded"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
                {socialMedia.map((item, index) => (
                        <div key={index} className="flex gap-2 mt-2em">
                            <input
                                type="text"
                                placeholder="Platform (e.g. Twitter)"
                                value={item.platform}
                                onChange={(e) => handleSocialMediaChange(index, 'platform', e.target.value)}
                                className="border p-2 mt-5"
                            />
                            <input
                                type="text"
                                placeholder="Link"
                                value={item.link}
                                onChange={(e) => handleSocialMediaChange(index, 'link', e.target.value)}
                                className="border p-2"
                            />
                        </div>

                ))}
                
                <div>
                    <button type="button" onClick={deleteSocialMedia} className="ml-auto mr-auto max-w-md bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded hover:scale-95 transition-transform duration-150 ease-in-out drop-shadow-xl">
                        Delete Social Media 
                    </button>
                </div>

                <button type="button" onClick={addSocialMedia} className="ml-auto mr-auto max-w-md bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:scale-95 transition-transform duration-150 ease-in-out drop-shadow-xl">
                    Add Social Media
                </button>
            </div>) : (
                <div >
                    <input
                    type="text"
                    placeholder="Author"
                    value={author}
                    onChange={(event) => setAuthor(event.target.value)}
                    className="border p-2"
                    />
                    <input
                    type="text"
                    placeholder="Year"
                    value={year}
                    onChange={(event) => setYear(event.target.value)}
                    className="border p-2"
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    className="border p-2"
                />
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    className="border p-2"
                />
                <input
                    type="text"
                    placeholder="Image"
                    value={bookImage}
                    onChange={(event) => setBookImage(event.target.value)}
                    className="border p-2"
                />
                <div className='mt-5'>
                <FormControl fullWidth className="ml-auto mr-auto max-w-md text-white mt-10">
                    <InputLabel id="demo-simple-select-label">Recommended By</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={person}
                        label="Person"
                        onChange={handlePersonChange}
                    >
                        {people.map(p =>
                            <MenuItem key={p.mongoId} value={p.mongoId}>{p.name}</MenuItem>
                        )}
                    </Select>
                </FormControl>
                </div>
                </div>
            )}
            <button type="submit" className="ml-auto mr-auto max-w-md bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded hover:scale-95 transition-transform duration-150 ease-in-out drop-shadow-xl">
                    Submit
                </button>
            </form>
        </div>
    );
};
