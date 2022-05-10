import express from "express";
import diaryRouter from "./routes/diaries";
const app = express();
app.use(express.json());
const PORT = 3000;

// const diaryEntries = [
//   {
//     id: 1,
//     date: "2017-01-01",
//     weather: "rainy",
//     visibility: "poor",
//     comment: "Pretty scary flight, I'm glad I'm alive",
//   },
//   {
//     id: 2,
//     date: "2017-04-01",
//     weather: "sunny",
//     visibility: "good",
//     comment: "Everything went better than expected, I'm learning much",
//   },
//   {
//     id: 3,
//     date: "2017-04-15",
//     weather: "windy",
//     visibility: "good",
//     comment:
//       "I'm getting pretty confident although I hit a flock of birds",
//   },
//   {
//     id: 4,
//     date: "2017-05-11",
//     weather: "cloudy",
//     visibility: "good",
//     comment: "I almost failed the landing but I survived",
//   },
// ];

app.get("/ping", (_req, res) => {
  console.log("someone pinged me");
  return res.json("pong");
});

app.use("/api/diaries", diaryRouter);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
