import express from 'express';
import * as peopleService from '../services/peopleservice.js';
const router = express.Router();
import tokenExtractor from '../middleware/tokenextractor.js'
import User from '../models/user.js'
import Person from '../models/personmodel.js'
router.get('/', async (req, res) => {
  try {
    const people = await peopleService.getEntries();
    res.json(people);  // send JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch people' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const person = await peopleService.getByPeopleId(req.params.id);
    if (!person) {
      return res.status(404).json({ error: 'Person not found' });
    }
    res.json(person);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch person' });
  }
});
router.post('/', tokenExtractor, async (req, res) => {
  try {
    // 1. Create new person from req.body
    const person = new Person(req.body);
    
    // 2. Save the person to DB
    const savedPerson = await person.save();

    // 3. Get userId from token
    console.log(req.decodedToken)
    const userId = req.decodedToken.id;


    await User.updateOne(
      { _id: userId },
      { $push: { suggestedPersons: savedPerson._id } }  // or suggestedBooks, depending on your schema
    );

    // 5. Send back saved person
    res.status(201).json(savedPerson);

  } catch (error) {
    console.error('Failed to save person:', error);
    res.status(500).json({ error: 'Failed to save person' });
  }
});

router.put('/:id', async (req,res) => {
    try {
        const person = await peopleService.updatePerson(req.params.id, req.body);
        if(!person) {
            return res.status(404).json({ error: 'Person not found' });
        }
        res.json(person);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update person' });
    }
})
export default router;