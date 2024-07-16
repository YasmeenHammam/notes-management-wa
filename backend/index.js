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

//GET 10 notes.
app.get("/notes", async (request, response) => {
  try {
    const activePage = parseInt(request.query.activePage) || 1;
    const postsPerPage = parseInt(request.query.postsPerPage) || 10;

    const skip = (activePage - 1) * postsPerPage;

    const count = await Note.countDocuments({});

    const notes = await Note.find({})
      .sort({ id: 1 })
      .skip(skip)
      .limit(postsPerPage);

    response.json({ count, notes });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

// POST new note
app.post("/notes", async (request, response) => {
  const { content } = request.body;

  if (content == undefined || content == null || typeof content != "string") {
    return response
      .status(400)
      .json({ error: "Missing fields in the request" });
  }

  const count = await Note.countDocuments({});
  const customId = count + 1;

  const note = new Note({
    id: customId,
    title: `Note ${customId}`,
    author: {
      name: `Author ${customId}`,
      email: `mail_${customId}@gmail.com`,
    },
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
    const notes = await Note.find({})
      .sort({ id: 1 })
      .skip(i - 1)
      .limit(1);
    const note = notes[0];

    if (note) {
      response.status(200).json(note);
    } else {
      response.status(404).json({ error: "Note not found" });
    }
  } catch {
    response.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE the i-th Note.
app.delete("/notes/:id", async (request, response) => {
  const i = request.params.id;

  try {
    const notes = await Note.find({})
      .sort({ id: 1 })
      .skip(i - 1)
      .limit(1);
    const note = notes[0];

    if (note) {
      const deletedNote = await Note.deleteOne({ _id: note._id });
      if (deletedNote) {
        response.status(204).json("Note deleted successfully");
      } else {
        response.status(500).json({ error: "Error deleting note" });
      }
    } else {
      response.status(404).json({ error: "Note not found" });
    }
  } catch {
    response.status(500).json({ error: "Internal Server Error" });
  }
});

//EDIT the i-th Note.
app.put("/notes/:id", async (request, response) => {
  const i = request.params.id;
  const newContent = request.body.content;

  if (newContent == undefined || newContent == null || typeof newContent != "string") {
    return response
      .status(400)
      .json({ error: "Missing fields in the request" });
  }

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
        response.status(200).json(updatedNote);
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
