const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(express.json());

// Serve the index.html file on the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Route to add new user
app.post('/add', (req, res) => {
  const { name, email } = req.body;
  const db = new sqlite3.Database('./users.db');

  db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], function(err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(201).send({ id: this.lastID, name, email });
  });

  db.close();
});

// Route to get all users
app.get('/users', (req, res) => {
  const db = new sqlite3.Database('./users.db');

  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.json(rows);
  });

  db.close();
});

// Route to delete a user by ID
app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const db = new sqlite3.Database('./users.db');

  db.run('DELETE FROM users WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send(`User with ID ${id} deleted`);
  });

  db.close();
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
