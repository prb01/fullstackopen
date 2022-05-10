import express from "express";
import cors from "cors";
const app = express();
const PORT = 3001;
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

app.get("/api/ping", (_req, res) => {
  console.log("yo you be pingin me");
  return res.json("pong");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
