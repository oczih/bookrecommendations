import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Header } from './Header';
import { Select, FormControl, InputLabel, MenuItem } from '@mui/material';
import { Notification } from './Notifications';

export const SuggestAPerson = ({ onSubmit, people, user, setUser, message, setMessage }) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [socialMedia, setSocialmedia] = useState([{ platform: '', link: '' }]);
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState('');
  const [object, addObject] = useState('Book');
  const [person, setPerson] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState('');
  const [author, setAuthor] = useState('');
  const [bookImage, setBookImage] = useState('');

  const handleAddBook = () => {
    if (newBook.trim() === '') return;
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
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (object === "Person") {
      onSubmit({
        name,
        image,
        socialMedia,
        user,
        recommendedBooks: books,
      });
      setMessage(`You suggested ${name}!`);
      setName('');
      setImage('');
      setSocialmedia([{ platform: '', link: '' }]);
      setBooks([]);
      setNewBook('');
    } else {
      onSubmit({
        author,
        year,
        description,
        title,
        recommendedBy: person ? [person] : [],
        user,
        image: bookImage
      });
      setMessage(`You suggested ${title}!`);
      setAuthor('');
      setYear('');
      setDescription('');
      setTitle('');
      setPerson('');
      setBookImage('');
    }
  };

  const deleteSocialMedia = () => {
    if (socialMedia.length > 1) {
      const updatedSocialMedia = [...socialMedia];
      updatedSocialMedia.pop();
      setSocialmedia(updatedSocialMedia);
    }
  };

  const handleChange = (event) => {
    addObject(event.target.value);
  };

  const handlePersonChange = (event) => {
    setPerson(event.target.value);
  };

  return (
    <div>
      <Header user={user} setMessage={setMessage} setUser={setUser}/>
      <Notification message={message} />

      <div className="card bg-base-200 shadow-xl ml-auto mr-auto w-full max-w-lg p-8 mb-8">
        <h1 className="text-3xl font-bold text-center mb-6">Suggest a Creator or Book</h1>

        <div className="flex justify-center mb-6">
          <FormControl fullWidth>
            <InputLabel id="select-object-label">Object</InputLabel>
            <Select
                labelId="select-person-label"
                id="select-person"
                value={object}
                label="Recommended By"
                onChange={handleChange}
                sx={{
                    color: '#8b8d91',
                    '.MuiSelect-select': {
                    color: '#8b8d91',
                    backgroundColor: '#1c232b', // Input background color
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#434951', // Default border color
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#434951', // Hover border color
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#434951', // Focused border color
                    },
                }}
                >
              <MenuItem value={"Book"}>Book</MenuItem>
              <MenuItem value={"Person"}>Person</MenuItem>
            </Select>
          </FormControl>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {object === "Person" ? (
            <>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered w-full"
              />
              <input
                type="url"
                placeholder="Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="input input-bordered w-full"
              />

              <ul className="list-disc pl-5">
                {books.map((book, index) => (
                  <li key={index} className="flex justify-between items-center">
                    {book}
                    <button
                      type="button"
                      onClick={() => handleDeleteBook(index)}
                      className="btn btn-xs btn-error"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>

              {socialMedia.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Platform (e.g. Twitter)"
                    value={item.platform}
                    onChange={(e) => handleSocialMediaChange(index, 'platform', e.target.value)}
                    className="input input-bordered w-full"
                  />
                  <input
                    type="text"
                    placeholder="Link"
                    value={item.link}
                    onChange={(e) => handleSocialMediaChange(index, 'link', e.target.value)}
                    className="input input-bordered w-full"
                  />
                </div>
              ))}

              <div className="mt-4 mr-auto ml-auto w-full max-w-lg">
                <button type="button" onClick={addSocialMedia} className="btn btn-secondary w-full mt-4">
                  Add Social Media
                </button>
                <button type="button" onClick={deleteSocialMedia} className="btn btn-error w-full mt-4">
                  Delete Social Media
                </button>
              </div>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="input input-bordered w-full"
              />
              <input
                type="text"
                placeholder="Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="input input-bordered w-full"
              />
              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input input-bordered w-full"
              />
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input input-bordered w-full"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={bookImage}
                onChange={(e) => setBookImage(e.target.value)}
                className="input input-bordered w-full"
              />

              <FormControl fullWidth className="mt-4">
                <InputLabel id="select-person-label">Recommended By</InputLabel>
                <Select
                    labelId="select-person-label"
                    id="select-person"
                    value={person}
                    label="Recommended By"
                    onChange={handlePersonChange}
                    sx={{
                        color: '#8b8d91',
                        '.MuiSelect-select': {
                        color: '#8b8d91',
                        backgroundColor: '#1c232b', // Input background color
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#434951', // Default border color
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#434951', // Hover border color
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#434951', // Focused border color
                        },
                    }}
                    >
                  {people.map((p) => (
                    p.accepted &&
                    <MenuItem key={p.mongoId} value={p.mongoId} className="text-white">
                      {p.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}

          <button type="submit" className="btn btn-success w-full mt-4">
            Submit
          </button>

          <Link to={"/"} className="btn btn-outline w-full mt-2">
            Go Back
          </Link>
        </form>
      </div>
    </div>
  );
};
