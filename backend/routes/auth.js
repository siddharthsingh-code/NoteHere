const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt= require("bcryptjs");
require("dotenv").config({ path: "./backend/.env" });
const jwt= require('jsonwebtoken');
const JWT_SECRET = process.env.REACT_APP_JWT_SECRET;
const fetchuser=require('../middleware/fetchuser')

// Route: POST /api/users/
router.post(
  "/createuser",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password")
      .exists()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  async (req, res) => {
    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "User already exists with this email" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.status(200).json({
        success,
        authtoken,
        user: {
          name: user.name,
        },
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  }
);
//       ROUTING   LOGIN 

router.post('/login', [
  body('email').isEmail().withMessage('Enter a valid email'),
  body('password').exists().withMessage('Password cannot be blank')
], async (req, res) => {
  // Check validation errors
  // res.send("Auth route working!");
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {

    return res.status(400).json({ errors: errors.array() });
  }
  const {email,password}=req.body;
  try {
    let user = await User.findOne({email});
    if(!user){
        success = false;
        return res.status(400).json({error: "user dosesn't exist with this email"})
    }
    const passcompare=await bcrypt.compare(password,user.password);
    if(!passcompare){
      success = false;
      return res.status(400).json({ success, error: "Please try to login with correct credentials" });
    }
  
    const data ={
      user:{
        id:user.id
      }
    }
    const authtoken=jwt.sign(data,JWT_SECRET);
    success = true;
    res.json({
      success,
      authtoken,
      user: {
        name: user.name,
      },
    });
     

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Email must be unique or internal error' });
  }
});


//GET USER
router.post('/getuser',fetchuser, async (req, res) => {
  try {
    userId=req.user.id;
    const user=await User.findById(userId).select("-password");
    res.send(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Email must be unique or internal error' });
  }
});
module.exports = router;