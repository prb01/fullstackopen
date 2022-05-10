import express from "express";
const app = express();
const PORT = 3001;
app.use(express.json());

app.get("/api/ping", (_req, res) => {
  console.log("yo you be pingin me")
  return res.json("pong")
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})