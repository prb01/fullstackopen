import { patients } from "../../data/patients";
import { Patient, NonSensitivePatientInfo } from "../types";

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

export default {
  getPatients,
  getPatientsNonSensitiveInfo,
};
