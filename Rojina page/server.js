import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize SQLite database
const db = new sqlite3.Database('./portfolio.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
    // Create the table for your contact form
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

// POST API route to handle form submissions
app.post('/api/contact', (req, res) => {
  const { name, email, details } = req.body;

  if (!name || !email || !details) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const query = `INSERT INTO contacts (name, email, details) VALUES (?, ?, ?)`;
  
  db.run(query, [name, email, details], function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ message: 'Server error. Failed to save message.' });
    }
    
    res.status(200).json({ 
      message: 'Form filled successfully!',
      id: this.lastID 
    });
  });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});