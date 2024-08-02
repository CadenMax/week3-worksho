// server.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

// Middleware to parse JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup express-session
app.use(session({
  secret: 'your-secret-key', // Replace with a secure key
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set true if using HTTPS
}));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Import and use the home route
require('./routes/homeroute.js').route(app, path);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
