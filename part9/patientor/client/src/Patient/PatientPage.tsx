import { addEntry, useStateValue } from "../state";
import { useParams } from "react-router-dom";
import EntryDetail from "./EntryDetail";
import React from "react";
import AddEntryModal from "../AddEntryModal";
import { Button } from "@material-ui/core";
import { NewEntry, Entry } from "../types";
import { apiBaseUrl } from "../constants";
import axios from "axios";


const PatientPage = () => {
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();
  const { id } = useParams<{ id: string }>();
  const patientId = id as string;

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  if (
    Object.keys(patients).length === 0 ||
    Object.keys(diagnoses).length === 0
  ) {
    return null;
  }

  const patient = patients[patientId];

  const submitNewEntry = async (values: NewEntry) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patientId}/entries`,
        values
      );
      dispatch(addEntry(patientId, newEntry));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(
          String(e?.response?.data?.error) || "Unrecognized axios error"
        );
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

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
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button variant="contained" onClick={() => openModal()}>
          Add New Entry
        </Button>
      </div>
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
