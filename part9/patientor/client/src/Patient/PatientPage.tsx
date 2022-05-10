import { useStateValue } from "../state";
import { useParams } from "react-router-dom";

const PatientPage = () => {
  const [{ patients }] = useStateValue();
  const { id } = useParams();
  const patientId = id as string;

  if (!patients) return null;

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
    </div>
  );
};

export default PatientPage;
