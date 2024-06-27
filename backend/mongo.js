const mongoose = require("mongoose");

// if (process.argv.length < 3) {
//   console.log("give password as argument");
//   process.exit(1);
// }

// const password = process.argv[2];

const url = `mongodb+srv://hammamya:yasmeen2203@cluster0.wotmhza.mongodb.net/`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  id: Number,
  title: String,
  author: {
    name: String,
    email: String,
  },
  content: String,
});

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
  id: 1,
  title: "Note 1",
  author: {
    name: "Author 1",
    email: "mail_1@gmail.com",
  },
  content: "Content for note 1",
});

const note2 = new Note({
  id: 2,
  title: "Note 2",
  author: {
    name: "Author 2",
    email: "mail_2@gmail.com",
  },
  content: "Content for note 2",
});

note.save().then((result) => {
  console.log("note saved!");
});

note2.save().then((result) => {
  console.log("note2 saved!");
  mongoose.connection.close();
});

// Note.find({}).then((result) => {
//   result.forEach((note) => {
//     console.log(note);
//   });
//   mongoose.connection.close();
// });
