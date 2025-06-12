import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import express from 'express';
const router = express.Router();
import User from '../models/user.js';
import * as userService from '../services/userService.js'

//user login
router.post('/', async (request, response) => {
  const { username, password} = request.body;

  const user = await User.findOne({ username });

  if (!user) {
    return response.status(401).json({ error: 'invalid username or password' });
  }
  console.log(user)
  const passwordCorrect = await bcrypt.compare(password, user.password);

  if (!passwordCorrect) {
    return response.status(401).json({ error: 'invalid username or password' });
  }
  const userJSON = user.toJSON();
  console.log(userJSON)
  const userForToken = {
    username: user.username,
    id: userJSON.id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  response.status(200).send({ token, username: user.username, name: user.name, id: user.id }); 
});
//get users
router.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users);
});

//register
router.post('/register', async (request, response) => {
  const { username, name, password } = request.body;

  if (!password || password.length < 3) {
    return response.status(400).json({ error: 'Password must be at least 3 characters long' });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return response.status(400).json({ error: 'Username must be unique' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    password: passwordHash,
  });

  const savedUser = await user.save();
  response.status(201).json(savedUser);
});
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('suggestedBooks').populate('suggestedPeople'); // ✅ Populate books here
    console.log(user)
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user.toJSON()); // Now user.suggestedBooks will contain full book objects
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});
export default router;
