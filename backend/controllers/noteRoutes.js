const express = require("express");
const noteRouter = express.Router();
const Note = require("../models/note");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const authorize = require("../controllers/authorization");

const { request } = require("http");

//GET 10 notes.
noteRouter.get("/", async (request, response) => {
  try {
    const activePage = parseInt(request.query.activePage) || 1;
    const postsPerPage = parseInt(request.query.postsPerPage) || 10;

    const skip = (activePage - 1) * postsPerPage;

    const count = await Note.countDocuments({});

    const notes = await Note.find({})
      .sort({ id: 1 })
      .skip(skip)
      .limit(postsPerPage);

    response.status(200).json({ count, notes });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

// POST new note
noteRouter.post("/", authorize, async (request, response) => {
  const { content } = request.body;
  if (
    content === undefined ||
    content === null ||
    typeof content !== "string"
  ) {
    return response
      .status(400)
      .json({ error: "Missing or Wrong fields in the request" });
  }

  const count = await Note.countDocuments({});
  const customId = count + 1;
  const note = new Note({
    id: customId,
    title: `Note ${customId}`,
    author: {
      name: request.user.name,
      email: request.user.email,
    },
    content: content,
  });

  try {
    const savedNote = await note.save();
    response.status(201).json(savedNote);
  } catch (err) {
    response.status(500).json({ error: "Cannot save note" });
  }
});

// GET the i-th note.
noteRouter.get("/:id", async (request, response) => {
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
noteRouter.delete("/:id", authorize, async (request, response) => {
  const i = request.params.id;
  const author = request.user.name;

  try {
    const notes = await Note.find({})
      .sort({ id: 1 })
      .skip(i - 1)
      .limit(1);
    const note = notes[0];

    if (note) {
      if (note.author.name !== author) {
        return response
          .status(403)
          .json({ error: "Forbidden: Not authorized to update this note" });
      }
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
noteRouter.put("/:id", authorize, async (request, response) => {
  const i = request.params.id;
  const author = request.user.name;
  const newContent = request.body.content;

  if (
    newContent === undefined ||
    newContent === null ||
    typeof newContent !== "string"
  ) {
    return response
      .status(400)
      .json({ error: "Missing or Wrong fields in the request" });
  }

  try {
    const notes = await Note.find({})
      .sort({ id: 1 })
      .skip(i - 1)
      .limit(1);
    const note = notes[0];

    if (note) {
      if (note.author.name !== author) {
        return response
          .status(403)
          .json({ error: "Forbidden: Not authorized to update this note" });
      }
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

module.exports = noteRouter;
