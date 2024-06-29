const express = require("express");
const app = express();

require("dotenv").config();

const Note = require("./models/note");

app.use(express.static("dist"));

const fs = require("fs");
const path = require("path");

const requestLogger = (request, response, next) => {
  const filepath = path.join(__dirname, "log.txt");

  const content = `
  Time:   ${new Date()}
  Method: ${request.method}
  Path:   ${request.path}
  Body:   ${JSON.stringify(request.body)}
  --------------------------------------------
  `;

  fs.appendFileSync(filepath, content);
  next();
};

const cors = require("cors");
const { request } = require("http");

app.use(cors());

app.use(express.json());
app.use(requestLogger);

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

//GET all notes.
// TODO: all the notes or just 10?
app.get("/notes", async (request, response) => {
  const notes = await Note.find({});
  response.json(notes);
});

//TODO: check every feild in the note-> V but need to check it after getting the Input.
app.post("/notes", async (request, response) => {
  const { id, title, author, content } = request.body;

  if (!id || !title || !author || !content) {
    response.status(400).json({ error: "Missing fields in the request" });
  }
  const note = new Note({
    id: id,
    title: title,
    author: author,
    content: content,
  });
  try {
    const savedNote = await note.save();
    response.status(201).json(savedNote);
  } catch {
    response.status(500).json({ error: "Cannot Save Note" });
  }
});

// GET the i-th note.
app.get("/notes/:id", async (request, response) => {
  const i = request.params.id;
  try {
    const note = await Note.find({})
      .sort({ id: 1 })
      .skip(i - 1)
      .limit(1);
    if (note) {
      response.json(note);
      response.status(204).end();
    } else {
      response.status(404).json({ error: "Note not found" });
    }
  } catch {
    response.status(500).json({ error: "Internal Server Error" });
  }
});

// TODO: DELETE the Note with id = i.
app.delete("/notes/:id", async (request, response) => {
  const id = request.params.id;
  try {
    const note = await Note.findOne({ id: id });
    if (note) {
      objectId = note._id;
      const deletedNote = await Note.deleteOne({ _id: objectId });
      if (deletedNote) {
        response.status(204).json("Note deleted successfully");
      } else {
        response.status(500).json({ error: "Error deleting note" });
      }
    } else {
      response.status(404).json({ error: "Note not found" });
    }
  } catch (err) {
    response.status(500).json({ error: "Internal Server Error" });
  }
});

//TODO: DELETE the ith Note.
// app.delete("/notes/:id", async (request, response) => {
//   const i = request.params.id;

//   const notes = await Note.find({})
//     .sort({ id: 1 })
//     .skip(i - 1)
//     .limit(1);
//   const note = notes[0];

//   if (note) {
//     // console.log(note._id);
//     const deletedNote = await Note.deleteOne({ _id: note._id });
//     if (deletedNote) {
//       response.status(204).json("Note deleted successfully");
//     } else {
//       response.status(500).json({ error: "Error deleting note" });
//     }
//   } else {
//     response.status(404).json({ error: "Note not found" });
//   }
// });

app.put("/notes/:id", async (request, response) => {
  const i = request.params.id;
  const newContent = request.body.content;
  console.log(newContent);
  try {
    const notes = await Note.find({})
      .sort({ id: 1 })
      .skip(i - 1)
      .limit(1);
    const note = notes[0];

    if (note) {
      const updatedNote = await Note.updateOne(
        { _id: note._id },
        { content: newContent }
      );

      if (updatedNote) {
        response.status(204).json(updatedNote);
      } else {
        response.status(500).json({ error: "Error updating note" });
      }
    } else {
      response.status(404).json({ error: "Note not found" });
    }
  } catch {
    response.status(500).json({ error: "Internal Server Error" });
  }
});

app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
