const express = require('express');
const meetingModel = require('../model/meetingModel');
const router = express.Router();


// CREATE: Save new meeting session
router.post('/', async (req, res) => {
  try {
    const { title, rawTranscript, actionItems } = req.body;
    const newMeeting = new meetingModel({
      title: title || `Meeting ${new Date().toLocaleDateString()}`,
      rawTranscript,
      actionItems
    });
    const saved = await newMeeting.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ: Get history
router.get('/history', async (req, res) => {
  try {
    const history = await meetingModel.find().sort({ date: -1 }).limit(5);
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE: Edit meeting or its items
router.put('/:id', async (req, res) => {
  try {
    const updated = await meetingModel.findByIdAndUpdate(
      req.params.id, 
      { $set: req.body }, 
      { returnDocument: 'after' }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE: Remove a whole meeting record
router.delete('/:id', async (req, res) => {
  try {
    await meetingModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Meeting deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;