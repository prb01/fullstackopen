import express from "express";
import patientService from "../services/patientService";
import {toNewPatient} from "../services/utils";
const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getPatients());
});

router.get("/:id", (req, res) => {
  const patient = patientService.findById(req.params.id);
  res.send(patient);
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/:id/entries", (req, res) => {
  const patientId = req.params.id as string;
  const entry = req.body

  try {
    const addedEntry = patientService.addEntry(patientId, entry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
})

export default router;
