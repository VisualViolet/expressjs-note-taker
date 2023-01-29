// Required packages
const express = require("express");
const path = require("path");
const fs = require("fs");
const Notes = require("./db/db.json");
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// HTML and API Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  res.json(Notes);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// POST route to save new note to db.json
app.post("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) {
      res.status(500).send("Oh no! There was a server error.");
      throw err;
    } else {
      const notes = JSON.parse(data);
      const newNote = { title: req.body.title, text: req.body.text, noteId: uuidv4() };
      notes.push(newNote);
      fs.writeFile("./db/db.json", JSON.stringify(notes, null, 4), (err) => {
        if (err) {
          res.status(500).send("Oh no! There was a server error.");
          throw err;
        } else {
          res.send("Success! New note added!");
        }
      });
    }
  });
});

// Server listener
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
