const mongoose = require("mongoose")

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  )
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.ncd46.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model("Note", noteSchema)

const note = new Note({
  content: "Annnnnnnd, a 3rd note to the db",
  date: new Date(),
  important: false,
})

// note
//   .save()
//   .then(res => {
//     console.log('note saved!')
//     mongoose.connection.close()
//   })

Note.find({ content: { $regex: /^HTML/i } }).then((res) => {
  res.forEach((note) => {
    console.log(note)
  })
  mongoose.connection.close()
})
