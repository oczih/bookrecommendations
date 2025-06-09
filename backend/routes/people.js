import express from 'express';
import * as peopleService from '../services/peopleservice.js';
const router = express.Router();

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