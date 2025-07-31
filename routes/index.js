var express = require('express');
var router = express.Router();
const { getCollection } = require('../models/db');

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const testCollection = getCollection('test'); // Try to access a collection named 'test'
    const documents = await testCollection.find({}).toArray(); // Fetch all docs
    // res.render('index', { title: 'MongoDB Test', data: documents });
    res.redirect('signup');
  } catch (err) {
    next(err); // Pass errors to error handler
  }
});

router.get('/signin', function(req, res, next) {
  res.render("signin");
});

router.get('/signup', function(req, res, next) {
  res.render("signup");
});

router.get('/quiz', function(req,res,next){
  res.render('quiz');
})


//Also want to make sure the password is correct 
router.post("/signup/submit", async (req, res) => {
  const {username, email, password, confirmPassword} = req.body;

  //Backend validation to also check in the backend if the code works 
  const pattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
  if (!pattern.test(password)) {
    return res.render('signup', {
      error: 'Password must be at least 6 characters and include 1 uppercase letter and 1 special character.',
      username,
      email
    });
  }

  if (password !== confirmPassword) {
    return res.render('signup', {
      error: 'Passwords do not match.',
      username,
      email
    });
  }

  //Insert data into mongo db or throws an error.
  const userCollection = getCollection('users');//Get collection based on the uername
  try{
    await userCollection.insertOne(req.body);
    //Sends a notification to the user that their data has been saved.
    res.send('User infomation has been saved');
  }catch(e){
    res.status(500).send('Not able to save user info to db');
  }

  res.redirect('quiz');
});

router.post("/signin/submit", async (req, res) => {
  const { username, password } = req.body;

  try {
    const signedUpUser = await User.findOne({ username });
    if (!signedUpUser) {
      return res.render("signin", { error: "User not found!" });
    }

    const match = await bcrypt.compare(password, signedUpUser.password);
    if (!match) {
      return res.render("signin", { error: "Invalid password!" });
    }

    // Redirect with username in the URL query
    res.redirect(`/quiz?username=${signedUpUser.username}`);
  } catch (err) {
    console.error(err);
    res.status(500).render("signin", { error: "Server error" });
  }
});


module.exports = router;
