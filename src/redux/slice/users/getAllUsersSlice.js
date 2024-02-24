import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken, makeApiRequest, notify } from "../../../utils/utils";

export const getAllUsersAction = createAsyncThunk(
  "getAllUsers",
  async (pageNumber) => {
    return await makeApiRequest(`/api/user?page=${pageNumber || 0}`, {
      token: getToken(),
    });
  }
);

const initialState = {
  users: [],
  loading: false,
  error: "",
  message: "",
  success: false,
};

const getAllUsersSlice = createSlice({
  name: "getAllUsers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsersAction.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(getAllUsersAction.fulfilled, (state, { payload }) => {
        state.users = payload.data;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload.message;
      })
      .addCase(getAllUsersAction.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        notify(error.message, "error");
        console.log("Error: ", error.message);
      });
  },
});

export default getAllUsersSlice.reducer;
