const express = require("express");
const fs = require("fs");
const path = require("path");
const database = require("./db/db.json");
const notes = require("express").Router();
const { readAndAppend, readFromFile } = require("./helpers/fsUtils");

// set up the app and port
const PORT = process.env.PORT || 3001;
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public/index.html"));
app.use(express.static("public/notes.html"));

// routes
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  console.log(`${req.method} request recieved to get a note`);

  return res.json(database);
});
app.post("/api/notes", (req, res) => {
  console.log(`${req.method} request recieved to add a note`);

  let response;

  if (req.body) {
    response = {
      status: "Success",
      data: req.body,
    };
    res.status(201).json(response);
  } else {
    res.status(400).json("Request body is missing");
  }
  console.log(req.body);

  //   const { title, text } = req.body;

  //   if (title && text) {
  //     const newNote = {
  //       title,
  //       text,
  //     };

  //     const response = {
  //       status: "Success, note added",
  //       body: newNote,
  //     };

  //     console.log(response);
  //     res.status(201).json(response);
  //   } else {
  //     res.status(500).json("Error in adding note");
  //   }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, () => {
  console.log(`App listening on PORT http://localhost:${PORT}`);
});
