
const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const NotesSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String, // store file path or URL
    default: null,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports=mongoose.model('Notes',NotesSchema);