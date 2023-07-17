import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import patientService from "./patientsService";
import { PatientState } from "../../types/Types";

const initialState: PatientState = {
  patients: null,
  isLoading: false,
};

export const getPatients = createAsyncThunk(
  "patients/getAll",
  async (_, thunkAPI) => {
    try {
      return await patientService.getPatients();
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPatients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPatients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.patients = action.payload;
      })
      .addCase(getPatients.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default patientSlice.reducer;
