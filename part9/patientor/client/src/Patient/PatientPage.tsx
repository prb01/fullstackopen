import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import EntryDetail from "./EntryDetail";

const PatientPage = () => {
  const [{ patients, diagnoses }] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patientId = id as string;

  if (
    Object.keys(patients).length === 0 ||
    Object.keys(diagnoses).length === 0
  ) {
    return null;
  }

  const patient = patients[patientId];

  return (
    <div>
      <h2>{patient.name}</h2>
      <ul>
        <li>gender: {patient.gender}</li>
        <li>ssn: {patient.ssn}</li>
        <li>DOB: {patient.dateOfBirth}</li>
        <li>Occupation: {patient.occupation}</li>
      </ul>
      <div>
        <h2>entries</h2>
        {patient.entries.map((e) => (
          <EntryDetail key={e.id} entry={e} />
        ))}
      </div>
    </div>
  );
};

export default PatientPage;
