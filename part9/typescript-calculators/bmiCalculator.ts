const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / ((height / 100) ^ 2);

  if (bmi < 18.5) {
    return "Underweight"
  }
  else if (bmi >= 18.5 && bmi < 25) {
    return "Normal weight"
  } else if (bmi >= 25 && bmi < 30) {
    return "Overweight"
  } else {
    return "Obese"
  }
};

console.log(calculateBmi(180, 74));

// Major adult BMI classifications are 
// underweight (under 18.5 kg/m2), 
// normal weight (18.5 to 24.9), 
// overweight (25 to 29.9), and 
// obese (30 or more)