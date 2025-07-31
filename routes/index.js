var express = require('express');
var router = express.Router();
const { getCollection } = require('../models/db');
const path = require('path');

// Redirect root to signup page
router.get('/', function(req, res) {
  res.redirect('/signup');
});

// Render Sign In page
router.get('/signin', function(req, res, next) {
  res.render("signin");
});

// Render Sign Up page
router.get('/signup', function(req, res, next) {
  res.render("signup");
});

// Handle Sign Up form submission
router.post("/signup/submit", async (req, res) => {
  const userCollection = getCollection('users');
  try {
    await userCollection.insertOne(req.body);
    res.send('User information has been saved');
  } catch (e) {
    res.status(500).send('Not able to save user info to db');
  }
});

// Placeholder for Sign In form submission
router.post("/signin/submit", (req, res) => {
  // TODO: Implement login logic here
});

//router.get('/index.html', (req, res) => {
  //res.sendFile(path.join(__dirname, 'index.html'));
//});

module.exports = router;
