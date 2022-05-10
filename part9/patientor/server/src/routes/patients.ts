import express from "express";
import patientService from "../services/patientService";
import toNewPatient from "../services/utils";
const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getPatientsNonSensitiveInfo());
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedEntry = patientService.addPatient(newPatient);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
