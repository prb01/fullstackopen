import patients from "../../data/patients";
import {
  Patient,
  NewPatient,
  NonSensitivePatientInfo,
  NewEntry,
  Entry,
} from "../types";
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

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

const findById = (id: string): Patient | unknown => {
  // return patients
  //   .filter((p) => p.id === id)
  //   .map(({ id, name, dateOfBirth, gender, occupation }) => ({
  //     id,
  //     name,
  //     dateOfBirth,
  //     gender,
  //     occupation,
  //   }));
  return patients.filter((p) => p.id === id);
};

const addEntry = (patientId: string, entry: NewEntry): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry,
  };
  patients.find((p) => p.id === patientId)?.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getPatientsNonSensitiveInfo,
  addPatient,
  findById,
  addEntry,
};
