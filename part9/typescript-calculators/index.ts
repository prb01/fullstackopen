import express = require("express");
const app = express();
const port = 3000;

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.listen(port, () => {
  console.log(`server started. listening on port ${port}`);
});
