const express= require('express');
const router= express.Router();
const fetchuser=require('../middleware/fetchuser')
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');
const upload = require("../middleware/upload"); 
const fs = require("fs");
const path = require("path");
// routes to fetch all data 

router.get('/fetchallnotes',fetchuser,async(req,res)=>{
    try {
        const notes= await Notes.find({user:req.user.id});
        res.json(notes);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'not find' });
      }
});



// routes to add notes
router.post(
  "/addnotes",
  fetchuser,
  upload.single("file"),
  [
    body("title").isLength({ min: 3 }).withMessage("Enter the title"),
    body("description")
      .isLength({ min: 5 })
      .withMessage("Enter the description"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { title, description } = req.body;
    const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;

    try {
      const note = new Notes({
        title,
        description,
        fileUrl,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "internal error" });
    }
  }
);





// routes to update notes


router.put('/updatenote/:id', fetchuser, async (req, res) => {
  try {
    const { title, description } = req.body;

    // Create a newNote object
    const newNote = {};
    if (title) newNote.title = title;
    if (description) newNote.description = description;

    // Find the note to be updated
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // Check if the user owns the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    // Update the note
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// DElete the notes
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // Find the note to be deleted
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // Check if the user owns the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    // Delete the attached file if it exists
    if (note.fileUrl) {
      const filePath = path.join(__dirname, "..", note.fileUrl); // adjust path as needed
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("File deletion error:", err.message);
        } else {
          console.log("File deleted:", note.fileUrl);
        }
      });
    }

    // Delete the note from the database
    await Notes.findByIdAndDelete(req.params.id);

    res.json({ Success: "Your note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});


module.exports=router