import { useEffect, useState } from 'react';
import bookService from './services/books';
import peopleService from './services/people';

const App = () => {
  const [books, setBooks] = useState([]);
  const [people, setPeople] = useState([]);
  useEffect(() => {
    bookService.getAll().then(books => {
      setBooks(books);
    });
  }, []);
  useEffect(() => {
    peopleService.getAll().then(people => {
      setPeople(people);
    });
  }, []);
  {console.log(people.map(e => e.name))}
  const matchRecommendedBy = (recommendedByIds) => {
  return recommendedByIds.map(id => {
    const book = books.find(p => p.mongoId === id);
    return book ? { id: book.mongoId, name: book.name } : { id: null, name: 'Unknown' };
  });
};
  const updatePicture = async (personId, newPictureUrl) => {
    try {
      const updatedPerson = await peopleService.update(personId, { picture: newPictureUrl });
      console.log('Updated person:', updatedPerson);
      // You can now refresh people state to show changes
    } catch (error) {
      console.error('Error updating picture:', error);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 p-8">
      <h1 className="text-2xl text-center">Find books recommended by your favorite creator!</h1>
      <div className="max-w-4xl mx-auto grid gap-8 grid-cols-1 md:grid-cols-2">
        {people.map(person => (
          <div key={person.id} className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <img src={person.image} alt={person.name} className="rounded-full w-32 h-32 object-cover object-center" />
            <h2 className="text-xl font-bold tracking-tight text-gray-900">{person.name}</h2>
            <p className="text-gray-700">{person.socialMedia.map(m => (
              <div>
                <p>Platform: {m.platform}</p>
                <p>Followers: {m.followers}</p><br/>
                <p>Link: {m.link}</p>
              </div>
            ))}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
