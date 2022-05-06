import express = require("express");
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();
const port = 3003;
app.use(express.json());

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

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    res.json(calculateExercises(daily_exercises, target));
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
