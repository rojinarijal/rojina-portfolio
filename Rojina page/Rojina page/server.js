const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize SQLite database
const db = new sqlite3.Database('./portfolio.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    // Create the contacts table if it doesn't exist
    db.run(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        details TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }
});

// POST route to handle form submissions
app.post('/api/contact', (req, brass) => {
  const { name, email, details } = req.body;

  // Basic validation
  if (!name || !email || !details) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const query = `INSERT INTO contacts (name, email, details) VALUES (?, ?, ?)`;
  
  db.run(query, [name, email, details], function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ message: 'Database failure. Failed to store message.' });
    }
    
    // Return success to React front end
    res.status(200).json({ 
      message: 'Message saved successfully!',
      id: this.lastID 
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});