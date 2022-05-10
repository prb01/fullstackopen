import express from "express";
const app = express();
app.use(express.json());

const PORT = 3000;

app.get("/ping", (_req, res) => {
  console.log("someone pinged me");
  return res.json("pong");
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
