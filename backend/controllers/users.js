const bcrypt = require("bcrypt");
const express = require("express");
const usersRouter = express.Router();
const User = require("../models/user");

usersRouter.post("/", async (request, response) => {
  const { name, email, username, password } = request.body;
  console.log(request.body);

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    name,
    email,
    username,
    passwordHash,
  });

  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

// usersRouter.get("/", async (request, response) => {
//   const users = await User.find({}).populate("notes", {
//     content: 1,
//     important: 1,
//   });
//   response.json(users);
// });

module.exports = usersRouter;
