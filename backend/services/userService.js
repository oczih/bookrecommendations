import User from '../models/user.js'

export const getByUserId = async (id) => {
  const u = await User.findById(id).lean();
  if (!u) return null;
  return {
    mongoId: u._id.toString(),
    id: u._id.toString(),  // explicitly define string id here
    name: u.name,
    username: u.username,
    suggestedBooks: Array.isArray(u.suggestedBooks) 
      ? u.suggestedBooks.map(id => id.toString()) 
      : [],
    suggestedPeople: Array.isArray(u.suggestedPeople) ? u.suggestedPeople.map(id => id.toString()) : [],
  };
};
