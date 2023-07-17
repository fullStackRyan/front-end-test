import { useMemo } from "react";
import { Patient, PatientState } from "../types/Types";

const comparePatients = (a: Patient, b: Patient): number => {
  const dateA = new Date(a.lastVisitDate);
  const dateB = new Date(b.lastVisitDate);

  if (dateA > dateB) return 1;
  if (dateA < dateB) return -1;

  return a.name.localeCompare(b.name);
};

type GroupedPatientsType = { [key: string]: Patient[] };

type UseGroupedPatientsReturnType = {
  groupedPatients: GroupedPatientsType | null;
  isLoading: boolean;
};

const useGroupedPatients = (
  patientState: PatientState
): UseGroupedPatientsReturnType => {
  const { patients, isLoading } = patientState;

  const groupedPatients = useMemo<GroupedPatientsType | null>(() => {
    if (!patients) {
      return null;
    }

    const grouped = patients
      .filter((p) => !p.isCompleted)
      .sort(comparePatients)
      .reduce((grouped: { [key: string]: Patient[] }, patient: Patient) => {
        (grouped[patient.type] = grouped[patient.type] || []).push(patient);
        return grouped;
      }, {});

    Object.values(grouped).forEach((patients: Patient[]) =>
      patients.sort(comparePatients)
    );

    return grouped;
  }, [patients]);

  return { groupedPatients, isLoading };
};

export default useGroupedPatients;
