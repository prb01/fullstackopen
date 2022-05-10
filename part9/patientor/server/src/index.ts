import express from "express";
import cors from "cors";
import diagnosesRouter from "./routes/diagnoses"
import patientsRouter from "./routes/patients"
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

app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientsRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
