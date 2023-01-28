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

// POST route to save new note to db.json
app.post("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
      if (err) 
      {
        res.status(500).send("Server Error. Please try again.");
        throw err;
      } 
      else 
      {
        const noteData = JSON.parse(data);
        noteData.push(req.body);
        fs.writeFile("./db/db.json", JSON.stringify(noteData, null, 2), (err) => {
          if (err) 
          {
            res.status(500).send("Server error. Please try again.");
            throw err;
          } 
          else 
          {
            res.send("Success! Note added!");
          }
        });
      }
    });
  });
  

// Server listener
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
})