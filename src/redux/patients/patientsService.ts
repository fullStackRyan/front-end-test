import axios from "axios";
import {
  APIPatientData,
  Patient,
  IsCompleted,
  PatientType,
} from "../../types/Types";

const API_URL = "https://run.mocky.io/v3/3669c83a-9ba1-4424-b08f-a8ef6d699966";

const transformPatientData = (patientData: APIPatientData): Patient => {
  let isCompleted: IsCompleted | boolean;

  if (typeof patientData.is_completed === "boolean") {
    isCompleted = patientData.is_completed;
  } else {
    isCompleted = {
      level1: {
        anotherLevel: patientData.is_completed.level1.anotherLevel,
        isCompleted: patientData.is_completed.level1.is_completed,
      },
    };
  }

  const getType = (typeString: string): PatientType => {
    switch (typeString) {
      case "a_level":
      case "b_level":
      case "c_level":
      case "d_level":
        return typeString;
      default:
        throw new Error(`Invalid patient type: ${typeString}`);
    }
  };

  return {
    id: patientData._id,
    name: patientData.name,
    type: getType(patientData.type),
    hospitalId: patientData.hospital_id,
    joined: new Date(patientData.joined),
    lastVisitDate: new Date(patientData.last_visit_date),
    isCompleted: isCompleted,
  };
};

const getPatients = async () => {
  const response = await axios.get(API_URL);

  const patients: Patient[] = response.data.patients.map(transformPatientData);

  return patients;
};

const patientService = {
  getPatients,
};

export default patientService;
