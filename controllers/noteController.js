const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

router.get("/", (req, res) => {
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) {
      res.status(500).send("Server error. Please try again!");
      throw err;
    } else {
      const notes = JSON.parse(data);
      res.json(notes);
    }
  });
});

router.post("/", (req, res) => {
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) {
      res.status(500).send("Server error. Please try again!");
      throw err;
    } else {
      const notes = JSON.parse(data);
      const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4(),
      };
      notes.push(newNote);
      fs.writeFile("./db/db.json", JSON.stringify(notes, null, 4), (err) => {
        if (err) {
          res.status(500).send("Server error. Please try again!");
          throw err;
        } else {
          res.send("data added!");
        }
      });
    }
  });
});

module.exports = router;
