import { patients } from "../../data/patients";
import { Patient, NewPatient, NonSensitivePatientInfo } from "../types";
import { v1 as uuid } from "uuid";

const getPatients = (): Array<Patient> => {
  return patients;
};

const getPatientsNonSensitiveInfo = (): Array<NonSensitivePatientInfo> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry,
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getPatientsNonSensitiveInfo,
  addPatient,
};
