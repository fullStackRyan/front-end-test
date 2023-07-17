import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import authService from "./authService";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import { User, AuthState } from "../../types/Types";

function getStoredUser(): boolean {
  try {
    const token = sessionStorage.getItem("token");
    return token ? JSON.parse(token) : null;
  } catch (error) {
    console.error("Failed to parse user from sessionStorage", error);
    return false;
  }
}

const initialState: AuthState = {
  user: getStoredUser(),
  isLoading: false,
};

export const login = createAsyncThunk(
  "auth/login",
  async (userData: User, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const logout = createAction("auth/logout", () => {
  authService.logout();
  return { payload: {} };
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default authSlice.reducer;
