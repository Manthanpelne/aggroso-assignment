const mongoose = require("mongoose")

const MeetingSchema = new mongoose.Schema({
  title: String,
  rawTranscript: String,
  date: { type: Date, default: Date.now },
  actionItems: [{
    task: String,
    owner: String,
    dueDate: String,
    status: { type: String, enum: ['open', 'done'], default: 'open' },
    priority: { type: String, default: 'Medium' }
  }]
});

module.exports = mongoose.model("Meeting",MeetingSchema)