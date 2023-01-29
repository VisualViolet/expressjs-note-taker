// Required packages
const express = require("express");
const router = express.Router();
const path = require("path");

// GET methods for HTML pages
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});

router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

// Route declaration and requirement
const noteRoutes = require("../controllers/noteController");
router.use("/api/notes", noteRoutes);

module.exports = router;
