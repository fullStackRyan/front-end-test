import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PatientsPage from "./pages/PatientsPage";
import PrivateRoute from "./components/PrivateRoutes";

/*
"This test should take overall no longer than 3 hours. Should you find yourself taking longer please submit what you have, with a note indicating how you would finish the task."

- More Testing. For example, testing the validators, Redux and general UI.
- isCompleted is an object or a boolean. I would spend more time considering the reasons around this and how best to handle potentail recursive structure.
*/

const App = () => {
  return (
    <>
      <header>
        <img src="./images/dhg_whole.png" alt="digital hospital global logo" />
      </header>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/patients"
          element={
            <PrivateRoute>
              <PatientsPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
