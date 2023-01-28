// Required packages
const express = require('express');
const path = require('path');
const fs = require('fs');
const notes = require('./db/db.json');

const app = express();
const PORT = 3001;


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// HTML and API Routes

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
})

app.get('/api/notes', (req,res) => {
    res.json(notes);
})

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})

// Server listener
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
})