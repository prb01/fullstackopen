import { Entry } from "../types";
import { useStateValue } from "../state";

interface EntryProps {
  entry: Entry;
}

const EntryDetail = (props: EntryProps) => {
  const [{ diagnoses }] = useStateValue();
  const { entry } = props;
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (entry.type) {
    case "Hospital":
      return (
        <div style={{ border: "1px solid black", padding: 4 }}>
          <b>{entry.date}</b>
          <br />
          <i>{entry.description}</i>
          <br />
          <ul>
            {entry.diagnosisCodes?.map((d) => (
              <li key={d}>
                {d} {diagnoses[d]?.name || null}
              </li>
            ))}
          </ul>
          diagnosed by {entry.specialist}
        </div>
      );
      break;
    case "OccupationalHealthcare":
      return (
        <div style={{ border: "1px solid black", padding: 4 }}>
          <b>{entry.date}</b> {entry.employerName}
          <br />
          <i>{entry.description}</i>
          <br />
          <ul>
            {entry.diagnosisCodes?.map((d) => (
              <li key={d}>
                {d} {diagnoses[d]?.name || null}
              </li>
            ))}
          </ul>
          <br />
          <h4>
            <u>Sick Leave</u>
          </h4>
          <b>Start:</b> {entry.sickLeave?.startDate}
          <br />
          <b>End:</b> {entry.sickLeave?.endDate}
          <br />
          <br />
          diagnosed by {entry.specialist}
        </div>
      );
      break;
    case "HealthCheck":
       return (
         <div style={{ border: "1px solid black", padding: 4 }}>
           <b>{entry.date}</b>
           <br />
           <i>{entry.description}</i>
           <br />
           Rating: {entry.healthCheckRating}
           <br />
           diagnosed by {entry.specialist}
         </div>
       );
      break;
    default:
      return assertNever(entry);
      break;
  }
};

export default EntryDetail;