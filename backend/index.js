const express = require("express");
const app = express();

require("dotenv").config();

const Note = require("./models/note");

app.use(express.static("dist"));


const fs = require("fs");
const path = require("path");

const requestLogger = (request, response, next) => {
  const filepath = path.join(__dirname, 'log.txt');

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

app.use(cors());

app.use(express.json());
app.use(requestLogger);

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};


app.get("/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

app.post("/notes", async (request, response) => {
  const { id, title, author, content } = request.body;
  const note = new Note({
      id: id,
      title: title,
      author: author,
      content: content,
  }); 
    console.log(note);
    const savedNote = await note.save();
    response.status(201).json(savedNote);

});
  
app.get("/notes/:id", async(request, response) => {
  const id = request.params.id;
  try {
    const note = await Note.findOne({ id: id });
    if (note) {
      response.json(note);
      response.status(204).end();
    } else {
      response.status(404).json({ error: "Note not found" });
    }
  } catch {
    response.status(500).json();
  }
});

app.delete("/notes/:id", async (request, response) => {
  const id = request.params.id;
  // console.log("custom id is :" + id);
  try {
    const note = await Note.findOne({ id: id });
    console.log(note)
    if (note) {
      objectId = note._id;
      // console.log("objectId id is :" + objectId);

      await Note.deleteOne({ _id: objectId });
      response.status(204).end();
    } else {
      response.status(404).json({ error: "Note not found" });
    }
  } catch (err) {
    console.error("Error deleting note:", err);
    response.status(500).json({ error: "Internal server error" });
  }
});

app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
