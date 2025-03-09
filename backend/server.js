const express = require('express');
const sqlite3 = require('sqlite3').verbose();
<<<<<<< HEAD
const path = require('path');
=======
>>>>>>> 63322b030e17d29b588ac421120618eca2535492
const cors = require('cors');
const app = express();
const db = new sqlite3.Database('./database.db');

<<<<<<< HEAD
// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for frontend communication

// Serve the index.html file on the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Create table if not exists for users
db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, email TEXT)");

// Create table if not exists for items
db.run("CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY, name TEXT)");

// Route to add new user
app.post('/add/user', (req, res) => {
  const { name, email } = req.body;
  db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], function (err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(201).send({ id: this.lastID, name, email });
  });
});

// Route to get all users
app.get('/users', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.json(rows);
  });
});

// Route to delete a user by ID
app.delete('/delete/user/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM users WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send(`User with ID ${id} deleted`);
  });
});

// Route to get all items
=======
app.use(express.json());
app.use(cors());

// Create table if not exists
db.run("CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY, name TEXT)");

// Get all items
>>>>>>> 63322b030e17d29b588ac421120618eca2535492
app.get('/items', (req, res) => {
  db.all("SELECT * FROM items", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

<<<<<<< HEAD
// Route to add an item
app.post('/add/item', (req, res) => {
  const { name } = req.body;
  db.run("INSERT INTO items (name) VALUES (?)", [name], function (err) {
=======
// Add an item
app.post('/add', (req, res) => {
  const { name } = req.body;
  db.run("INSERT INTO items (name) VALUES (?)", [name], function(err) {
>>>>>>> 63322b030e17d29b588ac421120618eca2535492
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID, name });
  });
});

<<<<<<< HEAD
// Route to delete an item
app.delete('/delete/item/:id', (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM items WHERE id = ?", [id], function (err) {
=======
// Delete an item
app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM items WHERE id = ?", [id], function(err) {
>>>>>>> 63322b030e17d29b588ac421120618eca2535492
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: `Item with id ${id} deleted` });
  });
});

<<<<<<< HEAD
// Start the server
=======
>>>>>>> 63322b030e17d29b588ac421120618eca2535492
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
