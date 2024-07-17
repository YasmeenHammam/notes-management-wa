const express = require("express");
const app = express();

require("dotenv").config();

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
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
app.use(cors());

const notesRouter = require("./controllers/noteRoutes");

app.use(express.json());
app.use(requestLogger);
app.use("/notes", notesRouter);

app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
