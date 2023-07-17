import { Patient } from "../types/Types";
import { formatDate } from "../utils/formatDate";

type Props = {
  patient: Patient;
};

const PatientCard = ({ patient }: Props) => {
  const { name, joined, lastVisitDate, isCompleted } = patient;

  return (
    <div className="bg-slate-200 text-slate-700 p-2 w-96" role="contentinfo">
      <p>Name: {name}</p>
      <p>Joined: {formatDate(joined)}</p>
      <p>Last visit: {formatDate(lastVisitDate)}</p>
      <p>Completed: {isCompleted ? "yes" : "no"}</p>
    </div>
  );
};

export default PatientCard;
