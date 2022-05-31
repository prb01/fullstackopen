const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
  content: String,
  created_at: Date,
  updated_at: Date,
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  },
})

commentSchema.pre("save", function(next){
  now = new Date()
  this.updated_at = now
  if (!this.created_at) {
    this.created_at = now
  }
  next()
})

commentSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model("Comment", commentSchema)
