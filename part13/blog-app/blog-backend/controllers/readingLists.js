const { ReadingList } = require("../models")
const readingListsRouter = require("express").Router()
const { tokenExtractor } = require("../util/middleware")
const { Op } = require("sequelize")

readingListsRouter.post("/", async (req, res) => {
  const newReadingList = await ReadingList.create(req.body)
  res.json(newReadingList)
})

readingListsRouter.put("/:id", tokenExtractor, async (req, res) => {
  const readingList = await ReadingList.findByPk(req.params.id)

  if (!readingList) {
    return res.status(404).end()
  }

  if (req.decodedToken.id !== readingList.userId) {
    return res
      .status(401)
      .json({ error: "Must be owner to change read status" })
      .end()
  }

  readingList.read = req.body.read
  await readingList.save()
  res.json(readingList)
})


module.exports = readingListsRouter
