const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  passwordhash: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
})

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.passwordhash
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model("User", userSchema)
