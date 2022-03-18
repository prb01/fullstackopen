const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  )
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.ncd46.mongodb.net/phonebookApp?retryWrites=true&w=majority`
