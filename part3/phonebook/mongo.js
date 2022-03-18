const mongoose = require("mongoose")

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  )
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.ncd46.mongodb.net/phonebookApp?retryWrites=true&w=majority`
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})
const Person = mongoose.model("Person", personSchema)

//CONNECT to MONGODB
mongoose.connect(url)

//ADD NEW PERSON IF ARGS PROVIDED
if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({ name, number })

  person.save().then((res) => {
    console.log(`added ${name}'s number ${number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  console.log('phonebook:')
  Person.find({}).then(res => {
    res.forEach(p => console.log(`${p.name} ${p.number}`))
    mongoose.connection.close()
  })
}
