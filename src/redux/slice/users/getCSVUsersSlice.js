import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken, makeApiRequest, notify } from "../../../utils/utils";

export const searchCSVUsersAction = createAsyncThunk(
  "searchCSVUsers",
  async ({ pageNumber, searchValue, status, userType }) => {
    return await makeApiRequest(
      `/api/${process.env.REACT_APP_HOSPITAL_NAME}/csv-data?searchValue=${searchValue}&status=${status}&hospitalId=${process.env.REACT_APP_HOSPITAL_ID}&userType=${userType}`,
      {
        token: getToken(),
      }
    );
  }
);

const initialState = {
  users: [],
  loading: false,
  error: "",
  message: "",
  success: false,
};

const searchCSVUsersSlice = createSlice({
  name: "searchCSVUsers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchCSVUsersAction.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(searchCSVUsersAction.fulfilled, (state, { payload }) => {
        state.users = payload.data;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload.message;
      })
      .addCase(searchCSVUsersAction.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        notify(error.message, "error");
        console.log("Error: ", error.message);
      });
  },
});

export default searchCSVUsersSlice.reducer;
