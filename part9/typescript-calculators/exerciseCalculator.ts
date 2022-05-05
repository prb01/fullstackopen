const calculateExercises = (
  hoursExercised: Array<number>,
  target: number
): object => {
  const periodLength: number = hoursExercised.length;
  const trainingDays: number = hoursExercised.filter(
    (hours) => hours > 0
  ).length;
  const totalExerciseHours: number = hoursExercised.reduce(
    (prevValue, curValue) => {
      return prevValue + curValue;
    },
    0
  );
  const average: number = totalExerciseHours / periodLength;
  const diffPercentage: number = (average - target) / target;
  const success: boolean = average >= target ? true : false;
  const rating: number =
    diffPercentage > 0 ? 3 : diffPercentage > -0.3 ? 2 : 1;

  let ratingDescription: string;
  switch (rating) {
    case 1:
      ratingDescription =
        "god, you're awful.. how do you live with yourself?";
      break;

    case 2:
      ratingDescription = "not too bad but could be better";
      break;

    case 3:
      ratingDescription =
        "you. are. amazing! go pat yourself on the back!";
      break;

    default:
      ratingDescription = "unknown";
      break;
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 1));
// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 5));

const target: number = Number(process.argv[2]);
const hoursExercised: Array<number> = process.argv
  .slice(3)
  .map((hours) => Number(hours));
console.log(calculateExercises(hoursExercised, target));
