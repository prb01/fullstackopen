import { NewPatient, Gender, Entry } from "../types";

const parseString = (str: unknown): string => {
  if (!str || !isString(str)) {
    throw new Error("Incorrect or missing string");
  }

  return str;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

type Fields = {
  ssn: unknown;
  name: unknown;
  dateOfBirth: unknown;
  gender: unknown;
  occupation: unknown;
  entries: unknown
};

const toNewPatient = ({
  ssn,
  name,
  dateOfBirth,
  gender,
  occupation,
  entries
}: Fields): NewPatient => {
  const newEntry: NewPatient = {
    ssn: parseString(ssn),
    name: parseString(name),
    dateOfBirth: parseDate(dateOfBirth),
    gender: parseGender(gender),
    occupation: parseString(occupation),
    entries: entries as Array<Entry>
  };

  return newEntry;
};

export default toNewPatient;
