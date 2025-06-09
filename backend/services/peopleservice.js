import Person from '../models/personmodel.js';

export const getEntries = async () => {
  const people = await Person.find().lean();
  return people.map(p => ({
    mongoId: p._id.toString(),
    originalId: p.originalId,
    name: p.name,
    socialMedia: p.socialMedia,
    recommendedBooks: p.recommendedBooks.map(id => id.toString()),
    image: p.image
  }));
};
export const getByPeopleId = async (id) => {
  const p = await Person.findById(id).lean();
  if (!p) return null;
  return {
    mongoId: p._id.toString(),
    originalId: p.originalId,
    name: p.name,
    recommendedBooks: p.recommendedBooks.map(id => id.toString()),
    image: p.image
  };
};
export const updatePerson = async (id, data) => {
  const updatedPerson = await Person.findByIdAndUpdate(id, data, { new: true }).lean();
  if (!updatedPerson) return null;

  return {
    mongoId: updatedPerson._id.toString(),
    originalId: updatedPerson.originalId,
    name: updatedPerson.name,
    picture: updatedPerson.picture,
    recommendedBooks: updatedPerson.recommendedBooks.map(bid => bid.toString())
  };
};
