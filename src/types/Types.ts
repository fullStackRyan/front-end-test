export type PatientType = "a_level" | "b_level" | "c_level" | "d_level";
export type PatientID = string;
export type HospitalID = string;

export type Patient = {
  id: PatientID;
  name: string;
  type: PatientType;
  hospitalId: HospitalID;
  joined: Date;
  lastVisitDate: Date;
  isCompleted: IsCompleted | boolean;
};

// IsCompleted may need to be recursive in future iteration
// export type IsCompleted = {
//   [key: string]: boolean | string | IsCompleted;
// };

export type IsCompleted = {
  level1: {
    anotherLevel: boolean;
    isCompleted: string;
  };
};

export type APIPatientData = {
  _id: string;
  name: string;
  type: string;
  hospital_id: string;
  joined: string;
  last_visit_date: string;
  is_completed:
    | boolean
    | { level1: { anotherLevel: boolean; is_completed: string } };
};

export type User = {
  email: string;
  password: string;
};

export type PatientState = {
  patients: Patient[] | null;
  isLoading: boolean;
};

export type AuthState = {
  user: boolean | null | undefined;
  isLoading: boolean;
};
