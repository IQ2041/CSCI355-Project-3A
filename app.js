var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const { connectToDB } = require('./models/db');
const Score = require('./models/score');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const quizRouter = require('./routes/quiz');

var app = express();

// Connect to MongoDB
(async () => {
  try {
    await connectToDB();
    console.log('Database initialized');
  } catch (error) {
    console.error('Failed to connect to database:', error);
  }
})();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/quiz', quizRouter);

// Score submission
app.post('/submit-score', async (req, res) => {
  const { name, score } = req.body;
  try {
    await Score.create({ name, score });
    res.redirect('/leaderboard');
  } catch (err) {
    res.status(500).send("Error saving score.");
  }
});

// Leaderboard page
app.get('/leaderboard', async (req, res) => {
  try {
    const topScores = await Score.find().sort({ score: -1 }).limit(10);
    res.render('leaderboard', { scores: topScores });
  } catch (err) {
    res.status(500).send("Error loading leaderboard.");
  }
});

// Catch 404
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// Start server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
