const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'vaishali@123',
    database: 'crud_db'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL connected...');
});

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the CRUD API');
});

// Create
app.post('/api/records', (req, res) => {
    const { name, email } = req.body;
    const sql = 'INSERT INTO records (name, email) VALUES (?, ?)';
    db.query(sql, [name, email], (err, result) => {
        if (err) throw err;
        res.send('Record added');
    });
});

// Read
app.get('/api/records', (req, res) => {
    const sql = 'SELECT * FROM records';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Update
app.put('/api/records/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const sql = 'UPDATE records SET name = ?, email = ? WHERE id = ?';
    db.query(sql, [name, email, id], (err, result) => {
        if (err) throw err;
        res.send('Record updated');
    });
});

// Delete
app.delete('/api/records/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM records WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.send('Record deleted');
    });
});

app.listen(5000, () => {
    console.log('Server started on port 5000');
});
