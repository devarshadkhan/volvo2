import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken, makeApiRequest } from "../../../utils/utils";

export const getDepartmentAction = createAsyncThunk(
  "getDepartment",
  async () => {
    return await makeApiRequest(
      `/api/${process.env.REACT_APP_HOSPITAL_NAME}/deparment/view`,
      {
        token: getToken(),
        apiKey: process.env.REACT_APP_API_KEY,
      }
    );
  }
);

const initialState = {
  departments: [],
  loading: false,
  error: "",
  message: "",
  success: false,
};

const getDepartmentSlice = createSlice({
  name: "getDepartment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDepartmentAction.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(getDepartmentAction.fulfilled, (state, { payload }) => {
        state.departments = payload.data;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload.message;
      })
      .addCase(getDepartmentAction.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        console.log("Error: ", error.message);
      });
  },
});

export default getDepartmentSlice.reducer;
