import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken, makeApiRequest, notify } from "../../../utils/utils";

export const getUserByTokenAction = createAsyncThunk(
  "getUserByToken",
  async () => {
    return await makeApiRequest(`/api/get-user-by-token`, {
      token: getToken(),
    });
  }
);

const initialState = {
  user: {},
  loading: false,
  error: "",
  message: "",
  success: false,
};

const getUserByTokenSlice = createSlice({
  name: "getUserByToken",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserByTokenAction.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(getUserByTokenAction.fulfilled, (state, { payload }) => {
        state.user = payload.data;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload.message;
      })
      .addCase(getUserByTokenAction.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        notify(error.message, "error");
        console.log("Error: ", error.message);
      });
  },
});

export default getUserByTokenSlice.reducer;
