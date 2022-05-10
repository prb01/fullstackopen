import { useStateValue } from "../state";
import { useParams } from "react-router-dom";

const PatientPage = () => {
  const [{ patients }] = useStateValue();
  const { id } = useParams<{ id: string }>();
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
      <div>
        <h2>entries</h2>
        {patient.entries.map((e) => (
          <div key={e.id}>
            <p>
              <b>{e.date}:</b> {e.description}
            </p>
            <ul>
              {e.diagnosisCodes?.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientPage;
