const express = require("express");
const fs = require("fs");
const path = require("path");
const database = require("./db/db.json");

// set up the app and port
const PORT = process.env.PORT || 3001;
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public/index.html"));

// routes
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/api/notes", async (req, res) => {
  res.json(database);
});

app.listen(PORT, () => {
  console.log(`App listening on PORT http://localhost:${PORT}`);
});
