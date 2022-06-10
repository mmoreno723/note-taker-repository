const express = require("express");
const notes = require("express").Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const database = require("./db/db.json");
const { readAndAppend, readFromFile } = require("./helpers/fsUtils");

// set up the app and port
const PORT = process.env.PORT || 3001;
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

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
  console.log(response);
  //   // new note
  //   const { title, text } = req.body;

  //   if (title && text) {
  //     const newNote = {
  //       title,
  //       text,
  //     };

  //     const response = {
  //       status: "Success, new note added",
  //       body: newNote,
  //     };

  //     console.log(response);
  //     res.status(201).json(response);
  //   } else {
  //     res.status(500).json("Error in adding note");
  //   }
});

// notes.get("/api/notes", (req, res) => {
//   console.log(database);
//   fs.readFile(database).then((data) => res.json(JSON.parse(data)));
// });

// notes.post("/api/notes", (req, res) => {
//   console.log(req.body);

//   const { title, text } = req.body;

//   if (req.body) {
//     const newNote = {
//       title,
//       text,
//     };

//     readAndAppend(newNote, "./db/db.json");
//     res.json(`Note added successfully!`);
//   } else {
//     res.error("Error in posting note");
//   }
// });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, () => {
  console.log(`App listening on PORT http://localhost:${PORT}`);
});
