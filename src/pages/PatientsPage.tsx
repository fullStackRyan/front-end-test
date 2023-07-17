import { useEffect } from "react";
import { getPatients } from "../redux/patients/patientsSlice";
import useGroupedPatients from "../hooks/useGroupedPatients";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import { logout } from "../redux/auth/authSlice";
import PatientCard from "../components/PatientCard";
import { AppDispatch } from "../redux/store";
import { RootState } from "../redux/store";

const PatientsPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const patientState = useSelector((state: RootState) => state.patients);
  const { groupedPatients, isLoading } = useGroupedPatients(patientState);

  useEffect(() => {
    dispatch(getPatients());
  }, [dispatch]);

  const handleOnClick = () => dispatch(logout());

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <div>
        <h1 className="self-start text-lg font-semibold">Patients:</h1>
        {groupedPatients &&
          Object.keys(groupedPatients).map((type, index) => (
            <div key={"group-" + type + "-" + index}>
              <h2 className="">{type.replace("_", "-").toUpperCase()}</h2>
              <div className=" ">
                {(groupedPatients[type] || []).map((patient, index) => (
                  <div className="mb-4">
                    <PatientCard
                      key={"patient-" + patient.id + "-" + index}
                      patient={patient}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        <div className="flex justify-center">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="bg-sky-500"
            onClick={handleOnClick}
          >
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PatientsPage;
