import express = require("express");
import { calculateBmi } from "./bmiCalculator";
const app = express();
const port = 3000;

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  try {
    res.json(calculateBmi(Number(height), Number(weight)));
  } catch (error: unknown) {
    const errorMessage = { error: "" };

    if (error instanceof Error) {
      errorMessage.error = error.message;
    }
    res.json(errorMessage);
  }
});

app.listen(port, () => {
  console.log(`server started. listening on port ${port}`);
});