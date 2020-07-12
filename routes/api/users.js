const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    
    // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  User.findOne({ userName: req.body.userName }).then(user => {
      if (user) {
        return res.status(400).json({ userName: "User already exists" });
      } else {
        const newUser = new User({
          fName: req.body.fName,
          lName: req.body.lName,
          userName: req.body.fName.toLowerCase() + "." + req.body.lName.toLowerCase(),
          password: req.body.password,
          location: req.body.location,
          role: req.body.role
        });
  
        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  });

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    
    // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  const userName = req.body.userName;
  const password = req.body.password;
  
    // Find user by userName
    User.findOne({ userName }).then(user => {
      
        // Check if user exists
      if (!user) {
        return res.status(404).json({ usernamenotfound: "User not found" });
      }
  
      // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            name: user.fName,
            role: user.role,
            location: user.location
          };
       
          // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  });

  module.exports = router;