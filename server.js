const express = require("express");
// const notes = require("express").Router();
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
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.post("/api/notes", (req, res) => {
  console.log(`${req.method} request recieved to add a note`);

  // new note
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, "./db/db.json");

    const response = {
      status: "Success, new note added",
      body: newNote,
    };

    // writeToFile("./public/notes.html", newNote.title);

    console.log(response);
    res.json(response);
  } else {
    res.json("Error in adding note");
  }
});

// app.delete("/api/notes/:id", (req, res) => {
//   const id = req.params.id;
//   console.log(id);
//   fs.readFile("./db/db.json", (err, notes) => {
//     if (err) throw err;
//     let notesArray = JSON.parse(notes);
//     console.log(notesArray[0].id);

//     for (let i = 0; i < notesArray.length; i++) {
//       if (id === notesArray[i].id) {
//         notesArray.splice(i, 1);
//       }
//     }

//     fs.writeFile(
//       "./db/db.json",
//       JSON.stringify(notesArray, null, 2),
//       "utf8",
//       (err) => {
//         if (err) return console.log(err);
//         res.json(`Note: ${id} has been deleted`);
//       }
//     );
//   });
// });

// app.get("/api/notes/:id", (req, res) => {
//   const index = req.params.id;
//   res.json(notes[index]);
// });
app.get("/api/notes", (req, res) => {
  console.log(`${req.method} request recieved to get a note`);

  return res.json(database);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, () => {
  console.log(`App listening on PORT http://localhost:${PORT}`);
});
