import express from "express";
import patientService from "../services/patientService";
const router = express.Router();

router.get("/", (_req,res) => {
  res.send(patientService.getPatientsNonSensitiveInfo())
})

router.post("/", (req, res) => {
  const newPatient = patientService.addPatient(req.body)
  res.send(newPatient)
})

export default router