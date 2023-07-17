import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import patientsReducer from "./patients/patientsSlice";

const rootReducer = {
  auth: authReducer,
  patients: patientsReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { rootReducer };
export default store;
